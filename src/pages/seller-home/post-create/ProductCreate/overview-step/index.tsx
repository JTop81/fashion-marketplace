import { Field, FieldProps } from "formik";

import { PostTextField } from "pages/seller-home/post-create/components/PostTextField";

import {
  PostingGrid,
  PostingGridDescription,
  PostingGridLarge,
  PostingGridSmall,
  PostingGridTitle,
} from "../../components/PostingGrid";
import CategoryListEdit from "../Components/CategoryListEdit";
import { ImagePreviewListEdit } from "../Components/ImagePreviewListEdit";
import { VariantManager } from "../Components/VariantManager";

import { OverviewStepProps } from "./model";

const UploadAssetsStep = ({
  formik,
  related_id,
}: {
  formik: OverviewStepProps;
  related_id: string;
}) => {
  if (formik.values.productName == null) return <></>;
  return (
    <PostingGrid>
      <PostingGridSmall>
        <PostingGridTitle>Product Image</PostingGridTitle>
        <PostingGridDescription>
          Make sure your product looks attractive and is in 3:4 size
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge>
        <ImagePreviewListEdit
          formik={formik}
          size={4}
          related_id={related_id}
        />
      </PostingGridLarge>

      <PostingGridSmall>
        <PostingGridTitle>Product Name</PostingGridTitle>
        <PostingGridDescription>
          Add product title that buyer would like to buy
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="rounded w-full flex-col !items-start justify-start col-span-6">
        <div className="w-full">
          <Field name="productName">
            {({ field }: FieldProps<any>) => (
              <>
                <PostTextField
                  {...field}
                  id="productName"
                  type="text"
                  placeholder="Product Name"
                  maxLength={150}
                  className="w-full"
                />
                <div className="text-xs text-gray-400 text-right mt-1">
                  {field.value.length}/150
                </div>
              </>
            )}
          </Field>
          <div className="text-red-500 mt-1">{formik.errors.productName}</div>
        </div>
      </PostingGridLarge>

      <PostingGridSmall>
        <PostingGridTitle>Product Categories</PostingGridTitle>
        <PostingGridDescription>
          Choose category and subcategory that suits the product
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="!items-start flex-col">
        <CategoryListEdit formik={formik} />
      </PostingGridLarge>

      <PostingGridSmall>
        <PostingGridTitle>Product Variants</PostingGridTitle>
        <PostingGridDescription>
          Add sizes and other variants available for this product
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="!items-start flex-col">
        <VariantManager formik={formik} />
      </PostingGridLarge>
    </PostingGrid>
  );
};

export default UploadAssetsStep;
