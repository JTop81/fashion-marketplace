import {
  PostingGrid,
  PostingGridDescription,
  PostingGridLarge,
  PostingGridSmall,
  PostingGridTitle,
} from "../../components/PostingGrid";
import Tags from "../../components/Tags";
import MarkdownEditor from "../Components/MarkdownEditor";

import { DescriptionStepProps } from "./model";

const DescriptionStep = ({ formik }: { formik: DescriptionStepProps }) => {
  if (formik.values.description == null) return <></>;
  return (
    <PostingGrid>
      <PostingGridSmall>
        <PostingGridTitle>Product Description</PostingGridTitle>
        <PostingGridDescription>
          Add a description that describe your product well.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge>
        <MarkdownEditor formik={formik} />
      </PostingGridLarge>

      <PostingGridSmall>
        <PostingGridTitle>Tags</PostingGridTitle>
        <PostingGridDescription>
          Add tags that will help to find your product in search
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge>
        <Tags
          formik={formik}
          name="tags"
          tags={
            formik.values.tags?.filter((it): it is string => it != null) ?? []
          }
        />
      </PostingGridLarge>
    </PostingGrid>
  );
};

export default DescriptionStep;
