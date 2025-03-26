import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "api/services/customize";
import CategoriesList from "common/components/CategoriesList";
import Loading from "common/components/Loader";
import SearchBar from "common/components/SearchBar/SingleValue";
import { useBrandBoutiqueMultiStepFormStore } from "setup/store/profile/brandBoutique/brandBoutique";

import { FlowProps } from "pages/public-home/components/Onboarding/models";
import Select from "pages/seller-home/post-create/components/Select";

export const CustomizeBrandBoutiqueExperience: React.FC<FlowProps> = ({
  formik,
  handleNext,
  handleSkip,
}) => {
  const [selectedOption, setSelectedOption] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { updateState } = useBrandBoutiqueMultiStepFormStore();
  useEffect(() => {
    updateState({ categories: formik.values.categories });
  }, [formik.values.categories, updateState]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getCategories"],
    queryFn: () => getCategories(),
    retry: 1,
  });

  const filteredData = useMemo(() => {
    if (isLoading || !data) return []; // Return an empty array if data is loading or not available

    if (selectedOption !== "All") {
      return data.filter(
        (item: any) => item.preference_name === selectedOption,
      );
    } else {
      return data;
    }
  }, [data, isLoading, selectedOption]);

  const getFilteredCategories = useMemo(() => {
    if (searchTerm === "") {
      return filteredData;
    }

    return filteredData.map((item: any) => {
      const filteredOptions = item.options.filter((option: any) =>
        option.option_value.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      return { ...item, options: filteredOptions };
    });
  }, [filteredData, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleCategory = (category: string) => {
    formik.setFieldTouched("categories", true, false);

    const prevCategories = formik.values.categories;
    const isCategorySelected = prevCategories.includes(category);

    if (isCategorySelected) {
      formik.setFieldValue(
        "categories",
        prevCategories.filter((c: string) => c !== category),
      );
    } else if (prevCategories.length < 15) {
      formik.setFieldValue("categories", [...prevCategories, category]);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  if (isLoading || !data) return <Loading height="auto" />;

  return (
    <div className="w-full flex md:px-[32px] py-0 flex-col flex-shrink-0 justify-between items-center gap-[24px] h-full max-h-[600px]">
      <div className="w-full flex flex-col items-center">
        <div className="flex items-center justify-between">
          <p className="text-[#000] font-[Poppins] text-[24px] not-italic font-semibold leading-[150%] mx-[auto] my-[10px]">
            Customize Your Experience
          </p>
        </div>
        <div className="md:px-[50px] md:py-[24px] w-full bg-red">
          <SearchBar
            onChange={handleSearchChange}
            value={searchTerm}
            setValue={setSearchTerm}
            placeholder={"Search..."}
          />
          <Select
            data={data}
            selectedOption={selectedOption}
            handleOptionClick={handleOptionClick}
          />
          {error && <p className="text-red-500">{error.message}</p>}

          <CategoriesList
            categoriesData={getFilteredCategories}
            selectedCategories={formik.values.categories}
            onToggleCategory={toggleCategory}
          />
        </div>
        {formik.errors.categories && (
          <p className="text-red-500">{formik.errors.categories}</p>
        )}
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleSkip}
          type="button"
          className="text-black/50 text-md underline"
        >
          Skip, I&apos;ll do this later
        </button>
        <button
          onClick={(e) => handleNext && handleNext(formik, e)}
          type="button"
          className="flex flex-row items-center justify-center p-2 px-6 gap-2 bg-blue-500 border-blue-500 rounded transition-all duration-200 font-poppins font-semibold text-lg leading-6 text-white hover:bg-blue-500 hover:border-blue-500 active:bg-blue-500 active:border-blue-500 w-full md:w-auto"
        >
          {"Next"}
        </button>
      </div>
    </div>
  );
};

export default CustomizeBrandBoutiqueExperience;
