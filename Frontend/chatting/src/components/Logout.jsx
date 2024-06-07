import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";

export default function Logout() {
  const navigate = useNavigate();

  const handleClick = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      const storedData = localStorage.getItem("current-user");
      if (storedData) {
        const id = JSON.parse(storedData)._id;
        try {
          const response = await axios.get(`${logoutRoute}/${id}`, {
            headers: {
              authorization: localStorage.getItem("jwt-token"),
            },
          });
          if (response.status === 200) {
            localStorage.clear();
            navigate("/login");
          }
        } catch (error) {
          console.error("Error logging out:", error);
        }
      }
    }
  };

  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #04699c;
  border: none;
  cursor: pointer;
  position: relative;

  &::after {
    content: "Logout";
    display: none;
    position: absolute;
    bottom: -1.5rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    color: #04699c;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
  }

  svg {
    font-size: 1.3rem;
    color: #ebe7ff;
  }

  &:hover::after {
    display: block;
  }
`;
