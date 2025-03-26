import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { ChevronLeft, Document, Edit, TickSquare } from "react-iconly";
import { BiDollarCircle } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";
import { MdChevronRight } from "react-icons/md";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { createPost, getPostItem, updatePost } from "api/services/posts";
import {
  IPost,
  IProductCreateData,
} from "api/services/posts/interfaces/post.interface";
import {
  PostStatus,
  PostType,
} from "api/services/posts/interfaces/post-response.interface";
import clsx from "clsx";
import FormikPersist, {
  resetFormPersistence,
} from "common/components/FormikPersist";
import { Form, Formik, FormikProps } from "formik";
import { v4 as uuid } from "uuid";

import {
  Tab,
  TabPanel,
  Tabs,
  TabsList,
} from "pages/buyer-home/post-details/components/Tabs";
import { PostingGridTitle } from "pages/seller-home/post-create/components/PostingGrid";
import ProgressBar from "pages/seller-home/post-create/components/ProgressBar";

import {
  TabDescription,
  TabHeader,
  TabIcon,
  TabTitle,
} from "../components/TabHeader";

import { confirmInitialValues, ConfirmStepValues } from "./confirm-step/model";
import {
  descriptionInitialValues,
  descriptionSchema,
  DescriptionStepProps as DescriptionStepSchema,
} from "./description-step/model";
import {
  overviewInitialValues,
  overviewSchema,
  OverviewStepProps as OverviewStepSchema,
} from "./overview-step/model";
import {
  pricingInitialValues,
  pricingSchema,
  PricingStepSchema,
} from "./pricing-step/model";
import ConfirmStep from "./confirm-step";
import DetailsStep from "./description-step";
import OverviewStep from "./overview-step";
import PricingStep from "./pricing-step";

function formReducer(
  state: Partial<ConfirmStepValues>,
  action: { data: Partial<ConfirmStepValues>; type: "push" | "edit" },
): Partial<ConfirmStepValues> {
  switch (action.type) {
    case "push":
      return { ...state, ...action.data };
    case "edit":
      return { ...state, ...action.data };
    default:
      throw new Error();
  }
}

function tabReducer(
  state: number,
  action: { type: "next" | "back" | "set"; tab?: number },
) {
  switch (action.type) {
    case "next":
      if (state === forms.length - 1) {
        return state;
      }
      return state + 1;
    case "back":
      if (state === 0) {
        return state;
      }
      return state - 1;
    case "set":
      if (action.tab == null) {
        return state;
      }
      return action.tab;
    default:
      throw new Error();
  }
}

