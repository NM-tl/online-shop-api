const { randomUUID } = require("crypto");

const users = [];
const products = [
  {
    id: randomUUID(),
    title: "Digital Painting",
    description: "A custom digital painting created by a professional artist.",
    price: 50,
  },
  {
    id: randomUUID(),
    title: "Online Yoga Class",
    description: "A one-hour online yoga session with a certified instructor.",
    price: 20,
  },
  {
    id: randomUUID(),
    title: "E-Book",
    description: "A bestselling e-book available for instant download.",
    price: 10,
  },
  {
    id: randomUUID(),
    title: "Virtual Cooking Class",
    description: "A two-hour virtual cooking class with a renowned chef.",
    price: 30,
  },
  {
    id: randomUUID(),
    title: "Music Streaming Subscription",
    description:
      "A three-month subscription to a premium music streaming service.",
    price: 15,
  },
  {
    id: randomUUID(),
    title: "Online Course",
    description: "Access to an online course on a subject of your choice.",
    price: 100,
  },
  {
    id: randomUUID(),
    title: "Digital Photo Album",
    description:
      "A beautifully crafted digital photo album with customizable options.",
    price: 25,
  },
  {
    id: randomUUID(),
    title: "Meditation App Subscription",
    description: "A one-year subscription to a popular meditation app.",
    price: 40,
  },
  {
    id: randomUUID(),
    title: "Virtual Tour",
    description: "A virtual tour of a famous museum or landmark.",
    price: 35,
  },
  {
    id: randomUUID(),
    title: "Online Personal Training Session",
    description:
      "A personalized one-hour workout session with a certified trainer.",
    price: 45,
  },
];
const carts = [];
const orders = [];

module.exports = { users, products, carts, orders };
