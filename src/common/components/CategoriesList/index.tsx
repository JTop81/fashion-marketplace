import React from "react";
import clsx from "clsx";

interface CategoriesListProps {
  categoriesData: any;
  selectedCategories: string[];
  onToggleCategory: (categoryName: string) => void;
}

type TitleKeys =
  | "locations"
  | "events"
  | "STYLES"
  | "materials"
  | "brand_features"
  | "brands"
  | "occasions"
  | "sizes"
  | "more_context";

const titleList: Record<TitleKeys, string> = {
  locations: "My Favourite Locations",
  events: "I look for these events",
  STYLES: "I like these styles",
  materials: "I love these materials",
  brand_features: "Our Brand Features",
  brands: "Our Brands",
  occasions: "Shop for these occasions",
  sizes: "What's your fit?",
  more_context: "I look for more context",
};

const CategoriesList: React.FC<CategoriesListProps> = ({
  categoriesData,
  selectedCategories,
  onToggleCategory,
}) => {
  return (
    <div className="w-full flex p-2 flex-col items-start gap-2.5 overflow-y-scroll max-h-[280px]">
      <div className="h-22 overflow-auto">
        <div className="flex p-2 flex-col items-start gap-2.5 self-stretch">
          {categoriesData.length > 0 &&
            categoriesData.map((item: any, index: number) => {
              if (!item.options.length) return null;
              return (
                <div key={`category-${index.toString()}`}>
                  <div className="flex items-center gap-2.5 self-stretch my-6">
                    <p className="capitalize font-poppins text-customTextPink text-lg font-semibold leading-[150%]">
                      {titleList[item.preference_name as TitleKeys]}
                    </p>
                  </div>
                  <div className="flex justify-between items-center self-stretch">
                    <div className="flex w-full items-start gap-2.5 flex-wrap">
                      {item.options.map((item: any, key: number) => (
                        <button
                          key={`label-${key.toString()}`}
                          onClick={() => onToggleCategory(item.id)}
                          className={clsx(
                            "flex px-2.5 py-1 justify-center items-center gap-2 rounded-full h-[37px]",
                            "border-2 transition-colors cursor-pointer",
                            selectedCategories.includes(item.id)
                              ? "border-customTextPink2 bg-[#FAEBFF]"
                              : "border-[#ECECEC]",
                          )}
                        >
                          <p className="capitalize text-sm font-normal leading-[150%]">
                            {item.option_value}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesList;
