import { Buy } from "react-iconly";
import { Link } from "react-router-dom";
import { CloseButton } from "assets";

interface AddToCartProps {
  setAddCart: (value: boolean) => void;
  itemImg: string;
}

const AddToCart = ({ setAddCart, itemImg }: AddToCartProps) => {
  const handleClose = () => {
    setAddCart(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-semibold text-text-primary">
              Item is added to Cart Successfully!
            </h3>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <img src={CloseButton} alt="close button" className="w-5 h-5" />
            </button>
          </div>

          <img
            src={itemImg}
            alt="Product"
            className="w-48 h-48 object-cover rounded-lg"
          />

          <Link
            to="/buyer/cart"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <span className="text-base font-semibold">View My Cart</span>
            <Buy size={24} primaryColor="#fff" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
