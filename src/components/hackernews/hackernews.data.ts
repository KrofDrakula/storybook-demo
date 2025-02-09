import Fiona from "fiona";
import { Item } from "./types";

export const createDataProvider = (seed: string) => {
  const seeder = Fiona(seed);
  return {
    getTopStories: () =>
      seeder.array(500, (g) => g.number({ min: 10e3, max: 30e3 })),
    getItem: (id: string | number) =>
      Fiona(seed + id).object(
        (g) =>
          ({
            id,
            by: [g.firstname(), g.surname()].join(" "),
            dead: false,
            deleted: false,
            descendants: g.number(),
            kids: g.number(),
            parent: g.oneOf([null, g.number()]),
            parts: [],
            poll: null,
            score: g.number({ min: 0, max: 500 }),
            text: g.gibberish({ qty: 400 }),
            title: g.sentence(),
            time: new Date(g.date()),
            type: "post",
            url: `https://news.ycombinator.com/${id}`,
          } satisfies Record<keyof Item, unknown>)
      ) as Item,
  };
};
