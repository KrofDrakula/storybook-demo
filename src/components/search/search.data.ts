import Fiona from "fiona";
import { toTitleCase } from "../../utils/strings";

export const defaultSeed = "some-random-string";

export type Book = {
  id: string;
  title: string;
  author: Person;
  img: string;
  summary: string;
};

export type Person = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  img: string;
};

export const getBookList = (n: number, seed = defaultSeed) =>
  Fiona(seed).array(n, (seeded) =>
    seeded.object({
      id: seeded.regex(/[0-9a-f]{16}/),
      author: seeded.object({
        id: seeded.regex(/[0-9a-f]{16}/),
        phone: seeded.regex(/\+\d{12}/),
        name: seeded.name(),
        img: seeded.img(),
        bio: seeded.paragraph(),
        email: (s) =>
          s.data.name.toLowerCase().replace(/\s+/g, ".") + "@gmail.com",
      }),
      title: toTitleCase(
        seeded.lorem({ qty: seeded.number({ min: 1, max: 10 }) })
      ),
      img: seeded.img(),
      summary: seeded.paragraph(),
    })
  ) as unknown as Book[];
