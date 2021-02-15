import prettier from "prettier";
import graphql from "prettier/parser-graphql.js";

export default {
  formatGQL: formatGQL,
};

function formatGQL(query, options) {
  return prettier.format(query, {
    ...options,
    parser: "graphql",
    plugins: [graphql],
  });
}
