import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from 'react-bootstrap';

const styles = {
  bg: {
    backgroundColor: "white"
  }
}


const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const scrollToBottom = () => {
    messageList.scrollTop = messageList.scrollHeight
  }
  console.log(scrollToBottom)

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        timeShown:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes() +
          ":" +
          new Date(Date.now()).getSeconds() +
          ":" +
          new Date(Date.now()).getMilliseconds(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window py-3 px-3">

      <h5 className="text-muted">Say hello...</h5>

      <p>you're in room {room}</p>

      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent) => {
              return (
                <div
                  key={messageContent.time}
                  className="message"
                  id={username === messageContent.author ? "you" : "other"}
                >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-data">
                    <p id="time">{messageContent.timeShown}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
              );
          }, scrollToBottom())}
        </div>
      </div>

      <div className="chat-footer">

        <input
          type="text"
          value={currentMessage}
          placeholder="Type your message"
          className="form-control"
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />

        <Button variant="dark" className="my-1" onClick={sendMessage}>➢</Button>

      </div>
    </div>
  );
}


export default Chat;