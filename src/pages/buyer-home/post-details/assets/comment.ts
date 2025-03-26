import { faker } from "@faker-js/faker";

import { Comment } from "../types/comment";

export const commentFactory = (amount: number): Array<Comment> => {
  const f = () => ({
    id: faker.string.uuid(),
    content: faker.lorem.paragraph(),
    created_at: faker.date.past().toISOString(),
    updated_at: faker.date.past().toISOString(),
    seller: {
      name: faker.company.name(),
      avatar: faker.image.avatar(),
      isApproved: faker.datatype.boolean(),
    },
    statistics: {
      total: {
        saves: 0,
        comments: 0,
        reactions: 0,
      },
      current_user: {
        saves: 0,
        comments: 0,
        reactions: 0,
      },
    },
  });

  return Array.from({ length: amount }).map(f);
};
