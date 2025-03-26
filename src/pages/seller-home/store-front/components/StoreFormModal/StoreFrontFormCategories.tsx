import { useState } from "react";
import { Transition } from "@headlessui/react";
import Searchbar from "common/components/Searchbar";

import { Category } from "../../types";

interface StoreFrontFormCategoriesProps {
  editModalOpen: boolean;
  selectedCategories: Category[];
  updateSelectedCategories: (categories: Category[]) => void;
}

export default function StoreFrontFormCategories({
  editModalOpen,
  selectedCategories,
  updateSelectedCategories,
}: StoreFrontFormCategoriesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [tempSelectedCategories, setTempSelectedCategories] =
    useState<Category[]>(selectedCategories);

  const handleCategoryToggle = (category: Category) => {
    const isSelected = tempSelectedCategories.some((c) => c.id === category.id);
    if (isSelected) {
      setTempSelectedCategories(
        tempSelectedCategories.filter((c) => c.id !== category.id),
      );
    } else {
      setTempSelectedCategories([...tempSelectedCategories, category]);
    }
  };

  const handleSave = () => {
    updateSelectedCategories(tempSelectedCategories);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempSelectedCategories(selectedCategories);
    setIsOpen(false);
  };

  const filteredCategories = selectedCategories.filter((category) =>
    category.option_value.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Store Categories
          </label>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Edit Categories
          </button>
        </div>

        {selectedCategories.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
            {selectedCategories.map((category) => (
              <span
                key={category.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
              >
                {category.option_value}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No categories selected</p>
        )}
      </div>

      <Transition
        show={isOpen}
        enter="transition-transform duration-300"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transition-transform duration-300"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="fixed right-0 top-0 w-full md:w-[500px] bg-white z-[200] flex flex-col h-screen">
          <div className="flex items-center justify-between p-4">
            <h3 className="text-lg font-medium text-gray-900">
              Select Categories
            </h3>
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
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

          <div className="flex-1 p-4 overflow-auto">
            <div className="mb-4">
              <Searchbar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search categories..."
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {filteredCategories.map((category) => {
                const isSelected = tempSelectedCategories.some(
                  (c) => c.id === category.id,
                );
                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`
                      flex items-center justify-between p-3 text-sm rounded-lg transition-all
                      ${
                        isSelected
                          ? "bg-primary/10 text-primary border-primary"
                          : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                      }
                      border
                    `}
                  >
                    <span className="flex items-center space-x-2">
                      {category.imgUrl && (
                        <img
                          src={category.imgUrl}
                          alt={category.option_value}
                          className="w-5 h-5 object-cover rounded"
                        />
                      )}
                      <span>{category.option_value}</span>
                    </span>
                    {isSelected && (
                      <svg
                        className="w-5 h-5 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-4">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
}
