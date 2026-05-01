const JsDomEnvironment = require('jest-environment-jsdom').default || require('jest-environment-jsdom');

class CustomJsDomEnvironment extends JsDomEnvironment {
  constructor(config, context) {
    super(config, context);
    // Restore Node.js globals that jest-environment-jsdom removes
    // These are needed for Next.js server-side route handlers
    if (typeof globalThis.Request !== 'undefined') {
      this.global.Request = globalThis.Request;
    }
    if (typeof globalThis.Response !== 'undefined') {
      this.global.Response = globalThis.Response;
    }
    if (typeof globalThis.Headers !== 'undefined') {
      this.global.Headers = globalThis.Headers;
    }
    if (typeof globalThis.fetch !== 'undefined') {
      this.global.fetch = globalThis.fetch;
    }
    if (typeof globalThis.ReadableStream !== 'undefined') {
      this.global.ReadableStream = globalThis.ReadableStream;
    }
    if (typeof globalThis.TextEncoder !== 'undefined') {
      this.global.TextEncoder = globalThis.TextEncoder;
    }
    if (typeof globalThis.TextDecoder !== 'undefined') {
      this.global.TextDecoder = globalThis.TextDecoder;
    }
    if (typeof globalThis.structuredClone !== 'undefined') {
      this.global.structuredClone = globalThis.structuredClone;
    }
  }
}

module.exports = CustomJsDomEnvironment;
