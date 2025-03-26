import { ArrowLeft, CloseSquare } from "react-iconly";
import Image from "common/components/Image";
import PopupStepperComponents from "common/components/PopuStepper";

interface BuyerDataType {
  name: string;
  email: string;
  apartmentNO: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
}

interface ShippingDataType {
  delivaryTime: string;
  tax: string;
  cost: string;
}

interface ReviewPayProps {
  handleClose: () => void;
  BuyerData: BuyerDataType[];
  currentStep: number;
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  selectedOption: string;
  shippingData: ShippingDataType[];
  tickChecked2: boolean;
  toggleTick2: () => void;
  price: string;
  itemImg: string;
  itemName: string;
  boldedColor: string;
  boldedSize: string;
  ETH: string;
  quantity: number;
}

const ReviewPay = ({
  handleClose,
  BuyerData,
  currentStep,
  handleNextStep,
  handlePreviousStep,
  selectedOption,
  shippingData,
  tickChecked2,
  toggleTick2,
  price,
  itemImg,
  itemName,
  boldedColor,
  boldedSize,
  ETH,
  quantity,
}: ReviewPayProps) => {
  return (
    <div className="flex flex-col w-full">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Left Section - Shipping and Billing Info */}
        <div className="space-y-6">
          <h4 className="text-base font-semibold text-text-primary">
            Shipping and Billing Info
          </h4>
          {BuyerData.map((data, index) => (
            <div key={`buyer-${index}`} className="space-y-4">
              <p className="text-sm text-text-secondary">Name: {data.name}</p>
              <p className="text-sm text-text-secondary">Email: {data.email}</p>
              <p className="text-sm text-text-secondary">
                Street/Apartment Number: {data.apartmentNO}
              </p>
              <div className="flex gap-4">
                <p className="text-sm text-text-secondary">City: {data.city}</p>
                <p className="text-sm text-text-secondary">
                  State: {data.state}
                </p>
              </div>
              <p className="text-sm text-text-secondary">
                Country: {data.country}
              </p>
              <p className="text-sm text-text-secondary">
                Postal Code: {data.postalCode}
              </p>
              <p className="text-sm text-text-secondary">
                Phone Number: {data.phone}
              </p>
            </div>
          ))}
        </div>

        {/* Middle Section - Shipping Method and Currency */}
        <div className="space-y-8">
          <div>
            <h4 className="text-base font-semibold text-text-primary mb-4">
              Shipping Method
            </h4>
            <div className="space-y-2">
              <p className="text-sm text-text-secondary">{selectedOption}</p>
              {shippingData.map((shippingdata, index) => (
                <div key={`shipping-${index}`} className="space-y-2">
                  <p className="text-sm text-text-secondary">
                    Delivery Time: {shippingdata.delivaryTime}
                  </p>
                  <p className="text-sm text-text-secondary">
                    TAX: {shippingdata.tax}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold text-text-primary mb-4">
              Selected Currency
            </h4>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTick2}
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
                  {tickChecked2 && (
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
              <p className="text-sm text-text-secondary">USD {price}</p>
            </div>
          </div>

          <div>
            <h4 className="text-base font-semibold text-text-primary mb-2">
              Notes
            </h4>
            <p className="text-sm text-text-secondary">
              Lorem ipsum dolor sit amet consectetur. Erat.
            </p>
          </div>
        </div>

        {/* Right Section - Selected Item and Total */}
        <div className="space-y-8">
          <div>
            <h4 className="text-base font-semibold text-text-primary mb-4">
              Selected Item
            </h4>
            <div className="flex items-start justify-between p-4 bg-background-secondary rounded-lg">
              <div className="flex items-start gap-4">
                <Image
                  src={itemImg}
                  alt={itemName}
                  style={{ height: 45, width: 41 }}
                />
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {itemName}
                  </p>
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-text-secondary">
                      Color: {boldedColor}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Size: {boldedSize}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-text-primary">
                x {quantity}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm text-text-secondary">Item Price</p>
                <p className="text-sm text-text-secondary">
                  {price} ({ETH})
                </p>
              </div>
              {shippingData.map((shippingdata, index) => (
                <div key={`cost-${index}`} className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-sm text-text-secondary">Shipping Cost</p>
                    <p className="text-sm text-text-secondary">
                      {shippingdata.cost}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-text-secondary">Tax</p>
                    <p className="text-sm text-text-secondary">
                      {shippingdata.tax}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-text-primary mb-2">
                  Apply Coupon
                </p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              <div>
                <p className="text-base font-semibold text-text-primary mb-2">
                  Total Price
                </p>
                <p className="text-xl font-semibold text-text-primary">
                  $330.00
                </p>
              </div>
            </div>
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
          <span className="text-sm">Pay with</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="14"
            viewBox="0 0 29 14"
            fill="none"
          >
            <path
              d="M13.6771 4.26783H15.6987V11.4918H13.6771V4.26783ZM5.10642 9.38623C5.10642 6.89112 2.02879 7.34036 2.02879 6.39583L2.03 6.39832C2.03 6.07227 2.29342 5.94534 2.71513 5.94036C3.41457 5.95566 4.10078 6.13979 4.71854 6.47796V4.50676C4.08241 4.24822 3.40381 4.1185 2.71996 4.12472C1.0875 4.12472 0 5.01076 0 6.49165C0 8.8113 3.0595 8.43423 3.0595 9.43476C3.0595 9.82054 2.73808 9.94872 2.28858 9.94872C1.62279 9.94872 0.76125 9.66125 0.0857917 9.27921V11.1658C0.77931 11.4769 1.52729 11.6387 2.28375 11.6412C3.95608 11.6399 5.10642 10.8945 5.10642 9.38623ZM13.6711 3.63316L15.6926 3.18516V1.47778L13.6711 1.92578V3.63316ZM19.8988 4.12721C19.3101 4.12467 18.7439 4.36015 18.322 4.78303L18.218 4.26409H16.4454V13.9222L18.4573 13.478L18.4621 11.111C18.7521 11.3325 19.1823 11.6399 19.8855 11.6399C21.3271 11.6399 22.6405 10.5461 22.6405 7.88667C22.6454 5.45254 21.3138 4.12721 19.8988 4.12721ZM19.4191 9.90267C18.9467 9.90392 18.6675 9.72472 18.4718 9.50694L18.4585 6.39458C18.6675 6.15441 18.9575 5.97894 19.4191 5.97894C20.1526 5.97894 20.6601 6.83761 20.6601 7.93147C20.6661 9.05894 20.1671 9.90267 19.4191 9.90267ZM26.0903 4.12721C24.1775 4.12721 23.0127 5.81965 23.0127 7.95263C23.0127 10.4751 24.3854 11.6412 26.3441 11.6412C27.3047 11.6412 28.0249 11.4147 28.5735 11.0986V9.52312C28.0249 9.81058 27.3953 9.98481 26.5978 9.98481C25.8136 9.98481 25.1249 9.69734 25.0343 8.71672H28.9722C28.9807 8.60845 28.9988 8.16916 28.9988 7.96756H29C29 5.82089 28.0031 4.12721 26.0903 4.12721ZM25.0161 7.17361C25.0161 6.23032 25.5744 5.83458 26.077 5.83458C26.5713 5.83458 27.0969 6.23156 27.0969 7.17361H25.0161ZM9.0045 6.05112V4.26783H7.47717L7.47233 2.45218L5.50879 2.88649L5.50033 9.60152C5.50033 10.8422 6.39813 11.6437 7.58954 11.6437C8.25171 11.6437 8.73625 11.5155 9.0045 11.3649V9.77076C8.74592 9.87903 7.47717 10.2661 7.47717 9.03032V6.04987H9.0045V6.05112ZM13.1914 6.19298V4.26907C12.9195 4.16952 11.9818 3.98658 11.5106 4.88632L11.3873 4.26907H9.64733V11.4931H11.6556V6.63103C12.1317 5.98018 12.934 6.10836 13.1914 6.19298Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ReviewPay;
