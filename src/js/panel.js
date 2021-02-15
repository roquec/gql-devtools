import filterer from "./util/filterer.js";
import mapper from "./util/mapper.js";
import renderer from "./util/renderer.js";

chrome.devtools.network.onRequestFinished.addListener(function () {
  refreshRequests();
});

window.onload = function () {
  refreshRequests();
  document
    .getElementById("all-checkbox")
    .addEventListener("change", function () {
      refreshRequests();
    });
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
    var requests = mapper.toGQLRequests(harLog.entries);
    var filteredRequests = filterer.filterRequests(requests);
    renderer.renderRequests(filteredRequests);
  });
}
