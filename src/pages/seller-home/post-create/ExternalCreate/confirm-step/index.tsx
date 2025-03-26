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
import { Tag } from "../../components/Tag";

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
        <PostingGridTitle>External Image</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Make sure your External looks attractive and in 3:4 size
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5">
        {realMedia.map((it: any, index: number) => (
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
        <PostingGridTitle>External Name</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Add a external title that your buyer would be likely to buy.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge>
        <PostingGridTitle>{data.externalName}</PostingGridTitle>
      </PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>External Categories</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Choose a category and subcategory that are suitable to your external.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5 flex-wrap">
        {data.categories
          .filter((it): it is string => it != null)
          .map((it, index: number) => (
            <RoundContainer key={`data-${index.toString()}`}>
              <Category category={it} />
            </RoundContainer>
          ))}
      </PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>Platform</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Choose the platform to redirect
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5">
        <p>{data.platformType}</p>
      </PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>Link</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Choose other external variants that are available for this external.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5">{data.link}</PostingGridLarge>
      <PostingGridSmall>
        <PostingGridTitle>External Description</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Add a description that describes your external well.
        </PostingGridDescription>
      </PostingGridSmall>
      <div
        className="flex items-center col-span-8 md:col-span-6 mb-10"
        dangerouslySetInnerHTML={{ __html: data.description }}
      ></div>
      <PostingGridSmall>
        <PostingGridTitle>Tags</PostingGridTitle>
        <PostingGridDescription className="text-left mb-4">
          Add tags that will help customers find your external.
        </PostingGridDescription>
      </PostingGridSmall>
      <PostingGridLarge className="gap-x-5">
        {data.tags
          .filter((it): it is string => it != null)
          .map((it, index) => (
            <Tag tag={it} key={`dataTag-${index.toString()}`} />
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
              <TextP1Medium key={`dataPrice-${index.toString()}`}>
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
