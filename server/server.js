const express = require("express")
const http = require("http")
const { v4: uuidv4 } = require("uuid")
const cors = require("cors")
const twilio = require("twilio")
require("dotenv").config()
const PORT = process.env.PORT || 5002
const app = express()
const server = http.createServer(app)
const cohere = require('cohere-ai');

app.use(cors())
app.use(express.json())


let connectedUsers = []
let rooms = []

// create route to check if room exists
app.get("/api/room-exists/:roomId", (req, res) => {
  const { roomId } = req.params
  const room = rooms.find((room) => room.id === roomId)

  if (room) {
    // send reponse that room exists
    if (room.connectedUsers.length > 3) {
      return res.send({ roomExists: true, full: true })
    } else {
      return res.send({ roomExists: true, full: false })
    }
  } else {
    // send response that room does not exists
    return res.send({ roomExists: false })
  }
})

app.get("/api/get-turn-credentials", (req, res) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  const client = twilio(accountSid, authToken)

  res.send({ token: null })
  try {
    client.tokens.create().then((token) => {
      res.send({ token })
    })
  } catch (err) {
    console.log("error occurred when fetching turn server credentials")
    console.log(err)
    res.send({ token: null })
  }
})

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log(`user connected ${socket.id}`)

  socket.on("create-new-room", (data) => {
    createNewRoomHandler(data, socket)
  })

  socket.on("join-room", (data) => {
    joinRoomHandler(data, socket)
  })

  socket.on("disconnect", () => {
    disconnectHandler(socket)
  })

  socket.on("conn-signal", (data) => {
    signalingHandler(data, socket)
  })

  socket.on("conn-init", (data) => {
    initializeConnectionHandler(data, socket)
  })

  socket.on("direct-message", (data) => {
    directMessageHandler(data, socket)
  })
})

// socket.io handlers

const createNewRoomHandler = (data, socket) => {
  console.log("host is creating a new room")
  console.log(data)
  const { identity, onlyAudio } = data

  const roomId = uuidv4()

  // create new user
  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    onlyAudio,
  }

  // push that user to connectedUsers
  connectedUsers = [...connectedUsers, newUser]

  //create new room
  const newRoom = {
    id: roomId,
    connectedUsers: [newUser],
  }
  // join socket.io room
  socket.join(roomId)

  rooms = [...rooms, newRoom]

  // emit to that client which created that room roomId
  socket.emit("room-id", { roomId })

  // emit an event to all users connected
  // to that room about new users which are right in this room
  socket.emit("room-update", { connectedUsers: newRoom.connectedUsers })
}

const joinRoomHandler = (data, socket) => {
  const { identity, roomId, onlyAudio } = data

  const newUser = {
    identity,
    id: uuidv4(),
    socketId: socket.id,
    roomId,
    onlyAudio,
  }

  // join room as user which just is trying to join room passing room id
  const room = rooms.find((room) => room.id === roomId)
  room.connectedUsers = [...room.connectedUsers, newUser]

  // join socket.io room
  socket.join(roomId)

  // add new user to connected users array
  connectedUsers = [...connectedUsers, newUser]

  // emit to all users which are already in this room to prepare peer connection
  room.connectedUsers.forEach((user) => {
    if (user.socketId !== socket.id) {
      const data = {
        connUserSocketId: socket.id,
      }

      io.to(user.socketId).emit("conn-prepare", data)
    }
  })

  io.to(roomId).emit("room-update", { connectedUsers: room.connectedUsers })
}

const disconnectHandler = (socket) => {
  // find if user has been registered - if yes remove him from room and connected users array
  const user = connectedUsers.find((user) => user.socketId === socket.id)

  if (user) {
    // remove user from room in server
    const room = rooms.find((room) => room.id === user.roomId)

    room.connectedUsers = room.connectedUsers.filter(
      (user) => user.socketId !== socket.id
    )

    // leave socket io room
    socket.leave(user.roomId)

    // close the room if amount of the users which will stay in room will be 0
    if (room.connectedUsers.length > 0) {
      // emit to all users which are still in the room that user disconnected
      io.to(room.id).emit("user-disconnected", { socketId: socket.id })

      // emit an event to rest of the users which left in the toom new connectedUsers in room
      io.to(room.id).emit("room-update", {
        connectedUsers: room.connectedUsers,
      })
    } else {
      rooms = rooms.filter((r) => r.id !== room.id)
    }
  }
}

