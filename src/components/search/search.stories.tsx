import { Meta, StoryObj } from "@storybook/react";
import { Search } from "./search";
import { delay } from "../../utils/async";
import { fn } from "@storybook/test";
import { Book, defaultSeed, getBookList } from "./search.data";
import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { ComponentProps, useCallback } from "react";

const onSelect = fn();

const ItemRenderer = ({
  item,
  onSelect,
}: {
  item: Book;
  onSelect: () => void;
}) => (
  <Card>
    <CardHeader
      avatar={<Avatar src={item.author.img} />}
      title={item.title}
      subheader={item.author.name}
    />
    <CardActionArea onClick={onSelect}>
      <CardMedia component="img" image={item.img} height={300} />
    </CardActionArea>
    <CardContent>
      <Typography variant="body1">{item.summary}</Typography>
    </CardContent>
  </Card>
);

const Template = ({ seed, generate, ...props }: StoryProps) => {
  const getData = useCallback(
    async () => delay(500, generate(seed)),
    [seed, generate]
  );
  return <Search {...props} getData={getData} />;
};

type StoryProps = ComponentProps<typeof Search<Book>> & {
  seed: string;
  generate: (seed: string) => Book[];
};

const meta: Meta<StoryProps> = {
  title: "04 - Search",
  component: Search,
  render: Template,
  args: {
    ItemRenderer,
    onSelect,
    seed: defaultSeed,
  },
  argTypes: {
    ItemRenderer: { type: "function" },
    generate: { type: "function" },
  },
  parameters: {
    chromatic: { delay: 1500 },
  },
  tags: ["!autodocs"],
};

export default meta;

export const SmallDataset: StoryObj<StoryProps> = {
  args: {
    generate: (seed) => getBookList(3, seed),
  },
};

export const NoData: StoryObj<StoryProps> = {
  args: {
    generate: () => [],
  },
};

export const WithError: StoryObj<StoryProps> = {
  args: {
    generate: () => {
      throw new Error("fetch failed");
    },
  },
};

export const LargeDataset: StoryObj<StoryProps> = {
  args: {
    generate: (seed) => getBookList(500, seed),
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  tags: ["!autodocs"],
};