const forms = [
  {
    name: "overview",
    initialValues: overviewInitialValues,
    validationSchema: overviewSchema,
  },
  {
    name: "description",
    initialValues: descriptionInitialValues,
    validationSchema: descriptionSchema,
  },
  {
    name: "pricing",
    initialValues: pricingInitialValues,
    validationSchema: pricingSchema,
  },
  {
    name: "confirm",
    initialValues: confirmInitialValues,
  },
];
const initialVisitedState = {
  overview: true,
  description: false,
  pricing: false,
  confirm: false,
};
export const ProductCreate = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const location = useLocation();
  const isEdit = location.pathname.includes("/boutique/post");
  const [selectedTab, selectedTabDispatch] = useReducer(tabReducer, 0);
  const [data, dataDispatch] = useReducer(formReducer, {});
  const currentForm = useMemo(() => forms[selectedTab], [selectedTab]);
  function resetForm(formik: any) {
    forms.map((it) => resetFormPersistence(it.name));
    formik.resetForm();
  }
  const [visitedTabs, setVisitedTabs] = useState(initialVisitedState);

  const { data: postItem } = useQuery<IPost>({
    queryKey: ["getPostItem", id],
    queryFn: async () => {
      const result = await getPostItem(id || "");
      return result;
    },
    enabled: !!id,
    retry: 1,
  });

  const related_id: string = useMemo(() => {
    return isEdit && postItem ? postItem.id : `p_${uuid()}`;
  }, [isEdit, postItem]);

  // update
  const updateVisitedTab = useCallback(() => {
    setVisitedTabs((prev) => ({
      ...prev,
      overview: selectedTab === 0 ? true : prev.overview,
      description: selectedTab === 1 ? true : prev.description,
      pricing: selectedTab === 2 ? true : prev.pricing,
      confirm: selectedTab === 3 ? true : prev.confirm,
    }));
  }, [selectedTab]);

  function hasPrice(details: any): details is { price: number | number[] } {
    return details && "price" in details;
  }

  useEffect(() => {
    updateVisitedTab();
  }, [updateVisitedTab]);

  const mappedInitialValues: any = useMemo(() => {
    if (postItem) {
      return {
        ...currentForm.initialValues,
        productName: data.productName || postItem.details?.title || "",
        description:
          data.description !== undefined
            ? data.description
            : postItem.details?.description || "",
        previews:
          data.previews !== undefined && data.previews.length > 0
            ? data.previews
            : postItem.assets
              ? postItem.assets.map((asset) => ({
                  name: `${asset.url}.${asset.file_type}`,
                  content: `${asset.url}.${asset.file_type}`,
                }))
              : [],
        categories:
          data.categories !== undefined && data.categories.length > 0
            ? data.categories
            : postItem.preferences
              ? postItem.preferences.map(
                  (preference) => preference.option_value,
                )
              : [],
        prices: data.prices?.length
          ? data.prices
          : hasPrice(postItem.details)
            ? Array.isArray(postItem.details.price)
              ? postItem.details.price
              : [postItem.details.price]
            : [0],

        discount:
          (postItem.details &&
            "discount" in postItem.details &&
            postItem.details.discount) ||
          0,
      };
    }
    return currentForm.initialValues;
  }, [currentForm.initialValues, data, postItem]);

  const handleSubmit = (
    data: Partial<ConfirmStepValues>,
    post_status: string,
  ) => {
    const postType = PostType.PRODUCT;
    const result: IProductCreateData = {
      id: `p_${uuid()}`,
      type: PostType.PRODUCT,
      title: data.productName ?? "",
      description: data.description ?? "",
      price: data.prices && data.prices.length > 0 ? data.prices[0] : 0,
      discount: data.discount ?? "",
    };
    if (result) {
      if (id) {
        updatePost(id, result);
      } else {
        createPost(postType, post_status, result);
      }
      forms.map((item) => resetFormPersistence(item.name));
    }
    navigator("/shopper/feeds");
  };

  return (
    <div className="w-full h-screen">
      <hr className="w-full border-stone-300" />
      <div className="max-w-5xl w-full mx-auto px-6 pb-16">
        <Formik
          initialValues={mappedInitialValues}
          validationSchema={currentForm.validationSchema}
          onSubmit={async (data) => {
            if (id) {
              dataDispatch({
                data: data as Partial<ConfirmStepValues>,
                type: "edit",
              });
            } else
              dataDispatch({
                data: data as Partial<ConfirmStepValues>,
                type: "push",
              });
            selectedTabDispatch({ type: "next" });
          }}
          validateOnBlur={false}
          validateOnChange={false}
          enableReinitialize
        >
          {(formik: FormikProps<typeof currentForm.initialValues>) => (
            <Form>
              <div className="flex justify-between w-full my-5 px-2">
                <PostingGridTitle className="font-extrabold">
                  {isEdit ? `Edit Product` : `Add New Product`}
                </PostingGridTitle>
                <Link
                  to={"/seller/posts"}
                  className="text-zinc-500 font-medium flex"
                  onClick={() => resetForm(formik)}
                >
                  <IoIosClose className="w-6 h-6 text-zinc-500" />
                  <span className="text-zinc-500">Cancel</span>
                </Link>
              </div>
              <FormikPersist name={currentForm.name} currentTab={selectedTab} />
              {/* Mobile View */}
              <div className="w-full justify-center">
                <Tabs selectedTab={selectedTab} tabKey="PostCreateSteps">
                  <TabsList>
                    <div className="md:hidden flex flex-col w-full">
                      {/* Tab 1: Only show on mobile if selected */}
                      {selectedTab == 0 && (
                        <Tab className="cursor-default block md:block mb-3 mx-4">
                          <TabHeader
                            isFinished={visitedTabs.overview}
                            isSelected={selectedTab === 0}
                          >
                            <TabIcon>
                              <Document
                                size={24}
                                primaryColor={
                                  selectedTab === 0 ? "#FFF" : "#000"
                                }
                              />
                            </TabIcon>
                            <div className="flex flex-col justify-between">
                              <TabDescription>STEP 1</TabDescription>
                              <TabTitle>Overview</TabTitle>
                            </div>
                            <ProgressBar
                              relatedTab={0}
                              currentTab={selectedTab}
                            />
                          </TabHeader>
                        </Tab>
                      )}

                      {/* Tab 2: Similarly for other tabs */}
                      {selectedTab == 1 && (
                        <Tab className="cursor-default block md:block mb-4 mx-4">
                          <TabHeader
                            isFinished={visitedTabs.description}
                            isSelected={selectedTab === 1}
                          >
                            <TabIcon>
                              <Edit
                                size={24}
                                primaryColor={
                                  selectedTab === 1 ? "#FFF" : "#000"
                                }
                              />
                            </TabIcon>
                            <div className="flex flex-col justify-between">
                              <TabDescription>STEP 2</TabDescription>
                              <TabTitle>Description</TabTitle>
                            </div>
                            <ProgressBar
                              relatedTab={1}
                              currentTab={selectedTab}
                            />
                          </TabHeader>
                        </Tab>
                      )}

                      {/* Tab 3 */}
                      {selectedTab == 2 && (
                        <Tab className="cursor-default block md:block mb-4 mx-4">
                          <TabHeader
                            isFinished={visitedTabs.pricing}
                            isSelected={selectedTab == 2}
                          >
                            <TabIcon>
                              <BiDollarCircle
                                className={clsx(
                                  selectedTab === 2 && "text-white",
                                  "w-6 h-6",
                                )}
                              />
                            </TabIcon>
                            <div className="flex flex-col justify-between">
                              <TabDescription>STEP 3</TabDescription>
                              <TabTitle>Pricing</TabTitle>
                            </div>
                            <ProgressBar
                              relatedTab={2}
                              currentTab={selectedTab}
                            />
                          </TabHeader>
                        </Tab>
                      )}

                      {/* Tab 4 */}
                      {selectedTab == 3 && (
                        <Tab className="cursor-default block md:block mb-4 mx-2">
                          <TabHeader
                            isSelected={selectedTab === 3}
                            isFinished={visitedTabs.confirm}
                          >
                            <TabIcon>
                              <TickSquare
                                size={24}
                                primaryColor={
                                  selectedTab === 3 ? "#FFF" : "#000"
                                }
                              />
                            </TabIcon>
                            <div className="flex flex-col justify-between">
                              <TabDescription>STEP 4</TabDescription>
                              <TabTitle>Confirm</TabTitle>
                            </div>
                            <ProgressBar
                              relatedTab={3}
                              currentTab={selectedTab}
                            />
                          </TabHeader>
                        </Tab>
                      )}
                    </div>

                    {/* /DESKTOP VIEW */}
                    <div className="hidden w-full md:flex justify-between mb-6">
                      <Tab className="cursor-default">
                        <TabHeader
                          isFinished={visitedTabs.overview}
                          isSelected={selectedTab === 0}
                        >
                          <TabIcon>
                            <Document
                              size={24}
                              primaryColor={
                                visitedTabs.overview && !(selectedTab === 0)
                                  ? "#FFF"
                                  : "#000"
                              }
                            />
                          </TabIcon>
                          <div className="flex flex-col justify-between">
                            <TabDescription>STEP 1</TabDescription>
                            <TabTitle>Overview</TabTitle>
                          </div>
                          <ProgressBar
                            relatedTab={0}
                            currentTab={selectedTab}
                          />
                        </TabHeader>
                      </Tab>
                      <Tab className="cursor-default">
                        <TabHeader
                          isFinished={visitedTabs.description}
                          isSelected={selectedTab === 1}
                        >
                          <TabIcon>
                            <Edit
                              size={24}
                              primaryColor={
                                visitedTabs.description && !(selectedTab === 1)
                                  ? "#FFF"
                                  : "#000"
                              }
                            />
                          </TabIcon>
                          <div className="flex flex-col justify-between">
                            <TabDescription>STEP 2</TabDescription>
                            <TabTitle>Description</TabTitle>
                          </div>
                          <ProgressBar
                            relatedTab={1}
                            currentTab={selectedTab}
                          />
                        </TabHeader>
                      </Tab>
                      <Tab className="cursor-default">
                        <TabHeader
                          isFinished={visitedTabs.pricing}
                          isSelected={selectedTab === 2}
                        >
                          <TabIcon>
                            <BiDollarCircle
                              className={clsx(
                                visitedTabs.pricing &&
                                  !(selectedTab === 2) &&
                                  "text-white",
                                "w-6 h-6",
                              )}
                            />
                          </TabIcon>
                          <div className="flex flex-col justify-between">
                            <TabDescription>STEP 3</TabDescription>
                            <TabTitle>Pricing</TabTitle>
                          </div>
                          <ProgressBar
                            relatedTab={2}
                            currentTab={selectedTab}
                          />
                        </TabHeader>
                      </Tab>
                      <Tab className="cursor-default">
                        <TabHeader
                          isFinished={visitedTabs.confirm}
                          isSelected={selectedTab === 3}
                        >
                          <TabIcon>
                            <TickSquare
                              size={24}
                              primaryColor={
                                visitedTabs.confirm && !(selectedTab === 3)
                                  ? "#FFF"
                                  : "#000"
                              }
                            />
                          </TabIcon>
                          <div className="flex flex-col justify-between">
                            <TabDescription>STEP 4</TabDescription>
                            <TabTitle>Confirm</TabTitle>
                          </div>
                          <ProgressBar
                            relatedTab={3}
                            currentTab={selectedTab}
                          />
                        </TabHeader>
                      </Tab>
                    </div>
                  </TabsList>
                  <TabPanel>
                    <OverviewStep
                      formik={formik as OverviewStepSchema}
                      related_id={related_id}
                    />
                  </TabPanel>
                  <TabPanel>
                    <DetailsStep formik={formik as DescriptionStepSchema} />
                  </TabPanel>
                  <TabPanel>
                    <PricingStep
                      formik={formik as PricingStepSchema}
                      variants={(data.variants ?? [])
                        .filter((it: any) => it != null)
                        .map((variant: { name: string }) => variant.name)}
                    />
                  </TabPanel>
                  <TabPanel>
                    <ConfirmStep
                      formik={formik as any}
                      values={data as ConfirmStepValues}
                    />
                  </TabPanel>
                </Tabs>
              </div>

              <hr className="border-stone-300 w-screen" />

              <div className="flex justify-between w-full my-8 px-2">
                {selectedTab !== 0 ? (
                  <button
                    type="button"
                    className="inline-flex items-center border-2 py-2 px-4 rounded border-stone-300"
                    onClick={() =>
                      selectedTabDispatch({
                        type: "back",
                      })
                    }
                  >
                    <div className="text-zinc-300">
                      <ChevronLeft size={24} />
                    </div>
                    <p className="text-zinc-300">Back</p>
                  </button>
                ) : (
                  <div />
                )}
                <div className="flex gap-x-5">
                  {selectedTab !== forms.length - 1 ? (
                    <button
                      type="submit"
                      className="items-center bg-primary text-white py-2 px-8 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors inline-flex h-11"
                    >
                      Save & Next
                      <MdChevronRight className="ml-1 w-5 h-5" />
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="items-center border border-primary text-primary font-medium py-2 px-8 rounded-lg text-sm hover:bg-primary/5 transition-colors h-11"
                        onClick={async () => {
                          handleSubmit(data, PostStatus.DRAFTED);
                        }}
                      >
                        Save as Draft
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center bg-primary text-white py-2 px-8 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors h-11"
                        onClick={async () => {
                          handleSubmit(data, PostStatus.LIVE);
                        }}
                      >
                        Publish
                        <MdChevronRight className="ml-1 w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProductCreate;
