import { Message } from "react-iconly";
import { IoStarOutline } from "react-icons/io5";
import Copy from "assets/images/PopUp/Copy.png";

import Image from "../Image";
import PrimaryButtonIcon from "../PrimaryButtonIcon";

interface OrderItemProps {
  orderData: any[];
  selectedProductData: any;
  handleContactBuyer: () => void;
}

const OrderItem: React.FC<OrderItemProps> = ({
  orderData,
  selectedProductData,
  handleContactBuyer,
}) => {
  return (
    <div className="flex flex-col items-start gap-6 self-stretch">
      {orderData.map((order: any, index: number) => (
        <div
          key={`order-${index.toString()}`}
          className="flex items-start gap-10 self-stretch"
        >
          {/* Left Section */}
          <div className="w-[533.5px] flex flex-col items-start gap-7">
            {/* Ordered Item */}
            <div className="w-full flex flex-col items-start gap-2.5">
              <p className="text-black font-poppins text-lg font-semibold leading-[150%]">
                Ordered Item
              </p>
              <div className="flex p-2.5 items-center gap-7 self-stretch rounded-md bg-white shadow-[0px_2px_24px_0px_rgba(0,0,0,0.08)]">
                <Image
                  src={selectedProductData?.ProductImg}
                  alt=""
                  width="57"
                />
                <div className="flex flex-col items-start gap-0.5">
                  <p className="text-black font-poppins text-lg font-semibold leading-[150%]">
                    {selectedProductData?.ProductName}
                  </p>
                  <p className="text-black font-poppins text-lg font-medium leading-[150%]">
                    {selectedProductData?.ETH}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex items-start gap-2 self-stretch">
              <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                Payment Method :
              </p>
              <p className="text-black font-poppins text-sm font-normal leading-[150%]">
                {order?.method}
              </p>
            </div>

            {/* Discounts */}
            <div className="flex items-start gap-[58px] flex-1">
              <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                Discounts :
              </p>
              <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                {order?.discounts}
              </p>
            </div>

            {/* Billing Address */}
            <div className="flex items-start gap-[70px] flex-1">
              <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                Billed to :
              </p>
              <div className="w-[158px] h-[124px] flex flex-col">
                <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                  {order?.address?.name}
                </p>
                <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                  {order?.address?.apartmentno}
                </p>
                <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                  {order?.address?.city},
                </p>
                <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                  {order?.address?.country}
                </p>
                <br />
                <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                  R3-234556
                </p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start gap-[18px] flex-1">
              <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                Phone Number :
              </p>
              <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                {order?.phone}
              </p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex flex-col justify-between items-start flex-1 self-stretch">
            {/* Order Status */}
            <div className="flex flex-col items-start gap-6 self-stretch">
              <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                Order Status
              </p>
              <div className="flex flex-col items-start gap-2.5 self-stretch">
                <div className="flex px-2 py-2 justify-end items-center gap-5 rounded-md bg-[#D5FBCF] shadow-[0px_3px_35px_0px_rgba(0,0,0,0.07)]">
                  <p className="text-[#056309] text-center font-poppins text-sm font-normal leading-[150%]">
                    {selectedProductData?.status}
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <p className="text-black font-poppins text-xs font-normal leading-[150%]">
                    Tracking Number : {order?.trackingNo}
                  </p>
                  <Image src={Copy} alt="copyicon" width="24" height="24" />
                </div>
              </div>
            </div>

            {/* Delivery Date */}
            <div className="flex flex-col items-start gap-6 self-stretch">
              <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                Delivered On
              </p>
              <div className="flex flex-col items-start gap-2.5 self-stretch">
                <p className="text-black font-poppins text-xs font-normal leading-[150%]">
                  {order?.deliveredON}
                </p>
              </div>
            </div>

            {/* Ratings */}
            <div className="flex flex-col items-start gap-6 self-stretch">
              <p className="text-black font-poppins text-sm font-medium leading-[150%]">
                Ratings
              </p>
              <div className="flex flex-col items-start gap-2.5 self-stretch">
                <p className="text-black font-poppins text-xs font-normal leading-[150%]">
                  Not Rated Yet.
                </p>
                <div className="flex items-start gap-1">
                  <IoStarOutline size={24} fill="#9f00d9" />
                  <IoStarOutline size={24} fill="#9f00d9" />
                  <IoStarOutline size={24} fill="#9f00d9" />
                  <IoStarOutline size={24} fill="#9f00d9" />
                  <IoStarOutline size={24} fill="#9f00d9" />
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <PrimaryButtonIcon
              onClick={handleContactBuyer}
              text="Contact Buyer"
              icon={<Message set="light" size={24} primaryColor="#fff" />}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderItem;
