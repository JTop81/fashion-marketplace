import { faker } from "@faker-js/faker";

import { Product } from "../types/product";

import thumb from "./the-dk-photography-NUoPWImmjCU-unsplash 3.png";

export const productFactory = (amount: number): Array<Product> => {
  const f = () => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    images: Array.from({ length: 3 }).map(() =>
      faker.image.urlLoremFlickr({ category: "fashion" }),
    ),
    mainImage: faker.image.urlLoremFlickr({
      category: "fashion",
      height: 950,
      width: 800,
    }),
    seller: {
      name: faker.company.name(),
      avatar: faker.image.avatar(),
      isApproved: faker.datatype.boolean(),
    },
    price: faker.commerce.price(),
    description: faker.lorem.paragraph(),
    status: faker.helpers.arrayElements(
      ["Live", "Draft", "Sold", "In Dispute", "Returned"],
      {
        min: 1,
        max: 1,
      },
    )[0],
    social: {
      reactions: faker.number.int({ min: 0, max: 5000 }),
      comments: faker.number.int({ min: 0, max: 5000 }),
      newComments: faker.number.int({ min: 0, max: 5000 }),
    },
  });

  return Array.from({ length: amount }).map(f);
};

export const defaultProducts: Array<Product> = [
  {
    title: "White and Green Blouse",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget aliquam ultricies.",
    images: Array.from({ length: 3 }).map(() =>
      faker.image.urlLoremFlickr({
        category: "fashion",
        height: 950,
        width: 800,
      }),
    ),
    price: "1085.20",
    id: "1",
    seller: {
      isApproved: true,
      name: "FLAIR",
      avatar: faker.image.avatar(),
    },
    status: "Live",
    mainImage: thumb,
    social: {
      reactions: 100,
      comments: 400,
      newComments: 10,
    },
  },
  ...productFactory(10),
];
