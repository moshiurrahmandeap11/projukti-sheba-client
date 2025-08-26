import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // backend socket server

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    socket.emit("joinChat");

    socket.on("chatHistory", (history) => {
      setMessages(history);
    });

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("chatHistory");
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (text.trim() === "") return;

    socket.emit("sendMessage", {
      text,
      sender: "guest-user", // later replace with auth user
    });

    setText("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen ? (
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          💬 Chat
        </button>
      ) : (
        <div className="w-80 h-96 bg-gray-900 text-white rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-purple-700 px-3 py-2 rounded-t-2xl">
            <h3 className="font-bold">Live Chat</h3>
            <button onClick={() => setIsOpen(false)}>❌</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.messageId}
                className={`p-2 rounded-lg ${
                  msg.sender === "guest-user"
                    ? "bg-purple-600 self-end text-right"
                    : "bg-gray-700 self-start text-left"
                }`}
              >
                <p className="text-sm">
                  <span className="font-bold">{msg.sender}: </span>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-700">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-gray-800 text-white p-2 rounded-bl-2xl outline-none"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-purple-600 px-4 rounded-br-2xl"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
