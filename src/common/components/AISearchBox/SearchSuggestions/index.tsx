import React, { FunctionComponent } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
type SuggestionProps = {
  handleClick: React.Dispatch<React.SetStateAction<string>>;
  titleArr: string[];
  isLoading: boolean;
};

const SearchSuggestions: FunctionComponent<SuggestionProps> = ({
  titleArr,
  handleClick,
  isLoading,
}) => {
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      const scrollAmount = window.innerWidth * 0.5; // Adjust 0.5 (50%) as needed
      slider.scrollLeft -= scrollAmount;
    }
  };

  const slideRight = () => {
    const slider = document.getElementById("slider");
    if (slider) {
      const scrollAmount = window.innerWidth * 0.5; // Adjust 0.5 (50%) as needed
      slider.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="relative flex items-center overflow-y-hidden overflow-x-auto p-2 text-left text-[14px] text-black">
      <MdChevronLeft
        className="opacity-50 cursor-pointer hover:opacity-100"
        onClick={slideLeft}
        size={40}
      />
      <div
        id="slider"
        className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide"
      >
        {titleArr.map((item, index) => (
          <div
            onClick={() => {
              if (!isLoading) handleClick(item);
            }}
            key={`title-${index.toString()}`}
            className="inline-flex items-center bg-[#f9ecfe] cursor-pointer rounded-[30px] h-[36px] px-[10px] py-2 m-[5px] gap-[6px] hover:scale-105 ease-in-out duration-300"
          >
            <span className="leading-[150%]">{item}</span>
          </div>
        ))}
      </div>
      <MdChevronRight
        className="opacity-50 cursor-pointer hover:opacity-100"
        onClick={slideRight}
        size={40}
      />
    </div>
  );
};

export default SearchSuggestions;
