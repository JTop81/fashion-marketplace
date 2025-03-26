import { useCallback, useEffect, useState } from "react";
import { Edit } from "react-iconly";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "api/services/customize";
import {
  ICategoriesResponse,
  IUpdateUserRoleOptions,
  options,
} from "api/services/customize/interfaces/categories.interface";
import {
  getUserOptions,
  updateUserRoleOptions,
} from "api/services/profile/seller";
import CategoryItem from "common/components/CategoryItem";
import Loading from "common/components/Loader";
import { useAuthStore } from "setup/store/auth/authStore";
import { useCategoriesStore } from "setup/store/profile/profileCategories/categories";

import AddCategoryDialog from "./AddCategoryDialog";

const ProfileCategories = () => {
  const { categories, selectedOptions, modalState, setCategories, openModal } =
    useCategoriesStore();
  const { user } = useAuthStore();
  const [customModal, setCustomModal] = useState(false);
  const [customTextObj, setCustomTextObj] = useState({
    customText: "",
    preference_id: "",
  });
  const { data, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: () => getCategories(),
    retry: 1,
  });
  const fetchUserOptions = useCallback(
    async (preferenceId: string) => {
      const res: IUpdateUserRoleOptions[] = await getUserOptions(
        user?.user_role.id || "",
        preferenceId,
      );
      const transformedOptions = res.reduce<Record<string, options[]>>(
        (acc, item) => {
          const key = item.option.preference_id;
          if (!acc[key]) {
            acc[key] = [];
          }
          if (item.option.requires_more_context) {
            setCustomTextObj((prevText) => ({
              customText: item.free_text || prevText.customText,
              preference_id: item.option.preference_id,
            }));
          }
          acc[key].push(item.option);
          return acc;
        },
        {},
      );
      return transformedOptions;
    },
    [user?.user_role.id],
  );

  useEffect(() => {
    const fetchAllUserOptions = async () => {
      if (isLoading || !data) return;
      const res = data.filter((item: ICategoriesResponse) => {
        return item.options.every((option) => !option.requires_more_context);
      });
      setCategories(res);
      const optionsResults = await Promise.all(
        data.map(async (category) => {
          const options = await fetchUserOptions(category.id);
          return options;
        }),
      );
      const transformedOptions = optionsResults.reduce((acc, options) => {
        Object.keys(options).forEach((key) => {
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(...options[key]);
        });
        return acc;
      }, {});
      useCategoriesStore.getState().setSelectedOptions(transformedOptions);
    };

    fetchAllUserOptions();
  }, [data, fetchUserOptions, isLoading, setCategories, user?.user_role.id]);

  const handleSave = async () => {
    await updateUserRoleOptions(customTextObj.preference_id, {
      free_text: customTextObj.customText,
    }).then(() => {
      setCustomModal(false);
    });
  };

  if (isLoading || (!data && !selectedOptions))
    return <Loading height="50vh" />;

  return (
    <div className="w-full flex flex-col gap-4 md:gap-[32px] px-2 md:px-[48px] py-[32px] bg-gray">
      <div className="w-full flex flex-col pb-4 md:pb-[32px] gap-[48px]">
        <p className="text-[20px] text-black font-medium leading-[30px]">
          Selling categories
        </p>
      </div>
      <div className="w-full flex flex-col gap-[21px] px-2 md:px-[26px] py-[33px]">
        {categories.map((item: ICategoriesResponse) => {
          return (
            <div
              key={item.id}
              className="w-full flex flex-col md:flex-row gap-4 md:gap-0 border-b-[1px] border-[#000000]/10 pb-[16px]"
            >
              <div className="w-full md:w-1/4">
                <p className="text-[16px] text-customTextGray font-normal leading-[24px]">
                  {item.preference_name}
                </p>
              </div>
              <div className="w-full md:w-3/4 flex flex-row gap-[16px] flex-wrap items-center">
                {selectedOptions[item.id]?.length > 0 &&
                  selectedOptions[item.id].map((option) => (
                    <CategoryItem key={option.id} label={option.option_value} />
                  ))}
                <button
                  className="w-fit h-[24px] flex flex-row gap-[8px] px-[4px] text-[14px] text-primary font-normal leading-[21px] whitespace-nowrap"
                  onClick={() => openModal(item)}
                >
                  + Add more
                </button>
              </div>
            </div>
          );
        })}
        <div className="w-full flex flex-col md:flex-row gap-4 md:gap-0">
          <div className="w-full md:w-1/4">
            <p className="text-[16px] text-customTextGray font-normal leading-[24px]">
              Custom Text
            </p>
          </div>
          <div className="w-full md:w-3/4 flex flex-row gap-[16px] flex-wrap items-center">
            <p className="max-w-[488px]">{customTextObj.customText}</p>
            <button
              className="flex flex-row gap-1"
              onClick={() => setCustomModal(true)}
            >
              <Edit size={24} primaryColor="#9F00D9" />
              <div className="text-[16px] text-primary font-normal leading-[24px]">
                Edit
              </div>
            </button>
          </div>
        </div>
        {modalState.isOpen && modalState.currentCategory && (
          <AddCategoryDialog />
        )}
        <Transition
          show={customModal}
          enter="duration-200 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-300 ease-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog
            open={customModal}
            onClose={() => setCustomModal(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex w-screen items-end md:items-center justify-end md:justify-center md:p-4">
              <DialogPanel className="relative w-full max-w-[880px] bg-white px-[24px] md:px-[93px] py-[22px] md:py-[48px] rounded-[22px]">
                <DialogTitle className="text-[24px] text-black font-semibold leading-[36px] text-center">
                  Edit Custom Text
                </DialogTitle>
                <div className="w-full flex flex-col gap-4 mt-6">
                  <div className="flex flex-col gap-2">
                    <label>Custom Text</label>
                    <textarea
                      className="w-full h-[120px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                      value={customTextObj.customText}
                      aria-multiline
                      onChange={(e) =>
                        setCustomTextObj((prev) => ({
                          ...prev,
                          customText: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-row gap-6 items-center justify-center mt-[36px] md:mt-[60px]">
                  <button
                    className="w-fit h-[48px] px-[24px] bg-secondary rounded-[6px] text-[16px] text-white font-semibold leading-[24px]"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                  <button
                    className="w-fit h-[48px] px-[24px] bg-gray-400 rounded-[6px] text-[16px] text-white font-semibold leading-[24px]"
                    onClick={() => setCustomModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
};

export default ProfileCategories;
