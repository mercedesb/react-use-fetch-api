const GET = "GET";
const POST = "POST";
const PUT = "PUT";
const DEL = "DEL";

async function fetchData(url, method, data) {
  const response = await fetch(url, {
    method: method,
    body: !!data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": origin
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response;
    })
    .then(response => response.json());

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
    get: path =>
      fetchData(path, GET, null)
        .catch(unauthorizedHandler)
        .catch(onError),
    post: (path, data) =>
      fetchData(path, POST, data)
        .catch(unauthorizedHandler)
        .catch(onError),
    put: (path, data) =>
      fetchData(path, PUT, data)
        .catch(unauthorizedHandler)
        .catch(onError),
    del: path =>
      fetchData(path, DEL, null)
        .catch(unauthorizedHandler)
        .catch(onError)
  };
}

export default useApi;
