import { useState } from "react";
import { Buy, CloseSquare } from "react-iconly";
import clsx from "clsx";

interface SelectVariationsProps {
  setSelectVariations: (value: boolean) => void;
  setAddCart: (value: boolean) => void;
}

const SelectVariations = ({
  setSelectVariations,
  setAddCart,
}: SelectVariationsProps) => {
  const [boldedSize, setBoldedSize] = useState("");
  const [boldedColor, setBoldedColor] = useState("");

  const handleClose = () => {
    setSelectVariations(false);
  };

  const handleAddCart = () => {
    setSelectVariations(false);
    setAddCart(true);
  };

  const toggleBold = (color: string) => {
    if (boldedColor === color) {
      setBoldedColor("");
    } else {
      setBoldedColor(color);
    }
  };

  const toggleBoldSize = (size: string) => {
    if (boldedSize === size) {
      setBoldedSize("");
    } else {
      setBoldedSize(size);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="flex justify-end mb-4">
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <CloseSquare size={20} />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Select Item Variation
          </h4>
          <div className="flex flex-wrap gap-3">
            {["Red", "Green", "Blue"].map((color) => (
              <button
                key={color}
                onClick={() => toggleBold(color)}
                className={clsx(
                  "px-4 py-2 rounded border border-gray-200 hover:border-gray-300 transition-colors",
                  boldedColor === color ? "font-bold" : "font-normal",
                )}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Select size
          </h4>
          <div className="flex flex-wrap gap-3">
            {["22", "32", "44", "49"].map((size) => (
              <button
                key={size}
                onClick={() => toggleBoldSize(size)}
                className={clsx(
                  "px-4 py-2 rounded border border-gray-200 hover:border-gray-300 transition-colors",
                  boldedSize === size ? "font-bold" : "font-normal",
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAddCart}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors"
        >
          <span className="text-sm">Add to Cart</span>
          <Buy size={24} primaryColor="#fff" />
        </button>
      </div>
    </div>
  );
};

export default SelectVariations;
