import ReactSlider from "react-slider";
import clsx from "clsx";

type GeneralSliderProps = {
  min: number;
  max: number;
  defaultValues?: number[];
  currentValues: number[];
  handleValuesChange: (values: number[]) => void;
};

const Thumb = (props: any, state: any) => (
  <div
    {...props}
    className="h-2.5 w-2.5 -bottom-[2.5px] bg-customTextPink2 rounded-full text-center cursor-grab"
  >
    <span className="block absolute left-[-10px] bottom-4 text-[10px] p-1 bg-[#d1d1d1] rounded-md">
      ${state.valueNow}
    </span>
  </div>
);

const Track = (props: any, state: any) => (
  <div
    {...props}
    className={clsx(
      "top-0 bottom-0 rounded-full",
      state.index === 1 && "bg-customTextPink2",
    )}
  />
);

export default function GeneralSlider(props: GeneralSliderProps) {
  const { min, max, currentValues, handleValuesChange } = props;
  return (
    <ReactSlider
      className="horizontal-slider bg-[#d1d1d1] h-[5px] rounded-full w-full"
      defaultValue={currentValues}
      orientation="horizontal"
      renderThumb={Thumb}
      renderTrack={Track}
      min={min}
      max={max}
      pearling
      value={currentValues}
      onChange={handleValuesChange}
    />
  );
}
