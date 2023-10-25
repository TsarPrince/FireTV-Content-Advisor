"use client";
import React, { useState, useEffect } from "react";
import WatchPartyChat from "@/components/WatchPartyChat";
import WatchPartyPlayer from "@/components/WatchPartyPlayer";
import { useSearchParams } from "next/navigation";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import WatchPartyProducts from "@/components/WatchPartyProducts";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Page = () => {
  const searchParams = useSearchParams();
  const movie = Object.fromEntries(searchParams.entries());

  const [products, setProducts] = useState([]);
  // get related products via scraping
  const fetchRelatedProducts = async () => {
    try {
      const q = movie.title;
      const res = await axios.get("/api/scrape", { params: { q } });
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRelatedProducts();
  }, []);

  // Tabs
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
      }}
    >
      <div
        style={{
          gridColumn: "span 3 / span 3",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Watch" {...a11yProps(0)} />
              <Tab label="Scenes" {...a11yProps(1)} />
              <Tab label="In Scene" {...a11yProps(2)} />
              <Tab label="Cast" {...a11yProps(3)} />
              <Tab label="Trivia" {...a11yProps(4)} />
              <Tab label="Products" {...a11yProps(5)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <WatchPartyPlayer movie={movie} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Scenes
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            In Scene
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            Cast
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            Trivia
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <WatchPartyProducts products={products} />
          </CustomTabPanel>
        </Box>
      </div>
      <div
        style={{
          gridColumn: "span 1 / span 1",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "25%",
            height: "100%",
          }}
        >
          <WatchPartyChat />
        </div>
      </div>
    </div>
  );
};

export default Page;
