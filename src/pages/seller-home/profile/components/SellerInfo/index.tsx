import { useEffect, useMemo } from "react";
import { Edit } from "react-iconly";
import { AiOutlineClose } from "react-icons/ai";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { AssetType } from "api/services/assets/interfaces/asset.interface";
import CustomPhoneInput from "common/components/CustomPhoneInput";
import { Error } from "common/components/InputField";
import FileUpload from "common/components/UploadAsset/FileUpload";
import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useAuthStore } from "setup/store/auth/authStore";
import { useSellerProfileInfoStore } from "setup/store/profile/seller/seller";
import * as Yup from "yup";

import { SellerProfileBrandInfo, SellerProfileSellerInfo } from "../../types";
import {
  validationSchemaBrandInfo,
  validationSchemaSellerInfo,
} from "../Validation";

const SellerInfo = () => {
  const {
    brandInfo,
    sellerInfo,
    setBrandLogo,
    setBrandInfo,
    isSellerInfoModalOpen,
    setIsSellerInfoModalOpen,
    setSellerInfo,
    isBrandModalOpen,
    setIsBrandModalOpen,
  } = useSellerProfileInfoStore();
  const { user } = useAuthStore();
  const initialProfileInfoFromAuth = useSellerProfileInfoStore(
    (state) => state.initialProfileInfoFromAuth,
  );

  const validationSchema = useMemo(() => {
    switch (true) {
      case isBrandModalOpen:
        return validationSchemaBrandInfo;
      case isSellerInfoModalOpen:
        return validationSchemaSellerInfo;
      default:
        Yup.object().shape({});
    }
  }, [isBrandModalOpen, isSellerInfoModalOpen]);

  useEffect(() => {
    if (user) {
      initialProfileInfoFromAuth(user);
    }
  }, [user, initialProfileInfoFromAuth]);

  return (
    <div className="w-full flex flex-col gap-[32px] px-[48px] py-[32px] bg-gray">
      <div className="w-full flex flex-col border-b-[1px] border-[#000000]/10  pb-[32px] gap-[48px]">
        <div className="w-full flex flex-row justify-between">
          <p className="text-[20px] text-black font-medium leading-[30px]">
            Brand Information
          </p>
          <button
            className="flex flex-row gap-1"
            onClick={() => setIsBrandModalOpen(true)}
          >
            <Edit size={24} primaryColor="#9F00D9" />
            <div className="text-[16px] text-primary font-normal leading-[24px]">
              Edit
            </div>
          </button>
        </div>
        <p className="text-[14px] text-customTextGray font-normal leading-[21px]">
          Changes will be shown on all place
        </p>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>Brand Logo</p>
          </div>
          <div className="w-full md:w-3/4 flex flex-row gap-[16px] md:gap-[36px] items-center">
            <FileUpload
              initialImage={brandInfo.brandLogo}
              assetType={AssetType.AVATAR}
              userId={user?.id || ""}
              onUploadSuccess={(url, response) => setBrandLogo(url, response)}
              buttonText="Change Logo"
              additionalData={(response) => ({
                username: sellerInfo.username,
                phone: sellerInfo.phoneNumber || "",
                avatar_id: response?.id || null,
                status: "ACTIVE",
              })}
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>Brand Name</p>
          </div>
          <div className="w-full md:w-3/4">
            <p>{brandInfo.name}</p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>Brand Description</p>
          </div>
          <div className="w-full md:w-3/4">
            <p>{brandInfo.bio}</p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>Address 1</p>
          </div>
          <div className="w-full md:w-3/4">
            <p>{brandInfo.address1}</p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>Address 2</p>
          </div>
          <div className="w-full md:w-3/4">
            <p>{brandInfo.address2}</p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>City</p>
          </div>
          <div className="w-full md:w-3/4">
            <p>{brandInfo.city}</p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>Country</p>
          </div>
          <div className="w-full md:w-3/4">
            <p>{brandInfo.country}</p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>State</p>
          </div>
          <div className="w-full md:w-3/4">
            <p>{brandInfo.state}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col pb-[32px] gap-[32px]">
        <div className="w-full flex flex-row justify-between">
          <p className="text-[20px] text-black font-medium leading-[30px]">
            Seller&apos;s Information
          </p>
          <button
            className="flex flex-row gap-1"
            onClick={() => setIsSellerInfoModalOpen(true)}
          >
            <Edit size={24} primaryColor="#9F00D9" />
            <div className="text-[16px] text-primary font-normal leading-[24px]">
              Edit
            </div>
          </button>
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>Username</p>
          </div>
          <div className="w-full md:w-3/4">
            <p>{sellerInfo.username}</p>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>Email Address</p>
          </div>
          <div className="w-full md:w-3/4">
            <p>{sellerInfo.email}</p>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row">
          <div className="w-full md:w-1/4">
            <p>Phone Number</p>
          </div>
          <div className="w-full md:w-3/4">
            {sellerInfo.phoneNumber && <p>{sellerInfo.phoneNumber}</p>}
          </div>
        </div>
      </div>
      <Transition
        show={isBrandModalOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          open={isBrandModalOpen}
          onClose={() => setIsBrandModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex w-screen md:items-center items-end justify-end md:justify-center md:p-4">
            <DialogPanel className="relative w-full h-[50rem] overflow-y-auto max-w-[880px] bg-white px-[24px] md:px-[93px] py-[22px] md:py-[48px] rounded-[22px]">
              <DialogTitle className="text-[24px] text-black font-semibold leading-[36px] text-center">
                Edit Brand Information
              </DialogTitle>
              <FileUpload
                initialImage={brandInfo.brandLogo}
                assetType={AssetType.AVATAR}
                userId={user?.id || ""}
                onUploadSuccess={(url, response) => setBrandLogo(url, response)}
                buttonText="Change Logo"
                additionalData={(response) => ({
                  username: sellerInfo.username,
                  phone: sellerInfo.phoneNumber || "",
                  avatar_id: response.id || null,
                  status: "ACTIVE",
                })}
                type="modal"
              />
              <Formik
                initialValues={brandInfo}
                validationSchema={validationSchema}
                onSubmit={(
                  values: SellerProfileBrandInfo,
                  { setSubmitting }: FormikHelpers<SellerProfileBrandInfo>,
                ) => {
                  setSubmitting(false);
                  setBrandInfo(
                    {
                      ...brandInfo,
                      name: values.name,
                      bio: values.bio,
                      address1: values.address1,
                      address2: values.address2,
                    },
                    user?.user_role.id,
                  );
                  setIsBrandModalOpen(false);
                }}
              >
                {(formik: FormikProps<typeof brandInfo>) => (
                  <Form className="w-full flex flex-col gap-4 mt-6">
                    <label htmlFor="name">Brand Name</label>
                    <Field
                      id="name"
                      name="name"
                      placeholder="FLAIR"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />
                    <Error className="text-xs">{formik.errors.name}</Error>

                    <label htmlFor="bio">Brand Description</label>
                    <Field
                      as="textarea"
                      multiline
                      id="bio"
                      name="bio"
                      placeholder="Brand Description"
                      className="w-full h-[139px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />

                    <Error className="text-xs">{formik.errors.bio}</Error>

                    <label htmlFor="address1">Address 1</label>
                    <Field
                      id="address1"
                      name="address1"
                      placeholder="Address 1"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />
                    <Error className="text-xs">{formik.errors.address1}</Error>
                    <label htmlFor="address2">Address 2</label>
                    <Field
                      id="address2"
                      name="address2"
                      placeholder="Address 2"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />

                    <label htmlFor="city">City</label>
                    <Field
                      id="city"
                      name="city"
                      placeholder="Florida, USA"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />
                    <Error className="text-xs">{formik.errors.city}</Error>

                    <label htmlFor="country">Country</label>
                    <Field
                      id="country"
                      name="country"
                      placeholder="United States"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />

                    <Error className="text-xs">{formik.errors.country}</Error>

                    <label htmlFor="state">State</label>
                    <Field
                      id="state"
                      name="state"
                      placeholder="State"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />

                    <Error className="text-xs">{formik.errors.state}</Error>

                    <div className="flex flex-row gap-6 items-center justify-center mt-[36px] md:mt-[60px]">
                      <button
                        className="w-fit h-[48px] px-[24px] bg-transparent rounded-[6px] text-[16px] text-customBgGray font-semibold leading-[24px] border-[1px] broder-secondary"
                        onClick={() => setIsBrandModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-fit h-[48px] px-[24px] bg-secondary rounded-[6px] text-[16px] text-white font-semibold leading-[24px]"
                        type="submit"
                      >
                        Save changes
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <AiOutlineClose
                className="hidden md:flex absolute top-[16px] right-[16px] cursor-pointer"
                size={24}
                onClick={() => setIsBrandModalOpen(false)}
              />
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
      <Transition
        show={isSellerInfoModalOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          open={isSellerInfoModalOpen}
          onClose={() => setIsSellerInfoModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex w-screen md:items-center items-end justify-end md:justify-center md:p-4">
            <DialogPanel className="relative w-full h-fit max-w-[880px] bg-white p-[24px] md:px-[93px] py-[22px] md:py-[48px] rounded-[22px]">
              <DialogTitle className="text-[24px] text-black font-semibold leading-[36px] text-center">
                Edit Seller Information
              </DialogTitle>

              <Formik
                initialValues={sellerInfo}
                validationSchema={validationSchema}
                onSubmit={(
                  values: SellerProfileSellerInfo,
                  { setSubmitting }: FormikHelpers<SellerProfileSellerInfo>,
                ) => {
                  setSubmitting(false);
                  setSellerInfo(values);
                }}
              >
                {(formik: FormikProps<typeof sellerInfo>) => (
                  <Form className="w-full flex flex-col gap-4 mt-6">
                    <label htmlFor="username">Username</label>
                    <Field
                      id="username"
                      name="username"
                      placeholder="John"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />

                    <Error className="text-xs">{formik.errors.username}</Error>

                    <label htmlFor="email">Email</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="john@acme.com"
                      type="email"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />

                    <Error className="text-xs">{formik.errors.email}</Error>

                    <CustomPhoneInput
                      name="phoneNumber"
                      value={sellerInfo.phoneNumber}
                      onChange={(value: string) =>
                        formik.setFieldValue("phoneNumber", value)
                      }
                    />

                    <Error className="text-xs">
                      {formik.errors.phoneNumber}
                    </Error>

                    <div className="flex flex-row gap-6 items-center justify-center mt-[36px] md:mt-[60px]">
                      <button
                        className="w-fit h-[48px] px-[24px] bg-transparent rounded-[6px] text-[16px] text-customBgGray font-semibold leading-[24px] border-[1px] broder-secondary"
                        onClick={() => setIsSellerInfoModalOpen(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-fit h-[48px] px-[24px] bg-secondary rounded-[6px] text-[16px] text-white font-semibold leading-[24px]"
                        type="submit"
                      >
                        Save changes
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <AiOutlineClose
                className="hidden md:flex absolute top-[16px] right-[16px] cursor-pointer"
                size={24}
                onClick={() => setIsSellerInfoModalOpen(false)}
              />
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SellerInfo;
