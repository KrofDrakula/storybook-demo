import { useMemo, type ComponentType } from "react";
import {
  Input,
  Stack,
  IconButton,
  Grid2,
  Typography,
  Alert,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useLoader } from "../../hooks/use-loader";
import { map } from "../../utils/collections";

type Props<T extends { id: string }> = {
  /**
   * A function that returns a promise that resolves to an array of objects with
   * an `id` property.
   */
  getData: () => Promise<Iterable<T>>;
  /**
   * A component type that will render the given item. Note that the contents
   * will be wrapped in a `CardActionArea`.
   */
  ItemRenderer: ComponentType<{ item: T; onSelect: () => void }>;
  /**
   * An event handler that will file when an item in the list is selected.
   */
  onSelect: (id: string) => void;
};

/**
 * Takes an async data loading function and renders a list of items that the
 * user can use to filter using text search
 */
export const Search = <T extends { id: string }>({
  ItemRenderer,
  getData,
  onSelect,
}: Props<T>) => {
  const data = useLoader(getData);

  const renderedItems = useMemo(
    () =>
      data.status == "success"
        ? map(data.data, (item) => (
            <Grid2 size={1} key={item.id}>
              <ItemRenderer
                item={item}
                onSelect={() => onSelect(item.id)}
                key={item.id}
              />
            </Grid2>
          ))
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.status]
  );

  return (
    <Stack spacing={2} useFlexGap>
      <Stack direction="row" spacing={2} useFlexGap>
        <Input type="search" placeholder="Ctrl + ⌘" />
        <IconButton aria-label="search" loading={data.status == "pending"}>
          <SearchIcon />
        </IconButton>
      </Stack>
      {data.status == "success" ? (
        <Grid2 container direction="row" spacing={2} columns={3}>
          {renderedItems.length ? (
            renderedItems
          ) : (
            <Typography variant="body1">No results found.</Typography>
          )}
        </Grid2>
      ) : data.status == "error" ? (
        <Alert severity="error">Error: {data.error.message}</Alert>
      ) : null}
    </Stack>
  );
};
