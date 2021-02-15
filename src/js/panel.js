import requestFilterer from "./util/request-filterer.js";
import formatter from "./util/formatter.js";

chrome.devtools.network.onRequestFinished.addListener(function () {
  refreshRequests();
});

function refreshRequests() {
  chrome.devtools.network.getHAR(function (harLog) {
    var rawRequests = requestFilterer.filterRequests(harLog.entries);
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
  var prettyGQL = formatter.formatGQL(gqlQuery, {});
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
