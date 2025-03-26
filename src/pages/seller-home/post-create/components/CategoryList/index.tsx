import React from "react";

interface CategoriesListProps {
  categoriesData: any;
  selectedCategories: (string | undefined)[];
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
    <div className="w-full flex  p-[8px] flex-col items-start gap-[10px]  overflow-y-scroll  max-h-[280px]">
      <div className="h-22 overflow-auto">
        <div className="flex p-[8px] flex-col items-start gap-[10px] self-stretch">
          {categoriesData.length > 0 &&
            categoriesData.map((item: any, index: number) => {
              if (!item.options.length) return null;
              return (
                <div key={`category-${index.toString()}`}>
                  <div className="flex items-center gap-[10px] self-stretch my-6">
                    <p className="capitalize font-[Poppins] text-[#4A037D] text-[18px] not-italic font-semibold leading-[150%]">
                      {titleList[item.preference_name as TitleKeys]}
                    </p>
                  </div>
                  <div className="flex  justify-between items-center self-stretch">
                    <div className="flex w-full  items-start gap-[10px]  flex-wrap ">
                      {item.options.map((item: any, key: number) => (
                        <div
                          // eslint-disable-next-line react/no-array-index-key
                          key={key}
                          onClick={() => onToggleCategory(item.option_value)}
                          className={`flex p-[4px] px-[10px] justify-center items-center gap-2 rounded-full h-[37px] cursor-pointer transition-colors ${
                            selectedCategories.includes(item.option_value)
                              ? "border-2 border-[#9f00d9] bg-[#faebff]"
                              : "border-2 border-[#ECECEC]"
                          }`}
                        >
                          <p className="capitalize">{item.option_value}</p>
                        </div>
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
