import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

import { platformTypeOptions } from "pages/seller-home/post-create/ExternalCreate/models";

import { OverviewStepProps } from "../overview-step/model";

type SizeVariantProps = {
  formik: OverviewStepProps;
};

export const PlatformEdit = ({
  formik: {
    values: { platformType },
    setFieldValue,
    errors: { platformType: platformTypeError },
  },
}: SizeVariantProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePlatformSelect = (platform: string) => {
    setFieldValue("platformType", platform);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full h-11 px-4 bg-white rounded-md text-sm text-left border border-black/10 focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-all flex items-center justify-between"
        >
          <span className={platformType ? "text-gray-900" : "text-gray-400"}>
            {platformType || "Select platform"}
          </span>
          <MdKeyboardArrowDown
            className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && (
          <div className="absolute z-[9999] w-full mt-1 bg-white border border-black/10 rounded-md shadow-lg">
            <div className="py-1 max-h-[240px] overflow-auto">
              {platformTypeOptions.map((platform) => (
                <button
                  key={platform}
                  type="button"
                  className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors"
                  onClick={() => handlePlatformSelect(platform)}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {platformTypeError && (
        <p className="text-red-500 text-sm mt-1">{platformTypeError}</p>
      )}
    </div>
  );
};
