import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "api/services/customize";
import { SearchBar } from "common";
import Loading from "common/components/Loader";

import { AddMoreButton } from "pages/seller-home/post-create/components/AddMoreButton";
import { RoundContainer } from "pages/seller-home/post-create/components/RoundContainer";

import Category from "../../components/Category";
import CategoriesList from "../../components/CategoryList";
import Select from "../../components/Select";
import { OverviewStepProps } from "../overview-step/model";

type ExternalCategoryProps = {
  formik: OverviewStepProps;
};

export default ({ formik }: ExternalCategoryProps) => {
  const [categoriesExpanded, setCategoriesExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
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
        prevCategories.filter((c) => c !== category),
      );
    } else if (prevCategories.length < 15) {
      formik.setFieldValue("categories", [...prevCategories, category]);
    }
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  function categoryIsSelected(categoryName: string) {
    return formik.values.categories.includes(categoryName);
  }
  const getOptionValueById = (categoryId: string) => {
    if (data) {
      const option = data
        .map((preference) => preference.options) // Extract options array from each preference
        .flat() // Flatten the array of arrays into a single array
        .find((opt) => opt.id === categoryId); // Find the option with matching categoryId

      return option?.option_value || categoryId; // Fallback to categoryId if option_value not found
    }
    return categoryId; // Fallback to categoryId if data is undefined
  };

  if (isLoading || !data) return <Loading height="auto" />;

  return (
    <>
      {categoriesExpanded ? (
        <div className="flex flex-wrap gap-2">
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

          <button onClick={() => setCategoriesExpanded(false)}>Save</button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {formik.values.categories
            .filter((item): item is string => item != null)
            .map((categoryName, index) => {
              const categoryLabel =
                getOptionValueById(categoryName) || categoryName;

              return (
                <RoundContainer
                  // eslint-disable-next-line react/no-array-index-key
                  key={`formik-${index.toString()}`}
                  className={
                    categoryIsSelected(categoryLabel) ? "border-primary" : ""
                  }
                >
                  <Category
                    className="cursor-default"
                    key={categoryLabel}
                    category={categoryLabel}
                  />
                </RoundContainer>
              );
            })}

          <AddMoreButton onClick={() => setCategoriesExpanded(true)}>
            Add more / Remove
          </AddMoreButton>
        </div>
      )}
      {formik.errors.categories && (
        <p className="text-red-500">{formik.errors.categories}</p>
      )}
    </>
  );
};
