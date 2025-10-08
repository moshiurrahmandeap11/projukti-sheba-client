import { CircleX, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

const socket = io("https://projukti-sheba-server.onrender.com/"); 

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
      senderType: "user", 
      timestamp: new Date(),
    };

    socket.emit("sendUserMessage", messageData);
    setText("");
  };

  // Animation variants for the chat window
  const chatVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen ? (
<motion.button
  className="bg-red-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
  onClick={() => setIsOpen(true)}
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
>
  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
</motion.button>

      ) : (
        <AnimatePresence>
          <motion.div
            className="w-[90vw] max-w-[360px] sm:w-96 h-[70vh] max-h-[500px] sm:h-[450px] bg-gray-900 text-white rounded-2xl shadow-2xl flex flex-col"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="flex justify-between items-center bg-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-t-2xl">
              <div>
                <h3 className="text-base sm:text-lg font-bold">Live Chat</h3>
                <p className="text-xs sm:text-sm opacity-75">{userName}</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-red-300 transition-colors text-sm sm:text-base"
              >
                <CircleX></CircleX>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-6 sm:mt-8">
                  <div className="text-xl sm:text-2xl mb-2">👋</div>
                  <p className="text-xs sm:text-sm">Start a conversation with our support team!</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    className={`p-2 sm:p-3 rounded-lg max-w-[80%] sm:max-w-[85%] ${
                      msg.senderType === "user"
                        ? "bg-red-500 ml-auto"
                        : "bg-gray-700 mr-auto"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-xs sm:text-sm">{msg.text}</p>
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
                  </motion.div>
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
                className="flex-1 bg-gray-800 text-white p-2 sm:p-3 text-xs sm:text-sm rounded-bl-2xl outline-none placeholder-gray-400"
                placeholder="Type your message..."
              />
              <motion.button
                onClick={sendMessage}
                disabled={!text.trim()}
                className="bg-red-600 px-3 sm:px-4 text-xs sm:text-sm rounded-br-2xl hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default Chat;