import { useState } from "react";
import io from "socket.io-client"
import './App.css'; 
import Chat from "./Chat";


const socket = io.connect("http://localhost:3001")
function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("") 
  const [showChat, setShowChat] = useState(false)

  const joinRoom =()=> {
    if(username !== "" && room !== ""){
      socket.emit("join_room", room)
      setShowChat(true)

    }
  }
  return (
    <div className="App">
      {!showChat ?
      <div className="joinChatContainer">
      <h3>Join a chat</h3>
     
     <input 
     type="text" 
     onChange={(event)=> {setUsername(event.target.value)}}
     placeholder="name"
     />

     <input 
     type="text" 
     onChange={(event)=> {setRoom(event.target.value)}}
     placeholder="room id"
     />
    <button onClick={joinRoom}>Join room</button>
    </div>
    :
    <Chat 
    socket={socket}
    username={username}
    room={room}
    />}
    </div>
  );
}

export default App;
