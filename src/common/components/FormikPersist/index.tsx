import React, { useEffect, useRef } from "react";
import isEqual from "react-fast-compare";
import { FormikValues, useFormikContext } from "formik";
import { useDebouncedCallback } from "use-debounce";

import IndexedDBUtil from "../../util/db";

interface FormikPersistProps {
  name: string;
  currentTab: number;
}

export const resetFormPersistence = async (name: string) => {
  // Modify this function to delete data from IndexedDB
  await IndexedDBUtil.deleteData(name); // Assuming you implement this method in IndexedDBUtil
};

const FormikPersist: React.FC<FormikPersistProps> = ({ name }) => {
  const { values, setValues } = useFormikContext<FormikValues>();
  const prefValuesRef = useRef<FormikValues>();

  const onSave = async (values: FormikValues) => {
    await IndexedDBUtil.saveData(name, values); // Save form data
  };

  const debouncedOnSave = useDebouncedCallback(onSave, 300);

  useEffect(() => {
    const loadData = async () => {
      const savedForm = await IndexedDBUtil.getData(name); // Retrieve form data

      if (savedForm) {
        prefValuesRef.current = savedForm;
        setValues(savedForm, false);
        // yucky but works
        // need to do this so we do not have to worry about the form being dirty.
        setTimeout(() => IndexedDBUtil.saveData(name, savedForm), 300);
      }
    };

    loadData();
  }, [name, setValues]);

  useEffect(() => {
    if (!isEqual(prefValuesRef.current, values)) {
      debouncedOnSave(values);
    }
  }, [values, debouncedOnSave]);

  useEffect(() => {
    prefValuesRef.current = values;
  }, [values]);

  return null;
};

export default FormikPersist;
