import React, { useCallback, useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import clsx from "clsx";

interface MultiImageUploadProps {
  initialImages?: string[];
  onFilesSelect: (files: File[]) => void;
  onRemove: (index: number) => void;
  isLoading?: boolean;
  containerClassName?: string;
  dropzoneText?: string;
  maxImages?: number;
}

const MAX_IMAGES = 10;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const MultiImageUpload: React.FC<MultiImageUploadProps> = ({
  initialImages = [],
  onFilesSelect,
  onRemove,
  isLoading = false,
  containerClassName,
  dropzoneText = "Drag and drop your images here, or click to select",
  maxImages = MAX_IMAGES,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validateFiles = useCallback(
    (files: File[]): { valid: File[]; errors: string[] } => {
      const validFiles: File[] = [];
      const errors: string[] = [];

      files.forEach((file) => {
        if (!ALLOWED_TYPES.includes(file.type)) {
          errors.push(
            `${file.name} is not a supported image type. Please use JPG, PNG, or WEBP.`,
          );
          return;
        }
        validFiles.push(file);
      });

      return { valid: validFiles, errors };
    },
    [],
  );

  const processFiles = useCallback(
    (files: File[]) => {
      const remainingSlots = maxImages - initialImages.length;
      if (remainingSlots <= 0) {
        toast.warn(`Maximum number of images (${maxImages}) reached.`);
        return;
      }

      const filesToProcess = files.slice(0, remainingSlots);
      const { valid, errors } = validateFiles(filesToProcess);

      if (errors.length > 0) {
        toast.error(errors.join("\n"));
      }

      if (valid.length > 0) {
        onFilesSelect(valid);
      }
    },
    [maxImages, initialImages.length, validateFiles, onFilesSelect],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    [processFiles],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      processFiles(files);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [processFiles],
  );

  const UploadBox = ({ isLarge = false }: { isLarge?: boolean }) => (
    <div
      className={clsx(
        "relative border-2 border-dashed rounded-xl transition-all duration-200",
        isLarge ? "w-full min-h-[300px]" : "aspect-square",
        "flex flex-col items-center justify-center cursor-pointer",
        isDragging
          ? "border-primary/20 bg-primary/5 scale-[1.02]"
          : "border-black/10 hover:border-primary/20 hover:bg-primary/5",
        "group",
      )}
      onClick={() => fileInputRef.current?.click()}
    >
      <div className="text-center flex flex-col items-center justify-center p-4">
        <div
          className={clsx(
            "rounded-full bg-primary/10 flex items-center justify-center mb-2",
            isLarge ? "w-16 h-16" : "w-10 h-10",
          )}
        >
          <HiOutlineUpload
            className={clsx("text-primary", isLarge ? "h-8 w-8" : "h-5 w-5")}
          />
        </div>
        {isLarge ? (
          <>
            <p className="text-gray-600 text-lg font-medium mb-2">
              {dropzoneText}
            </p>
            <p className="text-gray-400">
              {initialImages.length} of {maxImages} images uploaded
            </p>
          </>
        ) : (
          <p className="text-gray-500 text-sm">
            Add Image ({initialImages.length}/{maxImages})
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={clsx(
        "relative w-full min-h-[200px] rounded-xl transition-all duration-300",
        "border-2 border-dashed",
        isDragging
          ? "border-primary/20 bg-primary/5 scale-[1.02]"
          : "border-transparent",
        containerClassName,
      )}
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const rect = e.currentTarget.getBoundingClientRect();
        const isLeaving =
          e.clientY <= rect.top ||
          e.clientY >= rect.bottom ||
          e.clientX <= rect.left ||
          e.clientX >= rect.right;

        if (isLeaving) {
          setIsDragging(false);
        }
      }}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-40 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-primary">Uploading...</p>
          </div>
        </div>
      )}

      {/* Content with backdrop effect when dragging */}
      <div
        className={clsx(
          "transition-all duration-300",
          isDragging && "opacity-20",
        )}
      >
        {initialImages.length === 0 ? (
          <UploadBox isLarge />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {initialImages.map((image, index) => (
              <div
                key={`image-${index.toString()}`}
                className="relative aspect-square group"
              >
                <img
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl transition-transform group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(index);
                  }}
                  className="absolute -top-2 -right-2 z-10 p-1.5 bg-white hover:bg-gray-100 text-gray-400 hover:text-gray-600 rounded-full 
                    transition-all duration-200 shadow-sm hover:scale-105 active:scale-95 active:bg-gray-200"
                  title="Remove image"
                  type="button"
                >
                  <IoClose size={18} />
                </button>
              </div>
            ))}

            {initialImages.length < maxImages && <UploadBox />}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiImageUpload;
