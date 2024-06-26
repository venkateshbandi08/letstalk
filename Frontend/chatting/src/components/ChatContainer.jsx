import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("current-user");
      if (storedData) {
        const data = JSON.parse(storedData);
        if (data && currentChat) {
          const response = await axios.post(
            recieveMessageRoute,
            {
              from: data._id,
              to: currentChat._id,
            },
            {
              headers: {
                authorization: localStorage.getItem("jwt-token"),
              },
            }
          );
          setMessages(response.data);
          console.log(response.data);
        }
      }
    };

    fetchData();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      const storedData = localStorage.getItem("current-user");
      if (storedData && currentChat) {
        await JSON.parse(storedData)._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const storedData = localStorage.getItem("current-user");
    if (storedData) {
      const data = await JSON.parse(storedData);
      if (data && currentChat) {
        const msgTime = new Date().toLocaleString();
        if (socket && socket.current) {
          socket.current.emit("send-msg", {
            to: currentChat._id,
            from: data._id,
            msg,
            msgTime,
          });
        }

        await axios.post(
          sendMessageRoute,
          {
            from: data._id,
            to: currentChat._id,
            message: msg,
            msgTime,
          },
          {
            headers: {
              authorization: localStorage.getItem("jwt-token"),
            },
          }
        );

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg, msgTime });
        setMessages(msgs);
      }
    }
  };

  useEffect(() => {
    if (socket && socket.current) {
      const handleMessageReceive = (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg.msg,
          msgTime: msg.msgTime,
        });
      };

      const socketInstance = socket.current;
      socketInstance.on("msg-recieve", handleMessageReceive);

      return () => {
        socketInstance.off("msg-recieve", handleMessageReceive);
      };
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentChat) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p style={{ marginBottom: "5px" }}>{message.message}</p>
                  <small
                    style={{
                      color: "black",
                      textAlign: "right",
                      marginTop: "5px",
                    }}
                  >
                    {message.msgTime}
                  </small>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #ffffff;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
        small {
          display: block;
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: #aaa;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #0fa65b;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #04699c;
      }
    }
  }
`;
