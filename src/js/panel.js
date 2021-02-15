import filterer from "./util/filterer.js";
import mapper from "./util/mapper.js";
import renderer from "./util/renderer.js";

chrome.devtools.network.onRequestFinished.addListener(function () {
  refreshRequests();
});

window.onload = function () {
  document
    .getElementById("xhr-checkbox")
    .addEventListener("change", function () {
      refreshRequests();
    });

  document
    .getElementById("gql-checkbox")
    .addEventListener("change", function () {
      refreshRequests();
    });

  let timeout = null;
  document
    .getElementById("search-field")
    .addEventListener("keyup", function () {
      clearTimeout(timeout);
      timeout = setTimeout(function () {
        refreshRequests();
      }, 250);
    });
};

function refreshRequests() {
  chrome.devtools.network.getHAR(function (harLog) {
    var rawRequests = filterer.filter(harLog.entries);
    var requests = mapper.toGQLRequests(rawRequests);
    renderer.renderRequests(requests);
  });
}
