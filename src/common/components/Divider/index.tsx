import React from "react";

interface DividerProps {
  label: string;
}

const Divider: React.FC<DividerProps> = ({ label }) => {
  return (
    <div className="relative ">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-black opacity-10"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-2 text-sm text-customBgGray">{label}</span>
      </div>
    </div>
  );
};

export default Divider;
