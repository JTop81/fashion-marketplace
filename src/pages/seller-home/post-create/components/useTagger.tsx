import { useState } from "react";

export const useTagger = (formik: any, field: string) => {
  const [tag, setTag] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newTags = formik.values.tags.slice();
      if (tag && !newTags.includes(tag)) {
        newTags.push(tag);
        formik.setFieldValue(field, newTags);
        setTag("");
      }
    }
  };

  const removeTag = (index: number) => {
    const newTags = formik.values.tags.slice();
    newTags.splice(index, 1);
    formik.setFieldValue(field, newTags);
  };

  return { tag, setTag, handleKeyDown, removeTag };
};
