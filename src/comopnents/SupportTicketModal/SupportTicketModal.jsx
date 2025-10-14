import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  X,
  CheckCircle,
  Paperclip,
  File,
  Image,
  Link,
} from "lucide-react";
import Swal from "sweetalert2";
import FancyButton from "../sharedItems/FancyButtons/FancyButton";
import axiosInstance from "../../hooks/AxiosInstance/AxiosInstance";

const SupportTicketModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  // Refs for debouncing and tracking
  const saveTimeoutRef = useRef(null);
  const formDataRef = useRef({ phone: "", subject: "", problem: "", attachment: null });
  const hasDataRef = useRef(false);
  const isFormSubmittedRef = useRef(false);
  const fileInputRef = useRef(null);

  const [ticketForm, setTicketForm] = useState({ 
    phone: "", 
    subject: "", 
    problem: "",
    attachment: null,
    attachmentUrl: "",
    attachmentName: "",
    attachmentType: ""
  });

  // Copy support link function
  const copySupportLink = async () => {
    const supportLink = "https://projuktisheba.com/support-link";
    try {
      await navigator.clipboard.writeText(supportLink);
      Swal.fire({
        icon: "success",
        title: "Link Copied!",
        text: "Support link has been copied to clipboard",
        confirmButtonColor: "#4F46E5",
        timer: 2000,
        showConfirmButton: false
      });
    } catch (err) {
      console.error("Failed to copy link: ", err);
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = supportLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      
      Swal.fire({
        icon: "success",
        title: "Link Copied!",
        text: "Support link has been copied to clipboard",
        confirmButtonColor: "#4F46E5",
        timer: 2000,
        showConfirmButton: false
      });
    }
  };

  // Draft save function
  const saveToDraft = useCallback(async (data) => {
    if (isFormSubmittedRef.current) {
      return;
    }

    const hasValidData = Object.values(data).some(
      (value) => value && typeof value === 'string' && value.trim() !== ""
    );
    if (!hasValidData && !data.attachment) {
      hasDataRef.current = false;
      return;
    }

    hasDataRef.current = true;
    setIsSaving(true);

    try {
      // Create form data for draft with file
      const draftFormData = new FormData();
      draftFormData.append("phone", data.phone || "");
      draftFormData.append("subject", data.subject || "");
      draftFormData.append("problem", data.problem || "");
      
      if (data.attachment) {
        draftFormData.append("attachment", data.attachment);
      }

      await axiosInstance.post("/support/draft", draftFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Support draft saved successfully");
    } catch (error) {
      console.error("Error saving support draft:", error);
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Debounced auto-save effect
  useEffect(() => {
    formDataRef.current = ticketForm;

    if (isSubmitting || isFormSubmittedRef.current) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveToDraft(ticketForm);
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [ticketForm, saveToDraft, isSubmitting]);

  const handleInputChange = (field, value) => {
    if (isFormSubmittedRef.current) return;
    
    setTicketForm((prev) => ({ 
      ...prev, 
      [field]: value 
    }));
  };

  // File upload handler
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // File validation
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/zip',
      'application/x-rar-compressed'
    ];

    if (file.size > maxSize) {
      Swal.fire({
        icon: "error",
        title: "File Too Large",
        text: "Please select a file smaller than 10MB",
        confirmButtonColor: "#DC2626",
      });
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid File Type",
        text: "Please select an image, PDF, document, or text file",
        confirmButtonColor: "#DC2626",
      });
      return;
    }

    setTicketForm((prev) => ({
      ...prev,
      attachment: file,
      attachmentName: file.name,
      attachmentType: file.type,
      attachmentUrl: URL.createObjectURL(file)
    }));
  };

  // Remove attachment
  const removeAttachment = () => {
    if (ticketForm.attachmentUrl) {
      URL.revokeObjectURL(ticketForm.attachmentUrl);
    }
    setTicketForm((prev) => ({
      ...prev,
      attachment: null,
      attachmentName: "",
      attachmentType: "",
      attachmentUrl: ""
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.startsWith('image/')) {
      return <Image size={20} className="text-blue-500" />;
    } else if (fileType === 'application/pdf') {
      return <File size={20} className="text-red-500" />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <File size={20} className="text-blue-600" />;
    } else {
      return <File size={20} className="text-gray-500" />;
    }
  };

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!ticketForm.phone || !ticketForm.subject || !ticketForm.problem) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields",
        confirmButtonColor: "#4F46E5",
      });
      return;
    }

    console.log("📤 Submitting ticket with data:", {
      phone: ticketForm.phone,
      subject: ticketForm.subject,
      problem: ticketForm.problem,
      hasAttachment: !!ticketForm.attachment
    });

    setIsSubmitting(true);
    setIsUploading(true);
    setUploadProgress(0);
    isFormSubmittedRef.current = true;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    try {
      // Create FormData properly
      const formData = new FormData();
      
      // IMPORTANT: Append fields as strings
      formData.append("phone", ticketForm.phone.toString());
      formData.append("subject", ticketForm.subject.toString());
      formData.append("problem", ticketForm.problem.toString());
      formData.append("status", "pending");
      
      // Append file if exists
      if (ticketForm.attachment) {
        formData.append("attachment", ticketForm.attachment);
        console.log("📎 Attaching file:", ticketForm.attachment.name);
      }

      // Debug: Log FormData contents
      console.log("📋 FormData contents:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }

      const res = await axiosInstance.post("/support", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
          console.log("📊 Upload progress:", progress + "%");
        },
      });

      console.log("✅ Server response:", res.data);

      if (res.data?.success && res.data?.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Ticket Created",
          html: `
            <p><b>Your ticket created successfully</b></p>
            <p>Ticket ID: ${res.data.data.insertedId}</p>
            <p>An admin will contact you within 10 minutes.</p>
            ${ticketForm.attachment ? `<p class="mt-2">Attachment uploaded successfully.</p>` : ''}
          `,
          confirmButtonText: "Okay",
          confirmButtonColor: "#4F46E5",
        });
        
        setIsSubmitted(true);
        hasDataRef.current = false;

        setTimeout(() => {
          setIsSubmitted(false);
          isFormSubmittedRef.current = false;
          resetForm();
          setUploadProgress(0);
        }, 3000);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (error) {
      console.error("❌ Error submitting ticket:", error);
      console.error("Error details:", error.response?.data);
      
      Swal.fire({
        icon: "error",
        title: "Submission Failed!",
        text: error.response?.data?.message || "Failed to submit ticket! Please try again.",
        confirmButtonColor: "#DC2626",
      });
      isFormSubmittedRef.current = false;
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const resetForm = () => {
    if (ticketForm.attachmentUrl) {
      URL.revokeObjectURL(ticketForm.attachmentUrl);
    }
    setTicketForm({ 
      phone: "", 
      subject: "", 
      problem: "", 
      attachment: null, 
      attachmentUrl: "", 
      attachmentName: "", 
      attachmentType: "" 
    });
    onClose();
    isFormSubmittedRef.current = false;
    setUploadProgress(0);
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      resetForm();
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 space-y-4">
          {/* Auto-save indicator */}
          {isSaving && !isFormSubmittedRef.current && (
            <div className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center space-x-2 text-sm mb-2">
              <div className="animate-spin rounded-full h-3 w-3 border border-white border-t-transparent"></div>
              <span>Saving draft...</span>
            </div>
          )}

          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-900">Support Ticket</h3>
            <button 
              onClick={resetForm} 
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                Your support ticket has been submitted successfully. We'll get back to you soon!
              </p>
            </div>
          ) : (
            <form onSubmit={handleTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={ticketForm.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                  disabled={isFormSubmittedRef.current}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={ticketForm.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="Enter subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                  disabled={isFormSubmittedRef.current}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Problem Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={ticketForm.problem}
                  onChange={(e) => handleInputChange("problem", e.target.value)}
                  placeholder="Describe your problem in detail..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  required
                  disabled={isFormSubmittedRef.current}
                />
              </div>

              {/* Attachment Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachment (Optional)
                </label>
                
                {/* File Input */}
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.txt,.zip,.rar"
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Paperclip size={16} />
                    <span>Choose File</span>
                  </button>
                  <span className="text-sm text-gray-500">
                    Max 10MB (Images, PDF, Docs, Text)
                  </span>
                </div>

                {/* File Preview */}
                {ticketForm.attachmentName && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(ticketForm.attachmentType)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {ticketForm.attachmentName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {ticketForm.attachmentType}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeAttachment}
                      disabled={isSubmitting}
                      className="text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Image Preview */}
                {ticketForm.attachmentUrl && ticketForm.attachmentType.startsWith('image/') && (
                  <div className="mt-2">
                    <img
                      src={ticketForm.attachmentUrl}
                      alt="Attachment preview"
                      className="max-w-full h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}

                {/* Upload Progress */}
                {isUploading && uploadProgress > 0 && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-2 sm:space-y-0">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors font-medium disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <FancyButton
                  type="submit"
                  disabled={isSubmitting || isFormSubmittedRef.current}
                  className="flex-1 px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>
                        {isUploading ? 'Uploading...' : 'Submitting...'}
                      </span>
                    </div>
                  ) : (
                    "Submit Ticket"
                  )}
                </FancyButton>
              </div>

              {/* Copy Support Link Button - Added at the bottom */}
              <div className="pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={copySupportLink}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  <Link size={18} />
                  <span>Copy Support Link</span>
                </button>
                <p className="text-xs text-gray-500 text-center mt-2">
                  Share this link with others who need support
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportTicketModal;