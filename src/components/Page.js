import React from 'react'
import './Page.css'

function Page(props) {
  

 
  
 {props.visi()}
 
 
  

  return (<>
    <div id='container'>
        <div className='left'><div className='inner mx font' >
                    
                    <p align="left">#1: Describe the OSI Reference Model </p>
                    <p align="left">#2: What is meant by ACID properties in DBMS?</p>
                    <p align="left">#3: Explain demand paging?</p>
                    <p align="left">#4: What is JSP?</p>
                    <p align="left">#5: What is the time complexity of recursion?</p></div>
                      
                         </div>
        <div className='right'><div className='inner mx' >
            <textarea className='margin' onChange={props.ans} onPaste={(e)=>{
              e.preventDefault()
              {props.copy()}
              alert('You are not allowed to paste during the exam');
              return false;
            }}
            wrap="Virtual"
            ></textarea>   
            </div>
        
            <button onClick={props.stop}  >SUBMIT</button>
            <video ref={props.video} muted autoPlay width='0%' height='0%'></video>


 <video

autoPlay
muted
ref={props.share}
width="0%"
height='0%'

></video>

            </div>
        </div>
       
        </>
  )
}

export default Page