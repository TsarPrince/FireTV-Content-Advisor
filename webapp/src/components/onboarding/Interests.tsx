"use client";

import { useState, useEffect } from "react";
import InterestCard from "./InterestCard";

export default function Interests() {
  const [movieData, setMovieData] = useState<unknown[]>([]);

  //   const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovieData(data.results));
  }, []);

  return (
    <>
      <h1>Choose your interests</h1>
      {movieData.map((movie, idx) => (
        <InterestCard movieData={movie} key={idx} />
      ))}
    </>
  );
}
