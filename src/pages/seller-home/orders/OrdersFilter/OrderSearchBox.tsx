import { CiSearch } from "react-icons/ci";

import { searchTextInputName } from "../constants";

type OrderSearchBoxProps = {
  searchText: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function OrderSearchBox({
  searchText,
  handleChange,
}: OrderSearchBoxProps) {
  return (
    <div>
      <label className="flex items-center w-full">
        <input
          className="w-full bg-card px-[15px] py-[10px] rounded-s-full outline-none text-sm"
          type="text"
          placeholder="Search order"
          name={searchTextInputName}
          value={searchText}
          onChange={handleChange}
        />
        <button className="rounded-e-full bg-secondary text-white lg:text-black lg:bg-card px-[15px] py-[11px] text-lg">
          <CiSearch />
        </button>
      </label>
    </div>
  );
}
