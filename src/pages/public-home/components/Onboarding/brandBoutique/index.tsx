import React, { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { recordAsset } from "api/services/assets";
import {
  attachOptionsToUser,
  attachRoleToUser,
  updateUser,
} from "api/services/users";
import {
  IUpdateUser,
  IUser,
} from "api/services/users/interfaces/user.interface";
import { IRecordAssetResponse } from "api/services/users/interfaces/user-response.interface";
import axios from "axios";
import Modal from "common/components/Modal";
import StepWrapper from "common/components/StepWrapper";
import { Details } from "common/modals/Details";
import { StoreDetails } from "common/modals/StoreDetails";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useAuthStore } from "setup/store/auth/authStore";
import {
  BrandBoutiqueRoleMultiStepModel,
  useBrandBoutiqueMultiStepFormStore,
} from "setup/store/profile/brandBoutique/brandBoutique";
import { transformError } from "utils/transformError";
import * as Yup from "yup";

import { MultiStepFormProps } from "pages/public-home/components/Onboarding/models";

import { CustomizeBrandBoutiqueExperience } from "./CustomizeBrandBoutiqueExperience";
import { CustomText } from "./CustomText";
import {
  fieldsPerStepBrandAndBoutique,
  stepOneSchema,
  stepThreeSchema,
  stepTwoSchema,
} from "./schema";

export const BrandBoutiqueDetailsMultiStepForm: React.FC<
  MultiStepFormProps
