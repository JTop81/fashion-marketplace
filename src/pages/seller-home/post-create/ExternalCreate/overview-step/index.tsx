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
import { PlatformEdit } from "../Components/PlatformEdit";

import { OverviewStepProps } from "./model";

const UploadAssetsStep = ({
  related_id,
  formik,
}: {
  formik: OverviewStepProps;
  related_id: string;
}) => {
  if (formik.values.externalName == null) return <></>;
  return (
    <PostingGrid>
      <PostingGridSmall>
        <PostingGridTitle>External Image</PostingGridTitle>
        <PostingGridDescription>
          Make sure your external looks attractive and is in 3:4 size
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
        <PostingGridTitle>External Name</PostingGridTitle>
        <PostingGridDescription>
          Add external title that buyer would like to buy
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="rounded w-full flex-col !items-start justify-start col-span-6">
        <Field
          name="externalName"
          className="w-full border-2 rounded px-5 h-14"
        >
          {({ field }: FieldProps<any>) => (
            <PostTextField
              {...field}
              id="externalName"
              type="text"
              placeholder="External Name"
            />
          )}
        </Field>
        <div className="text-red-500">{formik.errors.externalName}</div>
      </PostingGridLarge>

      <PostingGridSmall>
        <PostingGridTitle>External Categories</PostingGridTitle>
        <PostingGridDescription>
          Choose category and subcategory that suits the external
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="!items-start flex-col">
        <CategoryListEdit formik={formik} />
      </PostingGridLarge>

      <PostingGridSmall>
        <PostingGridTitle>Platform</PostingGridTitle>
        <PostingGridDescription>
          Choose the platform to redirect
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge>
        <PlatformEdit formik={formik} />
      </PostingGridLarge>

      <PostingGridSmall>
        <PostingGridTitle>Link</PostingGridTitle>
        <PostingGridDescription>
          Link to the product page
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="rounded w-full flex-col !items-start justify-start col-span-6">
        <Field name="link" className="w-full border-2 rounded px-5 h-14">
          {({ field }: FieldProps) => (
            <PostTextField
              {...field}
              id="link"
              type="text"
              placeholder="http://www.website.com/"
            />
          )}
        </Field>
        <div className="text-red-500">{formik.errors.link}</div>
      </PostingGridLarge>
    </PostingGrid>
  );
};

export default UploadAssetsStep;
