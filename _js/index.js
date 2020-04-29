import GraphNode from './modules/graphnode';
import Graph from './modules/graph';
import Canvas from './modules/canvas';

const bfs = () => {
  // Prepare stage
  const canvas = new Canvas(document.querySelector('#bfs'));
  const levelColors = ['#fdd835', '#fdd835', '#ffb300', '#ffb300', '#ffb300', '#fb8c00', '#fb8c00'];
  const x = [canvas.width * 0.3, canvas.width * 0.5, canvas.width * 0.7]
  const y = [canvas.height * 0.3, canvas.height * 0.5, canvas.height * 0.7]
  const coords = [
    [x[0], y[0]], [x[1], y[0]],
    [x[0], y[1]], [x[1], y[1]],
    [x[0], y[2]], [x[1], y[2]],
    [x[2], y[1]]
  ];

  const nodes = [];
  for (let i = 0; i < 7; ++i) {
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

  const updateNode = (g, i) => {
    canvas.drawNode(g[i], { color: levelColors[i], ignoreNeighbour: true });
    if (i < g.length - 1) {
      setTimeout(() => updateNode(g, i+1), 1000);
    } else {
      setTimeout(() => loop(), 2000);
    }
  };


  const loop = () => {
    const bfsGraph = [];
    nodes.forEach(n => canvas.drawNode(n, {}));

    graph.reset();
    graph.bfs(n => bfsGraph.push(n));

    let i = 0;
    setTimeout(() => updateNode(bfsGraph, i), 1000);
  };

  loop();
};

bfs();
