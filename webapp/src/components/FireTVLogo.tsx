import Image from "next/image";
import FireTVLogoImage from "../assets/fire-tv.png";

export default function FireTVLogo() {
  return (
    <Image
      src={FireTVLogoImage}
      alt="GDSC Logo"
      width={128}
      height={128}
      style={{ borderRadius: "50%", userSelect: "none" }}
    />
  );
}
