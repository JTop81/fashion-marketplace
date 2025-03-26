import React, { useCallback, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";

interface DragDropUploadProps {
  initialImage?: string;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  isLoading?: boolean;
  containerClassName?: string;
  dropzoneText?: string;
  size?: "sm" | "md" | "lg";
}

const DragDropUpload: React.FC<DragDropUploadProps> = ({
  initialImage,
  onFileSelect,
  onRemove,
  isLoading = false,
  containerClassName,
  dropzoneText = "Drag and drop your image here, or click to select",
  size = "md",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

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

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onFileSelect(files[0]);
      }
    },
    [onFileSelect],
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onRemove();
    },
    [onRemove],
  );

  const sizeClasses = {
    sm: "w-[80px] h-[80px]",
    md: "w-[100px] h-[100px]",
    lg: "w-[120px] h-[120px]",
  };

  return (
    <div className={clsx("flex justify-center relative", containerClassName)}>
      {initialImage && (
        <button
          onClick={handleRemove}
          className="absolute -top-2 -right-2 p-1.5 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-full 
            transition-all duration-200 shadow-md hover:shadow-lg z-[100]"
          title="Remove image"
          type="button"
        >
          <IoClose size={16} />
        </button>
      )}

      <div
        className={clsx(
          "relative border border-dashed rounded-xl transition-all duration-200",
          sizeClasses[size],
          "flex flex-col items-center justify-center cursor-pointer overflow-hidden",
          isDragging
            ? "border-primary/20 bg-primary/5 scale-[1.02]"
            : "border-black/10 hover:border-primary/20 hover:bg-primary/5",
          "group",
        )}
        onClick={() => fileInputRef.current?.click()}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />

        {initialImage ? (
          <div className="w-full h-full">
            <img
              src={initialImage}
              alt="Preview"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
          </div>
        ) : (
          <div className="text-center h-full flex flex-col items-center justify-center p-4 z-20">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <HiOutlineUpload className="h-6 w-6 text-primary" />
            </div>
            <p className="text-gray-500 text-sm font-medium">{dropzoneText}</p>
            {isLoading && (
              <div className="mt-2 flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-primary text-sm">Uploading...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DragDropUpload;
