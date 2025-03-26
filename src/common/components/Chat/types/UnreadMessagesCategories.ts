import { ChatCategory } from "common/components/Chat/enums";

export type UnreadMessagesCategoriesType = {
  [ChatCategory.ALL]: boolean;
  [ChatCategory.ARCHIEVED]: boolean;
  [ChatCategory.BLOCKED]: boolean;
  [ChatCategory.UNREAD]: boolean;
};
