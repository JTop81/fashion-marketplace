import { FC, useState } from "react";

interface ProductDescriptionProps {
  description?: string;
}

const PublicProductDescription: FC<ProductDescriptionProps> = ({
  description,
}) => {
  const [showMore, setShowMore] = useState(false);

  if (!description) {
    return null;
  }

  const needsTruncation = description.length > 150;
  const truncatedText =
    needsTruncation && !showMore
      ? description.slice(0, 150) + "..."
      : description;

  return (
    <div className="w-full mt-[6px] text-sm">
      <div className="relative">
        <p className="font-normal text-slate-400">
          <span className="block transition-all duration-200">
            {truncatedText}
          </span>
          {needsTruncation && (
            <button
              className="font-semibold cursor-pointer inline text-black ml-1 hover:text-primary transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setShowMore((prev) => !prev);
              }}
            >
              {showMore ? "Less" : "More"}
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default PublicProductDescription;
