import Button from "@mui/material/Button";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Button> = {
  component: Button,
  title: "01 - Button",
  args: {
    children: "Click me",
  },
  parameters: {
    chromatic: {
      disableSnapshots: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Interactive: Story = {
  args: {
    children: "Hello world!",
  },
};

export const Variants: Story = {
  parameters: {
    matrix: [
      { prop: "variant", values: ["contained", "outlined", "text"] },
      {
        prop: "color",
        values: ["primary", "secondary", "success", "warning", "error", "info"],
      },
    ],
  },
};
