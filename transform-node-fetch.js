import { transformSync } from "@babel/core";

const process = (src, filename, config, options) => {
  const result = transformSync(src, {
    filename,
    presets: ["@babel/preset-env"],
  });
  return result ? result.code : src;
};

export default {
  process,
};
