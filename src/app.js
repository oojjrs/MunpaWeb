const welcomeView = document.querySelector("#welcomeView");
const founderView = document.querySelector("#founderView");
const gameView = document.querySelector("#gameView");
const endingView = document.querySelector("#endingView");
const recordsView = document.querySelector("#recordsView");
const continueGameButton = document.querySelector("#continueGame");
const viewRecordsButton = document.querySelector("#viewRecords");
const newGameButton = document.querySelector("#newGame");
const deploymentMeta = document.querySelector("#deploymentMeta");
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
const recruitmentModal = document.querySelector("#recruitmentModal");
const recruitmentPanel = document.querySelector("#recruitmentPanel");
const candidateList = document.querySelector("#candidateList");
const endTurnButton = document.querySelector("#endTurn");
const openCheatsButton = document.querySelector("#openCheats");
const cheatModal = document.querySelector("#cheatModal");
const closeCheatsButton = document.querySelector("#closeCheats");
const cheatSidebar = document.querySelector("#cheatSidebar");
const cheatSummary = document.querySelector("#cheatSummary");
const founderModal = document.querySelector("#founderModal");
const founderModalTitle = document.querySelector("#founderModalTitle");
const closeFounderModalButton = document.querySelector("#closeFounderModal");
const founderDetail = document.querySelector("#founderDetail");
const endingTitle = document.querySelector("#endingTitle");
const endingSummary = document.querySelector("#endingSummary");
const endingStats = document.querySelector("#endingStats");
const endingReturnRecordsButton = document.querySelector("#endingReturnRecords");
const endingReturnWelcomeButton = document.querySelector("#endingReturnWelcome");
const clearRecordsButton = document.querySelector("#clearRecords");
const recordsList = document.querySelector("#recordsList");
const recordsReturnWelcomeButton = document.querySelector("#recordsReturnWelcome");

const APP_VERSION = "v65";
const DEPLOYED_AT = "2026. 5. 22. 오전 8:53:31";
const SAVE_KEY = "munpaweb:save:local";
const RECORDS_KEY = "munpaweb:records:local";
const WELCOME_LOCK_KEY = "munpaweb:welcomeSaveStartedAt";
const FOUNDER_AGE = 35;
const MAX_LIFESPAN = 120;
const CANDIDATE_LIFESPAN = 80;
const STARTING_HEALTH = 100;
const seasons = ["봄", "여름", "가을", "겨울"];
const declineByOverYear = [0, 2, 3, 4, 5, 6, 8, 10, 12];

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

const disciplePortraits = [
  { id: "disciple-male-01", image: "./assets/portraits/disciples/disciple-male-01.svg", gender: "male", colors: { face: "#d7b082", hair: "#171b16", robe: "#45634e", robeDark: "#273b2f", bgA: "#e7eadb", bgB: "#9aae8a" } },
  { id: "disciple-male-02", image: "./assets/portraits/disciples/disciple-male-02.svg", gender: "male", colors: { face: "#c99a72", hair: "#2a1d19", robe: "#355a68", robeDark: "#203844", bgA: "#dfe9e9", bgB: "#7d9ca4" } },
  { id: "disciple-male-03", image: "./assets/portraits/disciples/disciple-male-03.svg", gender: "male", colors: { face: "#e0ba8f", hair: "#201719", robe: "#6a5542", robeDark: "#3f3128", bgA: "#eee4d3", bgB: "#b29472" } },
  { id: "disciple-male-04", image: "./assets/portraits/disciples/disciple-male-04.svg", gender: "male", colors: { face: "#d2a37d", hair: "#111b1e", robe: "#4b5872", robeDark: "#2b3448", bgA: "#dde3ee", bgB: "#8996b1" } },
  { id: "disciple-male-05", image: "./assets/portraits/disciples/disciple-male-05.svg", gender: "male", colors: { face: "#c78f68", hair: "#251b12", robe: "#5e4f7d", robeDark: "#39304f", bgA: "#e8e0ee", bgB: "#9581ad" } },
  { id: "disciple-female-01", image: "./assets/portraits/disciples/disciple-female-01.svg", gender: "female", colors: { face: "#d7a98d", hair: "#231923", robe: "#8a5969", robeDark: "#543642", bgA: "#eee1e4", bgB: "#b98796" } },
  { id: "disciple-female-02", image: "./assets/portraits/disciples/disciple-female-02.svg", gender: "female", colors: { face: "#e0b792", hair: "#161a20", robe: "#3f6f67", robeDark: "#274740", bgA: "#dcebe5", bgB: "#83aaa0" } },
  { id: "disciple-female-03", image: "./assets/portraits/disciples/disciple-female-03.svg", gender: "female", colors: { face: "#cfa07a", hair: "#2a1d1d", robe: "#7d6541", robeDark: "#4c3d2a", bgA: "#ede5d3", bgB: "#b79e68" } },
  { id: "disciple-female-04", image: "./assets/portraits/disciples/disciple-female-04.svg", gender: "female", colors: { face: "#d9ad9a", hair: "#201625", robe: "#566586", robeDark: "#333d58", bgA: "#e1e6f0", bgB: "#8b98bd" } },
  { id: "disciple-female-05", image: "./assets/portraits/disciples/disciple-female-05.svg", gender: "female", colors: { face: "#c99277", hair: "#1a1716", robe: "#7b4f4a", robeDark: "#4c302e", bgA: "#eee0da", bgB: "#aa7d72" } }
];

