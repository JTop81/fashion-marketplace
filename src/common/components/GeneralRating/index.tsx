import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type GeneralRatingProps = {
  rating: number;
  handleRatingChange: (rating: number) => void;
  starsColor: string;
  starSize: number;
  spaceBetweenStars: number;
};

export default function GeneralRating({
  handleRatingChange,
  rating,
  starsColor,
  starSize,
  spaceBetweenStars,
}: GeneralRatingProps) {
  const [hover, setHover] = useState<number>(0);

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={ratingValue} className={`mr-${spaceBetweenStars}`}>
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleRatingChange(ratingValue)}
            />
            <div
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
            >
              {ratingValue <= (hover || rating) ? (
                <AiFillStar color={starsColor} size={starSize} />
              ) : (
                <AiOutlineStar size={starSize} color={starsColor} />
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
