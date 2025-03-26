import { CloseSquare, Wallet } from "react-iconly";
import clsx from "clsx";
import PopupStepperComponents from "common/components/PopuStepper";

interface ProductDetailProps {
  handleClose: () => void;
  currentStep: number;
  itemImg: string;
  itemName: string;
  price: string;
  ETH: string;
  toggleBold: (color: string) => void;
  boldedColor: string;
  toggleBoldSize: (size: string) => void;
  boldedSize: string;
  decreaseQuantity: () => void;
  quantity: number;
  setQuantity: (value: number) => void;
  toggleCircle: (value: number) => void;
  tickedCircle: number | null;
  handleNextStep: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  handleClose,
  currentStep,
  itemImg,
  itemName,
  price,
  ETH,
  toggleBold,
  boldedColor,
  toggleBoldSize,
  boldedSize,
  decreaseQuantity,
  quantity,
  setQuantity,
  toggleCircle,
  tickedCircle,
  handleNextStep,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-text-primary">Buy Now</h3>
        <button
          onClick={handleClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <CloseSquare size={24} />
        </button>
      </div>

      <PopupStepperComponents currentStep={currentStep} />

      <div className="flex gap-8 mt-8">
        <div className="flex-1">
          <div className="mb-8">
            <p className="text-sm font-medium text-text-primary mb-4">
              Selected Item
            </p>
            <div className="flex items-start gap-4">
              <img
                src={itemImg}
                alt={itemName}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div>
                <h4 className="text-base font-semibold text-text-primary">
                  {itemName}
                </h4>
                <p className="text-sm text-text-secondary mt-1">
                  {price} (ETH {ETH})
                </p>
              </div>
            </div>
          </div>

          {/* Item Variations */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-text-primary mb-4">
                Select Item Variation
              </p>
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

            <div>
              <p className="text-sm font-medium text-text-primary mb-4">
                Select Shoe size
              </p>
              <div className="flex flex-wrap gap-3">
                {["27", "32", "44", "49"].map((size) => (
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
          </div>
        </div>

        {/* Right Section */}
        <div className="w-72 space-y-6">
          {/* Quantity */}
          <div>
            <p className="text-sm font-medium text-text-primary mb-4">
              Select Quantity
            </p>
            <div className="flex items-center gap-4 p-2 border border-gray-200 rounded-lg">
              <button
                onClick={decreaseQuantity}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M10.4446 7.99366H5.55566"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <span className="text-base font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M8.00008 5.55154V10.4358M10.4446 7.99366H5.55566"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Currency */}
          <div>
            <p className="text-sm font-medium text-text-primary mb-4">
              Select Currency
            </p>
            <div className="space-y-3">
              {[
                { id: 1, label: `USD (${price})` },
                { id: 2, label: `ETH (${ETH})` },
              ].map((currency) => (
                <button
                  key={currency.id}
                  onClick={() => toggleCircle(currency.id)}
                  className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0 border-2 border-black rounded-full" />
                    {tickedCircle === currency.id && (
                      <div className="absolute inset-2 bg-black rounded-full" />
                    )}
                  </div>
                  <span className="text-sm text-text-secondary">
                    {currency.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNextStep}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span className="text-sm font-semibold">Next</span>
            <Wallet size={24} primaryColor="#fff" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