const allPortraits = [...portraits, ...disciplePortraits];

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
  stats: {
    recruitedCount: 0,
    successionCount: 0,
    leaderLineage: []
  },
  ended: null,
  log: [],
  startedAt: null,
  lastPlayedAt: null,
  savedAt: null
};

let selectedPortraitId = portraits[0].id;
let currentSave = null;
let currentRecords = [];
let activeView = null;
let founderNameTouched = false;
let pendingRecruitment = null;
let activeRecruitmentIndex = 0;
let founderModalHistoryOpen = false;
let recruitmentModalHistoryOpen = false;
let cheatModalHistoryOpen = false;

function cloneSeed() {
  return structuredClone(newGameSeed);
}

function normalizeFounder(founder = {}) {
  const hasLifeStats = Number.isFinite(founder.lifespan) && Number.isFinite(founder.health);
  const health = Number.isFinite(founder.health) ? founder.health : STARTING_HEALTH;

  return {
    id: founder.id ?? "founder",
    name: founder.name ?? founderNamePools.male[0],
    age: hasLifeStats && Number.isFinite(founder.age) ? founder.age : FOUNDER_AGE,
    lifespan: Number.isFinite(founder.lifespan) ? founder.lifespan : MAX_LIFESPAN,
    health,
    dead: Boolean(founder.dead) || health <= 0,
    role: founder.role ?? "개파조사",
    portrait: founder.portrait ?? portraits[0].id
  };
}

