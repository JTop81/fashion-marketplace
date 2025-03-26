import { Bookmark, Buy, Chat, Edit, Heart } from "react-iconly";
import { TbShare3 } from "react-icons/tb";
import { IStatistics } from "api/services/posts/interfaces/post-statistics.interface";
import { Role } from "enums/role";

import ProductIcons from "../ProductCard/ProductCardIcons";

const PublicProductCardBadges = ({
  statistics,
  role,
}: {
  statistics: IStatistics;
  role: Role;
}) => {
  return (
    <div className="mt-4 lg:mt-0 w-full lg:w-[10%]">
      <div className="flex lg:block flex-wrap items-center gap-5 space-y-0 lg:space-y-4">
        <ProductIcons detail={statistics?.total.reactions || ""}>
          <Heart size={24} />
        </ProductIcons>
        <ProductIcons detail={statistics?.total.comments || ""}>
          <Chat size={24} />
        </ProductIcons>
        <ProductIcons detail="Share">
          <TbShare3 size={24} />
        </ProductIcons>
        <div className="my-4 opacity-10 border hidden lg:block" />
        {role === Role.SHOPPER && (
          <>
            <ProductIcons detail="Save">
              <Bookmark size={24} />
            </ProductIcons>
            <ProductIcons detail="Buy Now" secondaryBg>
              <Buy size={24} primaryColor="#ffffff" />
            </ProductIcons>
          </>
        )}
        {role === Role.BOUTIQUE && (
          <ProductIcons detail="Edit" secondaryBg>
            <Edit size={24} primaryColor="#ffffff" />
          </ProductIcons>
        )}
      </div>
    </div>
  );
};

export default PublicProductCardBadges;
