import JSDOMEnvironment from 'jest-environment-jsdom';

// jsdom doesn't implement fetch; expose Node's native implementation so code
// under test that calls fetch() works and MSW can intercept it.
export default class JSDOMWithFetchEnvironment extends JSDOMEnvironment {
  constructor(...args: ConstructorParameters<typeof JSDOMEnvironment>) {
    super(...args);

    this.global.fetch = fetch;
    this.global.Request = Request;
    this.global.Response = Response;
    this.global.Headers = Headers;
  }
}
