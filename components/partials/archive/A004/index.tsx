import React from "react";

interface CreateTextureParams {
  textureWidth: number;
  textureHeight: number;
  dpr: number;
}

export const A004: React.FC = () => {
  let animationFrameId = 0;

  const createTexture = (params: CreateTextureParams) => {
    const { textureWidth, textureHeight, dpr } = params;
    const canvas = document.createElement("canvas");
    const canvasWidth = textureWidth * dpr;
    const canvasHeight = textureHeight * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext("2d");
    if (context) {
    }
  };
  return <></>;
};
