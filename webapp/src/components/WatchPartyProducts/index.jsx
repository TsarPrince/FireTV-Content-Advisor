import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const index = ({ products }) => {
  console.log(products);
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
        padding: 4,
      }}
    >
      {products?.length ? (
        products.map((product, key) => (
          <Card key={key} sx={{ maxWidth: 345 }}>
            <CardMedia
              component={"img"}
              sx={{ height: 240, objectFit: "contain" }}
              image={product.imgSrc}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.h2Text}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {product.numRatings} ratings <br />
                {product.starRating}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <a href={product.link} target="_blank">
                <Button size="small">
                  Buy{" "}
                  {product.price.split("$")?.[1]
                    ? "($" + product.price.split("$")?.[1] + ")"
                    : ""}
                </Button>
              </a>
            </CardActions>
          </Card>
        ))
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

export default index;
