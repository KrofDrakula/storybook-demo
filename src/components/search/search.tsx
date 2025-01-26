import type { ComponentType } from "react";
import {
  Input,
  Stack,
  IconButton,
  Grid2,
  Card,
  CardActionArea,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useLoader } from "../../hooks/use-loader";

type Props<T extends { id: string }> = {
  /**
   * A function that returns a promise that resolves to an array of objects with
   * an `id` property.
   */
  getData: () => Promise<T[]>;
  /**
   * A component type that will render the given item.
   */
  ItemRenderer: ComponentType<{ item: T }>;
  /**
   * An event handler that will
   */
  onSelect?: (id: string) => void;
};

export const Search = <T extends { id: string }>({
  ItemRenderer,
  getData,
  onSelect,
}: Props<T>) => {
  const data = useLoader(getData);

  return (
    <Stack spacing={2} useFlexGap>
      <Stack direction="row" spacing={2} useFlexGap>
        <Input type="search" placeholder="Ctrl + ⌘" />
        <IconButton aria-label="search" loading={data.status == "pending"}>
          <SearchIcon />
        </IconButton>
      </Stack>
      {data.status == "success" ? (
        <Grid2
          container
          direction="row"
          spacing={2}
          columns={{ xs: 2, md: 3, lg: 4 }}
        >
          {data.data.map((item) => (
            <Card key={item.id}>
              <CardActionArea
                disabled={!onSelect}
                onClick={() => {
                  onSelect?.(item.id);
                }}
              >
                <ItemRenderer item={item} />
              </CardActionArea>
            </Card>
          ))}
        </Grid2>
      ) : data.status == "error" ? (
        <p>Error: {data.error.message}</p>
      ) : null}
    </Stack>
  );
};
