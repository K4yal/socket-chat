import React, { useEffect, useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom";
export default function Chat({socket, username, room}) {
     const [currentMessage, setCurrentMessage] = useState("") 
     const [messageList, setMessageList]= useState([])
     const sendMessage = async ()=>  {
        if(currentMessage !==""){
            const messageData={
                room: room, 
                author:username, 
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit("send_message",messageData)
            setMessageList((list) => [...list, messageData])
        }
     }
     
     useEffect(()=>{
        socket.off('receive_message').on("receive_message", (data) => {
            console.log(data.message)
          setMessageList((list) => [...list, data]);
          
        });},[messageList]
     )
 
     
    return(
        <div className="chat-window ">
            <div className="chat-header">
                <p>Live chat</p>
            </div>    
            <div className="chat-body">
            <ScrollToBottom className="message-container">
                {messageList.map((message)=>{
                return (
                <div className="message"
                id={username === message.author ? "you" : "other"}>
                    
                    <div className="message-content">
                            
                            {message.message}
                    </div>
                    <div className="message-meta"
                    >
                        <p id="auth">{message.author} @</p>
                        <p id="time">{message.time}</p>
                    </div>
                </div>
                )
                })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type = "text" 
                placeholder="type message..."
                onChange={(event)=>setCurrentMessage(event.target.value)}
                onKeyPress={(event) => {
                    event.key === "Enter" && sendMessage();
                  }}/>
                <button onClick={()=>sendMessage()}>&#9658;</button>
            </div>
        </div>
    )
}