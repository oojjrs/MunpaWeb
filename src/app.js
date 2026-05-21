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
const founderCard = document.querySelector("#founderCard");
const founderPortrait = document.querySelector("#founderPortrait");
const founderNameDisplay = document.querySelector("#founderNameDisplay");
const founderMeta = document.querySelector("#founderMeta");
const discipleList = document.querySelector("#discipleList");
const openRecruitmentButton = document.querySelector("#openRecruitment");
const closeRecruitmentButton = document.querySelector("#closeRecruitment");
const cancelRecruitmentButton = document.querySelector("#cancelRecruitment");
const confirmRecruitmentButton = document.querySelector("#confirmRecruitment");
const recruitmentPanel = document.querySelector("#recruitmentPanel");
const candidateList = document.querySelector("#candidateList");
const endTurnButton = document.querySelector("#endTurn");
const founderModal = document.querySelector("#founderModal");
const closeFounderModalButton = document.querySelector("#closeFounderModal");
const founderDetail = document.querySelector("#founderDetail");

const APP_VERSION = "v22";
const SAVE_KEY = "munpaweb:save:local";
const FOUNDER_AGE = 35;
const MAX_LIFESPAN = 120;
const STARTING_HEALTH = 100;
const seasons = ["봄", "여름", "가을", "겨울"];

const founderNamePools = {
  male: ["청운", "백도현", "강무진", "문서윤", "진태하", "강하준", "유건", "서도겸"],
  female: ["서린", "유청아", "진소하", "문설영", "하연", "백아린", "강유현", "유소율"]
};

const candidateNamePool = [
  "남궁소율",
  "백리현",
  "서문아",
  "유하겸",
  "진려원",
  "도윤",
  "하린",
  "무겸",
  "소명",
  "연서"
];

const portraits = [
  {
    id: "founder-male-01",
    image: "./assets/portraits/founders/founder-male-01.png",
    namePool: "male",
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
    namePool: "female",
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

const sectNames = ["청운문", "월영문", "백하문", "무결문", "비연문", "창송문", "한화문", "천류문"];

const newGameSeed = {
  sect: {
    name: sectNames[0],
    foundedYear: 1,
    season: "봄",
    seasonIndex: 0
  },
  founder: null,
  disciples: [],
  recruitment: {
    candidates: []
  },
  log: [],
  savedAt: null
};

let selectedPortraitId = portraits[0].id;
let currentSave = null;
let activeView = null;
let founderNameTouched = false;
let pendingRecruitment = null;
let founderModalHistoryOpen = false;

function cloneSeed() {
  return structuredClone(newGameSeed);
}

function normalizeFounder(founder = {}) {
  const hasLifeStats = Number.isFinite(founder.lifespan) && Number.isFinite(founder.health);

  return {
    id: founder.id ?? "founder",
    name: founder.name ?? founderNamePools.male[0],
    age: hasLifeStats && Number.isFinite(founder.age) ? founder.age : FOUNDER_AGE,
    lifespan: Number.isFinite(founder.lifespan) ? founder.lifespan : MAX_LIFESPAN,
    health: Number.isFinite(founder.health) ? founder.health : STARTING_HEALTH,
    role: founder.role ?? "개파조사",
    portrait: founder.portrait ?? portraits[0].id
  };
}

function normalizeSave(save) {
  const migrated = cloneSeed();
  migrated.sect.name = save?.sect?.name ?? sectNames[0];
  migrated.sect.foundedYear = Number.isFinite(save?.sect?.foundedYear) ? save.sect.foundedYear : 1;
  migrated.sect.seasonIndex = Number.isFinite(save?.sect?.seasonIndex)
    ? save.sect.seasonIndex
    : Math.max(0, seasons.indexOf(save?.sect?.season ?? "봄"));
  migrated.sect.season = seasons[migrated.sect.seasonIndex] ?? "봄";
  migrated.founder = normalizeFounder(save?.founder);
  migrated.disciples = Array.isArray(save?.disciples)
    ? save.disciples.map((disciple) => ({
        id: disciple.id ?? crypto.randomUUID(),
        name: disciple.name ?? "이름 없는 제자",
        age: Number.isFinite(disciple.age) ? disciple.age : 10,
        stage: disciple.stage ?? "입문",
        trait: disciple.trait ?? "평범"
      }))
    : [];
  migrated.recruitment = {
    candidates: Array.isArray(save?.recruitment?.candidates)
      ? save.recruitment.candidates.map(normalizeCandidate)
      : createCandidates()
  };
  migrated.log = Array.isArray(save?.log) ? save.log : [`${migrated.sect.name} 개파`];
  migrated.savedAt = save?.savedAt ?? new Date().toISOString();
  return migrated;
}

async function readSave() {
  const rawSave = localStorage.getItem(SAVE_KEY);
  return rawSave ? JSON.parse(rawSave) : null;
}

async function writeSave(value) {
  value.savedAt = new Date().toISOString();
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
  founderModal.hidden = true;
  founderModalHistoryOpen = false;
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
  founderModal.hidden = true;
  founderModalHistoryOpen = false;
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
        if (!founderNameTouched) {
          pickRandomName();
        }
        renderPortraitOptions();
      });

      return button;
    })
  );
}

