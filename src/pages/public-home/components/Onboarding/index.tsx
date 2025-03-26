import React, { useEffect, useState } from "react";
import { getRoles } from "api/services/users";
import { IRoleResponse } from "api/services/users/interfaces/user-response.interface";
import { Role } from "enums/role";
import { useAuthStore } from "setup/store/auth/authStore";

import BrandBoutiqueDetailsMultiStepForm from "./brandBoutique";
import BuyerDetailsMultiStepForm from "./buyer";
import SelectRoleModal from "./SelectRoleModal";

const OnboardingModal: React.FC = () => {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [roleToOnboard, setRoleToOnboard] = useState<string>(Role.UNASSIGNED);
  const [roleItems, setRoleItems] = useState<IRoleResponse[]>([]);
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await getRoles(); // Assuming getRoles is an async function
        setRoleItems(roles); // Set the fetched roles
      } catch (error) {}
    };
    fetchRoles();
    if (user?.assigned_role.role_name === Role.UNASSIGNED) {
      setIsModalOpen(true);
    }
  }, [setIsModalOpen, user?.assigned_role.role_name]);
  return (
    <>
      {isModalOpen &&
        roleToOnboard === Role.UNASSIGNED &&
        roleItems?.length > 0 && (
          <SelectRoleModal
            roleItems={roleItems}
            setRole={setRoleToOnboard}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      {isModalOpen && roleToOnboard === Role.SHOPPER && (
        <BuyerDetailsMultiStepForm
          setIsModalOpen={setIsModalOpen}
          roleToOnboard={roleToOnboard}
        />
      )}
      {isModalOpen &&
        (roleToOnboard === Role.BRAND || roleToOnboard === Role.BOUTIQUE) && (
          <BrandBoutiqueDetailsMultiStepForm
            roleToOnboard={roleToOnboard}
            setIsModalOpen={setIsModalOpen}
          />
        )}
    </>
  );
};

export default OnboardingModal;
