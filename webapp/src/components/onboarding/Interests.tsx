"use client";

import { useState, useEffect, useRef } from "react";
import InterestCard from "./InterestCard";
import { Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Genre, GenreDataResponse } from "@/lib/types";

const Interests = ({
  initialData,
  onChange,
}: {
  initialData?: Genre[];
  onChange: (data: Genre[]) => void;
}) => {
  console.log({ initialData });
  const [genreData, setGenreData] = useState<Genre[]>([]);
  const checkedInterests = useRef<Genre[]>(initialData ?? []);

  useEffect(() => {
    fetch("/api/movies/genres")
      .then((res) => res.json())
      .then((data) => {
        const d = data as GenreDataResponse;
        setGenreData(d.genres ?? []);
      });
  }, []);

  return (
    <>
      <h1>Choose your interests</h1>
      <Paper
        elevation={1}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          height: "60vh",
          overflow: "auto",
          padding: "2rem 0",
          borderRadius: "1rem",
        }}
      >
        {genreData.length !== 0 ? (
          genreData.map((movie, idx) => (
            <InterestCard
              genreData={movie}
              key={idx}
              selected={
                checkedInterests.current.findIndex((m) => m.id === movie.id) !==
                -1
              }
              onSelect={() => {
                if (
                  checkedInterests.current.findIndex(
                    (m) => m.id === movie.id
                  ) !== -1
                )
                  return;
                checkedInterests.current.push(movie);
                onChange(checkedInterests.current);
              }}
              onDeselect={() => {
                checkedInterests.current = checkedInterests.current.filter(
                  (genre) => genre.id !== movie.id
                );
                onChange(checkedInterests.current);
              }}
            />
          ))
        ) : (
          <CircularProgress />
        )}
      </Paper>
    </>
  );
};

export default Interests;
