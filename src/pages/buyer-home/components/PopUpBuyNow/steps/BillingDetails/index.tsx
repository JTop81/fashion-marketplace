import { ArrowLeft, CloseSquare, Wallet } from "react-iconly";
import PopupStepperComponents from "common/components/PopuStepper";

interface BuyerDataType {
  name: string;
  email: string;
  apartmentNO: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

interface BillingDetailsProps {
  BuyerData: BuyerDataType[];
  handleClose: () => void;
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
}

const BillingDetails = ({
  BuyerData,
  handleClose,
  currentStep,
  handleNextStep,
  handlePreviousStep,
}: BillingDetailsProps) => {
  return (
    <>
      {BuyerData.map((data, index) => (
        <div key={`buyerData-${index}`} className="flex flex-col w-full">
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
                <label className="text-sm font-medium text-text-primary">
                  Enter Your Name
                </label>
                <input
                  type="text"
                  placeholder={data.name}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Email
                </label>
                <input
                  type="email"
                  placeholder={data.email}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Street/Apartment Number
                </label>
                <input
                  type="text"
                  placeholder={data.apartmentNO}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder={data.phone}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  City
                </label>
                <input
                  type="text"
                  placeholder={data.city}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  State
                </label>
                <input
                  type="text"
                  placeholder={data.state}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Country
                </label>
                <input
                  type="text"
                  placeholder={data.country}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder={data.postalCode}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
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

export default BillingDetails;
