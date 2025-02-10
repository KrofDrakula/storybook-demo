import { useMemo, useState, type ComponentType } from "react";
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
  searchMap: (item: T) => string;
};

/**
 * Takes an async data loading function and renders a list of items that the
 * user can use to filter using text search
 */
export const Search = <T extends { id: string }>({
  ItemRenderer,
  getData,
  searchMap,
  onSelect,
}: Props<T>) => {
  const data = useLoader(getData);
  const [query, setQuery] = useState("");
  const term = query.trim().replace(/\s+/g, " ").toLowerCase();

  const filteredItems = useMemo(
    () =>
      data.status == "success"
        ? [...data.data].filter((item) =>
            searchMap(item).toLowerCase().includes(term)
          )
        : [],
    // @ts-expect-error data.data is conditionally available but fine to access here
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data.status, data.data, searchMap, term]
  );

  const renderedItems = useMemo(
    () =>
      filteredItems.map((item) => (
        <Grid2 size={1} key={item.id}>
          <ItemRenderer
            item={item}
            onSelect={() => onSelect(item.id)}
            key={item.id}
          />
        </Grid2>
      )),
    [ItemRenderer, filteredItems, onSelect]
  );

  return (
    <Stack spacing={2} useFlexGap>
      <Stack direction="row" spacing={2} useFlexGap>
        <Input
          type="search"
          placeholder="Search"
          onInput={(ev) => {
            setQuery((ev.target as HTMLInputElement).value);
          }}
          value={query}
        />
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
