import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";

const socket = io("https://projukti-sheba-server.onrender.com/");

const MessagesSection = () => {
  const [userChats, setUserChats] = useState({});
  const [selectedUserId, setSelectedUserId] = useState("");
  const [replyText, setReplyText] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});

  useEffect(() => {
    // Join admin room
    socket.emit("joinAdmin");

    // Listen for all user chats
    socket.on("allUserChats", (chats) => {
      setUserChats(chats);
      
      // Calculate unread counts
      const counts = {};
      Object.entries(chats).forEach(([userId, chatData]) => {
        counts[userId] = chatData.messages.filter(msg => 
          msg.senderType === "user" && !msg.readByAdmin
        ).length;
      });
      setUnreadCounts(counts);
    });

    // Listen for new user messages
    socket.on("newUserMessage", (data) => {
      const { userId, message } = data;
      
      setUserChats(prev => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          messages: [...(prev[userId]?.messages || []), message],
          lastActivity: new Date()
        }
      }));

      // Update unread count
      if (message.senderType === "user") {
        setUnreadCounts(prev => ({
          ...prev,
          [userId]: (prev[userId] || 0) + 1
        }));
      }
    });

    return () => {
      socket.off("allUserChats");
      socket.off("newUserMessage");
    };
  }, []);

  const sendAdminReply = () => {
    if (!replyText.trim() || !selectedUserId) return;

    const messageData = {
      text: replyText,
      userId: selectedUserId,
      senderType: "admin",
      timestamp: new Date(),
    };

    socket.emit("sendAdminMessage", messageData);
    setReplyText("");
    
    // Mark messages as read
    setUnreadCounts(prev => ({ ...prev, [selectedUserId]: 0 }));
  };

  const selectUser = (userId) => {
    setSelectedUserId(userId);
    // Mark messages as read when selecting user
    if (unreadCounts[userId] > 0) {
      socket.emit("markMessagesAsRead", userId);
      setUnreadCounts(prev => ({ ...prev, [userId]: 0 }));
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const userChatArray = Object.entries(userChats).sort(
    ([, a], [, b]) => new Date(b.lastActivity) - new Date(a.lastActivity)
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Messages & Support</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* User List */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden"
        >
          <div className="bg-purple-700/20 px-4 py-3 border-b border-gray-700/50">
            <h3 className="font-semibold">Active Chats</h3>
            <p className="text-sm text-gray-400">{userChatArray.length} conversations</p>
          </div>

          <div className="overflow-y-auto h-full">
            {userChatArray.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <div className="text-3xl mb-3">💬</div>
                <p>No customer messages yet</p>
              </div>
            ) : (
              userChatArray.map(([userId, chatData]) => (
                <div
                  key={userId}
                  onClick={() => selectUser(userId)}
                  className={`p-4 border-b border-gray-700/30 cursor-pointer hover:bg-gray-800/50 transition-colors ${
                    selectedUserId === userId ? "bg-purple-700/20" : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{chatData.userName}</h4>
                      <p className="text-xs text-gray-400">ID: {userId.slice(-8)}</p>
                    </div>
                    {unreadCounts[userId] > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {unreadCounts[userId]}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-sm text-gray-300 mb-1">
                    {chatData.messages.length > 0 
                      ? chatData.messages[chatData.messages.length - 1].text.substring(0, 50) + "..."
                      : "No messages"
                    }
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {formatTime(chatData.lastActivity)}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Chat Messages */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="lg:col-span-2 bg-gray-900/40 backdrop-blur-xl rounded-2xl border border-gray-700/50 overflow-hidden flex flex-col"
        >
          {selectedUserId ? (
            <>
              {/* Chat Header */}
              <div className="bg-purple-700/20 px-4 py-3 border-b border-gray-700/50">
                <h3 className="font-semibold">{userChats[selectedUserId]?.userName}</h3>
                <p className="text-sm text-gray-400">Support Conversation</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {userChats[selectedUserId]?.messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.senderType === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        msg.senderType === "admin"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-700 text-white"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs opacity-75">
                          {msg.senderType === "admin" ? "You (Support)" : userChats[selectedUserId]?.userName}
                        </span>
                        <span className="text-xs opacity-50">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              <div className="border-t border-gray-700/50 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendAdminReply()}
                    className="flex-1 bg-gray-800 text-white p-3 rounded-lg outline-none placeholder-gray-400"
                    placeholder="Type your reply..."
                  />
                  <button
                    onClick={sendAdminReply}
                    disabled={!replyText.trim()}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-4">💬</div>
                <p className="text-lg font-medium mb-2">Select a conversation</p>
                <p className="text-sm">Choose a user from the left to view messages</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MessagesSection;