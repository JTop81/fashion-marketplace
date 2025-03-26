import { FC } from "react";

import AddBtn from "../AddButton";
interface DropDownProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LinkDropDown: FC<DropDownProps> = ({ setIsModalOpen }) => {
  return (
    <div className="relative ml-3" onClick={() => setIsModalOpen(true)}>
      <div className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <AddBtn title="Create" />
      </div>
    </div>
  );
};

export default LinkDropDown;
