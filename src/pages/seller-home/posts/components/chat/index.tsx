import moment from "moment";
import PropTypes from "prop-types";

interface ChatListProps {
  image: string;
  title: string;
  description: string;
  numberofUpdate: number;
  time: string;
}

const ChatList: React.FC<ChatListProps> = ({
  image,
  title,
  description,
  numberofUpdate,
  time,
}) => {
  return (
    <div className="flex justify-between gap-2 py-3 items-center hover:cursor-pointer">
      <div className="flex items-center gap-[10px]">
        <img src={image} className="w-14 h-14 rounded-full" />
        <div>
          <p className="font-semibold">{title.slice(0, 12)}</p>
          <p className="mt-[6px] line-clamp-2">{`${description.slice(
            0,
            20,
          )}`}</p>
        </div>
      </div>
      <div>
        <p className="bg-primary w-6 h-6 rounded-full flex items-center justify-center text-white ml-auto">
          {numberofUpdate}
        </p>
        <p className="opacity-50 mt-[6px]">
          {moment(time).format("MMMM Do YYYY")}
        </p>
      </div>
    </div>
  );
};

// Add PropTypes for validation
ChatList.propTypes = {
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  numberofUpdate: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ChatList;
