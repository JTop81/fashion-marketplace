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
import { Role } from "enums/role";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useAuthStore } from "setup/store/auth/authStore";
import { transformError } from "utils/transformError";
import * as Yup from "yup";

import { MultiStepFormProps } from "pages/public-home/components/Onboarding/models";

import { fieldsPerStepShopper } from "../brandBoutique/schema";

import { BuyerDetails } from "./BuyerDetails";
import CustomizeBuyerExperience from "./CustomizeBuyerExperience";
import { CustomText } from "./CustomText";
import { stepOneSchema, stepTwoSchema } from "./schema";
import { BuyerRoleMultiStepModel, useBuyerMultiStepFormStore } from "./store";

export const BuyerDetailsMultiStepForm: React.FC<MultiStepFormProps> = ({
  setIsModalOpen,
}) => {
  const [step, setStep] = useState(1);
  const { user } = useAuthStore();
  const [roleUpdateUser, setRoleUpdateUser] = useState<IUser>();
  const { stateData, updateState, resetState } = useBuyerMultiStepFormStore();
  const validationSchema = useMemo(() => {
    switch (step) {
      case 1:
        return stepOneSchema;
      case 2:
        return stepTwoSchema;
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
      const stepFields = fieldsPerStepShopper[step] || [];
      const errors = await formik.validateForm();

      if (Object.keys(errors).length === 0) {
        const stepValues: any = stepFields.reduce(
          (acc: any, field: any) => {
            if (formik.values[field] !== undefined) {
              acc[field] = formik.values[field];
            }
            return acc;
          },
          {} satisfies Record<string, any>,
        );
        if (step === 1) {
          // Step 1 API call
          let response: IRecordAssetResponse | undefined;
          if (formik.values.recordAssetBody.url !== "") {
            response = await recordAsset(formik.values.recordAssetBody);
          }
          const data = {
            type: Role.SHOPPER,
            geo_location_enabled: true,
            notifications_enabled: true,
          };
          const updatedData: IUpdateUser = {
            ...stepValues,
            phone: stepValues.phoneNumber,
            avatar_id: response?.id || null,
            status: "ACTIVE",
          };
          await updateUser(user?.id ?? "", updatedData)
            .then(async () => {
              await attachRoleToUser(user?.id ?? "", data)
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
                  }
                });
            })
            .catch((error) => {
              if (axios.isAxiosError(error)) {
                const userFriendlyMessage = transformError(error.response);
                toast.error(userFriendlyMessage);
              }
            });
        }
        if (step === 2) {
          updateState({ ...formik.values });
          setStep(step + 1);
        }
      }
    },
    [step, updateState, user?.id],
  );

  const handleSubmit = useCallback(
    async ({ values, setSubmitting, resetForm, resetState }: any) => {
      event?.preventDefault();
      const step2Fields = fieldsPerStepShopper[2] || [];
      const step3Fields = fieldsPerStepShopper[3] || [];

      const step2Values = step2Fields.reduce(
        (acc: any, field: any) => {
          if (values[field] !== undefined) {
            acc[field] = values[field];
          }
          return acc;
        },
        {} satisfies Record<string, any>,
      );

      const step3Values = step3Fields.reduce(
        (acc: any, field: any) => {
          if (values[field] !== undefined) {
            acc[field] = values[field];
          }
          return acc;
        },
        {} satisfies Record<string, any>,
      );

      const mergedValues = { ...step2Values, ...step3Values };

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

  const handleSkip = useCallback(
    (formik: FormikProps<any>) => {
      setStep((prevStep) => prevStep + 1);
      switch (step) {
        case 1:
          formik.setValues({
            ...formik.values,
            recordAsset: {},
            username: "",
            phoneNumber: "",
            checked: [],
            userAvatar: "",
          });
          break;
        case 2:
          formik.setValues({
            ...formik.values,
            categories: [],
          });
          break;
        default:
          formik.setValues({
            ...formik.values,
            free_text: "",
          });
      }
      updateState(formik.values); // Update the state as well
    },
    [step, updateState],
  );

  const handleModalClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const shopperSteps = useCallback(
    (
      formik: FormikProps<BuyerRoleMultiStepModel>,
    ): Record<number, JSX.Element> => ({
      1: <BuyerDetails handleNext={handleNext} formik={formik} />,
      2: (
        <CustomizeBuyerExperience
          handleNext={handleNext}
          formik={formik}
          handleSkip={handleSkip}
        />
      ),
      3: <CustomText formik={formik} />,
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
        onSubmit={async (
          values: BuyerRoleMultiStepModel,
          { setSubmitting, resetForm }: FormikHelpers<BuyerRoleMultiStepModel>,
        ) => {
          handleSubmit({ values, setSubmitting, resetForm, resetState });
        }}
      >
        {(formik) => (
          <Form className="flex items-center justify-center h-full w-full md:w-auto overflow-x-hidden px-5">
            <StepWrapper
              handleModalClick={handleModalClick}
              setIsModalOpen={setIsModalOpen}
              step={step}
              maxSteps={3}
            >
              {shopperSteps(formik)[step]}
            </StepWrapper>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BuyerDetailsMultiStepForm;
