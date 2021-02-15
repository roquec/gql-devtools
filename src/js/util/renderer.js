import codemirror from "codemirror";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror-graphql/mode.js";
import "codemirror-graphql/hint.js";
import "codemirror-graphql/lint.js";
import "codemirror-graphql/info.js";
import "codemirror-graphql/jump.js";

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
  if (bodyGqlElement) {
    bodyGqlElement.parentNode.removeChild(bodyGqlElement);
  }
  bodyGqlElement = document.createElement("div");
  bodyGqlElement.setAttribute("id", "body-gql");
  sideElement.appendChild(bodyGqlElement);
  codemirror(bodyGqlElement, {
    value: request.gql.query,
    mode: "graphql",
    readOnly: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
    lineNumbers: true,
    tabSize: 2,
    indentWithTabs: false,
    autoCloseBrackets: true,
    matchBrackets: true,
    showCursorWhenSelecting: true,
    theme: "darcula",
  });
}
