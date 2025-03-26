// InteractionView.tsx
import React, { useState } from "react";
import { Buy, Heart, MoreCircle } from "react-iconly";
import clsx from "clsx";
import PopUpComment from "common/components/PopUpComment";
import PopupBuyerSelectVariations from "common/components/SelectVariations";

import AddToCart from "pages/buyer-home/components/AddToCart";

export interface InteractionViewProps {
  reactions?: number;
  comments?: number;
  newComments?: number;
  itemImg?: string;
}

const InteractionView: React.FC<InteractionViewProps> = ({
  reactions,
  comments,
  newComments,
  itemImg,
}) => {
  const [selectVariations, setSelectVariations] = useState(false);
  const [addCart, setAddCart] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const handlePopupSelectVariations = () => {
    setSelectVariations(true);
  };

  const handleCommentPopup = () => {
    setShowComment(true);
  };

  return (
    <div
      className={clsx(
        "inline-flex flex-col justify-center items-center gap-4 absolute mt-[254px] ml-[480px]",
        "xl:ml-[340px]",
        "lg:mt-[130px]",
        "md:ml-0 md:z-[2] md:mt-[80px]",
      )}
    >
      {/* Wishlist Section */}
      <div className="flex flex-col items-start gap-2">
        <Heart size={32} stroke="light" />
        <div className="flex flex-col justify-center items-center gap-2 px-2 rounded">
          <p className="text-base font-semibold">{reactions}</p>
        </div>
      </div>

      {/* Comments Section */}
      <button onClick={handleCommentPopup} className="relative w-10 h-[66px]">
        <div className="absolute -top-[5px] right-0 inline-flex flex-col items-start gap-2 px-1 rounded bg-primarySecondary">
          <p className="text-sm text-text-secondary">{newComments}</p>
        </div>
        <MoreCircle size={37} stroke="light" />
        <div className="flex flex-col justify-center items-center gap-2 px-2 rounded">
          <p className="text-base font-semibold">{comments}</p>
        </div>
      </button>

      {/* Cart Section */}
      <button onClick={handlePopupSelectVariations}>
        <div className="flex flex-col justify-center items-center gap-2">
          <Buy size={37} stroke="light" />
          <p className="text-base font-semibold">Add to cart</p>
        </div>
      </button>

      {/* Popups */}
      {selectVariations && (
        <PopupBuyerSelectVariations
          setSelectVariations={setSelectVariations}
          setAddCart={setAddCart}
        />
      )}
      {addCart && itemImg && (
        <AddToCart setAddCart={setAddCart} itemImg={itemImg} />
      )}
      {showComment && <PopUpComment setShowComment={setShowComment} />}
    </div>
  );
};

export default InteractionView;