function pickRandomName() {
  const portrait = portraits.find((item) => item.id === selectedPortraitId) ?? portraits[0];
  const names = founderNamePools[portrait.namePool] ?? founderNamePools.male;
  const name = names[Math.floor(Math.random() * names.length)];
  founderNameInput.value = name;
  founderNameTouched = false;
}

function pickRandomSectName() {
  const name = sectNames[Math.floor(Math.random() * sectNames.length)];
  sectNameInput.value = name;
}

function clampAge(age) {
  return Math.min(15, Math.max(5, Number(age) || 5));
}

function createCandidates(count = 5) {
  const shuffled = [...candidateNamePool].sort(() => Math.random() - 0.5);
  return Array.from({ length: count }, (_, index) =>
    normalizeCandidate({
      id: crypto.randomUUID(),
      name: shuffled[index] ?? `후보 ${index + 1}`,
      age: 5 + Math.floor(Math.random() * 11),
      decision: "defer"
    })
  );
}

function normalizeCandidate(candidate) {
  return {
    id: candidate.id ?? crypto.randomUUID(),
    name: candidate.name ?? "이름 없는 후보",
    age: clampAge(candidate.age),
    decision: ["defer", "reject", "accept"].includes(candidate.decision) ? candidate.decision : "defer"
  };
}

function getDecisionLabel(decision) {
  return {
    defer: "유예",
    reject: "불합격",
    accept: "합격"
  }[decision];
}

function formatTime(sect) {
  return `${sect.foundedYear}년 ${seasons[sect.seasonIndex] ?? sect.season}`;
}

function renderGame(save, options = {}) {
  currentSave = normalizeSave(save);
  sectName.textContent = currentSave.sect.name;
  seasonText.textContent = formatTime(currentSave.sect);
  mainStatus.textContent = `${currentSave.sect.name}의 ${currentSave.sect.foundedYear}년 ${currentSave.sect.season}입니다.`;
  saveState.textContent = currentSave.savedAt
    ? `저장됨 ${new Date(currentSave.savedAt).toLocaleString()}`
    : "새 게임";

  applyPortraitColors(founderPortrait, currentSave.founder.portrait);
  founderNameDisplay.textContent = currentSave.founder.name;
  founderMeta.textContent = `${currentSave.founder.age}세`;

  renderDisciples();
  renderFounderDetail();

  if (!recruitmentPanel.hidden) {
    openRecruitment();
  }

  showGame(options);
}

