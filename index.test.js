import { useApi } from "./index";

let headers = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

let url;
let data;
let status;
let ok;
let mockResponse = {};
let mockJsonPromise = Promise.resolve(mockResponse);
let mockFetchPromise;

afterEach(() => {
  global.fetch.mockClear();
  delete global.fetch;
});

describe("useApi", () => {
  describe("get", () => {
    beforeEach(() => {
      url = "https://jsonplaceholder.typicode.com/todos/1";
      status = 200;
      ok = true;
      mockFetchPromise = Promise.resolve({
        status: status,
        ok: ok,
        json: () => mockJsonPromise
      });

      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });

    it("calls fetch with the expected parameters", done => {
      const { get } = useApi();
      get(url);

      expect(global.fetch).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: "GET",
          body: null,
          headers: headers
        })
      );

      process.nextTick(() => {
        global.fetch.mockClear();
        done();
      });
    });

    describe("when the response is successful", () => {
      it("returns the response as json", done => {
        const { get } = useApi();
        const response = get(url);
        expect(response).toEqual(mockJsonPromise);

        process.nextTick(() => {
          global.fetch.mockClear();
          done();
        });
      });
    });

    describe("when the response is not successful", () => {
      describe("when the status code is 401 Unauthorized", () => {
        beforeEach(() => {
          url = "https://jsonplaceholder.typicode.com/todos/1";
          status = 401;
          ok = false;
          mockFetchPromise = Promise.resolve({
            status: status,
            ok: ok,
            json: () => mockJsonPromise
          });

          global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        });

        describe("without an onUnauthorized handler passed in", () => {
          it("throws an Error", () => {
            const { get } = useApi();
            expect(get(url)).rejects.toThrow("401");
          });
        });

        xdescribe("with an onUnauthorized handler passed in", () => {
          it("calls the unauthorizedHandler", async () => {
            const onUnauthorized = jest.fn;
            const { get } = useApi(onUnauthorized);
            await get(url);
            expect(onUnauthorized).toHaveBeenCalled();
          });
        });
      });

      describe("when the status code is any other error ", () => {
        beforeEach(() => {
          url = "https://jsonplaceholder.typicode.com/todos/1";
          status = 500;
          ok = false;
          mockFetchPromise = Promise.resolve({
            status: status,
            ok: ok,
            json: () => mockJsonPromise
          });

          global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        });

        describe("without an onError handler passed in", () => {
          it("throws an Error", () => {
            const { get } = useApi();
            expect(get(url)).rejects.toThrow("500");
          });
        });
      });
    });
  });

  describe("post", () => {
    beforeEach(() => {
      url = "https://jsonplaceholder.typicode.com/todos";
      data = { title: "Gotta do all the things!", completed: false };
      status = 200;
      ok = true;
      mockFetchPromise = Promise.resolve({
        status: status,
        ok: ok,
        json: () => mockJsonPromise
      });

      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });

    it("calls fetch with the expected parameters", done => {
      const { post } = useApi();
      post(url, data);

      expect(global.fetch).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(data),
          headers: headers
        })
      );

      process.nextTick(() => {
        global.fetch.mockClear();
        done();
      });
    });

    describe("when the response is successful", () => {
      it("returns the response as json", done => {
        const { post } = useApi();
        const response = post(url, data);
        expect(response).toEqual(mockJsonPromise);

        process.nextTick(() => {
          global.fetch.mockClear();
          done();
        });
      });
    });

    describe("when the response is not successful", () => {
      describe("when the status code is 401 Unauthorized", () => {
        beforeEach(() => {
          url = "https://jsonplaceholder.typicode.com/todos";
          data = { title: "Gotta do all the things!", completed: false };
          status = 401;
          ok = false;
          mockFetchPromise = Promise.resolve({
            status: status,
            ok: ok,
            json: () => mockJsonPromise
          });

          global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        });

        describe("without an onUnauthorized handler passed in", () => {
          it("throws an Error", () => {
            const { post } = useApi();
            expect(post(url, data)).rejects.toThrow("401");
          });
        });

        xdescribe("with an onUnauthorized handler passed in", () => {
          it("calls the unauthorizedHandler", async () => {
            const onUnauthorized = jest.fn;
            const { post } = useApi(onUnauthorized);
            await post(url, data);
            expect(onUnauthorized).toHaveBeenCalled();
          });
        });
      });

      describe("when the status code is any other error ", () => {
        beforeEach(() => {
          url = "https://jsonplaceholder.typicode.com/todos";
          status = 500;
          ok = false;
          mockFetchPromise = Promise.resolve({
            status: status,
            ok: ok,
            json: () => mockJsonPromise
          });

          global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        });

        describe("without an onError handler passed in", () => {
          it("throws an Error", () => {
            const { post } = useApi();
            expect(post(url, data)).rejects.toThrow("500");
          });
        });
      });
    });
  });

  describe("put", () => {
    beforeEach(() => {
      url = "https://jsonplaceholder.typicode.com/todos";
      data = { title: "Gotta do all the things!", completed: false };
      status = 200;
      ok = true;
      mockFetchPromise = Promise.resolve({
        status: status,
        ok: ok,
        json: () => mockJsonPromise
      });

      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });

    it("calls fetch with the expected parameters", done => {
      const { put } = useApi();
      put(url, data);

      expect(global.fetch).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: "PUT",
          body: JSON.stringify(data),
          headers: headers
        })
      );

      process.nextTick(() => {
        global.fetch.mockClear();
        done();
      });
    });

    describe("when the response is successful", () => {
      it("returns the response as json", done => {
        const { put } = useApi();
        const response = put(url, data);
        expect(response).toEqual(mockJsonPromise);

        process.nextTick(() => {
          global.fetch.mockClear();
          done();
        });
      });
    });

    describe("when the response is not successful", () => {
      describe("when the status code is 401 Unauthorized", () => {
        beforeEach(() => {
          url = "https://jsonplaceholder.typicode.com/todos";
          data = { title: "Gotta do all the things!", completed: false };
          status = 401;
          ok = false;
          mockFetchPromise = Promise.resolve({
            status: status,
            ok: ok,
            json: () => mockJsonPromise
          });

          global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        });

        describe("without an onUnauthorized handler passed in", () => {
          it("throws an Error", () => {
            const { put } = useApi();
            expect(put(url, data)).rejects.toThrow("401");
          });
        });

        xdescribe("with an onUnauthorized handler passed in", () => {
          it("calls the unauthorizedHandler", async () => {
            const onUnauthorized = jest.fn;
            const { put } = useApi(onUnauthorized);
            await put(url, data);
            expect(onUnauthorized).toHaveBeenCalled();
          });
        });
      });

      describe("when the status code is any other error ", () => {
        beforeEach(() => {
          url = "https://jsonplaceholder.typicode.com/todos";
          status = 500;
          ok = false;
          mockFetchPromise = Promise.resolve({
            status: status,
            ok: ok,
            json: () => mockJsonPromise
          });

          global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        });

        describe("without an onError handler passed in", () => {
          it("throws an Error", () => {
            const { put } = useApi();
            expect(put(url, data)).rejects.toThrow("500");
          });
        });
      });
    });
  });

  describe("del", () => {
    beforeEach(() => {
      url = "https://jsonplaceholder.typicode.com/todos/1";
      status = 200;
      ok = true;
      mockFetchPromise = Promise.resolve({
        status: status,
        ok: ok,
        json: () => mockJsonPromise
      });

      global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
    });

    it("calls fetch with the expected parameters", done => {
      const { del } = useApi();
      del(url);

      expect(global.fetch).toHaveBeenCalledWith(
        url,
        expect.objectContaining({
          method: "DEL",
          body: null,
          headers: headers
        })
      );

      process.nextTick(() => {
        global.fetch.mockClear();
        done();
      });
    });

    describe("when the response is successful", () => {
      it("returns the response as json", done => {
        const { del } = useApi();
        const response = del(url);
        expect(response).toEqual(mockJsonPromise);

        process.nextTick(() => {
          global.fetch.mockClear();
          done();
        });
      });
    });

    describe("when the response is not successful", () => {
      describe("when the status code is 401 Unauthorized", () => {
        beforeEach(() => {
          url = "https://jsonplaceholder.typicode.com/todos/1";
          status = 401;
          ok = false;
          mockFetchPromise = Promise.resolve({
            status: status,
            ok: ok,
            json: () => mockJsonPromise
          });

          global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        });

        describe("without an onUnauthorized handler passed in", () => {
          it("throws an Error", () => {
            const { del } = useApi();
            expect(del(url)).rejects.toThrow("401");
          });
        });

        xdescribe("with an onUnauthorized handler passed in", () => {
          it("calls the unauthorizedHandler", async () => {
            const onUnauthorized = jest.fn;
            const { del } = useApi(onUnauthorized);
            await del(url);
            expect(onUnauthorized).toHaveBeenCalled();
          });
        });
      });

      describe("when the status code is any other error ", () => {
        beforeEach(() => {
          url = "https://jsonplaceholder.typicode.com/todos/1";
          status = 500;
          ok = false;
          mockFetchPromise = Promise.resolve({
            status: status,
            ok: ok,
            json: () => mockJsonPromise
          });

          global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);
        });

        describe("without an onError handler passed in", () => {
          it("throws an Error", () => {
            const { del } = useApi();
            expect(del(url)).rejects.toThrow("500");
          });
        });
      });
    });
  });
});
