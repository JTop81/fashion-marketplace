export interface ICategoriesResponse {
  id: string;
  preference_name: string;
  options: options[];
  created_at: string;
  updated_at: string;
}

export interface options {
  id: string;
  option_value: string;
  preference_id: string;
  requires_more_context: boolean;
}

export interface IUpdateUserRoleOptions {
  id: string;
  user_role_id: string;
  free_text: string;
  created_at: string;
  updated_at: string;
  option: options;
}

export interface IUpdateUserRoleOptionsResponse {
  items: IUpdateUserRoleOptions[];
  limit: number;
  cursor: string;
}
