## Inspiration 💡

As ubiquitous and fast as the internet seems in developed countries, developing countries still struggle with reliable internet connections. The impact of poor internet connectivity exasperate the education inequality between children from prosperous countries and children from developing countries, because the latter cannot benefit from remote learning via video conferencing.

Last year, it was found that that millions of students in the state of Odisha in India are stuck at home with no access to either internet or online education. Our teammate Subham Saahu, an Odisha native, has had first-hand experience of interruptions during his undergraduate studies.

For even those who have access to the internet, the price is premium and the bandwidth limited. For instance, while talking to his parents in India, Subham found that they frequently run out of their allocated 1 GB far before the allowance period, after which the bandwidth gets throttled: stalled frames, choppy audio, painful delays, and eventual disconnections, and subsequent retries are a normal occurrence, but still arguably much better than normal telephone conversations because he gets to “see” them.

At the heart of the problem lay lack of tele infrastructure for implementation of education on virtual platforms.

To address this problem, we propose a new approach based on the insight that if we are willing to give up some realism or realistic rendering of faces and screens, then there is whole new world of face and screen representations that can be derived for ultra-low bandwidth, with an acceptable quality of experience.

The proposed solution can be primarily implemented as software needing no change in the underlying infrastructure. This would in turn be cheaper, and allow internet access to people that are currently being marginalized based on their affordability.

Our architectural goal is to prioritize reliable frame rate with low latency and low jitter (smooth and consistent), as well as high audio quality. This should serve the purposes of online education

