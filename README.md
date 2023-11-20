# Note
This is a fork that modifies the original [local-cors-proxy](https://github.com/garmeeh/local-cors-proxy) to accept a full URL via encoded URI.
You can encode your URLs using something like
```const url = 'http://localhost:8010/?' + encodeURIComponent('https://www.url-to-proxy...');```

# Local CORS Proxy

Simple proxy to bypass CORS issues. This was built as a local dev only solution to enable prototyping against existing APIs without having to worry about CORS.

This module was built to solve the issue of getting this error:

```
No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:3000' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disable
```

## Getting Started

```
npm install -g local-cors-proxy
```

**Simple Example**

API endpoint that we want to request that has CORS issues:

```
https://www.yourdomain.ie/movies/list
```

Start Proxy:

```
lcp 
```

Then in your client code, new API endpoint using encodeURIComponent:

```
http://localhost:8010/https%3A%2F%2Fwww.yourdomain.ie%2Fmovies%2Flist
```

End result will be a request to `https://www.yourdomain.ie/movies/list` without the CORS issues!

**Install Locally**
Alternatively you can install the package locally and add a script to your project:

```json
 "scripts": {
   "proxy": "lcp"
 }
```

## Options

| Option         | Example               | Default |
| -------------- | --------------------- | ------: |
| --port         | 8010                  |    8010 |
| --credentials  | (no value needed)     |   false |
| --origin       | http://localhost:4200 |       * |
