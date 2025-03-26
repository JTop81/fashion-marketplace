import clsx from "clsx";
import PropTypes from "prop-types";

import { PostTextField } from "pages/seller-home/post-create/components/PostTextField";

type VariantDisplayProps = {
  variant: string;
} & React.HTMLAttributes<HTMLDivElement>;

const VariantDisplay: React.FC<VariantDisplayProps> = ({
  variant,
  children,
  className,
}) => (
  <div className={clsx("", className)}>
    {variant}
    {children}
  </div>
);

type VariantEditProps = {
  index: number;
  editText: string;
  setEditText: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
};

const VariantEdit: React.FC<VariantEditProps> = ({
  editText,
  setEditText,
  handleKeyPress,
}) => (
  <div className="flex items-center space-x-2 px-5 py-2">
    <PostTextField
      type="text"
      value={editText}
      onChange={(e) => setEditText(e.target.value)}
      onKeyDown={handleKeyPress}
      autoFocus
    />
  </div>
);

// Add PropTypes for validation
VariantDisplay.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
};

VariantEdit.propTypes = {
  editText: PropTypes.string.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  setEditText: PropTypes.any.isRequired,
};

export { VariantDisplay, VariantEdit };
