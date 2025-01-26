import { Meta, StoryObj } from "@storybook/react";
import { Search } from "./search";
import { delay } from "../../utils/async";
import { fn } from "@storybook/test";
import { getPersonList } from "./search.data";
import { CardContent, CardMedia, Link, Typography } from "@mui/material";

const meta: Meta = {
  component: Search,
};

export default meta;

type Item = {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  img: string;
};

const ItemRenderer = ({ item }: { item: Item }) => (
  <>
    <CardMedia component="img" image={item.img} height={100} />
    <CardContent>
      <Typography variant="body1">
        {item.name} (
        <Link
          href={`mailto:${item.email}`}
          target="_blank"
          onClick={(ev) => ev.stopPropagation()}
        >
          {item.email}
        </Link>
        )
      </Typography>
      <Typography variant="body2">{item.bio}</Typography>
    </CardContent>
  </>
);

const smallData = getPersonList(10);

const largeData = getPersonList(1000);

export const Default: StoryObj<typeof Search<Item>> = {
  args: {
    getData: () => delay(1000, smallData),
    ItemRenderer,
    onSelect: fn(),
  },
};

export const LargeDataset: StoryObj<typeof Search<Item>> = {
  args: {
    getData: () => delay(1000, largeData),
    ItemRenderer,
    onSelect: fn(),
  },
};