function renderDisciples() {
  if (currentSave.disciples.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "아직 제자가 없습니다.";
    discipleList.replaceChildren(empty);
    return;
  }

  discipleList.replaceChildren(
    ...currentSave.disciples.map((disciple) => {
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

function renderFounderDetail() {
  const profile = document.createElement("article");
  profile.className = "founder-card detail-character";

  const portrait = document.createElement("div");
  portrait.className = "portrait portrait-small";
  applyPortraitColors(portrait, currentSave.founder.portrait);

  const identity = document.createElement("div");
  const role = document.createElement("p");
  role.className = "kicker";
  role.textContent = currentSave.founder.role;
  const name = document.createElement("h3");
  name.textContent = currentSave.founder.name;
  const meta = document.createElement("p");
  meta.textContent = `${currentSave.founder.age}세`;
  identity.append(role, name, meta);
  profile.append(portrait, identity);

  const vitalRow = document.createElement("div");
  vitalRow.className = "detail-stat-row";
  vitalRow.append(
    createDetailItem(
      "수명",
      `${currentSave.founder.lifespan}`,
      "수명은 10/20/30/40/50처럼 10 단위로 표현합니다. 수명을 넘어간 나이부터 확률적으로 건강 수치를 감소시키며, 건강이 0이 되면 사망합니다. 수명은 늘거나 줄어들 수 있습니다."
    ),
    createDetailItem("건강", `${currentSave.founder.health}`, "", "important")
  );

  founderDetail.replaceChildren(
    profile,
    vitalRow
  );
}

function createDetailItem(label, value, tooltip = "", tone = "") {
  const item = document.createElement("div");
  item.className = "detail-item";
  if (tone) {
    item.classList.add(tone);
  }

  const labelNode = document.createElement("span");
  labelNode.textContent = label;

  if (tooltip) {
    const tipWrap = document.createElement("span");
    tipWrap.className = "tooltip-wrap";

    const help = document.createElement("button");
    help.className = "tooltip-mark";
    help.type = "button";
    help.textContent = "?";
    help.setAttribute("aria-label", `${label} 설명`);

    const bubble = document.createElement("span");
    bubble.className = "tooltip-bubble";
    bubble.role = "tooltip";
    bubble.textContent = tooltip;

    tipWrap.append(help, bubble);
    labelNode.append(" ", tipWrap);
  }

  const valueNode = document.createElement("strong");
  valueNode.textContent = value;

  item.append(labelNode, valueNode);
  return item;
}

function renderCandidates() {
  const candidates = pendingRecruitment ?? currentSave.recruitment.candidates;

  if (candidates.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "판정할 후보가 없습니다.";
    candidateList.replaceChildren(empty);
    return;
  }

  candidateList.replaceChildren(
    ...candidates.map((candidate) => {
      const card = document.createElement("article");
      card.className = "candidate-card";

      const summary = document.createElement("div");
      summary.className = "candidate-summary";

      const title = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = candidate.name;
      const decision = document.createElement("span");
      decision.className = `decision-pill ${candidate.decision}`;
      decision.textContent = getDecisionLabel(candidate.decision);
      title.append(name, decision);

      const age = document.createElement("p");
      age.className = "candidate-stat";
      age.textContent = `나이 ${candidate.age}세`;

      const detailButton = document.createElement("button");
      detailButton.className = "secondary-action compact-action";
      detailButton.type = "button";
      detailButton.disabled = true;
      detailButton.textContent = "상세";
      detailButton.setAttribute("aria-label", "후보 상세 화면은 추후 추가 예정");

      summary.append(title, age, detailButton);

      const actions = document.createElement("div");
      actions.className = "decision-actions";
      ["defer", "reject", "accept"].forEach((value) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = getDecisionLabel(value);
        button.setAttribute("aria-pressed", String(candidate.decision === value));
        button.addEventListener("click", () => {
          candidate.decision = value;
          renderCandidates();
        });
        actions.append(button);
      });

      card.append(summary, actions);
      return card;
    })
  );
}

function openRecruitment() {
  pendingRecruitment = structuredClone(currentSave.recruitment.candidates);
  recruitmentPanel.hidden = false;
  renderCandidates();
}

function closeRecruitment({ reset = true } = {}) {
  if (reset) {
    pendingRecruitment = null;
  }
  recruitmentPanel.hidden = true;
}

function openFounderModal({ historyMode = "push" } = {}) {
  renderFounderDetail();
  founderModal.hidden = false;

  if (historyMode === "push" && !founderModalHistoryOpen) {
    founderModalHistoryOpen = true;
    history.pushState({ view: "game", modal: "founder" }, "", location.href);
  }
}

function closeFounderModal({ historyMode = "none" } = {}) {
  founderModal.hidden = true;

  if (historyMode === "back" && founderModalHistoryOpen) {
    founderModalHistoryOpen = false;
    history.back();
    return;
  }

  founderModalHistoryOpen = false;
}

async function confirmRecruitment() {
  if (!pendingRecruitment) {
    return;
  }

  const accepted = pendingRecruitment.filter((candidate) => candidate.decision === "accept");
  const deferred = pendingRecruitment.filter((candidate) => candidate.decision === "defer");

  currentSave.disciples.push(
    ...accepted.map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      age: candidate.age,
      stage: "입문",
      trait: "신입"
    }))
  );
  currentSave.recruitment.candidates = deferred.map((candidate) => ({ ...candidate, decision: "defer" }));
  currentSave.log.push(`제자 모집: 합격 ${accepted.length}명, 유예 ${deferred.length}명`);
  pendingRecruitment = null;
  closeRecruitment({ reset: false });
  await writeSave(currentSave);
  renderGame(currentSave, { historyMode: "none" });
}

