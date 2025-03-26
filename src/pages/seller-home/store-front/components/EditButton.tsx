import { GoPencil } from "react-icons/go";
import clsx from "clsx";

type EditButtonProps = {
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditButton(props: EditButtonProps) {
  const { setEditModalOpen } = props;

  return (
    <button
      type="button"
      className={clsx(
        "bg-card p-[10px] rounded-full cursor-pointer",
        // desktop state
        "lg:bg-white p-0 mr-1 lg:flex lg:items-center",
      )}
      onClick={() => setEditModalOpen((prev) => !prev)}
    >
      <GoPencil className="lg:text-secondary lg:mr-[6px] text-2xl lg:text-xl" />
      <span className="hidden lg:block text-secondary font-semibold cursor-pointer">
        Edit
      </span>
    </button>
  );
}