![Group-1686550957.gif](https://i.postimg.cc/8c7j7ndF/Group-1686550957.gif)

## What it does 🤔
Binoculearn is an educational video conferencing web application with reliable frame rate with low latency and low jitter (smooth and consistent), as well as high audio quality. We do this by converting the video stream into ASCII characters on the client side and send it via WebRTC using Twilio’s video conferencing service.

Implementing video conferencing using this technique saves bandwidth on the receiver end. This method is horizontally scalable as we can feed more users as they enter the conference.

![Mid.png](https://i.postimg.cc/8zZcbSyF/Mid.png)

Our goal with this platform is to connect students in poor connected areas with highly qualified teachers in metropolitan areas and abroad to facilitate remote collaboration, lectures, and Q&A. 

On top of the bandwidth saving functionality, we also offer educational and content-moderation tools like sentiment analysis for Q&A and meeting summarization using Cohere.ai. These features allow both the educators and students to maintain decorum in the meeting and also have follow-up material to retain information about the meeting.

![FLow.png](https://i.postimg.cc/05ddY6qc/FLow.png)

## How we built it ⚙️

First and foremost, it is Crafted with 💙. The whole process can be broken into the following points :-
- React, Redux on the frontend
- Express.js, Node.js, Sockets, WebRTC, Twilio Live on the backend
- External services like Twilio, Cohere.ai

![Tech-Stack-Final-1.png](https://i.postimg.cc/9FVy8cB1/Tech-Stack-Final-1.png)

QnA model Architecture BERT:

![image-172.png](https://i.postimg.cc/Wp9sKnGK/image-172.png)

Summarizer Architecture :

![image-173.png](https://i.postimg.cc/5t1cjY5L/image-173.png)

---

## Design 🎨

We were heavily inspired by the revised version of **Double Diamond** design process, which not only includes visual design, but a full-fledged research cycle in which you must discover and define your problem before tackling your solution & then finally deploy it.

![DD](https://i.postimg.cc/W4bvXqDj/image-148.png)

> 1. **Discover**: a deep dive into the problem we are trying to solve.
> 2. **Define**: synthesizing the information from the discovery phase into a problem definition.
> 3. **Develop**: think up solutions to the problem.
> 4. **Deliver**: pick the best solution and build that.

Moreover, we utilized design tools like Figma,  Photoshop & Illustrator to prototype our designs before doing any coding. Through this, we are able to get iterative feedback so that we spend less time re-writing code.

![image-178.png](https://i.postimg.cc/XvFw1qtH/image-178.png)

![breaker.png](https://i.postimg.cc/YSvrrWnc/breaker.png)

# Research 📚
Research is the key to empathizing with users: we found our specific user group early and that paves the way for our whole project. Here are a few of the resources that were helpful to us —


- https://www.csmonitor.com/Environment/2021/0305/Zoom-isn-t-carbon-free.-The-climate-costs-of-staying-home#:~:text=An%20hour%20of%20high%2Ddefinition,mile%20in%20an%20average%20car.
- https://www.theguardian.com/technology/2021/nov/30/more-than-a-third-of-worlds-population-has-never-used-the-internet-says-un
- https://towardsdatascience.com/video-calling-for-billions-without-internet-40d10069c464
- https://www.retrium.com/blog/dont-let-slow-internet-connections-ruin-your-retrospectives
- https://www.statista.com/chart/17247/the-average-cost-of-mobile-data-in-selected-countries/
- https://www.broadbandsearch.net/blog/internet-statistics
- https://js.tensorflow.org/api/2.3.0/
- https://www.udemy.com/course/webrtc-practical-course-create-video-chat-group-call-app/
- https://www.speechly.com/blog/create-a-webrtc-video-chat-app-with-speechly-transcription 
- https://aclanthology.org/2020.lrec-1.825.pdf
- https://www.currentscience.ac.in/Volumes/110/01/0069.pdf 


**CREDITS**
- **Design Resources** : Freepik, Behance
- **Icons** : Icons8, fontawesome
- **Font** : Urbanist / Roboto / Raleway 

---

## Challenges we ran into 😤
We faced some challenges during the hackathon, many of which ironically related to working remotely. One of the major challenges was the time difference. All of us participated from different time zones, which created communication challenges.

## Best Use of NLP with Cohere🗣️
Cohere makes Natural Language Processing easy to do with their ready to use online platform. Cohere's Summarization API (TLDR) and Sentiment Analysis API were super useful in adding intelligence to our application and making our Q&A section in the video call AI-enabled.

 ## Most Creative Use of Twilio 👷🏻‍♂️
Twilio live was seamless to interact with in creating our video conferencing feature! We converted our video stream to ASCII and streamed it using Twilio's video API which made saved us a lot of time made it possible for us to finish the hackathon in 24 hours.

## Accomplishments that we're proud of ✨
We are proud of finishing the project on time which seemed like a tough task as we started working on it quite late due to other commitments. We were also able to add most of the features that we envisioned for the app during ideation. And as always, working overnight was pretty fun! :)

This project was especially an achievement for us because the experience was very different than in-person hackathons. We found that some parts were the same though - we went through heavy brainstorming and extensive research all to feel the sweet, sweet success of hitting the final pin on the board.

## Scalability & Market Viability 📈

We crafted this app under 24 hours with extensive efforts. We believe this can be a proof-of-concept but it still requires some time to get ready for production so that it can be useful to every individual in need. We plan to refine the app by making it more accessible and then launching the beta version of the app for testing/feedback. After this, we will launch our Mobile app on AppStore and playstore for public use. This project will always be open-source, since it's made for students, by the students!

![meme.png](https://i.postimg.cc/2jh5Lnzr/meme.png)

But yes, PeerJs might run on WebTorrent P2P Mesh protocols, but at the end of the day it's still C++ code running underlying WebRTC which is leveraged by the same.

## What we learned 🙌
**Proper sleep is very important! :p** Well, a lot of things, both summed up in technical & non-technical sides. Also not to mention, we enhanced our googling and Stackoverflow searching skills during the hackathon :)

![image-172-1.png](https://i.postimg.cc/9QydJz6x/image-172-1.png)

We are a **team of 3** passionate about bringing remote education to areas with poor internet connectivity!. What we create during our Hackathons is just the tip of the iceberg and we believe this project can help uplift the communication lags faced everyday by providing a Safe, Fast & Reliable connection in this time of despair.

## What's next? 🚀
*We believe that our App has great potential*. We just really want this project to have a positive impact on people's lives! We would love to make it more *scalable* & *cross-platform* so that the user interaction increases to a great extent. Additionally, we intend to continue improving the image compression algorithms & adding receipts to track conversations for later use.
 
**Note ⚠️ — API credentials have been revoked. If you want to run the same on your local, use your own credentials.**

![Group-1686550958.png](https://i.postimg.cc/rpcSbMcq/Group-1686550958.png)
