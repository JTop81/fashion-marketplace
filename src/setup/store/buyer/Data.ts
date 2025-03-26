import { productImg1, productImg2, productImg3 } from "assets";
import image from "assets/images/Buyer/inbox/Ellipse 19 (5).png";

export const BuyerChatData = [
  {
    image,
    name: "Cube",
    description: "Et ullamcorper vel iaculis bibendum nisl amet leo.",
    count: 1,
  },
  {
    image,
    name: "Cube",
    description: "Et ullamcorper vel iaculis bibendum nisl amet leo.",
    count: 2,
  },
];

export const postData = [
  {
    seller: "FLEX",
    time: "09h 30 m",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nibh cras dictum purus quis erat. Sapien, erat ultricies hac imperdiet amet, magna sed. Nibh tincidunt commodo potenti maecenas ornare sagittis senectus. A netus odio facilisis arcu ut metus. Dui, sit morbi fames vel felis,ullamcorper volutpat id vel. Sit tincidunt fusce ut velit eros egestas. Ipsum facilisi mattis velit tortor,mauris maecenas morbi. Massa, posuere tristique aliquet vitae mi tellus mus. Praesent felis eu urna lacus,magna. Ornare sit mi mattis.",
    reactions: "123",
    comments: "243",
    product: "Shiny Navy Sneakers",
    price: "$ 185.20",
    moreImages: [
      {
        image: productImg1,
        product: "Shiny Navy Sneakers",
        itamPrice: "$200.00",
        ETH: "0.0055",
      },
      {
        image: productImg2,
        product: "Shiny Navy Sneakers xx",
        itamPrice: "$200.00",
        ETH: "0.0045",
      },
      {
        image: productImg3,
        product: "Shiny Navy Sneakers ss",
        itamPrice: "$200.00",
        ETH: "0.0045",
      },
      // ... other image URLs
    ],
  },
];
export const buyerDate = [
  {
    Fname: "Jone",
    Lname: "Doe",
    balance: "$291.00",
    phone: "+30 0300- -3030 00",
    location: "Florida, USA",
    interest: "Mens wear, shoes, watches, clothing, Adventure kits",
    email: "john@abc.com",
    apartmentNO: "No.204 6",
    state: "state",
    postalCode: "90060",
    city: "New York",
    country: "USA",
  },
];

export const orderData = [
  {
    method: "Master card ended with ****34",
    discounts: "No",
    address: {
      name: "John Doe.",
      apartmentno: "NCS -w24",
      city: "New York",
      country: "USA",
    },
    phone: "+1 384- 2345",
    trackingNo: "213676439",
    orderStatus: "Item picked up from the warehouse",
    deliveredON: "124",
  },
];
