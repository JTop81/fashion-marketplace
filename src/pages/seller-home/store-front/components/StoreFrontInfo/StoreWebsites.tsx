import { useState } from "react";
import { FiLink } from "react-icons/fi";
import { LuGlobe2 } from "react-icons/lu";

type StoreWebsitesProps = {
  storeWebsites: any;
};

type StoreAddressProps = {
  address: string;
  type: "link" | "website"; // Define the type of address
};

function StoreAddress({ address, type }: StoreAddressProps) {
  return (
    <div className="bg-card flex mt-3 items-center py-[6px] px-3 w-fit rounded-full mr-[10px] lg:mt-[10px]">
      {type === "link" && <FiLink className="mr-[6px]" size={24} />}
      {type === "website" && <LuGlobe2 className="mr-[6px]" size={24} />}
      {address}
    </div>
  );
}

export default function StoreWebsites(props: StoreWebsitesProps) {
  const { storeWebsites } = props;
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="mt-4 flex items-center justify-center lg:justify-start">
      {/* On large screens, show all items */}
      <div className="hidden lg:flex lg:flex-wrap">
        {storeWebsites.map((website: string) => (
          <StoreAddress key={website} address={website} type="website" />
        ))}
      </div>

      {/* On small screens, show only the first item and a "More" button */}
      <div className="lg:hidden flex-col flex items-center">
        {showAll ? (
          storeWebsites.map((website: string) => (
            <StoreAddress key={website} address={website} type="website" />
          ))
        ) : (
          <StoreAddress address={storeWebsites[0]} type="website" />
        )}

        {/* Toggle between More and Less button */}
        {storeWebsites.length > 1 && (
          <span
            className="text-primary underline cursor-pointer"
            onClick={handleToggle}
          >
            {showAll ? "Less" : `+${storeWebsites.length - 1} more`}
          </span>
        )}
      </div>
    </div>
  );
}
