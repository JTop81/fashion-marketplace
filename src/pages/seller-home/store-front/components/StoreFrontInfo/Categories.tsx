import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";

import { Category } from "../../types";

interface CategoriesProps {
  categories: Category[];
  editModalOpen?: boolean;
  handleCategoryRemove?: (id: string) => void;
}
export default function Categories(props: CategoriesProps) {
  const { categories, handleCategoryRemove, editModalOpen } = props;
  // Set initial number of visible items to 4
  const [showAll, setShowAll] = useState(false);
  const index = editModalOpen ? categories.length : 4;
  // Toggle between showing all items or just the first 4
  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll); // Toggle between true and false
  };

  return (
    <div className="mt-4 lg:mt-6 flex-wrap flex justify-center lg:justify-start items-center px-4 lg:px-0 lg:mx-auto">
      {(showAll ? categories : categories.slice(0, index)).map(
        (category, idx) => {
          const { id, imgUrl, option_value } = category;
          return (
            <div key={id} className="flex items-center">
              <div
                onClick={() => {
                  if (handleCategoryRemove) {
                    handleCategoryRemove(category.id);
                  }
                }}
                className="flex flex-col items-center h-[66px]"
              >
                <div className="w-[24px] lg:w-[36px] relative">
                  <img
                    src={imgUrl}
                    alt={option_value}
                    className="w-full h-full"
                  />
                  {handleCategoryRemove && (
                    <div className="rounded-full bg-[#D9D9D9] p-[0.5px] absolute top-[-4px] right-[-4px]">
                      <TiDeleteOutline size={14} />
                    </div>
                  )}
                </div>
                <span className="text-xs mt-[10px] text-center">
                  {option_value}
                </span>
              </div>

              {idx !== categories.length - 1 && (
                <div className="h-[28px] w-[2px] bg-card mx-4" />
              )}
            </div>
          );
        },
      )}
      {/* Show "Show All" or "Show Less" button depending on current state */}
      {categories.length > 4 && !editModalOpen && (
        <button
          type="button"
          onClick={toggleShowAll}
          className="bg-white text-slate-500 underline flex items-center py-[6px] px-3 w-fit rounded-full mr-[10px] lg:mt-auto"
        >
          {showAll ? "Less" : "... More"}
        </button>
      )}
    </div>
  );
}
