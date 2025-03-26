import React, { CSSProperties } from "react";

export interface ImageProps {
  src: string;
  alt: string;
  height?: string;
  width?: string;
  style?: CSSProperties;
}

const Image: React.FC<ImageProps> = ({ src, alt, height, width, style }) => {
  return (
    <img src={src} alt={alt} height={height} width={width} style={style} />
  );
};

export default Image;
