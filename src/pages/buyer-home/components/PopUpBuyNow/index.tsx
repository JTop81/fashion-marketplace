import { useState } from "react";

import {
  BillingDetails,
  OrderPlaced,
  ProductDetail,
  ReviewPay,
  ShippingDetails,
} from "./steps";

interface PopUpBuyNowProps {
  setshowPopupbuynow: (value: boolean) => void;
  itemImg: string;
  itemName: string;
  price: string;
  ETH: string;
  storeName: string;
}

const PopUpBuyNow = ({
  setshowPopupbuynow,
  itemImg,
  itemName,
  price,
  ETH,
  storeName,
}: PopUpBuyNowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isOpen1, setIsOpen1] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [, setTickedCircle] = useState<number | null>(null);
  const [boldedColor, setBoldedColor] = useState("");
  const [boldedSize, setBoldedSize] = useState("");
  const [tickChecked, setTickChecked] = useState(false);
  const [tickChecked2, setTickChecked2] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleClose = () => {
    setshowPopupbuynow(false);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const toggleCircle = (circleNumber: number) => {
    setTickedCircle((prevTicked) =>
      prevTicked === circleNumber ? null : circleNumber,
    );
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

  const toggleTick = () => {
    setTickChecked(!tickChecked);
  };
  const toggleTick2 = () => {
    setTickChecked2(!tickChecked2);
  };
  const toggleDropdown1 = () => {
    setIsOpen1(!isOpen1);
  };

  const handleSelected = ({ option }: { option: string }) => {
    setSelectedOption(option);
    toggleDropdown1();
  };

  const BuyerData = [
    {
      name: "Jone Doe",
      email: "john@abc.com",
      apartmentNO: "No.204 6",
      phone: "+30 0300- -3030 00",
      state: "state",
      postalCode: "90060",
      city: "New York",
      country: "USA",
    },
  ];

  const shippingData = [
    {
      delivaryTime: "2-5 Days",
      tax: "$30",
      state: "state",
      postalCode: "90060",
      city: "New York",
      country: "USA",
      cost: "$100",
      estimatedTime: "12 days",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-4xl bg-white rounded-2xl p-6 shadow-lg">
        {currentStep === 1 && (
          <ProductDetail
            handleClose={handleClose}
            currentStep={currentStep}
            itemImg={itemImg}
            itemName={itemName}
            price={price}
            ETH={ETH}
            toggleBold={toggleBold}
            boldedColor={boldedColor}
            toggleBoldSize={toggleBoldSize}
            boldedSize={boldedSize}
            decreaseQuantity={decreaseQuantity}
            quantity={quantity}
            setQuantity={setQuantity}
            toggleCircle={toggleCircle}
            tickedCircle={null}
            handleNextStep={handleNextStep}
          />
        )}
        {currentStep === 2 && (
          <BillingDetails
            BuyerData={BuyerData}
            handleClose={handleClose}
            currentStep={currentStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        )}
        {currentStep === 3 && (
          <ShippingDetails
            shippingData={shippingData}
            handleClose={handleClose}
            currentStep={currentStep}
            selectedOption={selectedOption}
            toggleDropdown1={toggleDropdown1}
            isOpen1={isOpen1}
            handleSelected={handleSelected}
            toggleTick={toggleTick}
            tickChecked={tickChecked}
            handleNextStep={handleNextStep}
            handlePreviousStep={handleNextStep}
          />
        )}
        {currentStep === 4 && (
          <ReviewPay
            handleClose={handleClose}
            BuyerData={BuyerData}
            currentStep={currentStep}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
            selectedOption={selectedOption}
            shippingData={shippingData}
            tickChecked2={tickChecked2}
            toggleTick2={toggleTick2}
            price={price}
            itemImg={itemImg}
            itemName={itemName}
            boldedColor={boldedColor}
            boldedSize={boldedSize}
            ETH={ETH}
            quantity={quantity}
          />
        )}
        {currentStep === 5 && (
          <OrderPlaced
            itemImg={itemImg}
            itemName={itemName}
            price={price}
            ETH={ETH}
            storeName={storeName}
            shippingData={shippingData}
            handleClose={handleClose}
          />
        )}
      </div>
    </div>
  );
};

export default PopUpBuyNow;
