import QuickSort from '../modules/quick-sort';
import Canvas from '../modules/canvas';

const qs = () => {
  const element = document.querySelector('#quick-sort');
  if (!element) return;
  const canvas = new Canvas(element);
  const arr = [9, 4, 6, 3, 7, 1, 2, 11, 5];
  const fillColors = arr.map(() => '#fff');
  const fontColors = arr.map(() => '#000');

  const steps = [{
    arr: [...arr],
    fillColors: [...fillColors],
    fontColors: [...fontColors]
  }];

  let stepCounter = 0;

  new QuickSort(arr, (a, p) => {
    const newFontColors = [...steps[stepCounter].fontColors];
    const newFillColors = [...steps[stepCounter].fillColors];

    newFontColors[p] = '#28a745';
    newFillColors[p] = '#ffc107';

    steps.push({
      arr: a,
      fillColors: newFillColors,
      fontColors: newFontColors
    });

    ++stepCounter;
  });

  const draw = (a, i) => {
    console.log(a[i]);
    if (i >= a.length) i = 0;
    canvas.drawArr(a[i].arr, { fillColors: a[i].fillColors, fontColors: a[i].fontColors });
    setTimeout(() => draw(a, i + 1), 1000);
  };

  draw(steps, 0);
};

export default qs;
