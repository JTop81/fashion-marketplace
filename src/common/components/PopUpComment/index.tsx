import React, { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi2";
import { Close } from "assets";
import clsx from "clsx";
import { commentData } from "setup/store/common/Data";

import Image from "../Image";

export interface PopUpCommentProps {
  setShowComment: React.Dispatch<React.SetStateAction<boolean>>;
}

const PopUpComment: React.FC<PopUpCommentProps> = ({ setShowComment }) => {
  const [replyTo] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isOpenStatus, setIsOpenStatus] = useState(false);
  const [selectedTick, setSelectedTick] = useState(-1);
  const [selectedOption, setSelectedOption] = useState("Most Relevant");

  const handleTickClick = (
    index: React.SetStateAction<number>,
    option: any,
  ) => {
    setSelectedTick(index === selectedTick ? -1 : index);
    setSelectedOption(option);
  };

  const toggleDropdownStatus = () => {
    setIsOpenStatus(!isOpenStatus);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleClose = () => {
    setShowComment(false);
  };

  return (
    <div className="fixed inset-0 flex justify-end items-center bg-black/50 z-50">
      <div className="w-[441px] h-[660px] mr-[100px] mt-[125px] pt-5 flex flex-col items-center gap-2.5 rounded-lg bg-white shadow-2xl md:mr-0 md:mt-0">
        {/* Header */}
        <div className="flex justify-end items-center gap-2.5 px-7 w-full">
          <button onClick={handleClose}>
            <Image src={Close} alt="close" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center gap-6 flex-1 w-full p-2.5 rounded-md bg-gradient-to-b from-white to-[#FDF8FF] overflow-y-auto scrollbar-thin scrollbar-track-[#ECECEC] scrollbar-thumb-customTextPink hover:scrollbar-thumb-gray-600">
          {/* Comments Header */}
          <div className="flex justify-between items-start w-full gap-10 md:gap-5">
            <div className="text-lg font-semibold">
              Comments ({commentData?.length})
            </div>
            <div
              className="flex items-center gap-1.5 px-2 py-1 rounded border border-customTextPink cursor-pointer"
              onClick={toggleDropdownStatus}
            >
              <span className="text-sm">{selectedOption}</span>
              <HiOutlineChevronDown size={24} />

              {/* Dropdown Menu */}
              <div
                className={clsx(
                  "absolute mt-32 ml-3 p-4 flex-col justify-center items-start gap-2",
                  "rounded-xl bg-white shadow-lg",
                  "hidden",
                  isOpenStatus && "flex",
                )}
              >
                <button
                  className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => handleTickClick(0, "Most Relevant")}
                >
                  <div className="w-5 h-5 rounded border border-[#CBCBCB] relative">
                    {selectedTick === 0 && (
                      <svg
                        className="absolute inset-0 m-auto"
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.93994 4.0002L4.31394 6.3732L9.05994 1.6272"
                          stroke="#130F26"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">Most Relevant</span>
                </button>
                <button
                  className="flex items-center gap-2 w-full p-2 hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => handleTickClick(1, "Most Recent")}
                >
                  <div className="w-5 h-5 rounded border border-[#CBCBCB] relative">
                    {selectedTick === 1 && (
                      <svg
                        className="absolute inset-0 m-auto"
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.93994 4.0002L4.31394 6.3732L9.05994 1.6272"
                          stroke="#130F26"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm">Most Recent</span>
                </button>
              </div>
            </div>
          </div>

          {/* Write Comment Section */}
          <div className="h-32 flex flex-col justify-center items-start w-full">
            <div className="p-2.5 flex flex-col items-start gap-2.5 w-full">
              <input
                className="w-full p-3.5 rounded bg-white shadow-sm placeholder:text-black/50"
                placeholder={`Write a reply to ${replyTo}`}
                value={commentText}
                onChange={handleCommentChange}
              />
            </div>
            <div className="flex justify-end items-start gap-2.5 p-2.5 w-full">
              <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
                Send
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="flex flex-col items-end gap-3 w-full">
            {commentData.map((comment, index) => (
              <div
                key={`commentData-${index.toString()}`}
                className="flex flex-col gap-2.5 w-full p-3 border-b border-[#CBCBCB]"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={comment.userProfile}
                    alt=""
                    className="w-7 h-7 rounded-full"
                  />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-start gap-12">
                      <span className="text-sm font-medium">
                        {comment.userName}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {comment.time} ago
                      </span>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {comment.commentContent}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-customTextPink"
                    >
                      <path
                        d="M14.1999 6.71995C14.0126 6.49505 13.7782 6.314 13.5132 6.1896C13.2483 6.06519 12.9593 6.00045 12.6666 5.99995H9.62659L9.99992 5.04662C10.1552 4.6292 10.2069 4.18035 10.1506 3.73856C10.0943 3.29677 9.93171 2.87523 9.67671 2.5101C9.42171 2.14497 9.08194 1.84715 8.68655 1.64218C8.29115 1.43721 7.85194 1.33121 7.40659 1.33328C7.27834 1.33355 7.1529 1.3708 7.0453 1.44056C6.9377 1.51033 6.8525 1.60965 6.79992 1.72661L4.89992 5.99995H3.33325C2.80282 5.99995 2.29411 6.21066 1.91904 6.58573C1.54397 6.96081 1.33325 7.46952 1.33325 7.99995V12.6666C1.33325 13.197 1.54397 13.7058 1.91904 14.0808C2.29411 14.4559 2.80282 14.6666 3.33325 14.6666H11.8199C12.2878 14.6665 12.7408 14.5023 13.1001 14.2026C13.4595 13.903 13.7024 13.4868 13.7866 13.0266L14.6333 8.35995C14.6856 8.07154 14.6739 7.77514 14.5991 7.49173C14.5242 7.20833 14.3879 6.94485 14.1999 6.71995Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <div className="w-px h-5 bg-[#CBCBCB]" />
                  <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="14"
                      viewBox="0 0 13 14"
                      fill="none"
                      className="text-customTextPink"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.16432 13.6666C5.26098 13.6666 4.38032 13.6566 3.50898 13.6386C2.39432 13.6166 1.62298 12.8939 1.49698 11.7526C1.28698 9.85927 0.927651 5.3966 0.924317 5.35194C0.901651 5.0766 1.10698 4.83527 1.38232 4.81327C1.65365 4.80594 1.89898 4.9966 1.92098 5.27127C1.92432 5.3166 2.28298 9.76394 2.49098 11.6426C2.56232 12.2913 2.91232 12.6259 3.52965 12.6386C5.19632 12.6739 6.89698 12.6759 8.73032 12.6426C9.38632 12.6299 9.74098 12.3019 9.81432 11.6379C10.021 9.77527 10.381 5.3166 10.385 5.27127C10.407 4.9966 10.6503 4.8046 10.923 4.81327C11.1983 4.83594 11.4037 5.0766 11.3817 5.35194C11.3777 5.39727 11.0163 9.87127 10.8083 11.7479C10.679 12.9126 9.90965 13.6213 8.74832 13.6426C7.85965 13.6579 7.00232 13.6666 6.16432 13.6666Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M11.8053 3.65955H0.5C0.224 3.65955 0 3.43555 0 3.15955C0 2.88355 0.224 2.65955 0.5 2.65955H11.8053C12.0813 2.65955 12.3053 2.88355 12.3053 3.15955C12.3053 3.43555 12.0813 3.65955 11.8053 3.65955Z"
                        fill="currentColor"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.62689 3.6595C8.86822 3.6595 8.20956 3.11883 8.06022 2.37483L7.89822 1.56416C7.86422 1.44083 7.72356 1.3335 7.56356 1.3335H4.74156C4.58156 1.3335 4.44089 1.44083 4.40022 1.59483L4.24489 2.37483C4.09622 3.11883 3.43689 3.6595 2.67822 3.6595C2.40222 3.6595 2.17822 3.4355 2.17822 3.1595C2.17822 2.8835 2.40222 2.6595 2.67822 2.6595C2.96222 2.6595 3.20889 2.45683 3.26489 2.17816L3.42689 1.3675C3.59156 0.746163 4.12956 0.333496 4.74156 0.333496H7.56356C8.17556 0.333496 8.71356 0.746163 8.87156 1.3375L9.04089 2.17816C9.09622 2.45683 9.34289 2.6595 9.62689 2.6595C9.90289 2.6595 10.1269 2.8835 10.1269 3.1595C10.1269 3.4355 9.90289 3.6595 9.62689 3.6595Z"
                        fill="currentColor"
                      />
                    </svg>
                  </button>
                  <div className="w-px h-5 bg-[#CBCBCB]" />
                  <button className="text-sm text-customTextPink hover:text-customTextPink/80 transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpComment;
