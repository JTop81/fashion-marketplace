import { IAuthor } from "../interfaces/author.interface";
import { IAuthorResponse } from "../interfaces/author-response.interface";

export const authorAdapter = (authorResponse: IAuthorResponse): IAuthor => {
  const { avatar, name } = authorResponse;

  return { avatar, name };
};
