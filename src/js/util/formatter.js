import prettier from "prettier";
import graphql from "prettier/parser-graphql.js";

export default {
  formatGQL: formatGQL,
  formatJSON: formatJSON,
};

function formatGQL(query, options) {
  return prettier.format(query, {
    ...options,
    parser: "graphql",
    plugins: [graphql],
  });
}

function formatJSON(query) {
  return JSON.stringify(JSON.parse(query), null, 2);
}
