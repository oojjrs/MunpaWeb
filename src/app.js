const welcomeView = document.querySelector("#welcomeView");
const founderView = document.querySelector("#founderView");
const gameView = document.querySelector("#gameView");
const continueGameButton = document.querySelector("#continueGame");
const newGameButton = document.querySelector("#newGame");
const founderForm = document.querySelector("#founderForm");
const portraitOptions = document.querySelector("#portraitOptions");
const sectNameInput = document.querySelector("#sectNameInput");
const randomSectNameButton = document.querySelector("#randomSectName");
const founderNameInput = document.querySelector("#founderName");
const randomNameButton = document.querySelector("#randomName");
const returnWelcomeButton = document.querySelector("#returnWelcome");
const saveState = document.querySelector("#saveState");
const sectName = document.querySelector("#sectName");
const seasonText = document.querySelector("#seasonText");
const mainStatus = document.querySelector("#mainStatus");
const founderPortrait = document.querySelector("#founderPortrait");
const founderNameDisplay = document.querySelector("#founderNameDisplay");
const founderMeta = document.querySelector("#founderMeta");
const discipleList = document.querySelector("#discipleList");

const APP_VERSION = "v16";
const SAVE_KEY = "munpaweb:save:local";

const portraits = [
  {
    id: "founder-male-01",
    image: "./assets/portraits/founders/founder-male-01.png",
    colors: {
      face: "#d8b38a",
      hair: "#172019",
      robe: "#2f5946",
      robeDark: "#1d3329",
      bgA: "#d9e2cf",
      bgB: "#6d8a64"
    }
  },
  {
    id: "founder-female-01",
    image: "./assets/portraits/founders/founder-female-01.png",
    colors: {
      face: "#d7aa91",
      hair: "#241923",
      robe: "#7a4963",
      robeDark: "#4a2d3c",
      bgA: "#ead8d8",
      bgB: "#a66d7b"
    }
  }
];

const founderNames = [
  "한무진",
  "서란",
  "유청하",
  "백도윤",
  "진소월",
  "남궁휘",
  "문설아",
  "하연"
];

const sectNames = [
  "청운문",
  "현월문",
  "백하문",
  "무극문",
  "비연문",
  "창송문",
  "연화문",
  "천류문"
];

const newGameSeed = {
  sect: {
    name: sectNames[0],
    foundedYear: 1,
    season: "봄"
  },
  founder: null,
  disciples: [],
  log: [],
  savedAt: null
};

let selectedPortraitId = portraits[0].id;
let currentSave = null;
let activeView = null;

function cloneSeed() {
  return JSON.parse(JSON.stringify(newGameSeed));
}

function normalizeSave(save) {
  if (save?.sect && save?.founder && Array.isArray(save.disciples)) {
    return save;
  }

  const migrated = cloneSeed();
  migrated.sect.name = save?.sect?.name ?? sectNames[0];
  migrated.founder = {
    id: "founder",
    name: "청운",
    age: 28,
    role: "개파조사",
    portrait: portraits[0].id
  };
  migrated.log = [`${migrated.sect.name} 개파`];
  migrated.savedAt = save?.savedAt ?? new Date().toISOString();
  return migrated;
}

async function readSave() {
  const rawSave = localStorage.getItem(SAVE_KEY);
  return rawSave ? JSON.parse(rawSave) : null;
}

async function writeSave(value) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(value));
}

function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

async function syncCurrentSave() {
  const saved = await readSave();
  currentSave = saved ? normalizeSave(saved) : null;

  if (currentSave && currentSave !== saved) {
    await writeSave(currentSave);
  }
}

function updateHistory(view, historyMode) {
  if (historyMode === "none") {
    return;
  }

  const state = { view };

  if (historyMode === "replace") {
    history.replaceState(state, "", location.href);
    return;
  }

  history.pushState(state, "", location.href);
}

function showWelcome({ historyMode = "push" } = {}) {
  activeView = "welcome";
  continueGameButton.hidden = !currentSave;
  welcomeView.hidden = false;
  founderView.hidden = true;
  gameView.hidden = true;
  updateHistory(activeView, historyMode);
}

async function returnToWelcome(options = {}) {
  try {
    await syncCurrentSave();
  } catch {
    currentSave = null;
  }

  showWelcome(options);
}

function showFounderCreation({ historyMode = "push" } = {}) {
  activeView = "founder";
  welcomeView.hidden = true;
  founderView.hidden = false;
  gameView.hidden = true;
  updateHistory(activeView, historyMode);
}

function showGame({ historyMode = "push" } = {}) {
  activeView = "game";
  welcomeView.hidden = true;
  founderView.hidden = true;
  gameView.hidden = false;
  updateHistory(activeView, historyMode);
}

function applyPortraitColors(element, portraitId) {
  const portrait = portraits.find((item) => item.id === portraitId) ?? portraits[0];
  element.style.setProperty("--face", portrait.colors.face);
  element.style.setProperty("--hair", portrait.colors.hair);
  element.style.setProperty("--robe", portrait.colors.robe);
  element.style.setProperty("--robe-dark", portrait.colors.robeDark);
  element.style.setProperty("--bg-a", portrait.colors.bgA);
  element.style.setProperty("--bg-b", portrait.colors.bgB);

  if (portrait.image) {
    element.style.setProperty("--portrait-image", `url("${portrait.image}")`);
    element.classList.add("portrait-image");
  } else {
    element.style.removeProperty("--portrait-image");
    element.classList.remove("portrait-image");
  }
}

function renderPortraitOptions() {
  portraitOptions.replaceChildren(
    ...portraits.map((portrait) => {
      const button = document.createElement("button");
      button.className = "portrait-option";
      button.type = "button";
      button.setAttribute("aria-pressed", String(portrait.id === selectedPortraitId));

      const preview = document.createElement("span");
      preview.className = "portrait";
      applyPortraitColors(preview, portrait.id);

      button.append(preview);
      button.addEventListener("click", () => {
        selectedPortraitId = portrait.id;
        renderPortraitOptions();
      });

      return button;
    })
  );
}

function pickRandomName() {
  const name = founderNames[Math.floor(Math.random() * founderNames.length)];
  founderNameInput.value = name;
}

function pickRandomSectName() {
  const name = sectNames[Math.floor(Math.random() * sectNames.length)];
  sectNameInput.value = name;
}

function renderGame(save, options = {}) {
  currentSave = save;
  sectName.textContent = save.sect.name;
  seasonText.textContent = `${save.sect.foundedYear}년차 ${save.sect.season}`;
  mainStatus.textContent = `${save.sect.name} 개파`;
  saveState.textContent = save.savedAt
    ? `저장됨 ${new Date(save.savedAt).toLocaleString()}`
    : "새 게임";

  applyPortraitColors(founderPortrait, save.founder.portrait);
  founderNameDisplay.textContent = save.founder.name;
  founderMeta.textContent = `${save.founder.age}세 · ${save.founder.role}`;

  if (save.disciples.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "아직 제자가 없습니다.";
    discipleList.replaceChildren(empty);
  } else {
    discipleList.replaceChildren(
      ...save.disciples.map((disciple) => {
        const card = document.createElement("article");
        card.className = "disciple-card";

        const name = document.createElement("strong");
        name.textContent = disciple.name;

        const meta = document.createElement("span");
        meta.textContent = `${disciple.age}세 · ${disciple.stage} · ${disciple.trait}`;

        card.append(name, meta);
        return card;
      })
    );
  }

  showGame(options);
}

async function startNewGame(founderName, sectNameValue, options = {}) {
  const save = cloneSeed();
  save.sect.name = sectNameValue;
  save.founder = {
    id: "founder",
    name: founderName,
    age: 28,
    role: "개파조사",
    portrait: selectedPortraitId
  };
  save.log = [`${save.sect.name} 개파`];
  save.savedAt = new Date().toISOString();

  await writeSave(save);
  renderGame(save, options);
}

async function boot() {
  try {
    const saved = await readSave();

    if (saved) {
      const normalized = normalizeSave(saved);
      if (normalized !== saved) {
        await writeSave(normalized);
      }
      renderGame(normalized, { historyMode: "replace" });
      return;
    }
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }

  returnToWelcome({ historyMode: "replace" });
}

newGameButton.addEventListener("click", () => {
  if (currentSave && !confirm("기존 저장을 삭제하고 새 게임을 시작할까요?")) {
    return;
  }

  clearSave();
  currentSave = null;
  selectedPortraitId = portraits[0].id;
  pickRandomSectName();
  pickRandomName();
  renderPortraitOptions();
  showFounderCreation({ historyMode: "push" });
});

returnWelcomeButton.addEventListener("click", () => {
  returnToWelcome({ historyMode: "push" });
});

continueGameButton.addEventListener("click", () => {
  if (currentSave) {
    renderGame(currentSave, { historyMode: "push" });
  }
});

randomNameButton.addEventListener("click", pickRandomName);
randomSectNameButton.addEventListener("click", pickRandomSectName);

founderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const founderName = founderNameInput.value.trim() || founderNames[0];
  const sectNameValue = sectNameInput.value.trim() || sectNames[0];

  startNewGame(founderName, sectNameValue, { historyMode: "replace" }).catch(() => {
    showFounderCreation({ historyMode: "replace" });
  });
});

window.addEventListener("popstate", (event) => {
  const view = event.state?.view;

  if (view === "game") {
    if (currentSave) {
      renderGame(currentSave, { historyMode: "none" });
      return;
    }

    returnToWelcome({ historyMode: "none" });
    return;
  }

  if (view === "founder") {
    showFounderCreation({ historyMode: "none" });
    return;
  }

  returnToWelcome({ historyMode: "none" });
});

function reloadForNewVersion() {
  const reloadKey = "munpaweb:reloadedForVersion";

  if (sessionStorage.getItem(reloadKey) === APP_VERSION) {
    return;
  }

  sessionStorage.setItem(reloadKey, APP_VERSION);
  location.reload();
}

function watchServiceWorkerUpdates(registration) {
  if (registration.waiting) {
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
  }

  registration.addEventListener("updatefound", () => {
    const newWorker = registration.installing;

    if (!newWorker) {
      return;
    }

    newWorker.addEventListener("statechange", () => {
      if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
        newWorker.postMessage({ type: "SKIP_WAITING" });
      }
    });
  });
}

if ("serviceWorker" in navigator) {
  let refreshing = false;

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (refreshing) {
      return;
    }

    refreshing = true;
    reloadForNewVersion();
  });

  navigator.serviceWorker
    .register("./sw.js")
    .then((registration) => {
      watchServiceWorkerUpdates(registration);
      registration.update().catch(() => {});
    })
    .catch(() => {});
}

boot();
