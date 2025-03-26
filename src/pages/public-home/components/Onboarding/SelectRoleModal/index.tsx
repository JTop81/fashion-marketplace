import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { IRoleResponse } from "api/services/users/interfaces/user-response.interface";
import Modal from "common/components/Modal";
import { Role } from "enums/role";

interface ISelectRoleModal {
  roleItems: IRoleResponse[];
  setRole: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectRoleModal: React.FC<ISelectRoleModal> = ({
  roleItems,
  setRole,
  setIsModalOpen,
}) => {
  const filteredRoles = roleItems.filter((item) =>
    [Role.BOUTIQUE, Role.BRAND, Role.SHOPPER].includes(item.role_name),
  );
  return (
    <Modal setIsModalOpen={setIsModalOpen}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex relative w-[96%] px-8 py-14 md:w-[610px] mx-auto my-5 h-fit md:h-[558px] justify-center flex-col items-center gap-11 flex-shrink-0 rounded-[22px] bg-[var(--background-colour-light,_#fff)]"
      >
        <IoClose
          className="absolute top-[35px] right-[35px] cursor-pointer w-[24px] h-[24px]"
          onClick={() => setIsModalOpen(false)}
        />
        <div className="max-w-[322px] w-full align-self-end content-center items-center flex-col">
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="text-center mb-[20px]">
              <h1 className="text-black text-[32px] font-medium leading-[48px]">
                Pick Your Role
              </h1>
              <p className="text-[#4D5059] text-[14px] leading-[21px]">
                Let us know how you would like to use UNIK!
              </p>
            </div>

            {filteredRoles.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setRole(item.role_name);
                }}
                className="flex flex-row justify-between items-center max-w-[328px] w-full h-[72px] border-[1px] border-[solid] border-[#D4D4D4] rounded-[6px] text-[1.5rem] leading-[27px] px-[24px] py-[18px] [transition:transform] hover:flex-row hover:items-center hover:bg-[#f3d8fd] hover:opacity-[100%] -translate-x-[5px]"
              >
                <p className="text-[16px] text-black font-normal leading-[24px]">
                  {item.role_name}
                </p>
                <IoIosArrowRoundForward />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SelectRoleModal;
