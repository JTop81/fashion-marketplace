import React from "react";
import { FieldArray } from "formik";

import { AddButton } from "pages/seller-home/post-create/components/AddButton";
import { RoundClosableContainer } from "pages/seller-home/post-create/components/RoundContainer";

import { VariantDisplay, VariantEdit } from "../../components/Variants";
import { OverviewStepProps } from "../overview-step/model";

type OtherVariantsProps = {
  formik: OverviewStepProps;
};

const OtherVariants = ({
  formik: {
    setFieldValue,
    values: { variants },
    errors: { variants: errors },
  },
}: OtherVariantsProps) => {
  const [editIndex, setEditIndex] = React.useState<number | null>(null);
  const [editText, setEditText] = React.useState<string>("");
  const [addingNew, setAddingNew] = React.useState(false);

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedVariants = [...(variants ?? [])];
      updatedVariants[editIndex] = { name: editText, description: "" };
      setFieldValue("variants", updatedVariants);
    } else if (addingNew && editText) {
      setFieldValue("variants", [
        ...(variants ?? []),
        { name: editText, description: "" },
      ]);
    }
    handleCancel();
  };

  const handleDelete = (index: number) => {
    const updatedVariants = [...(variants ?? [])];
    updatedVariants.splice(index, 1);
    setFieldValue("variants", updatedVariants);
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditText("");
    setAddingNew(false);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setEditText(variants?.[index]?.name ?? "");
    setAddingNew(false);
  };

  const handleAddNew = () => {
    setAddingNew(true);
    setEditIndex(null);
    setEditText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <FieldArray
      name="variants"
      render={() => (
        <div className="flex flex-col items-start md:h-16  justify-center gap-x-5 gap-y-5 flex-wrap">
          <div className="flex gap-x-2 gap-y-5 flex-wrap">
            <div className="flex items-center gap-x-5 gap-y-5 flex-wrap">
              {variants?.map((variant: any, index: number) =>
                editIndex === index ? (
                  <VariantEdit
                    key={`variants-${index.toString()}`}
                    index={index}
                    editText={editText}
                    setEditText={setEditText}
                    handleKeyPress={handleKeyPress}
                  />
                ) : (
                  <RoundClosableContainer
                    key={`variants-${index.toString()}`}
                    handleClose={() => handleDelete(index)}
                    className="border-stone-300"
                  >
                    <button type="button" onClick={() => handleEdit(index)}>
                      {variant != null && (
                        <VariantDisplay
                          className="flex items-center gap-x-5"
                          variant={variant.name}
                        ></VariantDisplay>
                      )}
                    </button>
                  </RoundClosableContainer>
                ),
              )}
            </div>
            <div className="flex items-center gap-x-3">
              {addingNew && (
                <VariantEdit
                  index={-1}
                  editText={editText}
                  setEditText={setEditText}
                  handleKeyPress={handleKeyPress}
                />
              )}
              {addingNew ? (
                <>
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="text-purple-700"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </>
              ) : (
                <AddButton onClick={handleAddNew}>Variant</AddButton>
              )}
            </div>
          </div>
          {Array.isArray(errors) && errors.length > 0 && (
            <div className="text-red-500">
              {errors.map((error, idx) =>
                typeof error === "string" ? (
                  <div key={idx}>{error}</div>
                ) : (
                  <div key={idx}>{JSON.stringify(error)}</div>
                ),
              )}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default OtherVariants;
