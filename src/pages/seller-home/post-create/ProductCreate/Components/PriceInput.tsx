import clsx from "clsx";
import { Field, FieldArray, FieldProps } from "formik";

import { CurrencyTypeSelector } from "pages/seller-home/post-create/components/CurrencyTypeSelector";
import { PostTextField } from "pages/seller-home/post-create/components/PostTextField";

interface PriceInputProps {
  label: string;
  name: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PriceInput = ({ name, className }: PriceInputProps) => (
  <Field name={name}>
    {({
      field,
      form: { isSubmitting },
      meta: { error },
    }: FieldProps<number>) => (
      <div className={clsx(className)}>
        <div className="mt-1 relative rounded-md w-full">
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Field name="discountType">
              {({ field }: FieldProps<string>) => (
                <CurrencyTypeSelector {...field} />
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

export const PricingInputArray = ({
  name,
  className,
  variants,
}: {
  name: string;
  className?: string;
  variants: Array<string>;
}) => {
  return (
    <FieldArray name={name}>
      {() =>
        variants.map((variant, index) => (
          <PriceInput
            className={className}
            key={`variants-${index.toString()}`}
            label={variant}
            name={`prices.${index}`}
          />
        ))
      }
    </FieldArray>
  );
};
