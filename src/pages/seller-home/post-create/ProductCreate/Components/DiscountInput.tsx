import clsx from "clsx";
import { Field, FieldProps } from "formik";

import { DiscountTypeSelector } from "pages/seller-home/post-create/components/DiscountTypeSelector";
import { PostTextField } from "pages/seller-home/post-create/components/PostTextField";

interface DiscountInputProps {
  label: string;
  name: string;
  className?: string;
}

const DiscountInput = ({ name, className }: DiscountInputProps) => {
  return (
    <Field name={name}>
      {({
        field,
        form: { isSubmitting },
        meta: { error },
      }: FieldProps<number>) => (
        <div className={clsx(className)}>
          <div className="mt-1 relative rounded-md">
            <div className="absolute inset-y-0 left-0 flex items-center">
              <Field name="discountType">
                {({ field }: FieldProps<string>) => (
                  <DiscountTypeSelector {...field} />
                )}
              </Field>
            </div>
            <PostTextField
              {...field}
              id={field.name}
              type="number"
              disabled={isSubmitting}
              className="pl-20"
            />
          </div>
          <div className="text-red-500">{error}</div>
        </div>
      )}
    </Field>
  );
};

export default DiscountInput;