const signalingHandler = (data, socket) => {
  const { connUserSocketId, signal } = data

  const signalingData = { signal, connUserSocketId: socket.id }
  io.to(connUserSocketId).emit("conn-signal", signalingData)
}

// information from clients which are already in room that They have preapred for incoming connection
const initializeConnectionHandler = (data, socket) => {
  const { connUserSocketId } = data

  const initData = { connUserSocketId: socket.id }
  io.to(connUserSocketId).emit("conn-init", initData)
}

const directMessageHandler = (data, socket) => {
  if (
    connectedUsers.find(
      (connUser) => connUser.socketId === data.receiverSocketId
    )
  ) {
    const receiverData = {
      authorSocketId: socket.id,
      messageContent: data.messageContent,
      isAuthor: false,
      identity: data.identity,
    }
    socket.to(data.receiverSocketId).emit("direct-message", receiverData)

    const authorData = {
      receiverSocketId: data.receiverSocketId,
      messageContent: data.messageContent,
      isAuthor: true,
      identity: data.identity,
    }

    socket.emit("direct-message", authorData)
  }
}



const findSentiment = async (text) => {
  cohere.init(process.env.COHERE_API_KEY)

  const response = await cohere.classify(
    {
      inputs: [text],
      examples: [
        { text: "The order came 5 days early", label: "positive"}, 
        { text: "The item exceeded my expectations", label: "positive"}, 
        { text: "I ordered more for my friends", label: "positive"}, 
        { text: "I would buy this again", label: "positive"}, 
        { text: "I would recommend this to others", label: "positive"}, 
        { text: "The package was damaged", label: "negative"}, 
        { text: "The order is 5 days late", label: "negative"}, 
        { text: "The order was incorrect", label: "negative"}, 
        { text: "I want to return my item", label: "negative"}, 
        { text: "The item\'s material feels low quality", label: "negative"}, 
        { text: "The product was okay", label: "neutral"}, 
        { text: "I received five items in total", label: "neutral"}, 
        { text: "I bought it from the website", label: "neutral"}, 
        { text: "I used the product this morning", label: "neutral"}, 
        { text: "The product arrived yesterday", label: "neutral"},
      ]
    }
  );

  const val=response.body.classifications[0].prediction
  console.log(val, response.body.classifications[0])
  return val==='negative'? -1: (val==='positive'?1:0);
}



app.post('/api/findSentiment', async (req, res) => {
  try {
    const data = req.body.message
    res.send({
      sentiment: await findSentiment(data)
    })
  } catch (err) {
    console.log(err)
    res.send({
      sentiment: 0
    });
  }
})



app.post("/api/summarize", async (req, res) => {
  try {
    const { input } = req.body;
    const response = await cohere.generate({
      model: "large",
      prompt: `Passage: Is Wordle getting tougher to solve? Players seem to be convinced that the game has gotten harder in recent weeks ever since The New York Times bought it from developer Josh Wardle in late January. The Times has come forward and shared that this likely isn’t the case. That said, the NYT did mess with the back end code a bit, removing some offensive and sexual language, as well as some obscure words There is a viral thread claiming that a confirmation bias was at play. One Twitter user went so far as to claim the game has gone to “the dusty section of the dictionary” to find its latest words.\n\nTLDR: Wordle has not gotten more difficult to solve.\n--\nPassage: ArtificialIvan, a seven-year-old, London-based payment and expense management software company, has raised $190 million in Series C funding led by ARG Global, with participation from D9 Capital Group and Boulder Capital. Earlier backers also joined the round, including Hilton Group, Roxanne Capital, Paved Roads Ventures, Brook Partners, and Plato Capital.\n\nTLDR: ArtificialIvan has raised $190 million in Series C funding.\n--\n Passage: ${input} \n\nTLDR: `,
      max_tokens: 70,
      temperature: 0.8,
      k: 0,
      p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ["--"],
      return_likelihoods: "NONE",
    });


    console.log(response.body)
    console.log(response.body.generations[0])

    res.status(200).json({ summary: response.body.generations[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ summary: "Error" });
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})




