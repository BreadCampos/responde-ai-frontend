"use client";

import dynamic from "next/dynamic";
import animationData from "@/../public/animations/error.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ErrorAnimation = () => {
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };

  return <Lottie {...options} style={{ height: 300, width: 300 }} />;
};

export default ErrorAnimation;
