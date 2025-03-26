import { FaArrowRightLong } from "react-icons/fa6";
import PropTypes from "prop-types";

interface ActivityTopProps {
  title: string;
}

const ActivityTop: React.FC<ActivityTopProps> = ({ title }) => {
  return (
    <div>
      <div className="flex items-start justify-between">
        <p className="opacity-50">{title}</p>
        <div className="flex gap-2 items-center text-primary cursor-pointer">
          <p>View more</p>
          <FaArrowRightLong />
        </div>
      </div>
    </div>
  );
};

// Add PropTypes for validation
ActivityTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ActivityTop;
