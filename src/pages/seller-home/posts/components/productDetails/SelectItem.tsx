import PropTypes from "prop-types";

type Item = {
  title: string;
  count?: number;
};
interface SelectItemProps {
  selectOption: string;
  setSelectOption: (item: string) => void;
  items: Item[];
}

const SelectItem: React.FC<SelectItemProps> = ({
  selectOption,
  items,
  setSelectOption,
}) => {
  return (
    <div className="w-full flex mt-20 md:mt-8">
      {items.map((item, index) => (
        <div
          key={`items-${index.toString()}`}
          className={`w-1/3 flex cursor-pointer pb-2 text-sm sm:text-md whitespace-nowrap items-center justify-center ${
            index === 0 ? "pr-3" : "px-3"
          } ${
            selectOption === item.title
              ? "font-semibold border-b-2 border-primary"
              : "opacity-50 border-b-2 border-[#c3c3c3]"
          }`}
          onClick={() => setSelectOption(item.title)}
        >
          {index === 0 && <span className="mr-2">{item.count}</span>}
          <div
            className={`${index === 0 ? "" : "w-full"} whitespace-normal text-center`}
          >
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};

// Add PropTypes for validation
SelectItem.propTypes = {
  items: PropTypes.any.isRequired,
  selectOption: PropTypes.string.isRequired,
  setSelectOption: PropTypes.func.isRequired,
};

export default SelectItem;
