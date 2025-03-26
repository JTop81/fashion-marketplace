import React from "react";
import { TextP1Medium } from "common/styles/TextStyle";

import { RoundContainer } from "pages/seller-home/post-create/components/RoundContainer";

import Category from "../../components/Category";
import {
  PostingGrid,
  PostingGridDescription,
  PostingGridLarge,
  PostingGridSmall,
  PostingGridTitle,
} from "../../components/PostingGrid";
import { Size } from "../../components/Size";
import { Tag } from "../../components/Tag";
import { Variant } from "../Components/VariantManager";

import { ConfirmStepProps } from "./model";

const ConfirmStep = ({
  values: { previews = [], ...rest },
}: ConfirmStepProps) => {
  const data = { previews, ...rest };
  if (data.previews == null) return <></>;
  const realMedia = data.previews
    .filter((it): it is { name: string; content: string } => it != null)
    .map((it) => it.content);

  return (
    <PostingGrid className="gap-y-2 md:gap-y-20">
      <PostingGridSmall>
        <PostingGridTitle>Product Image</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Make sure your product looks attractive and in 3:4 size
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5">
        {realMedia.map((it: string, index: number) => (
          <img
            key={`realMedia-${index.toString()}`}
            src={it}
            alt={`Preview of small media`}
            className="object-cover w-[144px] h-[130px] rounded-lg"
          />
        ))}
        {realMedia.length === 0 && (
          <div className="w-[144px] h-[130px] bg-gray-200 rounded-lg" />
        )}
      </PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>Product Name</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Add a product title that your buyer would be likely to buy.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge>
        <PostingGridTitle>{data.productName}</PostingGridTitle>
      </PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>Product Categories</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Choose a category and subcategory that are suitable to your product.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5">
        {data.categories
          .filter((it): it is string => it != null)
          .map((it, index: number) => (
            <RoundContainer key={`category-${index.toString()}`}>
              <Category category={it} />
            </RoundContainer>
          ))}
      </PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>Size Variant</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Choose the sizes that are available for your product.
        </PostingGridDescription>
      </PostingGridSmall>
      {data.sizeType && data.sizes && (
        <PostingGridLarge className="gap-x-5">
          <p>{data.sizeType} size</p>
          {data.sizes
            .filter((size): size is string => size != null)
            .map((size, index) => (
              <Size key={`size-${index.toString()}`} size={size} />
            ))}
        </PostingGridLarge>
      )}
      <PostingGridSmall>
        <PostingGridTitle>Other Variants</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Choose other product variants that are available for this product.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5">
        {data.variants
          ?.filter((variant): variant is Variant => variant != null)
          .map((variant, index) => (
            <Tag
              key={`variants-${index.toString()}`}
              tag={`${variant.name}: ${variant.description}`}
            />
          ))}
      </PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>Product Description</PostingGridTitle>
      </PostingGridSmall>
      <div
        className="flex items-center col-span-8 md:col-span-6 mb-10"
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>
      <PostingGridSmall>
        <PostingGridTitle>Tags</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Add tags that will help customers find your product.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5">
        {data.tags
          .filter((it): it is string => it != null)
          .map((it, index) => (
            <Tag tag={it} key={`tags-${index.toString()}`} />
          ))}
      </PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>Selling Price</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Set a price for your product.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5">
        {data.prices ? (
          data.prices
            .filter((it): it is string => it != null)
            .map((it, index) => (
              <TextP1Medium key={`prices-${index.toString()}`}>
                {it}
              </TextP1Medium>
            ))
        ) : (
          <></>
        )}
      </PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>Discount</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Set a discount for your product.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge>
        <TextP1Medium>
          {data.discountType === "$" && "$"}
          {data.discount}
          {data.discountType === "%" && "%"}
        </TextP1Medium>
      </PostingGridLarge>
    </PostingGrid>
  );
};

export default ConfirmStep;
