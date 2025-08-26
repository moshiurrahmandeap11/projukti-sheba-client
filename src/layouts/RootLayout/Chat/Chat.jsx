import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://projukti-sheba-server.onrender.com/"); // backend socket server

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Generate unique user ID if not exists
    let storedUserId = localStorage.getItem("chatUserId");
    let storedUserName = localStorage.getItem("chatUserName");
    
    if (!storedUserId) {
      storedUserId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("chatUserId", storedUserId);
    }
    
    if (!storedUserName) {
      storedUserName = `Guest_${Math.random().toString(36).substr(2, 4)}`;
      localStorage.setItem("chatUserName", storedUserName);
    }
    
    setUserId(storedUserId);
    setUserName(storedUserName);

    // Join user's personal chat room
    socket.emit("joinUserChat", { userId: storedUserId, userName: storedUserName });

    // Listen for chat history
    socket.on("userChatHistory", (history) => {
      setMessages(history);
    });

    // Listen for new messages
    socket.on("receiveUserMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("userChatHistory");
      socket.off("receiveUserMessage");
    };
  }, []);

  const sendMessage = () => {
    if (text.trim() === "") return;

    const messageData = {
      text,
      userId,
      userName,
      senderType: "user", // user or admin
      timestamp: new Date(),
    };

    socket.emit("sendUserMessage", messageData);
    setText("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      {!isOpen ? (
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors"
          onClick={() => setIsOpen(true)}
        >
          💬 Chat Support
        </button>
      ) : (
        <div className="w-80 h-96 bg-gray-900 text-white rounded-2xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-purple-700 px-3 py-2 rounded-t-2xl">
            <div>
              <h3 className="font-bold">Support Chat</h3>
              <p className="text-xs opacity-75">{userName}</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-red-300 transition-colors"
            >
              ❌
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <div className="text-2xl mb-2">👋</div>
                <p className="text-sm">Start a conversation with our support team!</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg max-w-[85%] ${
                    msg.senderType === "user"
                      ? "bg-purple-600 ml-auto"
                      : "bg-gray-700 mr-auto"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs opacity-75">
                      {msg.senderType === "admin" ? "Support" : "You"}
                    </span>
                    <span className="text-xs opacity-50">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-700">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 bg-gray-800 text-white p-2 rounded-bl-2xl outline-none placeholder-gray-400"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={!text.trim()}
              className="bg-purple-600 px-4 rounded-br-2xl hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
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