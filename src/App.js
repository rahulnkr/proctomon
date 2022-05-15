import { useState , useRef } from 'react';
import './App.css';
import Page from './components/Page';
import Login from './components/Login'
function App() {
  let [visible ,setVisible]=useState(0);
  let [input ,setData]=useState();
  let[name , setName]=useState();
  let [copy ,setCopy] =useState(0);
  let visibility;
  let info;
  const [set ,setSet] =useState(1);
  let video=useRef(null);
  let recorder=useRef(null);
  let mediaRecorder=useRef(null);
  let recording =useRef(null);
  let screenRecording =useRef(null);
  const share =useRef(null);
  console.log(visibility)
  console.log(info)
  console.log(name)
  const data=(e)=>{
    setData(e.target.value)
  }
  const nam=(e)=>{
    setName(e.target.value)
  }
  const answer =()=>{
      const ans={
        UserName:name,
        Answer:input,
        No_Of_TimeUserSwitchTheScreen:visible,
        No_Of_TimeUserTry_To_PasteContent:copy
      }
      localStorage.setItem('Answers',JSON.stringify(ans))
   
  }
  const getMedia=async ()=>{
    try{
      let videoStream =await navigator.mediaDevices.getUserMedia({video:true,audio:true});
      video.current.srcObject=videoStream;
      media(video.current.srcObject)
    }
    catch (err){
      console.log(err)
    }
   
  }
  const getShare =async()=>{
    try{
      let screen=await navigator.mediaDevices.getDisplayMedia({displaySurface:['monitor']});
      let displaySurface =screen.getVideoTracks()[0].getSettings().displaySurface;
      if(displaySurface==='monitor'){
      share.current.srcObject=screen;
     
      
    sharemedia(share.current.srcObject)
  }
  else{
    console.log('you did not share entire screen')
    screen.getTracks().forEach(track=>track.stop());
    ristricted();
  }
      
    }
    catch(err){
      ristricted();
      console.log(err)
    }
  }
const sharemedia=(stream)=>{
  mediaRecorder=new MediaRecorder(stream)
  console.log(mediaRecorder)
  let chunk=[];
  mediaRecorder.ondataavailable=e=>chunk.push(e.data);
  mediaRecorder.start();
  mediaRecorder.onstop=() =>{
    var bl =new Blob(chunk,{type:chunk[0].type})
    console.log(bl);
    screenRecording.current.src=URL.createObjectURL(bl); 
    }

}
  const media=(stream)=>{
    recorder=new MediaRecorder(stream)
    console.log(recorder)
    let chunks=[];
    recorder.ondataavailable=e=>chunks.push(e.data);
    recorder.start();
    recorder.onstop=() =>{
      var blob =new Blob(chunks,{type:"vidio/webm"})
      console.log(blob);
      recording.current.src=URL.createObjectURL(blob);
       
      
     
   
    }

  }
  const login =()=>{
    alert("Note:If you did not share the entire screen you are directly disqualified.And not be proceded further")
    getMedia();
    getShare();
    goNextPage();
    setVisible(0)
  }
  function goPageFirst(){
    setSet(1)
  
}
const ristricted=()=>{
  video.current.srcObject.getTracks().forEach(track=>track.stop());
  recorder=recorder.state==='recording' && recorder.stop();
  goPageFirst();

}
  const stopVideo=()=>{
    answer();
    video.current.srcObject.getTracks().forEach(track=>track.stop());
    share.current.srcObject.getTracks().forEach(track=>track.stop());
    
    recorder=recorder.state==='recording' && recorder.stop();
    mediaRecorder =mediaRecorder.state==='recording' &&  mediaRecorder.stop();
   
    goPageFirst();


      
  }

  function goNextPage(){
    setSet((set)=>set +1)
}
const  visi=()=>{
  document.addEventListener('visibilitychange',function(){
    if(document.visibilityState==="hidden"){
      setVisible(visible+1)
    }
    else{
      return 0

    }

  })
}
const copyp =()=>{
  setCopy(copy+1)
}
  return (
    <div className="App">
      {set===1 && <Login
      nam={nam}
      data={login}
     
      recording={recording}
      screenRecording={screenRecording}
      />}
     {set===2 &&<Page
     visi={visi}
     copy={copyp}
     ans={data}
     stop={stopVideo}
      video={video}
      share={share}
    />}
 
    </div>
  );
}

export default App;