async function advanceTurn() {
  const previousSeasonIndex = currentSave.sect.seasonIndex;
  currentSave.sect.seasonIndex = (currentSave.sect.seasonIndex + 1) % seasons.length;
  currentSave.sect.season = seasons[currentSave.sect.seasonIndex];

  if (previousSeasonIndex === seasons.length - 1) {
    currentSave.sect.foundedYear += 1;
    currentSave.founder.age += 1;
    currentSave.disciples = currentSave.disciples.map((disciple) => ({
      ...disciple,
      age: disciple.age + 1
    }));
  }

  currentSave.log.push(`${formatTime(currentSave.sect)} 도래`);
  await writeSave(currentSave);
  renderGame(currentSave, { historyMode: "none" });
}

async function startNewGame(founderName, sectNameValue, options = {}) {
  const save = cloneSeed();
  save.sect.name = sectNameValue;
  save.founder = {
    id: "founder",
    name: founderName,
    age: FOUNDER_AGE,
    lifespan: MAX_LIFESPAN,
    health: STARTING_HEALTH,
    role: "개파조사",
    portrait: selectedPortraitId
  };
  save.recruitment.candidates = createCandidates();
  save.log = [`${save.sect.name} 개파`];

  await writeSave(save);
  renderGame(save, options);
}

async function boot() {
  try {
    const saved = await readSave();

    if (saved) {
      const normalized = normalizeSave(saved);
      await writeSave(normalized);
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
  founderNameTouched = false;
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
founderNameInput.addEventListener("input", () => {
  founderNameTouched = true;
});

founderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fallbackPortrait = portraits.find((item) => item.id === selectedPortraitId) ?? portraits[0];
  const fallbackNames = founderNamePools[fallbackPortrait.namePool] ?? founderNamePools.male;
  const founderName = founderNameInput.value.trim() || fallbackNames[0];
  const sectNameValue = sectNameInput.value.trim() || sectNames[0];

  startNewGame(founderName, sectNameValue, { historyMode: "replace" }).catch(() => {
    showFounderCreation({ historyMode: "replace" });
  });
});

openRecruitmentButton.addEventListener("click", openRecruitment);
closeRecruitmentButton.addEventListener("click", () => closeRecruitment());
cancelRecruitmentButton.addEventListener("click", () => closeRecruitment());
confirmRecruitmentButton.addEventListener("click", () => {
  confirmRecruitment().catch(() => {});
});
endTurnButton.addEventListener("click", () => {
  advanceTurn().catch(() => {});
});

document.querySelectorAll("[data-bulk-decision]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!pendingRecruitment) {
      return;
    }

    pendingRecruitment = pendingRecruitment.map((candidate) => ({
      ...candidate,
      decision: button.dataset.bulkDecision
    }));
    renderCandidates();
  });
});

founderCard.addEventListener("click", () => {
  openFounderModal();
});

closeFounderModalButton.addEventListener("click", () => {
  closeFounderModal({ historyMode: "back" });
});

founderModal.addEventListener("click", (event) => {
  if (event.target === founderModal) {
    closeFounderModal({ historyMode: "back" });
  }
});

window.addEventListener("popstate", (event) => {
  if (!founderModal.hidden) {
    closeFounderModal();
    return;
  }

  const view = event.state?.view;

  if (view === "game") {
    if (currentSave) {
      renderGame(currentSave, { historyMode: "none" });
      if (event.state?.modal === "founder") {
        founderModalHistoryOpen = true;
        openFounderModal({ historyMode: "none" });
      }
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
