import Image from "next/image";
import FireTVLogoImage from "../assets/fire-tv.png";

export default function FireTVLogo() {
  return (
    <Image
      src={FireTVLogoImage}
      alt="FireTV Logo"
      width={128}
      style={{
        userSelect: "none",
      }}
    />
  );
}
