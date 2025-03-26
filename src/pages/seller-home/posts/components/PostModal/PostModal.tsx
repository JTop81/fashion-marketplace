import { BsBoxSeam, BsLink45Deg } from "react-icons/bs";
import { FaRegComments } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbArrowUpRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Modal from "common/components/Modal";
import PropTypes from "prop-types";

export interface CreateModalType {
  title: string;
  icon: React.ReactNode;
  link: string;
  description?: string;
}

export const CreatePostOptions: CreateModalType[] = [
  {
    title: "Product Post",
    icon: <BsBoxSeam className="w-8 h-8 text-emerald-500" />,
    link: "/product/create",
    description: "Create a product listing post",
  },
  {
    title: "External Link",
    icon: <BsLink45Deg className="w-8 h-8 text-primary" />,
    link: "/external/create",
    description: "Share content from other platforms",
  },
  {
    title: "Discussion",
    icon: <FaRegComments className="w-8 h-8 text-amber-500" />,
    link: "/discussion/create",
    description: "Start a conversation",
  },
];

interface IPostModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostModal: React.FC<IPostModalProps> = ({ setIsModalOpen }) => {
  const navigate = useNavigate();

  const handleOptionClick = (link: string) => {
    setIsModalOpen(false);
    navigate(link, { replace: true });
  };

  return (
    <Modal setIsModalOpen={setIsModalOpen}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex relative w-[96%] px-8 py-6 md:w-[580px] mx-auto h-fit flex-col rounded-2xl flex-shrink-0 bg-white shadow-xl"
      >
        <div className="w-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
              Create a Post
            </h1>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IoClose className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm mb-8">
            Choose the type of post you want to create
          </p>

          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4">
            {CreatePostOptions.map((item, index) => (
              <button
                key={`createPost-${index.toString()}`}
                onClick={() => handleOptionClick(item.link)}
                className="group relative flex flex-col items-center p-6 rounded-xl border border-gray-200 hover:border-primary/20 hover:bg-primary/5 transition-all duration-200"
              >
                <div className="mb-3">{item.icon}</div>
                <h3 className="text-gray-800 font-medium mb-1">{item.title}</h3>
                {item.description && (
                  <p className="text-gray-500 text-sm text-center">
                    {item.description}
                  </p>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TbArrowUpRight className="w-5 h-5 text-primary" />
                </div>
              </button>
            ))}
            {/* Empty tile to maintain 2x2 grid */}
            <div className="rounded-xl border border-dashed border-gray-200"></div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// Add PropTypes for validation
PostModal.propTypes = {
  setIsModalOpen: PropTypes.any.isRequired,
};

export default PostModal;
