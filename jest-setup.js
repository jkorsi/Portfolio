/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
require("@testing-library/jest-dom");
require("@testing-library/react");
require("@testing-library/jest-dom/extend-expect");

module.exports = {
  transform: {
    "^.+\\.svg$": "<rootDir>/svgTransform.ts",
  },
};
