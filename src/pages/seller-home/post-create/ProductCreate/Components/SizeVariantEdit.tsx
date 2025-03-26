import {
  sizeOptions,
  sizeTypeOptions,
} from "pages/seller-home/post-create/ProductCreate/models";

import { SizeEdit } from "../../components/Size";
import { OverviewStepProps } from "../overview-step/model";

type SizeVariantProps = {
  formik: OverviewStepProps;
};

export const SizeVariantEdit = ({
  formik: {
    values: { sizeType, sizes },
    setFieldValue,
    handleChange,
    errors: { sizeType: sizeTypeError, sizes: sizesError },
  },
}: SizeVariantProps) => {
  return (
    <div className="flex flex-col">
      <select
        name="sizeType"
        value={sizeType ?? ""}
        onChange={handleChange}
        className="rounded-md px-3 py-2 mt-1 mb-4 w-full md:w-[313px] h-10 border-r-8 border-transparent text-sm outline outline-stone-300"
      >
        {sizeTypeOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {sizeTypeError && sizeTypeError.length > 0 && (
        <div className="text-red-500">{sizeTypeError}</div>
      )}
      <div className="flex items-center gap-x-3 gap-y-5 flex-wrap">
        {sizeOptions.map((size) => (
          <SizeEdit
            key={size}
            size={size}
            setFieldValue={setFieldValue}
            sizes={sizes?.filter((it: any): it is string => it != null) ?? []}
          />
        ))}
      </div>
      {sizesError && sizesError.length > 0 && (
        <div className="text-red-500">{sizesError}</div>
      )}
    </div>
  );
};
