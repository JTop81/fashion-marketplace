import { MdMoreVert } from "react-icons/md";
import { Menu } from "@headlessui/react";

import WrapBtns from "./WrapBtns";
type FramButtonProps = {
  isOwner?: boolean;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function FrameButton(props: FramButtonProps) {
  const { setEditModalOpen, isOwner } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 transition-colors">
        <MdMoreVert size={24} />
      </Menu.Button>

      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        <div className="p-2">
          <WrapBtns setEditModalOpen={setEditModalOpen} isOwner={isOwner} />
        </div>
      </Menu.Items>
    </Menu>
  );
}
