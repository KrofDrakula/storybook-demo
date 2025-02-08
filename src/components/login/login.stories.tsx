import { StoryObj, Meta } from "@storybook/react";
import { Login } from "./login";
import { expect, fn, userEvent, within } from "@storybook/test";

const meta: Meta<typeof Login> = {
  component: Login,
  title: "02 - Login",
  tags: ["!autodocs"],
  args: {
    onSubmit: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof Login>;

export const Interactive: Story = {};

export const TestValidSubmission: Story = {
  name: "Test: Valid submission",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByPlaceholderText("Email"),
      "someone@somewhere.com",
      { delay: 50 }
    );
    await userEvent.type(
      canvas.getByPlaceholderText("Password"),
      "myultralongpasswordnoonewillguess",
      { delay: 50 }
    );
    await userEvent.click(canvas.getByText("Log in"));
    await expect(args.onSubmit).toHaveBeenCalledOnce();
  },
};

export const TestInvalidSubmission: Story = {
  name: "Test: No submit if form invalid",
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.type(
      canvas.getByPlaceholderText("Password"),
      "myultralongpasswordnoonewillguess",
      { delay: 50 }
    );
    await userEvent.click(canvas.getByText("Log in"));
    await expect(args.onSubmit).not.toHaveBeenCalledOnce();
  },
};
