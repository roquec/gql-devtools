var filterGQL = false;
var filterXHR = false;
var searchQuery = null;

export default {
  filterRequests: filterRequests,
};

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
