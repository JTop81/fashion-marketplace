const MAX_TERMS = 5;

export const addValue = ({
  formik,
  inputValue,
  updateState,
  setInputValue,
}: any) => {
  const newValues = inputValue
    .split(",")
    .map((item: string) => item.trim())
    .filter((item: string) => item !== "");
  if (
    newValues.length &&
    formik.values.listValues.length + newValues.length <= MAX_TERMS
  ) {
    const combinedValues = [...formik.values.listValues, ...newValues];
    const uniqueValues = Array.from(new Set(combinedValues));
    formik.setFieldValue("listValues", uniqueValues);
    formik.setFieldValue("value", "");
    if (updateState) {
      updateState({ listValues: uniqueValues });
    }
    setInputValue("");
  }
};
