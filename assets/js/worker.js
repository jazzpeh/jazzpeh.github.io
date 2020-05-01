onmessage = ({ data }) => {
  importScripts('./highlight.min.js');
  const langMap = {
    'language-py3': 'python'
  };

  const results = [];

  for (const raw of data) {
    const d = raw.split('~~~');
    const lang = d.length > 1 && d[1].trim() in langMap ? [langMap[d[1].trim()]] : [];
    results.push(self.hljs.highlightAuto(d[0], lang).value);
  }

  postMessage(results);
};