> = ({ roleToOnboard, setIsModalOpen }) => {
  const { user } = useAuthStore();
  const [roleUpdateUser, setRoleUpdateUser] = useState<IUser>();
  const [step, setStep] = useState(1);
  const { stateData, updateState, resetState } =
    useBrandBoutiqueMultiStepFormStore();
  const validationSchema = useMemo(() => {
    switch (step) {
      case 1:
        return stepOneSchema;
      case 2:
        return stepTwoSchema;
      case 3:
        return stepThreeSchema;
      default:
        return Yup.object().shape({});
    }
  }, [step]);

  const handleNext = useCallback(
    async (
      formik: FormikProps<any>,
      e: React.MouseEvent<HTMLButtonElement>,
    ): Promise<void> => {
      e.preventDefault();
      const errors = await formik.validateForm();

      if (Object.keys(errors).length === 0) {
        if (step === 2) {
          // Step 2 API call
          const step1Fields = fieldsPerStepBrandAndBoutique[1] || [];
          const step2Fields = fieldsPerStepBrandAndBoutique[2] || [];

          const step1Values = step1Fields.reduce(
            (acc: any, field: any) => {
              if (formik.values[field] !== undefined) {
                acc[field] = formik.values[field];
              }
              return acc;
            },
            {} satisfies Record<string, any>,
          );

          const step2Values = step2Fields.reduce(
            (acc: any, field: any) => {
              if (formik.values[field] !== undefined) {
                acc[field] = formik.values[field];
              }
              return acc;
            },
            {} satisfies Record<string, any>,
          );
          // Merge the data from Step 1 and Step 2
          const mergedValues = {
            ...step1Values,
            ...step2Values,
            city: formik.values.state,
            type: roleToOnboard,
          };
          let response: IRecordAssetResponse | null = null;
          if (formik.values.recordAssetBody.url !== "") {
            response = await recordAsset(formik.values.recordAssetBody);
          }
          const updatedData: IUpdateUser = {
            username: step1Values.username,
            phone: step1Values.phoneNumber,
            avatar_id: response?.id || null,
            status: "ACTIVE",
          };
          await updateUser(user?.id ?? "", updatedData)
            .then(async () => {
              await attachRoleToUser(user?.id ?? "", mergedValues)
                .then(async (res) => {
                  const user: IUser = {
                    ...res.user, // Spread user properties from res.user directly into mappedUser
                    assigned_role: {
                      ...res.role, // Spread role properties from res.role directly into assigned_role
                    },
                    avatar: res.avatar,
                    user_role: {
                      id: res.id,
                      user_id: res.user_id,
                      role_id: res.role_id,
                      assigned_date: res.assigned_date,
                      status: res.status,
                      details: res.details,
                      updated_at: res.updated_at,
                      created_at: res.created_at,
                      role: {
                        ...res.role, // Spread role properties here again if required
                      },
                    },
                  };
                  setRoleUpdateUser(user);
                  updateState({ ...formik.values });
                  setStep((prevStep) => prevStep + 1);
                })
                .catch((error) => {
                  if (axios.isAxiosError(error)) {
                    const userFriendlyMessage = transformError(error.response);

                    toast.error(userFriendlyMessage);

                    setStep(1);
                  }
                });
            })
            .catch((error) => {
              if (axios.isAxiosError(error)) {
                const userFriendlyMessage = transformError(error.response);
                toast.error(userFriendlyMessage);
                setStep(1);
              }
            });
        }
        if (step === 1 || step === 3) {
          updateState({ ...formik.values });
          setStep(step + 1);
        }
      }
    },
    [roleToOnboard, step, updateState, user?.id],
  );

  const handleSubmit = useCallback(
    async ({ values, setSubmitting, resetForm, resetState }: any) => {
      event?.preventDefault();
      const step3Fields = fieldsPerStepBrandAndBoutique[3] || [];
      const step4Fields = fieldsPerStepBrandAndBoutique[4] || [];

      const step3Values = step3Fields.reduce(
        (acc: any, field: any) => {
          if (values[field] !== undefined) {
            acc[field] = values[field];
          }
          return acc;
        },
        {} satisfies Record<string, any>,
      );

      const step4Values = step4Fields.reduce(
        (acc: any, field: any) => {
          if (values[field] !== undefined) {
            acc[field] = values[field];
          }
          return acc;
        },
        {} satisfies Record<string, any>,
      );

      // Merge the data from Step 3 and Step 4
      const mergedValues = { ...step3Values, ...step4Values };
      try {
        await attachOptionsToUser(mergedValues).catch((error) => {
          if (axios.isAxiosError(error)) {
            const userFriendlyMessage = transformError(error.response);
            toast.error(userFriendlyMessage);
          }
        });
      } finally {
        useAuthStore.setState((state) => ({
          ...state,
          user: roleUpdateUser,
        }));
        setSubmitting(false);
        resetForm();
        resetState();
        setIsModalOpen(false);
      }
    },
    [roleUpdateUser, setIsModalOpen],
  );

  const handleSkip = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const brandBoutiqueSteps = useCallback(
    (
      formik: FormikProps<BrandBoutiqueRoleMultiStepModel>,
    ): Record<number, JSX.Element> => ({
      1: <Details handleNext={handleNext} formik={formik} />,
      2: <StoreDetails handleNext={handleNext} formik={formik} />,
      3: (
        <CustomizeBrandBoutiqueExperience
          handleNext={handleNext}
          handleSkip={handleSkip}
          formik={formik}
        />
      ),
      4: <CustomText formik={formik} />,
    }),
    [handleNext, handleSkip],
  );

  return (
    <Modal setIsModalOpen={setIsModalOpen}>
      <Formik
        initialValues={stateData}
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(
          values: BrandBoutiqueRoleMultiStepModel,
          {
            setSubmitting,
            resetForm,
          }: FormikHelpers<BrandBoutiqueRoleMultiStepModel>,
        ) => {
          handleSubmit({ values, setSubmitting, resetForm, resetState });
        }}
      >
        {(formik) => (
          <Form className="flex items-center justify-center h-full w-full md:w-auto overflow-x-hidden">
            <StepWrapper
              handleModalClick={handleModalClick}
              setIsModalOpen={setIsModalOpen}
              step={step}
              maxSteps={4}
            >
              {brandBoutiqueSteps(formik)[step]}
            </StepWrapper>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BrandBoutiqueDetailsMultiStepForm;
