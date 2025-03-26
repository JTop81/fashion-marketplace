import { ComponentProps, forwardRef } from "react";
import { FaRegSmile } from "react-icons/fa";
import { FaAt, FaFile, FaRegPaperPlane } from "react-icons/fa6";

import Button from "./Button";

type CommentOverlayProps = {
  atClick: () => void;
  emojiClick: () => void;
  fileClick: () => void;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  disabled?: boolean;
} & ComponentProps<"form">;

const CommentOverlay = forwardRef<HTMLTextAreaElement, CommentOverlayProps>(
  (
    { atClick, emojiClick, fileClick, onChange, value, disabled, ...props },
    ref,
  ) => {
    return (
      <form
        className="flex flex-col bg-white border-2 border-gray
         p-3 rounded-lg w-full"
        {...props}
      >
        <textarea
          name="comment"
          onChange={onChange}
          value={value}
          placeholder={"Write your quick comment..."}
          ref={ref}
          disabled={disabled}
          className="bg-white border-none text-gray-700 p-2 w-full h-20 outline-none resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <div className="bottom-2 left-2">
          <div className="flex justify-between">
            <div className="flex text-gray-400 items-end flex-1">
              <Button onClick={atClick} variant="text" disabled={disabled}>
                <FaAt />
              </Button>
              <Button onClick={emojiClick} variant="text" disabled={disabled}>
                <FaRegSmile />
              </Button>
              <Button onClick={fileClick} variant="text" disabled={disabled}>
                <FaFile />
              </Button>
            </div>

            <Button
              type="submit"
              className={`mr-1 mb-1 !p-2.5 text-3xl flex items-center justify-center w-10 h-10 !rounded-full ${disabled ? "bg-gray-300 cursor-not-allowed" : "bg-secondary"}`}
              variant="contained"
              disabled={disabled}
            >
              <FaRegPaperPlane />
            </Button>
          </div>
        </div>
      </form>
    );
  },
);

CommentOverlay.displayName = "CommentOverlay";

export default CommentOverlay;
