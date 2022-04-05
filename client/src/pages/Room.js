import React, { useState } from "react";
import io from "socket.io-client";
import Navigation from "../components/Nav";
import Chat from "./Chat";
import { Container, Row, Col, Button } from 'react-bootstrap';

// server for backend
const socket = io.connect('http://localhost:3001');

const styles = {
    border: {
        border: "2px solid black",
        borderRadius: "25px"
    }
}

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
        
            <Navigation/>

            <Container>
                <Row className="justify-content-center">
                    <Col lg="8">

                        {!showChat ? (
                            <div style={styles.border} className="mx-5 my-5 px-5 py-5">
                                <h3>Join Chatroom</h3>
                                <input
                                    className="form-control my-3"
                                    type="text"
                                    placeholder="Username"
                                    onChange={(event) => {
                                        setUsername(event.target.value);
                                    }}
                                />
                                <input
                                    className="form-control mb-3"
                                    type="text"
                                    placeholder="Room ID #"
                                    onChange={(event) => {
                                        setRoom(event.target.value);
                                    }}
                                />
                                <Button variant="dark" onClick={joinRoom} className="my-2">Enter</Button>
                            </div>

                        ) : (

                            <Chat socket={socket} username={username} room={room}/>
                        )}

                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Room;