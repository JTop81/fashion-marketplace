import { IoIosClose } from "react-icons/io";
import { FieldArray } from "formik";

import { PostTextField } from "pages/seller-home/post-create/components/PostTextField";

import { DescriptionStepProps } from "../ProductCreate/description-step/model";

import { Tag } from "./Tag";
import { useTagger } from "./useTagger";

type TagsProps = {
  formik: DescriptionStepProps;
  name: string;
  tags: string[];
};

export default ({ formik, tags, name }: TagsProps) => {
  const { tag, setTag, handleKeyDown, removeTag } = useTagger(formik, name);

  return (
    <FieldArray
      name={name}
      render={() => (
        <>
          <div className="flex flex-col w-full gap-2 mb-4">
            <PostTextField
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border-2 border-stone-300 rounded w-full px-3 py-2"
              placeholder="Press enter to add tags"
            />
            <div className="flex gap-2 flex-wrap">
              {tags && tags.length > 0
                ? tags.map((tag, index) => (
                    <Tag
                      key={`tags-${index.toString()}`}
                      tag={tag}
                      className="flex items-center gap-x-2 rounded-full  border-2 border-stone-300 px-5 py-2"
                    >
                      <button type="button" onClick={() => removeTag(index)}>
                        <IoIosClose className="w-6 h-6" />
                      </button>
                    </Tag>
                  ))
                : null}
            </div>
          </div>
        </>
      )}
    />
  );
};
