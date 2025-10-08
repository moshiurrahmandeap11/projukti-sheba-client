import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { io } from "socket.io-client";
import { FileText } from "lucide-react";
import jsPDF from "jspdf";

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
        counts[userId] = chatData.messages.filter(
          (msg) => msg.senderType === "user" && !msg.readByAdmin
        ).length;
      });
      setUnreadCounts(counts);
    });

    // Listen for new user messages
    socket.on("newUserMessage", (data) => {
      const { userId, message } = data;

      setUserChats((prev) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          messages: [...(prev[userId]?.messages || []), message],
          lastActivity: new Date(),
        },
      }));

      // Update unread count
      if (message.senderType === "user") {
        setUnreadCounts((prev) => ({
          ...prev,
          [userId]: (prev[userId] || 0) + 1,
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
    setUnreadCounts((prev) => ({ ...prev, [selectedUserId]: 0 }));
  };

  const selectUser = (userId) => {
    setSelectedUserId(userId);
    // Mark messages as read when selecting user
    if (unreadCounts[userId] > 0) {
      socket.emit("markMessagesAsRead", userId);
      setUnreadCounts((prev) => ({ ...prev, [userId]: 0 }));
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Support Messages", 14, 20);

    let yPosition = 30;

    // Sort users by last activity
    const userChatArray = Object.entries(userChats).sort(
      ([, a], [, b]) => new Date(b.lastActivity) - new Date(a.lastActivity)
    );

    userChatArray.forEach(([userId, chatData], index) => {
      // Add user name as header
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(181, 0, 13); // #B5000D
      doc.text(`${chatData.userName || "Unknown"} (ID: ${userId.slice(-8)})`, 14, yPosition);
      yPosition += 8;

      // Add messages
      chatData.messages.forEach((msg) => {
        // Label (User Message or Admin Reply)
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        const label = msg.senderType === "admin" ? "Admin Reply" : "User Message";
        doc.text(`${label}:`, 14, yPosition);
        yPosition += 6;

        // Message text (with wrapping)
        doc.setFont("helvetica", "normal");
        const splitText = doc.splitTextToSize(msg.text, 180); // Wrap text to fit page width
        doc.text(splitText, 14, yPosition);
        yPosition += splitText.length * 6 + 2;

        // Timestamp and read status
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(
          `Sent: ${formatTime(msg.timestamp)} | Read: ${msg.readByAdmin ? "Yes" : "No"}`,
          14,
          yPosition
        );
        yPosition += 8;

        // Add extra spacing between messages
        yPosition += 2;

        // Check for page overflow
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      });

      // Add separator line between users
      if (index < userChatArray.length - 1) {
        doc.setDrawColor(181, 0, 13); // #B5000D
        doc.line(14, yPosition, 196, yPosition);
        yPosition += 10;

        // Check for page overflow after separator
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 20;
        }
      }
    });

    if (userChatArray.length === 0) {
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text("No messages available", 14, yPosition);
    }

    const fileName = `support_messages_${new Date().toISOString().slice(0, 10)}.pdf`;
    doc.save(fileName);
  };

  const userChatArray = Object.entries(userChats).sort(
    ([, a], [, b]) => new Date(b.lastActivity) - new Date(a.lastActivity)
  );

  return (
    <motion.div
      className="min-h-screen bg-transparent backdrop-blur-3xl p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-black mb-2">
                Messages & Support
              </h1>
              <p className="text-gray-600">
                Manage and respond to customer messages
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={exportToPDF}
                className="flex items-center space-x-2 px-4 py-2 bg-[#B5000D] hover:bg-[#B5000D]/80 text-white font-medium cursor-pointer rounded-lg transition-colors duration-200"
              >
                <FileText className="w-4 h-4" />
                <span>Export to PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* User List */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
          >
            <div className="bg-white/10 px-4 py-3 border-b border-white/10">
              <h3 className="font-semibold text-black">Active Chats</h3>
              <p className="text-sm text-gray-600">
                {userChatArray.length} conversations
              </p>
            </div>

            <div className="overflow-y-auto h-full">
              {userChatArray.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  <div className="text-3xl mb-3">💬</div>
                  <p>No customer messages yet</p>
                </div>
              ) : (
                userChatArray.map(([userId, chatData]) => (
                  <div
                    key={userId}
                    onClick={() => selectUser(userId)}
                    className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/10 transition-colors ${
                      selectedUserId === userId ? "bg-[#B5000D]/20" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-black">
                          {chatData.userName || "Unknown"}
                        </h4>
                        <p className="text-xs text-gray-600">
                          ID: {userId.slice(-8)}
                        </p>
                      </div>
                      {unreadCounts[userId] > 0 && (
                        <span className="bg-red-500 text-black text-xs px-2 py-1 rounded-full">
                          {unreadCounts[userId]}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      {chatData.messages.length > 0
                        ? chatData.messages[
                            chatData.messages.length - 1
                          ].text.substring(0, 50) + "..."
                        : "No messages"}
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
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden flex flex-col"
          >
            {selectedUserId ? (
              <>
                {/* Chat Header */}
                <div className="bg-white/10 px-4 py-3 border-b border-white/10">
                  <h3 className="font-semibold text-black">
                    {userChats[selectedUserId]?.userName || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-600">Support Conversation</p>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto bg-[#f3f4f8]/40 shadow-xl rounded-lg p-4 space-y-3">
                  {userChats[selectedUserId]?.messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.senderType === "admin"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          msg.senderType === "admin"
                            ? "bg-[#B5000D] text-white"
                            : "bg-gray-700 text-white"
                        }`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-xs opacity-75">
                            {msg.senderType === "admin"
                              ? "You (Support)"
                              : userChats[selectedUserId]?.userName || "User"}
                          </span>
                          <span className="text-xs opacity-50">
                            {formatTime(msg.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="border-t border-white/10 p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendAdminReply()}
                      className="flex-1 bg-white/5 backdrop-blur-sm text-black p-3 rounded-lg outline-none border border-white/10 placeholder-gray-400 focus:ring-2 focus:ring-[#B5000D]/40 focus:border-[#B5000D]/40"
                      placeholder="Type your reply..."
                    />
                    <button
                      onClick={sendAdminReply}
                      disabled={!replyText.trim()}
                      className="bg-[#B5000D] hover:bg-[#B5000D]/80 font-medium disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg transition-colors"
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
                  <p className="text-lg font-medium mb-2">
                    Select a conversation
                  </p>
                  <p className="text-sm">
                    Choose a user from the left to view messages
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MessagesSection;