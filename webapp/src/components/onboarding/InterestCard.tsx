import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Genre } from "../../lib/types";
import DoneIcon from "@mui/icons-material/Done";
import { Button } from "@mui/material";

export type InterestCardProps = {
  genreData: Genre;
  onSelect?: () => void;
  onDeselect?: () => void;
  selected?: boolean;
};

export default function InterestCard({
  genreData,
  onSelect = () => {},
  onDeselect = () => {},
  selected: initiaSelected = false,
}: InterestCardProps) {
  const [selected, setSelected] = React.useState(initiaSelected);
  return (
    <Button
      variant="outlined"
      sx={{
        borderRadius: "50%",
        padding: 0,
        width: 250,
        aspectRatio: "1/1",
        position: "relative",
      }}
      startIcon={selected && <DoneIcon sx={{ fontSize: "3rem !important" }} />}
      onClick={() => {
        setSelected((selected) => {
          if (!selected) onSelect();
          else onDeselect();
          return !selected;
        });
      }}
    >
      {
        <Card
          sx={{
            borderRadius: "inherit",
            width: "inherit",
            aspectRatio: "inherit",
            position: "absolute",
            ...(selected
              ? {
                  opacity: 0.15,
                }
              : {}),
          }}
          variant="outlined"
        >
          <CardContent
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {genreData.id}
            </Typography>
            <Typography variant="h5" component="div">
              {genreData.name}
            </Typography>
          </CardContent>
        </Card>
      }
    </Button>
  );
}
