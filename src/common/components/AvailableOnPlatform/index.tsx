import { FC } from "react";
import { FaEtsy, FaShopify } from "react-icons/fa";
import { PlatformType } from "api/services/posts/interfaces/post-response.interface";
import { toCapitalize } from "common/util/helpers";

interface AvailableOnProps {
  type: string;
}

const AvailableOnPlatform: FC<AvailableOnProps> = ({ type }) => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <p>Available on</p>
      <div className="flex items-center">
        {type === PlatformType.ETSY ? (
          <FaEtsy color="#f1641e" />
        ) : (
          <FaShopify color="#94bf45" className="mr-1" />
        )}

        <span className="font-bold">{toCapitalize(type)}</span>
      </div>
    </div>
  );
};

export default AvailableOnPlatform;
