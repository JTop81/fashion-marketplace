import React, { useEffect, useMemo } from "react";
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
import { useBuyerProfileInfoStore } from "setup/store/profile/buyer/shopper";
import * as Yup from "yup";

import {
  validationSchemaContactInfo,
  validationSchemaShippingAddress,
  validationSchemaShopperInfo,
} from "pages/buyer-home/profile/components/Validation";

import {
  BuyerProfileContactInfo,
  BuyerProfileShippingAddress,
  BuyerProfileShopperInfo,
} from "../types";

function ShopperInfo() {
  const {
    shopperInfo,
    contactInfo,
    shippingAddress,
    setShopperInfo,
    setContactInfo,
    setShippingAddress,
    setShopperShopperAvatar,
    isShopperInfoModalOpen,
    setIsShopperInfoModalOpen,
    isShippingAddressModalOpen,
    setIsShippingAddressModalOpen,
    isBuyerContactInfoModalOpen,
    setIsBuyerContactInfoModalOpen,
    fetchShopperInfo,
  } = useBuyerProfileInfoStore();

  const { user } = useAuthStore();
  const initialProfileInfoFromAuth = useBuyerProfileInfoStore(
    (state) => state.initialProfileInfoFromAuth,
  );

  useEffect(() => {
    if (user) {
      initialProfileInfoFromAuth(user);
    }
  }, [user, initialProfileInfoFromAuth]);

  useEffect(() => {
    if (user) {
      fetchShopperInfo().catch(console.error);
    }
  }, [user, fetchShopperInfo]);

  const validationSchema = useMemo(() => {
    switch (true) {
      case isShopperInfoModalOpen:
        return validationSchemaShopperInfo;
      case isShippingAddressModalOpen:
        return validationSchemaShippingAddress;
      case isBuyerContactInfoModalOpen:
        return validationSchemaContactInfo;
      default:
        Yup.object().shape({});
    }
  }, [
    isShopperInfoModalOpen,
    isShippingAddressModalOpen,
    isBuyerContactInfoModalOpen,
  ]);

  return (
    <div className="w-full flex flex-col gap-[32px]">
      <div className="w-full flex flex-col border-b-[1px] border-[#000000]/10 pb-[32px] gap-[48px]">
        <div className="w-full flex flex-row justify-between">
          <p className="text-[20px] text-black font-medium leading-[30px]">
            Shopper&apos;s Information
          </p>
          <button
            className="flex flex-row gap-1"
            onClick={() => setIsShopperInfoModalOpen(true)}
          >
            <Edit size={24} primaryColor="#9F00D9" />
            <div className="text-[16px] text-primary font-normal leading-[24px]">
              Edit
            </div>
          </button>
        </div>
        <div className="w-full flex flex-row items-center">
          <div className="w-1/4">
            <p>Avatar</p>
          </div>
          <div className="w-3/4 flex flex-row gap-[16px] items-center">
            <div className="w-[120px] h-[120px]">
              <FileUpload
                initialImage={user?.avatar?.url || undefined}
                assetType={AssetType.AVATAR}
                userId={user?.id || ""}
                onUploadSuccess={(url, response) =>
                  setShopperShopperAvatar(url, response)
                }
                additionalData={(response) => ({
                  username: shopperInfo.username,
                  phone: shopperInfo.phoneNumber || "",
                  avatar_id: response?.id || null,
                  status: "ACTIVE",
                })}
                buttonText="Change Avatar"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row items-center">
          <div className="w-1/4">
            <p>Username</p>
          </div>
          <div className="w-3/4">
            <p>{shopperInfo.username}</p>
          </div>
        </div>
        <div className="w-full flex flex-row items-center">
          <div className="w-1/4">
            <p>Phone Number</p>
          </div>
          <div className="w-3/4">
            {shopperInfo.phoneNumber && <p>{shopperInfo.phoneNumber}</p>}
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col pb-[32px] gap-[32px] border-b-[1px] border-[#000000]/10">
        <div className="w-full flex flex-row justify-between">
          <p className="text-[20px] text-black font-medium leading-[30px]">
            Contact Information
          </p>
          <button
            className="flex flex-row gap-1"
            onClick={() => setIsBuyerContactInfoModalOpen(true)}
          >
            <Edit size={24} primaryColor="#9F00D9" />
            <div className="text-[16px] text-primary font-normal leading-[24px]">
              Edit
            </div>
          </button>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/4">
            <p>Email Address</p>
          </div>
          <div className="w-3/4">
            <p>{contactInfo.email}</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col pb-[32px] gap-[32px]">
        <div className="w-full flex flex-row justify-between">
          <p className="text-[20px] text-black font-medium leading-[30px]">
            Shipping address
          </p>
          <button
            className="flex flex-row gap-1"
            onClick={() => setIsShippingAddressModalOpen(true)}
          >
            <Edit size={24} primaryColor="#9F00D9" />
            <div className="text-[16px] text-primary font-normal leading-[24px]">
              Edit
            </div>
          </button>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/4">
            <p>Address 1</p>
          </div>
          <div className="w-3/4">
            <p>{shippingAddress.address1}</p>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/4">
            <p>Address 2</p>
          </div>
          <div className="w-3/4">
            <p>{shippingAddress.address2}</p>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/4">
            <p>City</p>
          </div>
          <div className="w-3/4">
            <p>{shippingAddress.city}</p>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/4">
            <p>Country</p>
          </div>
          <div className="w-3/4">
            <p>{shippingAddress.country}</p>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/4">
            <p>State</p>
          </div>
          <div className="w-3/4">
            <p>{shippingAddress.state}</p>
          </div>
        </div>
        <div className="w-full flex flex-row">
          <div className="w-1/4">
            <p>Postal Code</p>
          </div>
          <div className="w-3/4">
            <p>{shippingAddress.zipcode}</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Transition
        show={isShopperInfoModalOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          open={isShopperInfoModalOpen}
          onClose={() => setIsShopperInfoModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-full max-w-[880px] bg-white px-6 md:px-[93px] py-[48px] rounded-[22px]">
              <DialogTitle className="text-[24px] text-black font-semibold leading-[36px] text-center">
                Edit Shopper Information
              </DialogTitle>
              <FileUpload
                initialImage={shopperInfo.shopperAvatar}
                assetType={AssetType.AVATAR}
                userId={user?.id || ""}
                onUploadSuccess={(url, response) =>
                  setShopperShopperAvatar(url, response)
                }
                additionalData={(response) => ({
                  username: shopperInfo.username,
                  phone: shopperInfo.phoneNumber || "",
                  avatar_id: response?.id || null,
                  status: "ACTIVE",
                })}
                buttonText="Change Avatar"
                type="modal"
              />
              <Formik
                validationSchema={validationSchema}
                initialValues={shopperInfo}
                onSubmit={(
                  values: BuyerProfileShopperInfo,
                  { setSubmitting }: FormikHelpers<BuyerProfileShopperInfo>,
                ) => {
                  setSubmitting(false);
                  setShopperInfo(
                    {
                      ...shopperInfo,
                      username: values.username,
                      phoneNumber: values.phoneNumber,
                    },
                    user?.user_role.id,
                  );
                }}
              >
                {(formik: FormikProps<typeof shopperInfo>) => (
                  <Form className="w-full flex flex-col gap-4 mt-6">
                    <label htmlFor="username">Username</label>
                    <Field
                      id="username"
                      name="username"
                      placeholder="Username"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />

                    <Error className="text-xs">{formik.errors.username}</Error>

                    <CustomPhoneInput
                      name="phoneNumber"
                      value={shopperInfo.phoneNumber}
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
                        onClick={() => setIsShopperInfoModalOpen(false)}
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
                className="absolute top-[16px] right-[16px] cursor-pointer"
                size={24}
                onClick={() => setIsShopperInfoModalOpen(false)}
              />
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>

      <Transition
        show={isBuyerContactInfoModalOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          open={isBuyerContactInfoModalOpen}
          onClose={() => setIsBuyerContactInfoModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-full max-w-[880px] bg-white px-6 md:px-[93px] py-[48px] rounded-[22px]">
              <DialogTitle className="text-[24px] text-black font-semibold leading-[36px] text-center">
                Edit Contact Information
              </DialogTitle>

              <Formik
                initialValues={contactInfo}
                onSubmit={(
                  values: BuyerProfileContactInfo,
                  { setSubmitting }: FormikHelpers<BuyerProfileContactInfo>,
                ) => {
                  setSubmitting(false);
                  setContactInfo(values);
                  setIsBuyerContactInfoModalOpen(false);
                }}
              >
                {(formik: FormikProps<typeof contactInfo>) => (
                  <Form className="flex flex-col gap-4">
                    <label htmlFor="email">Email Address</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="john@acme.com"
                      type="email"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />
                    <Error className="text-xs">{formik.errors.email}</Error>
                    <div className="flex flex-row gap-6 items-center justify-center mt-[36px] md:mt-[60px]">
                      <button
                        className="w-fit h-[48px] px-[24px] bg-transparent rounded-[6px] text-[16px] text-customBgGray font-semibold leading-[24px] border-[1px] broder-secondary"
                        onClick={() => setIsBuyerContactInfoModalOpen(false)}
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
                className="absolute top-[16px] right-[16px] cursor-pointer"
                size={24}
                onClick={() => setIsBuyerContactInfoModalOpen(false)}
              />
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>

      <Transition
        show={isShippingAddressModalOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="duration-300 ease-out"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          open={isShippingAddressModalOpen}
          onClose={() => setIsShippingAddressModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex w-screen items-center justify-center p-4">
            <DialogPanel className="w-full max-w-[880px] bg-white px-6 md:px-[93px] py-[48px] rounded-[22px] max-h-[90vh] overflow-y-auto">
              <DialogTitle className="text-[24px] text-black font-semibold leading-[36px] text-center">
                Edit Shipping
              </DialogTitle>

              <Formik
                validationSchema={validationSchema}
                initialValues={shippingAddress}
                onSubmit={(
                  values: BuyerProfileShippingAddress,
                  { setSubmitting }: FormikHelpers<BuyerProfileShippingAddress>,
                ) => {
                  setSubmitting(false);
                  setShippingAddress(values);
                  setIsShippingAddressModalOpen(false);
                }}
              >
                {(formik: FormikProps<typeof shippingAddress>) => (
                  <Form className="flex flex-col gap-4">
                    <label htmlFor="address1">Address 1</label>
                    <Field
                      id="address1"
                      name="address1"
                      placeholder="7538, jackson ave staten"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />
                    <Error className="text-xs">{formik.errors.address1}</Error>
                    <label htmlFor="address2">Address 2</label>
                    <Field
                      id="address2"
                      name="address2"
                      placeholder="7538, jackson ave staten"
                      className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                    />
                    <Error className="text-xs">{formik.errors.address2}</Error>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city">City</label>
                        <Field
                          id="city"
                          name="city"
                          placeholder="New York"
                          className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                        />
                        <Error className="text-xs">{formik.errors.city}</Error>
                      </div>
                      <div>
                        <label htmlFor="state">State</label>
                        <Field
                          id="state"
                          name="state"
                          placeholder="New York"
                          className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                        />
                        <Error className="text-xs">{formik.errors.state}</Error>
                      </div>
                      <div>
                        <label htmlFor="country">Country</label>
                        <Field
                          id="country"
                          name="country"
                          placeholder="United States"
                          className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                        />
                        <Error className="text-xs">
                          {formik.errors.country}
                        </Error>
                      </div>
                      <div>
                        <label htmlFor="zipcode">Zip Code</label>
                        <Field
                          id="zipcode"
                          name="zipcode"
                          placeholder="12"
                          className="w-full h-[57px] border-[1px] border-customBorderGray rounded-[6px] px-[18px] py-[16px]"
                        />
                        <Error className="text-xs">
                          {formik.errors.zipcode}
                        </Error>
                      </div>
                    </div>
                    <div className="flex flex-row gap-6 items-center justify-center mt-[36px] md:mt-[60px]">
                      <button
                        className="w-fit h-[48px] px-[24px] bg-transparent rounded-[6px] text-[16px] text-customBgGray font-semibold leading-[24px] border-[1px] broder-secondary"
                        onClick={() => setIsShippingAddressModalOpen(false)}
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
                className="absolute top-[16px] right-[16px] cursor-pointer"
                size={24}
                onClick={() => setIsShippingAddressModalOpen(false)}
              />
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ShopperInfo;
