import React from "react";

import {
  PostingGrid,
  PostingGridDescription,
  PostingGridLarge,
  PostingGridSmall,
  PostingGridTitle,
} from "../../components/PostingGrid";
import DiscountInput from "../Components/DiscountInput";
import { PriceInput, PricingInputArray } from "../Components/PriceInput";

import { PricingStepProps } from "./model";

const PricingStep = ({ variants, formik }: PricingStepProps) => {
  if (formik.values.discount == null) return <></>;
  return (
    <PostingGrid>
      <PostingGridSmall>
        <PostingGridTitle>Selling Price</PostingGridTitle>
        <PostingGridDescription>
          Set a price for your product
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="grid grid-cols-6 gap-5">
        <div className="flex flex-col md:col-span-3 col-span-6">
          {formik.values.pricingType === "full-price" ? (
            <>
              <PriceInput
                className="md:col-span-3"
                label="Price"
                name="prices.0"
              />
              <div className="text-red-500">
                {formik.errors.prices?.toString()}
              </div>
            </>
          ) : (
            <>
              <PricingInputArray
                className="w-full"
                name="prices"
                variants={variants}
              />
              <div className="text-red-500">
                {formik.errors.prices?.toString()}
              </div>
            </>
          )}
        </div>
      </PostingGridLarge>

      <PostingGridSmall>
        <PostingGridTitle>Discount</PostingGridTitle>
        <PostingGridDescription>
          Set a discount for your product
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="grid grid-cols-6 gap-5">
        <DiscountInput
          className="md:col-span-3 col-span-6"
          label="Discount"
          name="discount"
        />
      </PostingGridLarge>
    </PostingGrid>
  );
};

export default PricingStep;
