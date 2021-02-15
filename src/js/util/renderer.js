export default {
  renderRequests: renderRequests,
};

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
  var item = document.createElement("li");
  item.appendChild(document.createTextNode(request.url));
  item.addEventListener("click", function () {
    setSideElement(request);
  });
  return item;
}

function setSideElement(request) {
  var sideElement = document.getElementById("side");
  sideElement.style.display = "block";
  var bodyGqlElement = document.getElementById("body-gql");
  bodyGqlElement.appendChild(document.createTextNode(request.gql.query));
}
