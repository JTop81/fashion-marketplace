import { FC } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import DropDownType from "types/productDropDown";

interface DropDownProps {
  dropDown: DropDownType[];
  handleRemove: () => void;
}

const AIDropDown: FC<DropDownProps> = ({ dropDown, handleRemove }) => {
  return (
    <Menu as="div" className="relative inline-block text-left z-20">
      <MenuButton className=" z-0 cursor-pointer">
        <HiOutlineDotsVertical className="text-xl mr-2" />
      </MenuButton>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-2 w-64 origin-top-right divide-y rounded-md bg-white shadow-lg border-white border-2">
          <div>
            {dropDown.map((dd: DropDownType, index: number) => (
              <MenuItem key={`menuItem-${index.toString()}`}>
                {({ focus }) => (
                  <div
                    onClick={handleRemove}
                    className={`${
                      focus ? "bg-gray" : ""
                    } group flex w-full items-center rounded-md px-4 py-4 text-sm cursor-pointer gap-3`}
                  >
                    <dd.icon size={18} />
                    <p>{dd.title}</p>
                  </div>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default AIDropDown;
