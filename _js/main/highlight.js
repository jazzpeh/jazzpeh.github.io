const codeSyntax = () => {
  addEventListener('load', () => {
    const codes = [...document.querySelectorAll('pre code')];
    const worker = new Worker('/assets/js/worker.js');

    worker.onmessage = ({ data }) => {
      for (let i = 0, len = codes.length; i < len; ++i) {
        codes[i].classList.add('hljs');
        codes[i].innerHTML = data[i];
      }
    }
    worker.postMessage(codes.map(code => `${code.textContent}~~~${code.classList}`));
  });
};

export default codeSyntax;