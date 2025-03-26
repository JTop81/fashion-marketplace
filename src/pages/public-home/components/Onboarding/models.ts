export interface FlowProps {
  handleSkip?: (...params: any) => void;
  handleNext?: (...params: any[]) => void;
  handleBack?: (...params: any[]) => void;
  allowNotifications?: boolean;
  notificationsAllowed?: boolean;
  selectRole?: string;
  formik?: any;
}

export const CountryOptions = [
  "United States",
  "Canada",
  "England",
  "Germany",
  "China",
  "France",
].sort();

export interface MultiStepFormProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectRole?: string;
  roleToOnboard?: string;
}
