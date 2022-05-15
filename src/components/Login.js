import React from 'react'
import './Page.css'

function Login(props) {
  return (
    <>
    <p align="center"><b>ONLINE PROCTOR EXAM</b></p>
    <div className='color'>
      <div>
        
    <label  htmlFor="name" >Enter Credentials : </label>
    <input className='text' type='text' placeholder='username/email' id='name' onChange={props.nam}></input>
    </div>
    <button className='button' onClick={props.data} >Next</button>


<video

autoPlay
muted
ref={props.recording}
width="0%"
height='0%'

></video>

<video

autoPlay
muted
ref={props.screenRecording}
width="0%"
height='0%'

></video>
</div>
    </>
  )
}

export default Login