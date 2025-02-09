import type { Preview } from "@storybook/react";
import "../src/base.css";
import { withMatrix } from "../src/storybook/matrix";
import { initialize, mswLoader } from "msw-storybook-addon";

initialize();

const preview: Preview = {
  loaders: [mswLoader],
  decorators: [withMatrix],
  parameters: {
    options: {
      storySort: (a, b) =>
        a.id === b.id
          ? 0
          : a.id.localeCompare(b.id, undefined, { numeric: true }),
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ["autodocs"],
};

export default preview;
