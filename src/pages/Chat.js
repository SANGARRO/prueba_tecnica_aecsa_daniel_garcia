// src/pages/Chat.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, user: "me" }];
    setMessages(newMessages);
    setInput("");

    // Simulación de respuesta de una API de IA
    setTimeout(() => {
      const response = {
        text: `Respuesta automática: Hemos recibido tu mensaje "${input}". ¿En qué más puedo ayudarte?`,
        user: "bot",
      };
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  return (
    <div>
      <Navbar />
      <div className="d-flex flex-column align-items-center mt-5">
        <h2>Chat con Soporte Financiero</h2>
        <div
          className="border border-secondary rounded p-3 mb-3"
          style={{ width: "400px", height: "400px", overflowY: "scroll" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 mb-2 ${
                msg.user === "me" ? "text-end" : "text-start"
              }`}
            >
              <strong>{msg.user === "me" ? "Tú" : "Soporte"}:</strong>{" "}
              {msg.text}
            </div>
          ))}
        </div>
        <div className="input-group" style={{ width: "400px" }}>
          <input
            type="text"
            className="form-control"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
