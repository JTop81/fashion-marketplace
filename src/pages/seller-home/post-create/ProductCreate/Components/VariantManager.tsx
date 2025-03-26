import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

import { OverviewStepProps } from "../overview-step/model";

export interface Variant {
  name: string;
  description: string;
}

type VariantManagerProps = {
  formik: OverviewStepProps;
};

const POPULAR_VARIANTS = [
  "Color",
  "Size",
  "Material",
  "Style",
  "Pattern",
  "Length",
  "Width",
  "Custom",
] as const;

export const VariantManager: React.FC<VariantManagerProps> = ({
  formik: {
    values: { variants },
    setFieldValue,
    errors,
  },
}) => {
  const [newVariant, setNewVariant] = useState<Variant>({
    name: "",
    description: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [customVariant, setCustomVariant] = useState(false);

  const handleAddVariant = () => {
    if (newVariant.name.trim() && newVariant.description.trim()) {
      setFieldValue("variants", [...(variants || []), newVariant]);
      setNewVariant({ name: "", description: "" });
      setCustomVariant(false);
      setIsDropdownOpen(false);
    }
  };

  const handleRemoveVariant = (index: number) => {
    const newVariants = [...(variants || [])];
    newVariants.splice(index, 1);
    setFieldValue("variants", newVariants);
  };

  const handleClear = () => {
    setNewVariant({ name: "", description: "" });
    setCustomVariant(false);
    setIsDropdownOpen(false);
  };

  const handleVariantSelect = (variant: (typeof POPULAR_VARIANTS)[number]) => {
    if (variant === "Custom") {
      setCustomVariant(true);
      setNewVariant({ ...newVariant, name: "" });
    } else {
      setNewVariant({ ...newVariant, name: variant });
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full max-w-5xl space-y-6 mb-16">
      {/* Variants Table */}
      <div className="bg-white rounded-md ring-1 ring-gray-200 shadow-sm">
        {/* Header */}
        <div className="flex items-center px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="w-[40%]">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Variant Name
            </span>
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Description
            </span>
          </div>
        </div>

        {/* Variants List */}
        <div>
          {variants &&
            variants.map((variant, index) => (
              <div
                key={`varaint-${index.toString()}`}
                className="group flex items-center px-6 py-4 hover:bg-gray-50 transition-colors relative border-b border-gray-100 last:border-b-0"
              >
                <div className="w-[40%] min-w-0 pr-4">
                  <span
                    className="block text-sm font-medium text-gray-900 truncate"
                    title={variant.name}
                  >
                    {variant.name}
                  </span>
                </div>
                <div className="flex-1 min-w-0 pr-12">
                  <span
                    className="block text-sm text-gray-600 truncate"
                    title={variant.description}
                  >
                    {variant.description}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveVariant(index)}
                  className="absolute right-4 w-8 h-8 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                  <IoClose className="w-4 h-4" />
                </button>
              </div>
            ))}

          {/* Input Form Row */}
          <div className="flex items-start gap-4 p-6 bg-gray-50 border-t border-gray-200">
            <div className="w-[40%]">
              <div className="relative">
                {customVariant ? (
                  <input
                    type="text"
                    value={newVariant.name}
                    onChange={(e) =>
                      setNewVariant({
                        ...newVariant,
                        name: e.target.value.slice(0, 50),
                      })
                    }
                    placeholder="Enter custom variant name"
                    className="w-full h-11 px-4 bg-white rounded-md text-sm placeholder:text-gray-400 border border-black/10 focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-all"
                    maxLength={50}
                  />
                ) : (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full h-11 px-4 bg-white rounded-md text-sm text-left border border-black/10 focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-all flex items-center justify-between"
                    >
                      <span
                        className={
                          newVariant.name ? "text-gray-900" : "text-gray-400"
                        }
                      >
                        {newVariant.name || "Select variant type"}
                      </span>
                      <MdKeyboardArrowDown
                        className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-[9999] w-full mt-1 bg-white border border-black/10 rounded-md shadow-lg">
                        <div className="py-1 max-h-[240px] overflow-auto">
                          {POPULAR_VARIANTS.map((variant) => (
                            <button
                              key={variant}
                              type="button"
                              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 text-left transition-colors"
                              onClick={() => handleVariantSelect(variant)}
                            >
                              {variant}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={newVariant.description}
                onChange={(e) =>
                  setNewVariant({ ...newVariant, description: e.target.value })
                }
                placeholder="Enter description (e.g. Red, Blue, Cotton)"
                className="w-full h-11 px-4 bg-white rounded-md text-sm placeholder:text-gray-400 border border-black/10 focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition-all"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddVariant();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={handleClear}
          className="h-11 px-8 bg-gray-100 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleAddVariant}
          className="h-11 px-8 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Add Variant
        </button>
      </div>

      {errors.variants && typeof errors.variants === "string" && (
        <p className="text-red-500 text-sm">{errors.variants}</p>
      )}
    </div>
  );
};
