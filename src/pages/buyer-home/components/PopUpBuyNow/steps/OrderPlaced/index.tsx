import { CloseSquare } from "react-iconly";
import { Link, useLocation } from "react-router-dom";
import Image from "common/components/Image";

interface OrderPlacedProps {
  itemImg: string;
  itemName: string;
  price: string;
  ETH: string;
  storeName: string;
  shippingData: Array<{
    estimatedTime: string;
  }>;
  handleClose: () => void;
}

const OrderPlaced = ({
  itemImg,
  itemName,
  price,
  ETH,
  storeName,
  shippingData,
  handleClose,
}: OrderPlacedProps) => {
  const location = useLocation();
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-center mb-6">
        <h3 className="text-xl font-semibold text-text-primary">
          Thank you! Your order placed successfully!
        </h3>
      </div>
      <div className="flex flex-col gap-6 p-6 bg-white rounded-lg">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-1 space-y-6">
            <div>
              <p className="text-sm font-medium text-text-primary mb-4">
                Ordered Item
              </p>
              <div className="flex items-start gap-4">
                <Image
                  src={itemImg}
                  alt={itemName}
                  style={{ height: 73, width: 66, borderRadius: "0.5rem" }}
                />
                <div>
                  <h4 className="text-base font-semibold text-text-primary">
                    {itemName}
                  </h4>
                  <p className="text-sm text-text-secondary mt-1">
                    {price} ({ETH})
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">
                Order Number
              </p>
              <p className="text-base text-text-primary">#28489389</p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">
                Seller Name
              </p>
              <p className="text-base text-text-primary">{storeName}</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-72 space-y-6">
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">
                Amount
              </p>
              <div>
                <p className="text-base text-text-primary">
                  {price} ({ETH})
                </p>
                <p className="text-sm text-text-secondary">
                  (paid from wallet)
                </p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary mb-2">
                Estimated Delivery Time
              </p>
              {shippingData.map((shippingdata, index) => (
                <p
                  key={`shipping-${index}`}
                  className="text-base text-text-primary"
                >
                  {shippingdata.estimatedTime}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        {location.pathname === "/buyer/feeds" ? (
          <button
            onClick={handleClose}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span className="text-sm">Close</span>
            <CloseSquare size={12} primaryColor="#fff" />
          </button>
        ) : (
          <Link to="/buyer/feeds">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              <span className="text-sm">Close</span>
              <CloseSquare size={12} primaryColor="#fff" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default OrderPlaced;
