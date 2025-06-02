import { GraphSimple } from "./graph.js";
import { saveUser, authenticate } from "./auth.js";
import { drawMap, colorNodes, showResult } from "./ui.js";

const tarifa = 0.5;
const graph = new GraphSimple();

const edges = [
  [0, 1, 4], [0, 2, 2], [1, 2, 1], [1, 3, 5],
  [2, 3, 8], [2, 4, 10], [3, 4, 2], [3, 5, 6], [4, 5, 3]
];

edges.forEach(([u, v, w]) => graph.addEdge(u, v, w));

let origen = null, destino = null;

document.getElementById("registerBtn").onclick = () => {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;
  saveUser(name, email, pass);
  alert("Registrado!");
};

document.getElementById("loginBtn").onclick = () => {
  const email = document.getElementById("logEmail").value;
  const pass = document.getElementById("logPass").value;
  if (authenticate(email, pass)) {
    document.getElementById("loginView").style.display = "none";
    document.getElementById("mapView").style.display = "block";
    drawMap("map", onSelect);
  } else alert("Credenciales inválidas");
};

function onSelect(node) {
    origen = node;
    document.querySelector(`.node[data-id='${node}']`).style.backgroundColor = "blue";
    destino = node;
    document.querySelector(`.node[data-id='${node}']`).style.backgroundColor = "red";
    document.getElementById("calcBtn").disabled = false;
  }


document.getElementById("calcBtn").onclick = () => {
  const { dist, prev } = graph.dijkstraSimple(origen);
  const path = graph.getShortestPath(prev, destino);
  const total = dist[destino];
  const cost = total * tarifa;
  colorNodes(path);
  setTimeout(() => showResult(total, cost.toFixed(2)), total * 1000);
  setTimeout(() => location.reload(), (total + 3) * 1000);
};