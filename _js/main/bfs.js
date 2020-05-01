import GraphNode from '../modules/graphnode';
import Graph from '../modules/graph';
import Canvas from '../modules/canvas';

const bfs = () => {
  // Prepare stage
  const element = document.querySelector('#bfs');
  if (!element) return;
  const canvas = new Canvas(element);
  const levelColors = ['#fdd835', '#fdd835', '#ffb300', '#ffb300', '#ffb300', '#fb8c00', '#fb8c00'];
  const dimension = canvas.element.getBoundingClientRect();
  const x = [dimension.width * 0.3, dimension.width * 0.5, dimension.width * 0.7];
  const y = [dimension.height * 0.3, dimension.height * 0.5, dimension.height * 0.7];
  const coords = [
    [x[0], y[0]], [x[1], y[0]],
    [x[0], y[1]], [x[1], y[1]],
    [x[0], y[2]], [x[1], y[2]],
    [x[2], y[1]]
  ];

  const nodes = [];
  for (let i = 0; i < 7; ++i) {
    if (i > coords.length - 1) break;
    nodes.push(new GraphNode(`v${i+1}`, { coords: coords[i] }));
  }

  const graph = new Graph(nodes);
  graph.addUndirectedEdge(1, 2);
  graph.addUndirectedEdge(1, 3);
  graph.addUndirectedEdge(2, 4);
  graph.addUndirectedEdge(2, 7);
  graph.addUndirectedEdge(3, 5);
  graph.addUndirectedEdge(4, 6);
  graph.addUndirectedEdge(5, 6);
  graph.addUndirectedEdge(6, 7);

  const updateNode = (g, i, colors) => {
    colors[i] = levelColors[i];
    canvas.drawNodes(g, { colors });
    if (i < g.length) {
      setTimeout(() => updateNode(g, i+1, colors), 1000);
    } else {
      setTimeout(() => loop(), 2000);
    }
  };

  const loop = () => {
    const bfsGraph = [];
    canvas.drawNodes(nodes, {});

    const colors = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
    graph.reset();
    graph.bfs(n => bfsGraph.push(n));

    let i = 0;
    setTimeout(() => updateNode(bfsGraph, i, colors), 1000);
  };

  loop();
};

export default bfs;
