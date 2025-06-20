"use client";

import dynamic from "next/dynamic";
import animationData from "@/../public/animations/success.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SuccessAnimation = () => {
  const options = {
    animationData: animationData,
    loop: false,
    autoplay: true,
  };

  return <Lottie {...options} style={{ height: 300, width: 300 }} />;
};

export default SuccessAnimation;
