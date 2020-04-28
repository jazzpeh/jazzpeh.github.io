onmessage = ({ data }) => {
  importScripts('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.0/highlight.min.js');

  const results = [];

  for (const d of data) {
    results.push(self.hljs.highlightAuto(d).value);
  }

  postMessage(results);
};