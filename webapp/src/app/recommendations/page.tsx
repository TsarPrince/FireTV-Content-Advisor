"use client";
import React from "react";
import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "next/link";

const Page = () => {
  const [recos, setRecos] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch("/api/movies");
      const json = await res.json();
      console.log(json);
      setRecos(json.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        my: 4,
        mx: 2,
      }}
    >
      <Grid container spacing={2} justifyContent={"stretch"}>
        {recos?.map((movie, key) => (
          <Grid item xs={2} key={key}>
            <Link
              href={{ pathname: `/watch-party`, query: movie }}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <Card movie={movie} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Page;
