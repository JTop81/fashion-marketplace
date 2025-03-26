import { IUser } from "../interfaces/user.interface";
import {
  IRoleResponse,
  IUserResponse,
} from "../interfaces/user-response.interface";

export const userAdapter = (userResponse: IUserResponse): IUser => {
  return userResponse;
};

export const IRoleAdapter = (
  roleResponses: IRoleResponse[],
): IRoleResponse[] => {
  return roleResponses.map(({ id, created_at, updated_at, role_name }) => ({
    id,
    created_at,
    updated_at,
    role_name,
  }));
};
