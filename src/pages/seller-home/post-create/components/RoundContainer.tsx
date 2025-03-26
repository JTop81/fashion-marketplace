import { IoIosClose } from "react-icons/io";
import clsx from "clsx";

type RoundContainerProps = React.HTMLAttributes<HTMLDivElement>;

export const RoundContainer = ({
  className,
  children,
  ...rest
}: RoundContainerProps) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-x-2 rounded-full border border-stone-300 px-5 py-2 border-2",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

type RoundClosableContainerProps = {
  handleClose: () => void;
} & RoundContainerProps;

export const RoundClosableContainer = ({
  children,
  handleClose,
  ...rest
}: RoundClosableContainerProps) => {
  return (
    <>
      <RoundContainer {...rest}>
        {children}

        <button type="button" onClick={handleClose}>
          <IoIosClose className="w-6 h-6" />
        </button>
      </RoundContainer>
    </>
  );
};
