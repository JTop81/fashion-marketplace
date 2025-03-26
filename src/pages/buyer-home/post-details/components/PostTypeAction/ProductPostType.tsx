import { BsCart, BsWallet } from "react-icons/bs";

import { ProductAction } from "../ProductAction";

const ProductPostType = () => {
  return (
    <>
      <ProductAction
        variant="outlined"
        className="flex-grow justify-center border-secondary text-secondary"
        action={"Add to cart"}
        icon={<BsCart />}
      />
      <ProductAction
        variant="contained"
        className="flex-grow justify-center bg-secondary"
        action={"Buy Now"}
        icon={<BsWallet />}
      />
    </>
  );
};

export default ProductPostType;
