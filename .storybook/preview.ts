import type { Preview } from "@storybook/react";
import "../src/base.css";
import { withMatrix } from "../src/storybook/matrix";

const preview: Preview = {
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
    chromatic: {
      disableSnapshot: true,
    },
  },
  tags: ["autodocs"],
};

export default preview;