function normalizeDisciple(disciple = {}) {
  const health = Number.isFinite(disciple.health) ? disciple.health : STARTING_HEALTH;

  return {
    id: disciple.id ?? crypto.randomUUID(),
    name: disciple.name ?? "이름 없는 제자",
    age: Number.isFinite(disciple.age) ? disciple.age : 10,
    lifespan: Number.isFinite(disciple.lifespan) ? disciple.lifespan : MAX_LIFESPAN,
    health,
    dead: Boolean(disciple.dead) || health <= 0,
    stage: disciple.stage ?? "입문",
    trait: disciple.trait ?? "평범",
    portrait: disciple.portrait ?? disciplePortraits[0].id
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
    ? save.disciples.map(normalizeDisciple)
    : [];
  migrated.recruitment = {
    candidates: Array.isArray(save?.recruitment?.candidates)
      ? save.recruitment.candidates.map(normalizeCandidate)
      : createCandidates()
  };
  migrated.stats = {
    recruitedCount: Number.isFinite(save?.stats?.recruitedCount) ? save.stats.recruitedCount : migrated.disciples.length,
    successionCount: Number.isFinite(save?.stats?.successionCount) ? save.stats.successionCount : 0,
    leaderLineage: Array.isArray(save?.stats?.leaderLineage)
      ? save.stats.leaderLineage
      : [
          {
            id: migrated.founder.id,
            name: migrated.founder.name,
            role: migrated.founder.role,
            startedAt: "1년 봄",
            ageAtStart: migrated.founder.age
          }
        ]
  };
  migrated.ended = save?.ended ?? null;
  migrated.log = Array.isArray(save?.log) ? save.log : [`${migrated.sect.name} 개파`];
  migrated.startedAt = save?.startedAt ?? save?.savedAt ?? new Date().toISOString();
  migrated.lastPlayedAt = save?.lastPlayedAt ?? save?.savedAt ?? migrated.startedAt;
  migrated.savedAt = save?.savedAt ?? new Date().toISOString();
  return migrated;
}

async function readSave() {
  const rawSave = localStorage.getItem(SAVE_KEY);
  return rawSave ? JSON.parse(rawSave) : null;
}

async function readRecords() {
  const rawRecords = localStorage.getItem(RECORDS_KEY);
  return rawRecords ? JSON.parse(rawRecords) : [];
}

async function writeSave(value) {
  const now = new Date().toISOString();
  value.savedAt = now;
  value.lastPlayedAt = now;
  localStorage.setItem(SAVE_KEY, JSON.stringify(value));
}

async function writeRecords(records) {
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

function clearSave() {
  localStorage.removeItem(SAVE_KEY);
}

async function syncCurrentSave() {
  const saved = await readSave();
  currentSave = saved ? normalizeSave(saved) : null;
  currentRecords = await readRecords();

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
  if (currentSave && !currentSave.ended) {
    sessionStorage.setItem(WELCOME_LOCK_KEY, currentSave.startedAt ?? "");
  }
  deploymentMeta.textContent = `현재 버전 ${APP_VERSION} · 배포 ${DEPLOYED_AT}`;
  continueGameButton.hidden = !currentSave || Boolean(currentSave.ended);
  viewRecordsButton.hidden = currentRecords.length === 0;
  welcomeView.hidden = false;
  founderView.hidden = true;
  gameView.hidden = true;
  endingView.hidden = true;
  recordsView.hidden = true;
  founderModal.hidden = true;
  recruitmentModal.hidden = true;
  cheatModal.hidden = true;
  founderModalHistoryOpen = false;
  recruitmentModalHistoryOpen = false;
  cheatModalHistoryOpen = false;
  updateCheatVisibility(false);
  updateHistory(activeView, historyMode);
}

async function returnToWelcome(options = {}) {
  try {
    await syncCurrentSave();
    if (currentSave?.ended) {
      await storeEndedRecord(currentSave);
      clearSave();
      currentSave = null;
    }
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
  endingView.hidden = true;
  recordsView.hidden = true;
  founderModal.hidden = true;
  recruitmentModal.hidden = true;
  cheatModal.hidden = true;
  founderModalHistoryOpen = false;
  recruitmentModalHistoryOpen = false;
  cheatModalHistoryOpen = false;
  updateCheatVisibility(false);
  updateHistory(activeView, historyMode);
}

function showGame({ historyMode = "push" } = {}) {
  activeView = "game";
  welcomeView.hidden = true;
  founderView.hidden = true;
  gameView.hidden = false;
  endingView.hidden = true;
  recordsView.hidden = true;
  updateCheatVisibility(true);
  updateHistory(activeView, historyMode);
}

function showEnding({ historyMode = "push" } = {}) {
  activeView = "ending";
  welcomeView.hidden = true;
  founderView.hidden = true;
  gameView.hidden = true;
  endingView.hidden = false;
  recordsView.hidden = true;
  founderModal.hidden = true;
  recruitmentModal.hidden = true;
  cheatModal.hidden = true;
  updateCheatVisibility(false);
  updateHistory(activeView, historyMode);
}

function showRecords({ historyMode = "push" } = {}) {
  activeView = "records";
  welcomeView.hidden = true;
  founderView.hidden = true;
  gameView.hidden = true;
  endingView.hidden = true;
  recordsView.hidden = false;
  founderModal.hidden = true;
  recruitmentModal.hidden = true;
  cheatModal.hidden = true;
  updateCheatVisibility(false);
  updateHistory(activeView, historyMode);
}

function applyPortraitColors(element, portraitId) {
  const portrait = allPortraits.find((item) => item.id === portraitId) ?? portraits[0];
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
  const shuffledPortraits = [...disciplePortraits].sort(() => Math.random() - 0.5);
  return Array.from({ length: count }, (_, index) =>
    normalizeCandidate({
      id: crypto.randomUUID(),
      name: shuffled[index] ?? `후보 ${index + 1}`,
      age: 5 + Math.floor(Math.random() * 11),
      lifespan: CANDIDATE_LIFESPAN,
      health: STARTING_HEALTH,
      portrait: shuffledPortraits[index % shuffledPortraits.length].id,
      decision: "defer"
    })
  );
}

function normalizeCandidate(candidate) {
  return {
    id: candidate.id ?? crypto.randomUUID(),
    name: candidate.name ?? "이름 없는 후보",
    age: clampAge(candidate.age),
    lifespan: Number.isFinite(candidate.lifespan) ? candidate.lifespan : CANDIDATE_LIFESPAN,
    health: Number.isFinite(candidate.health) ? candidate.health : STARTING_HEALTH,
    portrait: candidate.portrait ?? disciplePortraits[0].id,
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

function getHealthTone(health) {
  if (health >= 80) {
    return "excellent";
  }
  if (health >= 50) {
    return "stable";
  }
  if (health > 10) {
    return "weak";
  }
  return "critical";
}

function randomInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function isLocalCheatEnvironment() {
  return ["localhost", "127.0.0.1", ""].includes(location.hostname);
}

function updateCheatVisibility(isGameActive) {
  const visible = isLocalCheatEnvironment() && isGameActive;
  openCheatsButton.hidden = !visible;
  cheatSidebar.hidden = !visible;
}

function renderGame(save, options = {}) {
  sessionStorage.removeItem(WELCOME_LOCK_KEY);
  currentSave = normalizeSave(save);

  if (currentSave.ended) {
    renderEnding(currentSave, options);
    return;
  }

  sectName.textContent = currentSave.sect.name;
  seasonText.textContent = formatTime(currentSave.sect);
  mainStatus.textContent = `${formatTime(currentSave.sect)} 현재 문파 상황`;
  saveState.textContent = currentSave.savedAt
    ? `저장됨 ${new Date(currentSave.savedAt).toLocaleString()}`
    : "새 게임";

  applyPortraitColors(founderPortrait, currentSave.founder.portrait);
  founderNameDisplay.textContent = currentSave.founder.name;
  const healthText = document.createElement("span");
  healthText.className = `health-chip health-${getHealthTone(currentSave.founder.health)}`;
  healthText.textContent = `건강 ${currentSave.founder.health}`;
  founderMeta.replaceChildren(`${currentSave.founder.age}세 · `, healthText);

  renderDisciples();
  renderFounderDetail();
  renderCheatSummary();

  if (!recruitmentModal.hidden) {
    openRecruitment();
  }

  showGame(options);
}

function renderEnding(save, options = {}) {
  currentSave = normalizeSave(save);
  const freshStats = createEndingStats(currentSave.ended?.reason ?? "문파 내에 살아있는 사람이 없습니다.");
  const stats = {
    ...freshStats,
    ...(currentSave.ended?.stats ?? {}),
    eventCount: freshStats.eventCount,
    majorEvents: freshStats.majorEvents
  };
  const lineage = stats.leaderLineage ?? currentSave.stats.leaderLineage ?? [];
  const majorEvents = stats.majorEvents ?? [];

  endingTitle.textContent = `${currentSave.sect.name} 멸망`;
  endingSummary.textContent = currentSave.ended?.reason ?? "문파 내에 살아있는 사람이 없습니다.";
  endingStats.replaceChildren(
    createEndingStatItem("존속 기간", `${stats.finalTime}까지`),
    createEndingStatItem("마지막 플레이", formatDateTime(stats.endedAt ?? currentSave.ended?.endedAt)),
    createEndingStatItem("플레이 시간", formatDuration(stats.playDurationMs)),
    createEndingStatItem("역대 모집 제자", `${stats.recruitedCount}명`),
    createEndingStatItem("장문인 승계", `${stats.successionCount}회`),
    createEndingStatItem("마지막 장문인", stats.lastLeaderName),
    createEndingStatItem("주요 사건", `${stats.eventCount}개`),
    createLineageBlock(lineage),
    createMajorEventsBlock(majorEvents)
  );
  showEnding(options);
}

function renderRecords(options = {}) {
  clearRecordsButton.hidden = currentRecords.length === 0;

  if (currentRecords.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "아직 저장된 플레이 기록이 없습니다.";
    recordsList.replaceChildren(empty);
    showRecords(options);
    return;
  }

  recordsList.replaceChildren(
    ...currentRecords.map((record) => {
      const card = document.createElement("article");
      card.className = "record-card";

      const button = document.createElement("button");
      button.className = "record-main";
      button.type = "button";

      const title = document.createElement("strong");
      title.textContent = `${record.sectName} 멸망`;

      const meta = document.createElement("span");
      meta.textContent = `${record.stats.finalTime} · ${formatDateTime(record.endedAt)} 종료`;

      button.append(title, meta);
      button.addEventListener("click", () => {
        renderEnding(record.save, { historyMode: "push" });
      });

      const deleteButton = document.createElement("button");
      deleteButton.className = "record-delete danger-action";
      deleteButton.type = "button";
      deleteButton.setAttribute("aria-label", `${record.sectName} 기록 삭제`);
      deleteButton.innerHTML = `
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M3 6h18"></path>
          <path d="M8 6V4h8v2"></path>
          <path d="M6 6l1 18h10l1-18"></path>
          <path d="M10 11v6"></path>
          <path d="M14 11v6"></path>
        </svg>
      `;
      deleteButton.addEventListener("click", () => {
        deleteRecord(record.id).catch(() => {});
      });

      card.append(button, deleteButton);
      return card;
    })
  );
  showRecords(options);
}

async function deleteRecord(recordId) {
  const record = currentRecords.find((item) => item.id === recordId);

  if (!record || !confirm(`${record.sectName} 기록을 삭제할까요?`)) {
    return;
  }

  const currentEndedRecordId = currentSave?.ended ? createRecordSnapshot(currentSave).id : null;
  currentRecords = currentRecords.filter((item) => item.id !== recordId);
  await writeRecords(currentRecords);

  if (recordId === currentEndedRecordId) {
    clearSave();
    currentSave = null;
  }

  if (currentRecords.length === 0) {
    showWelcome({ historyMode: "replace" });
    return;
  }

  renderRecords({ historyMode: "none" });
}

async function clearRecords() {
  if (currentRecords.length === 0 || !confirm("모든 플레이 기록을 삭제할까요?")) {
    return;
  }

  currentRecords = [];
  await writeRecords(currentRecords);

  if (currentSave?.ended) {
    clearSave();
    currentSave = null;
  }

  showWelcome({ historyMode: "replace" });
}

function createEndingStatItem(label, value) {
  const item = document.createElement("article");
  item.className = "ending-stat";

  const labelNode = document.createElement("span");
  labelNode.textContent = label;

  const valueNode = document.createElement("strong");
  valueNode.textContent = value;

  item.append(labelNode, valueNode);
  return item;
}

function createLineageBlock(lineage) {
  const block = document.createElement("section");
  block.className = "lineage-block";

  const title = document.createElement("h2");
  title.textContent = "장문인 계보";

  const list = document.createElement("ol");
  list.append(
    ...lineage.map((leader) => {
      const item = document.createElement("li");
      const name = document.createElement("strong");
      name.textContent = leader.name;
      const meta = document.createElement("span");
      meta.textContent = `${leader.role ?? "장문인"} · ${leader.startedAt ?? "-"} 취임`;
      item.append(name, meta);
      return item;
    })
  );

  block.append(title, list);
  return block;
}

function createMajorEventsBlock(events) {
  const block = document.createElement("section");
  block.className = "lineage-block";

  const title = document.createElement("h2");
  title.textContent = "주요 사건";

  if (events.length === 0) {
    const empty = document.createElement("p");
    empty.className = "minor-note";
    empty.textContent = "기록된 주요 사건이 없습니다.";
    block.append(title, empty);
    return block;
  }

  const list = document.createElement("ol");
  list.append(
    ...events.map((eventText) => {
      const item = document.createElement("li");
      const text = document.createElement("strong");
      text.textContent = eventText;
      item.append(text);
      return item;
    })
  );

  block.append(title, list);
  return block;
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

function renderCharacterDetail(character, { title = character.role ?? "상세 정보", role = character.role ?? "인물", badge = "" } = {}) {
  founderModalTitle.textContent = title;

  const profile = document.createElement("article");
  profile.className = "founder-card detail-character";

  const portrait = document.createElement("div");
  portrait.className = "portrait portrait-small";
  applyPortraitColors(portrait, character.portrait);

  const identity = document.createElement("div");
  const labelRow = document.createElement("div");
  labelRow.className = "founder-label-row";
  const roleText = document.createElement("p");
  roleText.className = "kicker";
  roleText.textContent = role;
  labelRow.append(roleText);
  if (badge) {
    const badgeNode = document.createElement("span");
    badgeNode.className = "role-badge";
    badgeNode.textContent = badge;
    labelRow.append(badgeNode);
  }
  const name = document.createElement("h3");
  name.textContent = character.name;
  const meta = document.createElement("p");
  meta.textContent = `${character.age}세`;
  identity.append(labelRow, name, meta);
  profile.append(portrait, identity);

  const vitalRow = document.createElement("div");
  vitalRow.className = "detail-stat-row";
  vitalRow.append(
    createDetailItem(
      "수명",
      `${character.lifespan}`,
      "수명은 10/20/30/40/50처럼 10 단위로 표현합니다. 수명을 넘어간 나이부터 확률적으로 건강 수치를 감소시키며, 건강이 0이 되면 사망합니다. 수명은 늘거나 줄어들 수 있습니다."
    ),
    createDetailItem("건강", `${character.health}`, "", "important")
  );

  founderDetail.replaceChildren(
    profile,
    vitalRow
  );
}

function renderFounderDetail() {
  renderCharacterDetail(currentSave.founder, {
    title: currentSave.founder.role,
    role: currentSave.founder.role,
    badge: "장문인"
  });
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

function calculateLifespanHealthDelta(character) {
  const overYear = character.age - character.lifespan;

  if (overYear <= 0 || character.health <= 0 || character.dead) {
    return { delta: 0, loss: 0, recovery: 0, overYear };
  }

  const baseLoss = declineByOverYear[Math.min(overYear, declineByOverYear.length - 1)];
  const loss = Math.max(1, baseLoss + randomInt(-1, 2));
  const recoveryChance = Math.max(0.18 - overYear * 0.02, 0.04);
  const recovery = Math.random() < recoveryChance ? randomInt(1, 3) : 0;

  return {
    delta: recovery - loss,
    loss,
    recovery,
    overYear
  };
}

function applyLifespanHealthChange(character) {
  const change = calculateLifespanHealthDelta(character);

  if (change.delta === 0) {
    return change;
  }

  character.health = Math.min(STARTING_HEALTH, Math.max(0, character.health + change.delta));
  if (character.health <= 0) {
    character.dead = true;
  }
  return change;
}

function renderCheatSummary() {
  if (!currentSave || !cheatSummary) {
    return;
  }

  cheatSummary.replaceChildren(
    createCheatSummaryItem("시간", formatTime(currentSave.sect)),
    createCheatSummaryItem("나이", `${currentSave.founder.age}세`),
    createCheatSummaryItem("수명", `${currentSave.founder.lifespan}`),
    createCheatSummaryItem("건강", `${currentSave.founder.health}`)
  );
}

function createCheatSummaryItem(label, value) {
  const item = document.createElement("div");
  const labelNode = document.createElement("span");
  labelNode.textContent = label;
  const valueNode = document.createElement("strong");
  valueNode.textContent = value;
  item.append(labelNode, valueNode);
  return item;
}

function getAliveDisciples(save) {
  return save.disciples.filter((disciple) => !disciple.dead && disciple.health > 0);
}

function getLivingMemberCount(save) {
  const leaderAlive = !save.founder.dead && save.founder.health > 0 ? 1 : 0;
  return leaderAlive + getAliveDisciples(save).length;
}

function createEndingStats(reason, save = currentSave) {
  const majorEvents = save.log.filter(isMajorEventLog);
  const startedAt = save.startedAt ?? save.savedAt ?? new Date().toISOString();
  const endedAt = save.ended?.endedAt ?? new Date().toISOString();
  const playDurationMs = Math.max(0, new Date(endedAt).getTime() - new Date(startedAt).getTime());

  return {
    reason,
    finalTime: formatTime(save.sect),
    startedAt,
    endedAt,
    lastPlayedAt: save.lastPlayedAt ?? endedAt,
    playDurationMs,
    recruitedCount: save.stats?.recruitedCount ?? save.disciples.length,
    successionCount: save.stats?.successionCount ?? 0,
    leaderLineage: save.stats?.leaderLineage ?? [],
    lastLeaderName: save.founder.name,
    eventCount: majorEvents.length,
    majorEvents
  };
}

function createRecordSnapshot(save) {
  const normalized = normalizeSave(save);
  const endedAt = normalized.ended?.endedAt ?? new Date().toISOString();
  const stats = createEndingStats(
    normalized.ended?.reason ?? "문파 내에 살아있는 사람이 없습니다.",
    normalized
  );

  return {
    id: `${endedAt}:${normalized.sect.name}`,
    sectName: normalized.sect.name,
    endedAt,
    lastPlayedAt: normalized.lastPlayedAt ?? endedAt,
    stats,
    save: normalized
  };
}

function formatDateTime(value) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString();
}

function formatDuration(ms) {
  if (!Number.isFinite(ms) || ms <= 0) {
    return "1분 미만";
  }

  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  }

  return `${Math.max(1, minutes)}분`;
}

async function storeEndedRecord(save) {
  const snapshot = createRecordSnapshot(save);
  const records = await readRecords();
  const nextRecords = [
    snapshot,
    ...records.filter((record) => record.id !== snapshot.id)
  ];
  currentRecords = nextRecords;
  await writeRecords(nextRecords);
}

function isMajorEventLog(entry) {
  if (entry.endsWith(" 도래")) {
    return false;
  }

  if (entry.includes("치트") || entry.includes("쇠약")) {
    return false;
  }

  return ["개파", "제자 모집", "장문인 승계", "사망", "멸망"].some((keyword) =>
    entry.includes(keyword)
  );
}

function endSect(reason) {
  currentSave.ended = {
    reason,
    endedAt: new Date().toISOString(),
    stats: createEndingStats(reason)
  };
  currentSave.log.push(`${currentSave.sect.name} 멸망: ${reason}`);
}

function promoteSuccessor() {
  const successorIndex = currentSave.disciples.findIndex(
    (disciple) => !disciple.dead && disciple.health > 0
  );

  if (successorIndex === -1) {
    endSect("문파 내에 살아있는 사람이 없습니다.");
    return;
  }

  const [successor] = currentSave.disciples.splice(successorIndex, 1);
  currentSave.founder = {
    ...successor,
    role: "장문인"
  };
  currentSave.stats.successionCount += 1;
  currentSave.stats.leaderLineage.push({
    id: successor.id,
    name: successor.name,
    role: "장문인",
    startedAt: formatTime(currentSave.sect),
    ageAtStart: successor.age
  });
  currentSave.log.push(`${successor.name} 장문인 승계`);
}

function resolveSectContinuity() {
  if (getLivingMemberCount(currentSave) === 0) {
    endSect("문파 내에 살아있는 사람이 없습니다.");
    return;
  }

  if (currentSave.founder.dead || currentSave.founder.health <= 0) {
    promoteSuccessor();
  }
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

  activeRecruitmentIndex = Math.min(Math.max(activeRecruitmentIndex, 0), candidates.length - 1);
  const candidate = candidates[activeRecruitmentIndex];

  const progress = document.createElement("div");
  progress.className = "candidate-progress";
  const counter = document.createElement("strong");
  counter.textContent = `${activeRecruitmentIndex + 1} / ${candidates.length}`;
  const dots = document.createElement("div");
  dots.className = "candidate-dots";
  candidates.forEach((item, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `candidate-dot ${item.decision}`;
    dot.setAttribute("aria-label", `${index + 1}번째 후보 보기`);
    dot.setAttribute("aria-current", String(index === activeRecruitmentIndex));
    dot.addEventListener("click", () => {
      activeRecruitmentIndex = index;
      renderCandidates();
    });
    dots.append(dot);
  });
  progress.append(counter, dots);

  const card = document.createElement("article");
  card.className = "candidate-card candidate-focus-card";

  const portrait = document.createElement("div");
  portrait.className = "portrait candidate-portrait";
  applyPortraitColors(portrait, candidate.portrait);

  const summary = document.createElement("div");
  summary.className = "candidate-summary";

  const identity = document.createElement("div");
  identity.className = "candidate-identity";

  const name = document.createElement("strong");
  name.textContent = candidate.name;

  const meta = document.createElement("div");
  meta.className = "candidate-meta";

  const age = document.createElement("p");
  age.className = "candidate-stat";
  age.textContent = `${candidate.age}세`;

  meta.append(age);
  identity.append(name, meta);
  summary.append(identity);

  const stats = document.createElement("div");
  stats.className = "candidate-detail-stats";
  stats.append(
    createDetailItem("수명", `${candidate.lifespan}`, "수명은 10/20/30/40/50처럼 10 단위로 표현합니다. 수명을 넘어간 나이부터 확률적으로 건강 수치를 감소시키며, 건강이 0이 되면 사망합니다. 수명은 늘거나 줄어들 수 있습니다."),
    createDetailItem("건강", `${candidate.health}`, "", "important")
  );

  card.append(portrait, summary, stats);

  const nav = document.createElement("div");
  nav.className = "candidate-nav";
  const previous = document.createElement("button");
  previous.className = "secondary-action";
  previous.type = "button";
  previous.textContent = "이전";
  previous.disabled = activeRecruitmentIndex === 0;
  previous.addEventListener("click", () => {
    activeRecruitmentIndex -= 1;
    renderCandidates();
  });
  const recruitButton = document.createElement("button");
  recruitButton.className = "primary-action";
  recruitButton.type = "button";
  recruitButton.textContent = "모집";
  recruitButton.addEventListener("click", () => {
    recruitCandidate(candidate.id).catch(() => {});
  });
  const next = document.createElement("button");
  next.className = "secondary-action";
  next.type = "button";
  next.textContent = "다음";
  next.disabled = activeRecruitmentIndex === candidates.length - 1;
  next.addEventListener("click", () => {
    activeRecruitmentIndex += 1;
    renderCandidates();
  });
  nav.append(previous, recruitButton, next);

  candidateList.replaceChildren(progress, card, nav);
}

function openRecruitment({ historyMode = "push" } = {}) {
  pendingRecruitment = structuredClone(currentSave.recruitment.candidates);
  activeRecruitmentIndex = 0;
  recruitmentModal.hidden = false;
  renderCandidates();

  if (historyMode === "push" && !recruitmentModalHistoryOpen) {
    recruitmentModalHistoryOpen = true;
    history.pushState({ view: "game", modal: "recruitment" }, "", location.href);
  }
}

function closeRecruitment({ reset = true, historyMode = "none" } = {}) {
  if (historyMode === "back" && recruitmentModalHistoryOpen) {
    recruitmentModalHistoryOpen = false;
    history.back();
    return;
  }

  if (reset) {
    pendingRecruitment = null;
  }
  recruitmentModal.hidden = true;

  recruitmentModalHistoryOpen = false;
}

function openCheats({ historyMode = "push" } = {}) {
  cheatModal.hidden = false;

  if (historyMode === "push" && !cheatModalHistoryOpen) {
    cheatModalHistoryOpen = true;
    history.pushState({ view: "game", modal: "cheats" }, "", location.href);
  }
}

function closeCheats({ historyMode = "none" } = {}) {
  cheatModal.hidden = true;

  if (historyMode === "back" && cheatModalHistoryOpen) {
    cheatModalHistoryOpen = false;
    history.back();
    return;
  }

  cheatModalHistoryOpen = false;
}

function openFounderModal({ historyMode = "push" } = {}) {
  renderFounderDetail();
  founderModal.classList.remove("stacked-modal");
  founderModal.hidden = false;

  if (historyMode === "push" && !founderModalHistoryOpen) {
    founderModalHistoryOpen = true;
    history.pushState({ view: "game", modal: "founder" }, "", location.href);
  }
}

function closeFounderModal({ historyMode = "none" } = {}) {
  if (historyMode === "back" && founderModalHistoryOpen) {
    founderModalHistoryOpen = false;
    history.back();
    return;
  }

  founderModal.hidden = true;
  founderModal.classList.remove("stacked-modal");

  founderModalHistoryOpen = false;
}

async function recruitCandidate(candidateId) {
  if (!pendingRecruitment) {
    return;
  }

  const candidateIndex = pendingRecruitment.findIndex((candidate) => candidate.id === candidateId);
  if (candidateIndex === -1) {
    return;
  }

  const [candidate] = pendingRecruitment.splice(candidateIndex, 1);
  currentSave.disciples.push({
    id: candidate.id,
    name: candidate.name,
    age: candidate.age,
    lifespan: candidate.lifespan,
    health: STARTING_HEALTH,
    portrait: candidate.portrait,
    dead: false,
    stage: "입문",
    trait: "신입"
  });
  currentSave.stats.recruitedCount += 1;
  currentSave.recruitment.candidates = pendingRecruitment.map((item) => ({ ...item, decision: "defer" }));
  currentSave.log.push(`제자 모집: ${candidate.name} 입문`);
  await writeSave(currentSave);
  renderGame(currentSave, { historyMode: "none" });

  if (pendingRecruitment.length === 0) {
    closeRecruitment({ reset: false, historyMode: "back" });
    return;
  }

  activeRecruitmentIndex = Math.min(candidateIndex, pendingRecruitment.length - 1);
  renderCandidates();
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

  const founderHealthChange = applyLifespanHealthChange(currentSave.founder);
  if (founderHealthChange.delta < 0) {
    const recoveryText = founderHealthChange.recovery > 0 ? `, 회복 ${founderHealthChange.recovery}` : "";
    currentSave.log.push(
      `${currentSave.founder.name} 쇠약: 건강 -${founderHealthChange.loss}${recoveryText}`
    );
    if (currentSave.founder.dead) {
      currentSave.log.push(`${currentSave.founder.name} 사망`);
    }
  }

  resolveSectContinuity();
  currentSave.log.push(`${formatTime(currentSave.sect)} 도래`);
  if (currentSave.ended) {
    await storeEndedRecord(currentSave);
  }
  await writeSave(currentSave);
  renderGame(currentSave, { historyMode: "none" });
}

async function advanceTurns(count) {
  for (let index = 0; index < count; index += 1) {
    await advanceTurn();
    if (currentSave.founder.health <= 0) {
      break;
    }
  }
}

async function runCheat(action) {
  if (!currentSave) {
    return;
  }

  if (action === "age-to-lifespan") {
    currentSave.founder.age = currentSave.founder.lifespan;
    currentSave.log.push(`${currentSave.founder.name} 나이 치트: 수명 도달`);
    await writeSave(currentSave);
    renderGame(currentSave, { historyMode: "none" });
    return;
  }

  if (action === "age-over-lifespan") {
    currentSave.founder.age = currentSave.founder.lifespan + 1;
    currentSave.log.push(`${currentSave.founder.name} 나이 치트: 수명 초과`);
    await writeSave(currentSave);
    renderGame(currentSave, { historyMode: "none" });
    return;
  }

  if (action === "advance-year") {
    await advanceTurns(4);
    return;
  }

  if (action === "advance-five-years") {
    await advanceTurns(20);
    return;
  }

  if (action === "restore-health") {
    currentSave.founder.health = STARTING_HEALTH;
    currentSave.founder.dead = false;
    currentSave.log.push(`${currentSave.founder.name} 건강 치트: 회복`);
    await writeSave(currentSave);
    renderGame(currentSave, { historyMode: "none" });
  }
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
  save.startedAt = new Date().toISOString();
  save.lastPlayedAt = save.startedAt;
  save.stats = {
    recruitedCount: 0,
    successionCount: 0,
    leaderLineage: [
      {
        id: save.founder.id,
        name: save.founder.name,
        role: save.founder.role,
        startedAt: formatTime(save.sect),
        ageAtStart: save.founder.age
      }
    ]
  };
  save.log = [`${save.sect.name} 개파`];

  await writeSave(save);
  renderGame(save, options);
}

async function boot() {
  try {
    const saved = await readSave();

    if (saved) {
      const normalized = normalizeSave(saved);
      if (normalized.ended) {
        await storeEndedRecord(normalized);
        clearSave();
        currentSave = null;
        await syncCurrentSave();
        showWelcome({ historyMode: "replace" });
        return;
      }
      await writeSave(normalized);
      if (
        history.state?.view === "welcome" &&
        sessionStorage.getItem(WELCOME_LOCK_KEY) === (normalized.startedAt ?? "")
      ) {
        currentSave = normalized;
        currentRecords = await readRecords();
        showWelcome({ historyMode: "replace" });
        return;
      }
      renderGame(normalized, { historyMode: "replace" });
      return;
    }
  } catch {
    localStorage.removeItem(SAVE_KEY);
  }

  returnToWelcome({ historyMode: "replace" });
}

function beginNewGameFlow({ confirmExisting = true } = {}) {
  if (
    confirmExisting &&
    currentSave &&
    !currentSave.ended &&
    !confirm("기존 저장을 삭제하고 새 게임을 시작할까요?")
  ) {
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
}

newGameButton.addEventListener("click", () => {
  beginNewGameFlow();
});

endingReturnWelcomeButton.addEventListener("click", () => {
  returnToWelcome({ historyMode: "push" });
});
endingReturnRecordsButton.addEventListener("click", async () => {
  if (currentSave?.ended) {
    await storeEndedRecord(currentSave);
  }
  currentRecords = await readRecords();
  renderRecords({ historyMode: "push" });
});

returnWelcomeButton.addEventListener("click", () => {
  returnToWelcome({ historyMode: "push" });
});

continueGameButton.addEventListener("click", () => {
  if (currentSave) {
    renderGame(currentSave, { historyMode: "push" });
  }
});
viewRecordsButton.addEventListener("click", () => {
  renderRecords({ historyMode: "push" });
});
recordsReturnWelcomeButton.addEventListener("click", () => {
  returnToWelcome({ historyMode: "push" });
});
clearRecordsButton.addEventListener("click", () => {
  clearRecords().catch(() => {});
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
endTurnButton.addEventListener("click", () => {
  advanceTurn().catch(() => {});
});
openCheatsButton.addEventListener("click", () => {
  openCheats();
});
closeCheatsButton.addEventListener("click", () => {
  closeCheats({ historyMode: "back" });
});

document.querySelectorAll("[data-cheat-action]").forEach((button) => {
  button.addEventListener("click", () => {
    runCheat(button.dataset.cheatAction).catch(() => {});
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

recruitmentModal.addEventListener("click", (event) => {
  if (event.target === recruitmentModal) {
    closeRecruitment({ historyMode: "back" });
  }
});

cheatModal.addEventListener("click", (event) => {
  if (event.target === cheatModal) {
    closeCheats({ historyMode: "back" });
  }
});

window.addEventListener("popstate", (event) => {
  if (!cheatModal.hidden) {
    closeCheats();
    return;
  }

  if (!founderModal.hidden) {
    closeFounderModal();
    return;
  }

  if (!recruitmentModal.hidden) {
    closeRecruitment();
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
      if (event.state?.modal === "recruitment") {
        recruitmentModalHistoryOpen = true;
        openRecruitment({ historyMode: "none" });
      }
      if (event.state?.modal === "cheats") {
        cheatModalHistoryOpen = true;
        openCheats({ historyMode: "none" });
      }
      return;
    }

    returnToWelcome({ historyMode: "none" });
    return;
  }

  if (view === "ending") {
    if (currentSave?.ended) {
      renderEnding(currentSave, { historyMode: "none" });
      return;
    }

    returnToWelcome({ historyMode: "none" });
    return;
  }

  if (view === "records") {
    renderRecords({ historyMode: "none" });
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
