import { useCallback, useState } from "react";
import {
  BsChatDots,
  BsLightbulb,
  BsLightningCharge,
  BsX,
} from "react-icons/bs";
import { FaBug } from "react-icons/fa";
import { HiOutlineUpload } from "react-icons/hi";
import { IoHelpCircle } from "react-icons/io5";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    type: "GENERAL",
    category: "",
    priority: "",
    description: "",
    attachments: [] as File[],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Implement actual form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setFormData({
      subject: "",
      message: "",
      type: "GENERAL",
      category: "",
      priority: "",
      description: "",
      attachments: [],
    });
  };

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...files],
      }));
    }
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setFormData((prev) => ({
          ...prev,
          attachments: [...prev.attachments, ...files],
        }));
      }
    },
    [],
  );

  const removeFile = useCallback((index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  }, []);

  const supportCategories = [
    { value: "technical", label: "Technical Issue", icon: FaBug },
    { value: "account", label: "Account & Billing", icon: IoHelpCircle },
    { value: "feature", label: "Feature Request", icon: BsLightbulb },
    {
      value: "integration",
      label: "Integration Help",
      icon: BsLightningCharge,
    },
  ];

  return (
    <div className="px-4 lg:px-10">
      <div className="container max-w-[1600px] py-6">
        <div className="relative mb-8">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primarySecondary via-primary/10 to-primarySecondary blur-3xl opacity-80" />
          <h1 className="text-4xl font-bold text-primary">Support Center</h1>
          <p className="text-customTextGray mt-2">
            Get help with your account, technical issues, or feature requests.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Main Form Section */}
          <div className="flex-[3]">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 max-w-4xl mx-auto">
              <div className="p-6 border-b border-black/10">
                <h2 className="text-lg font-semibold text-primary">
                  Contact Us
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-customTextGray">
                      Subject
                    </label>
                    <input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                      placeholder="Brief description of your issue"
                      className="w-full p-2 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="category" className="text-customTextGray">
                        Category
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select category</option>
                        {supportCategories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="priority" className="text-customTextGray">
                        Priority
                      </label>
                      <select
                        id="priority"
                        value={formData.priority}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            priority: e.target.value,
                          }))
                        }
                        className="w-full p-2 border border-black/10 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                      >
                        <option value="">Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="description"
                      className="text-customTextGray"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Please provide as much detail as possible..."
                      className="w-full p-2 border border-black/10 rounded-md min-h-[150px] focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="attachments"
                      className="text-customTextGray"
                    >
                      Attachments (optional)
                    </label>
                    <div
                      className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                        isDragging
                          ? "border-primary bg-primary/5"
                          : "border-black/10 hover:border-primary/50"
                      }`}
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <input
                        type="file"
                        id="attachments"
                        multiple
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleFileSelect}
                      />
                      <div className="text-center">
                        <HiOutlineUpload className="mx-auto h-12 w-12 text-primary/50" />
                        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-1">
                          <span className="text-customTextGray">
                            Drag and drop your files, or
                          </span>
                          <span className="text-primary font-medium">
                            browse
                          </span>
                        </div>
                        <p className="text-xs text-customTextGray2 mt-2">
                          Max file size: 10MB. Supported formats: PNG, JPG, PDF
                        </p>
                      </div>
                    </div>

                    {/* File Preview */}
                    {formData.attachments.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {formData.attachments.map((file, index) => (
                          <div
                            key={`form-${index.toString()}`}
                            className="flex items-center justify-between p-3 bg-background-secondary rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <HiOutlineUpload className="h-5 w-5 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-text-primary truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-text-secondary">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="p-1 hover:bg-background-tertiary rounded-full transition-colors"
                            >
                              <BsX className="w-5 h-5 text-text-secondary hover:text-status-error" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-2 px-6 bg-primary text-white rounded-md hover:bg-primary/90 transition disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Ticket"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Live Chat Section */}
          <div className="lg:w-72 xl:w-80 flex-none">
            <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 sticky top-6">
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <BsChatDots className="h-5 w-5" />
                  <h2 className="font-semibold">Live Chat</h2>
                </div>
                <p className="text-sm text-customTextGray">
                  Chat with our support team in real-time during business hours.
                </p>
                <div className="pt-2">
                  <button className="w-full py-2 px-4 border border-primary text-primary rounded-md hover:bg-primary/10 transition">
                    Start Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
