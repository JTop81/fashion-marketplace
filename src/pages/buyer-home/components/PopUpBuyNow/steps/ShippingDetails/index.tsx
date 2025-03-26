import { ArrowLeft, CloseSquare, Wallet } from "react-iconly";
import clsx from "clsx";
import PopupStepperComponents from "common/components/PopuStepper";

interface ShippingDataType {
  delivaryTime: string;
  tax: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface ShippingDetailsProps {
  shippingData: ShippingDataType[];
  handleClose: () => void;
  currentStep: number;
  selectedOption: string;
  toggleDropdown1: () => void;
  isOpen1: boolean;
  handleSelected: (args: { option: string }) => void;
  toggleTick: () => void;
  tickChecked: boolean;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const ShippingDetails = ({
  shippingData,
  handleClose,
  currentStep,
  selectedOption,
  toggleDropdown1,
  isOpen1,
  handleSelected,
  toggleTick,
  tickChecked,
  handleNextStep,
  handlePreviousStep,
}: ShippingDetailsProps) => {
  return (
    <>
      {shippingData.map((shippingdata, index) => (
        <div key={`shipping-${index}`} className="flex flex-col w-full">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-text-primary">Buy Now</h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <CloseSquare size={24} stroke="light" />
            </button>
          </div>

          <PopupStepperComponents currentStep={currentStep} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Left Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-text-primary">
                  Shipping Method
                </p>
                <div className="relative">
                  <button
                    onClick={toggleDropdown1}
                    className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {selectedOption || "Select Shipping Method"}
                  </button>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      className={clsx("transform transition-transform", {
                        "rotate-180": isOpen1,
                      })}
                    >
                      <path
                        d="M4.96967 7.96967C5.23594 7.7034 5.6526 7.6792 5.94621 7.89705L6.03033 7.96967L12.5 14.439L18.9697 7.96967C19.2359 7.7034 19.6526 7.6792 19.9462 7.89705L20.0303 7.96967C20.2966 8.23594 20.3208 8.6526 20.1029 8.94621L20.0303 9.03033L13.0303 16.0303C12.7641 16.2966 12.3474 16.3208 12.0538 16.1029L11.9697 16.0303L4.96967 9.03033C4.67678 8.73744 4.67678 8.26256 4.96967 7.96967Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                  {isOpen1 && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
                      <div className="py-1">
                        {[
                          "USPS Shipping",
                          "FedEx Shipping",
                          "UPS Shipping",
                        ].map((option) => (
                          <button
                            key={option}
                            onClick={() => handleSelected({ option })}
                            className="w-full px-4 py-2 text-left hover:bg-gray-100"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-text-primary">
                  Delivery Time
                </p>
                <input
                  type="text"
                  placeholder={shippingdata.delivaryTime}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-text-primary">
                  Tax Amount
                </p>
                <input
                  type="text"
                  placeholder={shippingdata.tax}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  readOnly
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <h4 className="text-base font-semibold text-text-primary">
                Shipping Address
              </h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-text-primary">City</p>
                  <input
                    type="text"
                    placeholder={shippingdata.city}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-text-primary">State</p>
                  <input
                    type="text"
                    placeholder={shippingdata.state}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-text-primary">
                    Country
                  </p>
                  <input
                    type="text"
                    placeholder={shippingdata.country}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-text-primary">
                    Postal Code
                  </p>
                  <input
                    type="text"
                    placeholder={shippingdata.postalCode}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTick}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.8345 0.750244H6.16549C3.14449 0.750244 1.25049 2.88924 1.25049 5.91624V14.0842C1.25049 17.1112 3.13549 19.2502 6.16549 19.2502H14.8335C17.8645 19.2502 19.7505 17.1112 19.7505 14.0842V5.91624C19.7505 2.88924 17.8645 0.750244 14.8345 0.750244Z"
                      stroke="#130F26"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {tickChecked && (
                      <path
                        d="M6.93994 10.0002L9.31394 12.3732L14.0599 7.6272"
                        stroke="#130F26"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                  </svg>
                </button>
                <span className="text-sm text-text-secondary">
                  Same as billing Address
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePreviousStep}
              className="flex items-center gap-2 px-4 py-2 text-text-primary hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={16} primaryColor="#000" />
              <span className="text-sm font-medium">Go Back</span>
            </button>
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              <span className="text-sm">Next</span>
              <Wallet size={16} primaryColor="#fff" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShippingDetails;
