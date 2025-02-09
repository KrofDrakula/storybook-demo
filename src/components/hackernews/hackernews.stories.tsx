import { Meta, StoryObj } from "@storybook/react";
import { Hackernews } from "./hackernews";
import { createDataProvider } from "./hackernews.data";
import { http, HttpResponse } from "msw";

const meta: Meta<typeof Hackernews> = {
  title: "05 - Hackernews",
  component: Hackernews,
  tags: ["!autodocs"],
};

export default meta;

type Story = StoryObj<typeof Hackernews>;

export const Live: Story = {};

const data = createDataProvider("lets-be-honest");

export const Static: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          "https://hacker-news.firebaseio.com/v0/topstories.json",
          () => {
            return HttpResponse.json(data.getTopStories());
          }
        ),
        http.get(
          "https://hacker-news.firebaseio.com/v0/item/:id.json",
          (resolver) => {
            return HttpResponse.json(
              data.getItem(resolver.params.id as string)
            );
          }
        ),
      ],
    },
  },
};
