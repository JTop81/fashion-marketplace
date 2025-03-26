import React, { memo, useState } from "react";
import { CloseSquare } from "react-iconly";
import clsx from "clsx";
import { CloseButton } from "common/components/SelectVariations/style";
import PropTypes from "prop-types";

import { StoreFrontInfoForm } from "../../types";

import { storFrontInputClasses } from "./constants";

type StoreFrontFormLinksProps = {
  setFormState: React.Dispatch<React.SetStateAction<StoreFrontInfoForm>>;
  storeWebsites: string[];
};

type WebsiteInputProps = {
  website: string; // The value of the input field (the website URL)
  index: number; // The index of the website in the array
  handleChange: (
    index: number,
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void; // Handler for changing input value
  removeInput: (index: number) => void; // Function to remove the input field
};

const WebsiteInput: React.FC<WebsiteInputProps> = memo(
  ({ website, index, handleChange, removeInput }) => (
    <div
      className="flex flex-row flex-start items-center mb-2 relative w-full"
      // eslint-disable-next-line react/no-array-index-key
      key={`website-${index}`}
    >
      <input
        className={`${storFrontInputClasses} w-full pr-10`} // Add padding to make space for the button
        type="text"
        value={website}
        onChange={handleChange(index)}
        placeholder={`Website ${index + 1}`}
      />
      <CloseButton
        type="button"
        onClick={() => {
          removeInput(index);
        }}
        className="absolute right-2" // Position button to the right inside the container
      >
        <CloseSquare size={20} primaryColor="black" />
      </CloseButton>
    </div>
  ),
);

const inputClasses = clsx(
  "w-full h-11",
  "text-sm text-gray-700 placeholder-gray-400",
  "border border-black/10 rounded-lg",
  "px-5",
  "focus:outline-none",
  "transition-colors duration-200",
  "hover:border-primary/20",
);

export default function StoreFrontFormLinks({
  setFormState,
  storeWebsites,
}: StoreFrontFormLinksProps) {
  const [newWebsite, setNewWebsite] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddWebsite = () => {
    if (!newWebsite) {
      setError("Please enter a website URL");
      return;
    }

    if (!validateUrl(newWebsite)) {
      setError("Please enter a valid website URL (e.g., https://example.com)");
      return;
    }

    setFormState((prev) => ({
      ...prev,
      storeWebsites: [...prev.storeWebsites, newWebsite],
    }));
    setNewWebsite("");
    setError("");
  };

  const handleRemoveWebsite = (index: number) => {
    setFormState((prev) => ({
      ...prev,
      storeWebsites: prev.storeWebsites.filter((_, i) => i !== index),
    }));
  };

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWebsite(e.target.value);
    setError("");
  };

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-gray-700">
        Store Websites
      </label>

      {storeWebsites.map((website, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={website}
            disabled
            className={clsx(inputClasses, "bg-gray-50")}
          />
          <button
            type="button"
            onClick={() => handleRemoveWebsite(index)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ))}

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newWebsite}
            onChange={handleWebsiteChange}
            placeholder="Enter website URL (e.g., https://example.com)"
            className={inputClasses}
          />
          <button
            type="button"
            onClick={handleAddWebsite}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add
          </button>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}

// Add PropTypes for validation
WebsiteInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  removeInput: PropTypes.func.isRequired,
  website: PropTypes.string.isRequired,
};
