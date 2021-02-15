import prettier from "prettier";
import graphql from "prettier/parser-graphql.js";

chrome.devtools.network.onRequestFinished.addListener(function () {
  refreshRequests();
});

function refreshRequests() {
  chrome.devtools.network.getHAR(function (harLog) {
    var rawRequests = filterRequests(harLog.entries);
    console.log("🚀 ~ file: panel.js ~ line 11 ~ rawRequests", rawRequests);
    var requests = cleanRequests(rawRequests);
    renderRequests(requests);
  });
}

//#region Rendering
function renderRequests(requests) {
  clearRenderedRequestList();
  renderRequestList(requests);
}

function clearRenderedRequestList() {
  var list = document.getElementById("requests");

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function renderRequestList(requests) {
  var list = document.getElementById("requests");

  for (var i = 0; i < requests.length; i++) {
    var item = createRequestElement(requests[i]);
    list.appendChild(item);
  }
}

function createRequestElement(request) {
  var body = JSON.parse(request.postData.text);
  var gqlQuery = body.query;
  var prettyGQL = prettify(gqlQuery, {});
  console.log(
    "🚀 ~ file: panel.js ~ line 20 ~ renderRequests ~ prettyGQL",
    prettyGQL
  );

  var item = document.createElement("li");
  item.appendChild(document.createTextNode(request.url));
  return item;
}
//#endregion

//#region Mapping
function cleanRequests(requests) {
  return requests.map(toCleanRequest);
}

function toCleanRequest(request) {
  return {
    url: request.request.url,
    startedDateTime: request.startedDateTime,
    time: request.time,
    headers: request.request.headers,
    method: request.request.method,
    postData: request.request.postData,
  };
}

function isGQL(request) {}
//#endregion

//#region Filters
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

var filterGQL = false;
var filterXHR = false;
var searchQuery = null;

function filterRequests(allRequests) {
  setFilteringState();
  return allRequests.filter(matchesFilters);
}

function matchesFilters(request) {
  if (!matchesXHRFilter(request)) {
    return false;
  }
  if (!matchesGQLFilter(request)) {
    return false;
  }
  if (!matchesSearchFilter(request)) {
    return false;
  }
  return true;
}

function setFilteringState() {
  var xhrCheckbox = document.getElementById("xhr-checkbox");
  filterXHR = xhrCheckbox.checked;
  var gqlCheckbox = document.getElementById("gql-checkbox");
  filterGQL = gqlCheckbox.checked;
  var searchField = document.getElementById("search-field");
  searchQuery = searchField.value;
}

function matchesXHRFilter(request) {
  if (!filterXHR) {
    return true;
  }

  if (request._resourceType === "xhr") {
    return true;
  }

  if (request._resourceType === "fetch") {
    return true;
  }

  return false;
}

function matchesGQLFilter(request) {
  if (!filterGQL) {
    return true;
  }
  //TODO: add conditions
  return true;
}

function matchesSearchFilter(request, query) {
  if (!searchQuery) {
    return true;
  }

  if (request.request.url.includes(query)) {
    return true;
  }

  return false;
}
//#endregion

function prettify(query, options) {
  return prettier.format(query, {
    ...options,
    parser: "graphql",
    plugins: [graphql],
  });
}
