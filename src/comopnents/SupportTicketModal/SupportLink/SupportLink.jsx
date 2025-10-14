import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  CheckCircle,
  Paperclip,
  File,
  Image,
  X,
} from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../../../hooks/AxiosInstance/AxiosInstance";
import FancyButton from "../../sharedItems/FancyButtons/FancyButton";

const SupportLink = () => {
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

    // console.log("📤 Submitting ticket with data:", {
    //   phone: ticketForm.phone,
    //   subject: ticketForm.subject,
    //   problem: ticketForm.problem,
    //   hasAttachment: !!ticketForm.attachment
    // });

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
      }

      // Debug: Log FormData contents
      // console.log("📋 FormData contents:");
      // for (let pair of formData.entries()) {
      //   console.log(pair[0] + ':', pair[1]);
      // }

      const res = await axiosInstance.post("/support", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
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
    isFormSubmittedRef.current = false;
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl  overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10">
            {/* Auto-save indicator */}
            {isSaving && !isFormSubmittedRef.current && (
              <div className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 text-sm mb-4">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Saving draft...</span>
              </div>
            )}

            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                Support Ticket
              </h1>
              <p className="mt-2 text-gray-600">
                Submit your issue and our team will get back to you shortly
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-12 lg:py-16">
                <CheckCircle className="w-20 h-20 lg:w-24 lg:h-24 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-3">
                  Thank You!
                </h3>
                <p className="text-gray-600 text-lg">
                  Your support ticket has been submitted successfully. We'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={ticketForm.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      disabled={isFormSubmittedRef.current}
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="Enter subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      required
                      disabled={isFormSubmittedRef.current}
                    />
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Problem Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={ticketForm.problem}
                    onChange={(e) => handleInputChange("problem", e.target.value)}
                    placeholder="Describe your problem in detail..."
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
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
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0 mb-4">
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
                      className="flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Paperclip size={18} />
                      <span>Choose File</span>
                    </button>
                    <span className="text-sm text-gray-500">
                      Max 10MB (Images, PDF, Docs, Text)
                    </span>
                  </div>

                  {/* File Preview */}
                  {ticketForm.attachmentName && (
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border mb-3">
                      <div className="flex items-center space-x-3 flex-1 min-w-0">
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
                        className="ml-3 text-red-500 hover:text-red-700 disabled:opacity-50"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  )}

                  {/* Image Preview */}
                  {ticketForm.attachmentUrl && ticketForm.attachmentType.startsWith('image/') && (
                    <div className="mb-3">
                      <img
                        src={ticketForm.attachmentUrl}
                        alt="Attachment preview"
                        className="max-w-full sm:max-w-md h-40 object-cover rounded-lg border"
                      />
                    </div>
                  )}

                  {/* Upload Progress */}
                  {isUploading && uploadProgress > 0 && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-red-500 h-2.5 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-3 sm:space-y-0 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full sm:w-auto px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-medium disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    Reset Form
                  </button>
                  <FancyButton
                    type="submit"
                    disabled={isSubmitting || isFormSubmittedRef.current}
                    className="w-full sm:w-auto px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
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
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportLink;