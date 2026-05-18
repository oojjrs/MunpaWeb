const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");
const saveState = document.querySelector("#saveState");
const newRunButton = document.querySelector("#newRun");
const saveRunButton = document.querySelector("#saveRun");

const DB_NAME = "munpaweb";
const STORE_NAME = "runs";
const SAVE_KEY = "current";

let player = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 1.25,
  vy: 0.85,
  color: "#f97316"
};

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME);
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readSave() {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const request = tx.objectStore(STORE_NAME).get(SAVE_KEY);

    request.onsuccess = () => resolve(request.result ?? null);
    request.onerror = () => reject(request.error);
  });
}

async function writeSave(value) {
  const db = await openDb();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(value, SAVE_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function drawGrid() {
  ctx.strokeStyle = "#d1d5db";
  ctx.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 48) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawGrid();

  ctx.fillStyle = player.color;
  ctx.beginPath();
  ctx.arc(player.x, player.y, 24, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#111827";
  ctx.font = "600 22px system-ui";
  ctx.fillText("Static game shell is ready", 32, 48);
}

function update() {
  player.x += player.vx;
  player.y += player.vy;

  if (player.x < 24 || player.x > canvas.width - 24) {
    player.vx *= -1;
  }

  if (player.y < 24 || player.y > canvas.height - 24) {
    player.vy *= -1;
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

async function saveCurrentRun() {
  await writeSave({
    player,
    savedAt: new Date().toISOString()
  });

  localStorage.setItem("munpaweb:lastSave", new Date().toISOString());
  saveState.textContent = "Saved just now";
}

async function loadCurrentRun() {
  const saved = await readSave();

  if (saved?.player) {
    player = saved.player;
    saveState.textContent = `Loaded save from ${new Date(saved.savedAt).toLocaleString()}`;
    return;
  }

  saveState.textContent = "No save yet";
}

function resetRun() {
  player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 1.25,
    vy: 0.85,
    color: "#f97316"
  };
  saveState.textContent = "New run started";
}

newRunButton.addEventListener("click", resetRun);
saveRunButton.addEventListener("click", () => {
  saveCurrentRun().catch(() => {
    saveState.textContent = "Save failed";
  });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}

loadCurrentRun().finally(loop);
