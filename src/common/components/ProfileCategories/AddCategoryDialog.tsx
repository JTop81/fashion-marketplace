import { useEffect, useMemo, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { options } from "api/services/customize/interfaces/categories.interface";
import { updateUserRoleOptions } from "api/services/profile/seller";
import CategoryItem from "common/components/CategoryItem";
import { useCategoriesStore } from "setup/store/profile/profileCategories/categories";

const AddCategoryDialog = () => {
  const { modalState, closeModal, selectOption, selectedOptions } =
    useCategoriesStore();
  const { currentCategory } = modalState || {};

  const currentSelectedOptions = useMemo(() => {
    return currentCategory ? selectedOptions[currentCategory.id] || [] : [];
  }, [currentCategory, selectedOptions]);

  const [tempSelectedOptions, setTempSelectedOptions] = useState<options[]>(
    currentSelectedOptions,
  );

  useEffect(() => {
    if (currentCategory) {
      setTempSelectedOptions(currentSelectedOptions);
    }
  }, [currentSelectedOptions, currentCategory]);

  const handleOptionClick = (option: options) => {
    if (!currentCategory) return;

    const alreadySelected = tempSelectedOptions.some(
      (selected) => selected.id === option.id,
    );

    if (alreadySelected) {
      setTempSelectedOptions((prev) =>
        prev.filter((selected) => selected.id !== option.id),
      );
      selectOption(currentCategory.id, option, false);
    } else {
      setTempSelectedOptions((prev) => [...prev, option]);
      selectOption(currentCategory.id, option, true);
    }
  };

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!currentCategory) return;

    setLoading(true);

    const option_ids = tempSelectedOptions.map((option: options) => option.id);
    try {
      const res = await updateUserRoleOptions(currentCategory.id, {
        option_ids,
      });
      if (res) {
        closeModal();
      }
    } catch (error) {
      console.error("Error updating options:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentCategory) return null;

  return (
    <Transition
      show={modalState.isOpen}
      enter="duration-200 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-300 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog
        open={modalState.isOpen}
        onClose={closeModal}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex w-screen items-end md:items-center justify-end md:justify-center md:p-4">
          <DialogPanel className="relative w-full max-w-[880px] bg-white px-[24px] md:px-[93px] py-[22px] md:py-[48px] rounded-[22px]">
            <DialogTitle className="text-[24px] text-black font-semibold leading-[36px] text-center">
              Add {currentCategory.preference_name}
            </DialogTitle>
            <Description className="text-[14px] text-customTextPink font-medium leading-[21px] mt-[24px]">
              Our {currentCategory.preference_name}
            </Description>
            <div className="w-full px-[16px] mt-[24px] flex flex-row flex-wrap gap-[16px]">
              {currentCategory.options.map((item: options) => (
                <CategoryItem
                  key={item.id}
                  label={item.option_value}
                  isAdd
                  click={() => handleOptionClick(item)}
                  isActive={tempSelectedOptions.some(
                    (selected) => selected.id === item.id,
                  )}
                />
              ))}
            </div>

            <div className="flex items-center justify-center mt-[36px] md:mt-[95px]">
              <button
                className="w-fit h-[48px] px-[24px] bg-secondary rounded-[6px] text-[16px] text-white font-semibold leading-[24px]"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
            <AiOutlineClose
              className="hidden md:flex absolute top-[16px] right-[16px] cursor-pointer"
              size={24}
              onClick={closeModal}
            />
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddCategoryDialog;
