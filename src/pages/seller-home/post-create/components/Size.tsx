import clsx from "clsx";
import PropTypes from "prop-types";

type SizeProps = {
  size: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Size = ({ size, className, ...rest }: SizeProps) => {
  return (
    <div
      className={clsx(
        `border-2 rounded-full px-4 py-2 mx-1 w-10 h-10 flex items-center justify-center border-stone-300 !text-black`,
        className,
      )}
      {...rest}
    >
      {size}
    </div>
  );
};

const SizeEdit: React.FC<{
  size: string;
  setFieldValue: (field: string, value: any) => void;
  sizes: string[];
}> = ({ size, setFieldValue, sizes }) => {
  const isSelected = sizes.includes(size);

  const toggleSize = () => {
    setFieldValue(
      "sizes",
      isSelected ? sizes.filter((s) => s !== size) : [...sizes, size],
    );
  };

  return (
    <button type="button" onClick={toggleSize}>
      <Size
        size={size}
        className={
          isSelected
            ? "bg-primarySecondary !border-primary"
            : "border-stone-300"
        }
      />
    </button>
  );
};

// Add PropTypes for validation
SizeEdit.propTypes = {
  setFieldValue: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export { Size, SizeEdit };
