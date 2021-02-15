import formatter from "./formatter.js";

export default {
  toGQLRequests: toGQLRequests,
  toGQLRequest: toGQLRequest,
};

function toGQLRequests(requests) {
  return requests.map(toGQLRequest);
}

function toGQLRequest(request) {
  var json = getJSONBody(request.request.postData);
  var gql = getGQLBody(json);

  return {
    url: request.request.url,
    startedDateTime: request.startedDateTime,
    time: request.time,
    headers: request.request.headers,
    method: request.request.method,
    body: request.request.postData,
    resourceType: request._resourceType,
    json: json,
    gql: gql,
  };
}

function getJSONBody(postData) {
  if (!isJSON(postData)) {
    return null;
  }

  return {
    formatted: formatter.formatJSON(postData.text),
    data: JSON.parse(postData.text),
  };
}

function getGQLBody(json) {
  if (!isGQL(json)) {
    return null;
  }

  return {
    query: formatter.formatGQL(json.data.query),
    variables: json.data.variables,
    operationName: json.data.operationName,
  };
}

function isJSON(postData) {
  if (!postData) {
    return null;
  }
  if (postData?.mimeType !== "application/json") {
    return null;
  }
  if (!formatter.formatJSON(postData.text)) {
    return false;
  }

  return true;
}

function isGQL(json) {
  if (!json) {
    return null;
  }
  if (!json.data.query) {
    return false;
  }
  if (!formatter.formatGQL(json.data.query)) {
    return false;
  }

  return true;
}
