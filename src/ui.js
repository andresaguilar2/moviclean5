export function drawMap(containerId, onClick) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  for (let i = 0; i < 6; i++) {
    const node = document.createElement("div");
    node.className = "node";
    node.innerText = i;
    node.dataset.id = i;
    node.onclick = () => onClick(i);
    container.appendChild(node);
  }
}

export function colorNodes(path) {
  document.querySelectorAll(".node").forEach(n => n.style.backgroundColor = "gray");
  path.forEach((p, i) => {
    setTimeout(() => {
      document.querySelector(`.node[data-id='${p}']`).style.backgroundColor = "green";
    }, 1000 * i);
  });
}

export function showResult(time, cost) {
  document.getElementById("result").innerText = `Tiempo total: ${time}s | Costo: $${cost}`;
}