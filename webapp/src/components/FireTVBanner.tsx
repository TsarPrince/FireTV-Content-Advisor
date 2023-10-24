import Image from "next/image";
import FireTVBannerImage from "../assets/fire-tv.png";

export default function FireTVBanner() {
  return (
    <Image
      src={FireTVBannerImage}
      alt="FireTV Banner"
      width={128}
      style={{ userSelect: "none" }}
    />
  );
}
