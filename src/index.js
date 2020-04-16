const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DEL = "DELETE";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

async function fetchData({path, method, data, headers}) {
  const response = await fetch(path, {
    method: method,
    body: !!data ? JSON.stringify(data) : null,
    headers: !!headers ? headers : defaultHeaders
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response;
    })
    .then(response => {
      if (response.status === 204) {
        return {};
      } else {
        return response.json();
      }
    });

  return response;
}

export function useApi(onUnauthorized, onError) {
  const unauthorizedHandler = err => {
    if (err.message === "401" && !!onUnauthorized) {
      onUnauthorized(err);
    } else {
      throw err;
    }
  };

  return {
    get: (path, headers) =>
      fetchData({path: path, method: GET, headers: headers})
        .catch(unauthorizedHandler)
        .catch(onError),
    post: (path, data, headers) =>
      fetchData({path: path, method: POST, data: data, headers: headers})
        .catch(unauthorizedHandler)
        .catch(onError),
    put: (path, data, headers) =>
      fetchData({path: path, method: PUT, data: data, headers: headers})
        .catch(unauthorizedHandler)
        .catch(onError),
    del: (path, headers) =>
      fetchData({path: path, method: DEL, headers: headers})
        .catch(unauthorizedHandler)
        .catch(onError)
  };
}

export default useApi;
