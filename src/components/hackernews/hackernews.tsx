import { useCallback } from "react";
import { chunk } from "../../utils/collections";
import { Item } from "./types";
import { useLoader } from "../../hooks/use-loader";
import { Alert, CircularProgress } from "@mui/material";

const baseURL = new URL("https://hacker-news.firebaseio.com/v0/");
const topStories = new URL("topstories.json", baseURL);

const getStoryURL = (id: string | number) =>
  new URL(`item/${id}.json`, baseURL);

const getTopStories = async (n: number) => {
  const ids = (await fetch(topStories).then((res) => res.json())) as number[];
  const results = [];
  for (const idsToFetch of chunk(ids, 4)) {
    results.push(
      ...(
        await Promise.all(
          idsToFetch.map((id) =>
            fetch(getStoryURL(id)).then((res) => res.json() as Promise<Item>)
          )
        )
      ).filter((item) => !item.dead && !item.deleted)
    );
    if (results.length >= n) break;
  }
  return results;
};

export const Hackernews = () => {
  const fetch25Items = useCallback(() => getTopStories(25), []);
  const result = useLoader(fetch25Items);

  if (result.status == "pending") {
    return <CircularProgress />;
  }

  if (result.status == "error") {
    return (
      <Alert severity="error">
        An error occured while fetching data: {result.error.message}
      </Alert>
    );
  }

  return (
    <ol>
      {result.data.map((item) => (
        <li key={item.id}>
          <strong>{item.by}</strong>:{" "}
          <a href={item.url} target="_blank">
            {item.title}
          </a>{" "}
          (⬆{item.score})
        </li>
      ))}
    </ol>
  );
};
