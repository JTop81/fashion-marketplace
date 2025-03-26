import { PropsWithChildren } from "types/propsWithChildren";

export const AboutTitle = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="flex flex-row mb-2">{children}</div>;
};

export const About = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <p className="text-[#000] font-[Poppins] text-[18px] not-italic font-semibold leading-[150%] p-0 m-0">
      {children}
    </p>
  );
};

export const FormContainer = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="flex flex-col justify-end items-end p-0 gap-[30px] w-full">
      {children}
    </div>
  );
};

export const Controllers = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="flex flex-col items-center p-0 gap-[24px] w-full">
      {children}
    </div>
  );
};

export const SignIn = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div className="flex flex-col items-end p-0 gap-[26px] max-w-[623px] !w-full">
      {children}
    </div>
  );
};

export const GroupFluid = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="!w-full">{children}</div>;
};

export const FluidRow = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="flex gap-[15px] mb-[16px]">{children}</div>;
};

export const InputContainer = ({ children }: PropsWithChildren<unknown>) => {
  return <div className="w-full">{children}</div>;
};
