import React, { useState } from "react"
//import Nav from "../components/Nav"
import io from "socket.io-client"
import Nav from "../components/Nav"
import Chat from "./Chat"


const socket = io.connect(`${window.location.origin}`) // server for backend


const Room = () => {
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
        <>
        <Nav/>
        <div className="Room">
            {!showChat ? (
                <div className="joinChat">
                    <h3>Join Chatroom</h3>
                    <input
                        className="form-control joinChatExtra"
                        id="exampleFormControlInput1"
                        type="text"
                        placeholder="Username Here"
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        className="form-control joinChatExtra"
                        id="exampleFormControlInput1"
                        type="text"
                        placeholder="Room ID #"
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}
                    />
                    <button className="joinChatExtra btn" onClick={joinRoom}>Join Room</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room}/>
            )}
        </div>
        </>
    );
}

export default Room