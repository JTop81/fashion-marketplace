import { Search } from "react-iconly";
import PropTypes from "prop-types";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({ placeholder, className, ...props }) => {
  return (
    <div
      className={`flex justify-between items-center bg-gray rounded-full px-5 py-2 w-full ${className}`}
    >
      <input
        {...props}
        className="bg-transparent outline-0 w-full"
        type="text"
        placeholder={placeholder}
      />
      <Search size={24} />
    </div>
  );
};

// Add PropTypes for validation
Input.propTypes = {
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
