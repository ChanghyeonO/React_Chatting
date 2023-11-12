import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>채팅방 접속하기</h3>
          <input
            type="text"
            placeholder="닉네임을 입력하세요."
            onChange={event => {
              setUsername(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="방이름을 입력하세요."
            onChange={event => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>접속하기</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
