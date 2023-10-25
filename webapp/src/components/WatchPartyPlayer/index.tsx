import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import {
  // Avatar, Chip,
  Rating,
  Stack,
} from "@mui/material";

// import { MOVIE_GENRES } from "@/constants/genres";
import { Movie } from "@/lib/types";
import { resolveImage } from "@/lib/tmdb";

// const MOVIE = {
//   adult: false,
//   backdrop_path:
//     "https://image.tmdb.org/t/p/original/tC78Pck2YCsUAtEdZwuHYUFYtOj.jpg",
//   genre_ids: [28, 53, 80],
//   id: 926393,
//   original_language: "en",
//   original_title: "The Equalizer 3",
//   overview:
//     "Robert McCall finds himself at home in Southern Italy but he discovers his friends are under the control of local crime bosses. As events turn deadly, McCall knows what he has to do: become his friends' protector by taking on the mafia.",
//   popularity: 1924.033,
//   poster_path:
//     "https://image.tmdb.org/t/p/original/b0Ej6fnXAP8fK75hlyi2jKqdhHz.jpg",
//   release_date: "2023-08-30",
//   title: "The Equalizer 3",
//   video: false,
//   vote_average: 7.3,
//   vote_count: 1055,
// };

export default function WatchPartyPlayer({ movie: MOVIE }: { movie: Movie }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        display: "flex",
        backgroundImage: `url(${resolveImage(MOVIE.backdrop_path)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "calc(100vh - 48px)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundImage: "linear-gradient(to right, black, #00000000)",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {MOVIE.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{
              maxWidth: "250px",
              mt: 4,
            }}
          >
            {MOVIE.overview}
          </Typography>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">
              {MOVIE.vote_count} Ratings
            </Typography>
            <Rating name="read-only" value={MOVIE.vote_average / 2} readOnly />
          </Box>
          <Box
            sx={{
              mt: 2,
            }}
          >
            <Typography>
              Released on {new Date(MOVIE.release_date).toDateString()}
            </Typography>
          </Box>
          <Stack
            direction="row"
            spacing={1}
            sx={{
              mt: 2,
            }}
          >
            {/* {MOVIE.genre_ids.map((genre_id) => (
              <Chip
                key={genre_id}
                avatar={<Avatar>{genre_id}</Avatar>}
                label={MOVIE_GENRES[genre_id as keyof typeof MOVIE_GENRES]}
              />
            ))} */}
          </Stack>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
