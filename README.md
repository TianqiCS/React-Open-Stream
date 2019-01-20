This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Architecture 
In the intance, there are two server, but they can totaly set up into one. 
### Streaming Server 
Reference: 
- https://docs.peer5.com/guides/setting-up-hls-live-streaming-server-using-nginx/ 
- https://www.leaseweb.com/labs/2013/11/streaming-video-demand-nginx-rtmp-module/ 
* You can follow the instruction above to setup a rtmp server for streaming 
### Web Server
- static web page server (You can use github pages if you want) 
- chat socket.io server using express 
# How to deploy yours streaming site?
- You will need a server for hosting 
- Follow the tutorial of setting up an RTMP server using nginx
- You can download the backend and the frontend using npm install to make it work. (Don't forget to change urls to your IP) 
- You probably want to build the apps which is not the development server, so that they can be faster and accessible. 
# Some screenshots
 ![image](https://github.com/TianqiCS/React-Live-Player/raw/master/docs/1-1.png) 
 ![image](https://github.com/TianqiCS/React-Live-Player/raw/master/docs/1-2.png) 
 ![image](https://github.com/TianqiCS/React-Live-Player/raw/master/docs/1-3.png) 
## Notice
 This repo is mainly on only the frontend part. However, the backend codes are also available as a zip file 
