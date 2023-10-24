import { Typography, Link, TypographyProps } from "@mui/material";

export default function Copyright(props: TypographyProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/chakri68/firetv-content-advisor/"
      >
        Amazon Lelo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
