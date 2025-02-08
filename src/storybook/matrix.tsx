import { makeDecorator } from "@storybook/preview-api";
import { ReactNode } from "react";
import styles from "./matrix.module.css";

type GetStory = Parameters<Parameters<typeof makeDecorator>[0]["wrapper"]>[0];
type Context = Parameters<Parameters<typeof makeDecorator>[0]["wrapper"]>[1];

const renderStory = (
  getStory: GetStory,
  context: Context,
  props: Record<string, unknown>
) =>
  getStory({
    ...context,
    args: { ...context.args, ...props },
  }) as ReactNode;

export const withMatrix = makeDecorator({
  name: "withMatrix",
  parameterName: "matrix",
  skipIfNoParametersOrOptions: true,
  wrapper: (getStory, context) => {
    const dimensions = context.parameters.matrix as {
      prop: string;
      values: unknown[];
    }[];
    if (!dimensions?.length) {
      return getStory(context);
    } else if (dimensions.length == 1) {
      const [{ prop, values }] = dimensions;
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th colSpan={2}>{prop}</th>
            </tr>
          </thead>
          <tbody>
            {values.map((value) => (
              <tr key={value + ""}>
                <th>{value + ""}</th>
                <td>{renderStory(getStory, context, { [prop]: value })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (dimensions.length == 2) {
      const [row, column] = dimensions;
      return (
        <table className={styles.table}>
          <thead>
            <tr>
              <th></th>
              {column.values.map((value) => (
                <th key={value + ""}>{value + ""}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {row.values.map((rowValue) => (
              <tr key={rowValue + ""}>
                <th>{rowValue + ""}</th>
                {column.values.map((value) => (
                  <td>
                    {renderStory(getStory, context, {
                      [column.prop]: value,
                      [row.prop]: rowValue,
                    })}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  },
});
