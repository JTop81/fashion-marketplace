import { FC } from "react";
import { Plus } from "react-iconly";

interface AddBtn {
  title: string;
}

const AddBtn: FC<AddBtn> = ({ title }) => {
  return (
    <div className="flex items-center gap-2 bg-secondary px-6 py-3 text-white rounded cursor-pointer">
      <p className="hidden sm:block">{title}</p>
      <Plus size={24} />
    </div>
  );
};

export default AddBtn;
