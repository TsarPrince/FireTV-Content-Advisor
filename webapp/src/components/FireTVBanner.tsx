import Image from "next/image";
import FireTVBannerImage from "../assets/fire-tv.png";

export default function GDSCBanner() {
  return (
    <Image
      src={FireTVBannerImage}
      alt="GDSC Logo"
      style={{ borderRadius: "4rem", userSelect: "none" }}
    />
  );
}
