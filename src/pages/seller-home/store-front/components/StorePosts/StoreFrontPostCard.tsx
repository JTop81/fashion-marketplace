import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FaRegCommentDots } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { Menu } from "@headlessui/react";
import { IPost } from "api/services/posts/interfaces/post.interface";
import clsx from "clsx";
import PropTypes from "prop-types";

interface DropdownItem {
  icon: any;
  title: string;
}

interface Props {
  role: any;
  isCreator: boolean;
  post: IPost;
  time: number;
  dropDown: DropdownItem[];
  productDetailsModal: boolean;
  findProduct: (proid: string) => void;
  setProductDetailsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const StoreFrontPostCard: React.FC<Props> = ({
  post,
  productDetailsModal,
  setProductDetailsModal,
  findProduct,
  isCreator,
  dropDown,
}) => {
  const [hoverId, setHoverId] = useState(false);

  const handleClick = () => {
    setProductDetailsModal(!productDetailsModal);
    findProduct(post.id || "");
  };

  return (
    <div className="relative h-full group">
      {isCreator && (
        <Menu
          as="div"
          className="absolute top-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <Menu.Button
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 transition-all duration-200 backdrop-blur-sm"
          >
            <BsThreeDots size={16} className="text-white" />
          </Menu.Button>
          <Menu.Items className="absolute right-0 mt-1 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-1">
              {dropDown.map((item: DropdownItem) => (
                <Menu.Item key={item.title}>
                  {({ active }) => (
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className={clsx(
                        "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-all duration-200",
                        active
                          ? "bg-primary/5 text-primary"
                          : "text-gray-700 hover:bg-primary/5 hover:text-primary",
                      )}
                    >
                      <item.icon
                        size={20}
                        className={clsx(
                          "transition-colors duration-200",
                          active ? "text-primary" : "",
                        )}
                      />
                      <span>{item.title}</span>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Menu>
      )}

      <div
        onClick={handleClick}
        onMouseEnter={() => setHoverId(true)}
        onMouseLeave={() => setHoverId(false)}
        className="w-full h-full relative rounded-lg overflow-hidden cursor-pointer"
      >
        <img
          src={post.assets?.[0]?.url || "/assets/images/no_image.png"}
          alt={post.details?.title || "Post"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-0 transition-opacity" />

        <div className="absolute inset-0 flex flex-col justify-end p-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-white truncate max-w-[80%] group-hover:opacity-0 transition-opacity duration-200">
              {post.details?.title}
            </p>
          </div>

          <div className="flex items-center mt-2 group-hover:opacity-0 transition-opacity duration-200">
            <div className="flex items-center">
              <LuEye
                size={18}
                className="mr-1 bg-[#6A6A6A] p-[2.5px] rounded-full text-white"
              />
              <span className="text-white text-xs">
                {post.statistics.total.saves}
              </span>
            </div>

            <div className="flex items-center ml-4">
              <div className="flex items-center mr-2">
                <FiHeart
                  size={20}
                  className="mr-1 bg-[#6A6A6A] p-1 rounded-full text-white"
                />
                <span className="text-white text-xs">
                  {post.statistics.total.reactions}
                </span>
              </div>
              <div className="flex items-center">
                <FaRegCommentDots
                  size={20}
                  className="mr-1 bg-[#6A6A6A] p-1 rounded-full text-white"
                />
                <span className="text-white text-xs">
                  {post.statistics.total.comments}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes for validation
StoreFrontPostCard.propTypes = {
  dropDown: PropTypes.array.isRequired,
  findProduct: PropTypes.func.isRequired,
  isCreator: PropTypes.bool.isRequired,
  post: PropTypes.any.isRequired,
  productDetailsModal: PropTypes.bool.isRequired,
  setProductDetailsModal: PropTypes.any.isRequired,
};

export default StoreFrontPostCard;
