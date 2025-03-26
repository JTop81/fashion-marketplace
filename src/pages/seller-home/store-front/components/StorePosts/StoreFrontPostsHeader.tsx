import Searchbar from "common/components/Searchbar";
import TabSelection from "common/components/TabSelection";

import { StoreFrontPostsOption } from "../../types";

type StoreFrontPostsHeaderProps = {
  isOwner?: boolean;
  SellerSideOptions: StoreFrontPostsOption[];
  ShopperSideOptions: StoreFrontPostsOption[];
  handleOptionSelection: (option: StoreFrontPostsOption) => void;
  selected: StoreFrontPostsOption;
  searchTerm: string;
  handleInputChange: (v: string) => void;
};

export default function StoreFrontPostsHeader(
  props: StoreFrontPostsHeaderProps,
) {
  const {
    isOwner,
    ShopperSideOptions,
    SellerSideOptions,
    selected,
    handleOptionSelection,
    searchTerm,
    handleInputChange,
  } = props;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div className="flex items-center space-x-2">
        <TabSelection
          options={isOwner ? SellerSideOptions : ShopperSideOptions}
          selected={selected}
          onSelect={handleOptionSelection}
        />
      </div>

      <div className="w-full lg:w-auto">
        <Searchbar
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search posts..."
          className="lg:w-[280px]"
        />
      </div>
    </div>
  );
}
