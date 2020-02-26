async function fetchData(url, method, data) {
  const response = await fetch(url, {
    method: method,
    body: !!data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
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
  const defaultErrorHandler = err => {
    throw err;
  };

  if (!onUnauthorized) onUnauthorized = defaultErrorHandler;
  if (!onError) onError = defaultErrorHandler;

  return {
    get: path =>
      fetchData(path, GET, null)
        .catch(onUnauthorized)
        .catch(onError),
    post: (path, data) =>
      fetchData(path, POST, data)
        .catch(onUnauthorized)
        .catch(onError),
    put: (path, data) =>
      fetchData(path, PUT, data)
        .catch(onUnauthorized)
        .catch(onError),
    del: path =>
      fetchData(path, DEL, null)
        .catch(onUnauthorized)
        .catch(onError)
  };
}

export default useApi;
