const welcomeView = document.querySelector("#welcomeView");
const characterCreationView = document.querySelector("#characterCreationView");
const founderView = document.querySelector("#founderView");
const gameView = document.querySelector("#gameView");
const endingView = document.querySelector("#endingView");
const recordsView = document.querySelector("#recordsView");
const continueGameButton = document.querySelector("#continueGame");
const viewRecordsButton = document.querySelector("#viewRecords");
const newGameButton = document.querySelector("#newGame");
const deploymentMeta = document.querySelector("#deploymentMeta");
const characterForm = document.querySelector("#characterForm");
const characterPortraitOptions = document.querySelector("#characterPortraitOptions");
const characterNameInput = document.querySelector("#characterName");
const randomCharacterNameButton = document.querySelector("#randomCharacterName");
const weaponOptions = document.querySelector("#weaponOptions");
const founderForm = document.querySelector("#founderForm");
const portraitOptions = document.querySelector("#portraitOptions");
const sectNameInput = document.querySelector("#sectNameInput");
const randomSectNameButton = document.querySelector("#randomSectName");
const founderNameInput = document.querySelector("#founderName");
const randomNameButton = document.querySelector("#randomName");
const returnWelcomeButton = document.querySelector("#returnWelcome");
const saveState = document.querySelector("#saveState");
const sectContextLabel = document.querySelector("#sectContextLabel");
const sectName = document.querySelector("#sectName");
const seasonText = document.querySelector("#seasonText");
const mainStatus = document.querySelector("#mainStatus");
const founderCard = document.querySelector("#founderCard");
const founderPortrait = document.querySelector("#founderPortrait");
const founderRoleKicker = document.querySelector("#founderRoleKicker");
const founderRoleBadge = document.querySelector("#founderRoleBadge");
const founderNameDisplay = document.querySelector("#founderNameDisplay");
const founderMeta = document.querySelector("#founderMeta");
const memberListTitle = document.querySelector("#memberListTitle");
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
const endingKicker = document.querySelector("#endingKicker");
const endingTitle = document.querySelector("#endingTitle");
const endingSummary = document.querySelector("#endingSummary");
const endingStats = document.querySelector("#endingStats");
const endingReturnRecordsButton = document.querySelector("#endingReturnRecords");
const endingReturnWelcomeButton = document.querySelector("#endingReturnWelcome");
const clearRecordsButton = document.querySelector("#clearRecords");
const recordsList = document.querySelector("#recordsList");
const recordsReturnWelcomeButton = document.querySelector("#recordsReturnWelcome");

const APP_VERSION = "v80";
const DEPLOYED_AT = "2026. 5. 22. 오전 8:53:31";
const SAVE_KEY = "munpaweb:save:local";
const RECORDS_KEY = "munpaweb:records:local";
const WELCOME_LOCK_KEY = "munpaweb:welcomeSaveStartedAt";
const DESKTOP_LAYOUT_WIDTH = 1920;
const DESKTOP_LAYOUT_HEIGHT = 1080;
const DESKTOP_LAYOUT_QUERY = "(min-width: 1024px)";
const FOUNDER_AGE = 35;
const STARTING_CHARACTER_AGE = 18;
const MAX_LIFESPAN = 120;
const CANDIDATE_LIFESPAN = 80;
const STARTING_HEALTH = 100;
const WANDERER_SECT_NAME = "무명 여정";
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

const candidateNamePools = {
  male: ["무겸", "하겸", "도윤", "서진", "태윤", "지후", "건우", "현준"],
  female: ["소율", "아린", "하린", "서연", "유하", "지아", "나린", "채윤"]
};

const portraits = [
  {
    id: "character-style-k-modern-male-street-martial",
    image: "./assets/style-exploration/characters/character-style-k-modern-male-street-martial.png",
    namePool: "male",
    colors: {
      face: "#d1a57f",
      hair: "#171719",
      robe: "#1f2730",
      robeDark: "#111820",
      bgA: "#d8dde2",
      bgB: "#667481"
    }
  },
  {
    id: "character-style-n-modern-female-techwear",
    image: "./assets/style-exploration/characters/character-style-n-modern-female-techwear.png",
    namePool: "female",
    colors: {
      face: "#d3a68c",
      hair: "#211b24",
      robe: "#24313a",
      robeDark: "#111a20",
      bgA: "#dfe4e7",
      bgB: "#63707b"
    }
  }
];

const discipleGenders = ["male", "female"];
const disciplePortraitAgeStages = [
  { age: 8, file: "age-08.png" },
  { age: 16, file: "age-16.png" },
  { age: 30, file: "age-30s.png" },
  { age: 50, file: "age-50s.png" },
  { age: 70, file: "age-70s.png" }
];
const disciplePortraitGroups = {
  male: {
    base: "disciple-male-01",
    colors: { face: "#d7b082", hair: "#171b16", robe: "#45634e", robeDark: "#273b2f", bgA: "#e7eadb", bgB: "#9aae8a" }
  },
  female: {
    base: "disciple-female-01",
    colors: { face: "#d7a98d", hair: "#231923", robe: "#8a5969", robeDark: "#543642", bgA: "#eee1e4", bgB: "#b98796" }
  }
};
const disciplePortraits = discipleGenders.flatMap((gender) =>
  disciplePortraitAgeStages.map((stage, index) => {
    const group = disciplePortraitGroups[gender];
    return {
      id: `disciple-${gender}-${String(index + 1).padStart(2, "0")}`,
      image: `./assets/portraits/disciples/${group.base}/${stage.file}`,
      gender,
      age: stage.age,
      colors: group.colors
    };
  })
);

const allPortraits = [...portraits, ...disciplePortraits];

const sectNames = ["청운문", "월영문", "백하문", "무결문", "비연문", "창송문", "한화문", "천류문"];
const startingWeapons = [
  {
    id: "sword",
    name: "검",
    unlocked: true,
    trait: "균형",
    summary: "초식과 대응이 고르게 잡힌 입문 무공입니다.",
    stats: ["완력", "반응성", "집중력"]
  },
  {
    id: "fist",
    name: "권법",
    unlocked: true,
    trait: "근접",
    summary: "거리를 좁혀 압박하고 버티는 싸움에 강합니다.",
    stats: ["생명력", "완력", "순발력"]
  },
  {
    id: "staff",
    name: "봉",
    unlocked: true,
    trait: "제어",
    summary: "간격을 유지하며 상대의 진입을 끊는 무공입니다.",
    stats: ["기동성", "집중력", "완력"]
  },
  {
    id: "blade",
    name: "도",
    unlocked: false,
    trait: "폭발",
    summary: "한 번의 큰 틈을 노리는 공격적인 무공입니다.",
    stats: ["완력", "순발력"]
  },
  {
    id: "spear",
    name: "창",
    unlocked: false,
    trait: "거리",
    summary: "긴 리치와 선공권으로 전장을 넓게 씁니다.",
    stats: ["기동성", "반응성"]
  },
  {
    id: "hidden",
    name: "암기",
    unlocked: false,
    trait: "변칙",
    summary: "조건을 만들고 허를 찌르는 기습형 무공입니다.",
    stats: ["집중력", "매력", "순발력"]
  }
];

const newGameSeed = {
  runMode: "sect",
  sect: {
    name: sectNames[0],
    foundedYear: 1,
    season: "봄",
    seasonIndex: 0
  },
  founder: null,
  disciples: [],
  recruitment: {
    candidates: [],
    acceptedCandidates: []
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
let selectedWeaponId = startingWeapons.find((weapon) => weapon.unlocked)?.id ?? startingWeapons[0].id;
let currentSave = null;
let currentRecords = [];
let activeView = null;
let characterNameTouched = false;
let founderNameTouched = false;
let pendingRecruitment = null;
let activeRecruitmentIndex = 0;
let founderModalHistoryOpen = false;
let activeDetailDiscipleId = null;
let recruitmentModalHistoryOpen = false;
let cheatModalHistoryOpen = false;

function updateAppScale() {
  if (!window.matchMedia(DESKTOP_LAYOUT_QUERY).matches) {
    document.documentElement.style.setProperty("--app-scale", "1");
    return;
  }

  const scale = Math.min(
    window.innerWidth / DESKTOP_LAYOUT_WIDTH,
    window.innerHeight / DESKTOP_LAYOUT_HEIGHT
  );

  document.documentElement.style.setProperty("--app-scale", Math.max(scale, 0.1).toFixed(4));
}

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
    portrait: founder.portrait ?? portraits[0].id,
    weaponId: founder.weaponId ?? null,
    origin: founder.origin ?? null
  };
}

function normalizeDiscipleGender(gender, portraitId) {
  if (discipleGenders.includes(gender)) {
    return gender;
  }
  if (typeof portraitId === "string" && portraitId.includes("female")) {
    return "female";
  }
  return "male";
}

function getDisciplePortraitAge(age) {
  if (age <= 12) {
    return 8;
  }
  if (age <= 20) {
    return 16;
  }
  if (age <= 40) {
    return 30;
  }
  if (age <= 60) {
    return 50;
  }
  return 70;
}

function getDisciplePortraitId(gender, age) {
  const normalizedGender = normalizeDiscipleGender(gender);
  const portraitAge = getDisciplePortraitAge(age);
  const portraitIndex = Math.max(0, disciplePortraitAgeStages.findIndex((stage) => stage.age === portraitAge));
  return `disciple-${normalizedGender}-${String(portraitIndex + 1).padStart(2, "0")}`;
}

function getPortraitImage(portrait, age = null) {
  if (!Number.isFinite(age) || !Array.isArray(portrait.ageImages)) {
    return portrait.image;
  }

  const ageImage = portrait.ageImages
    .filter((item) => age >= item.age)
    .at(-1);

  return ageImage?.image ?? portrait.image;
}

function normalizeDisciple(disciple = {}) {
  const health = Number.isFinite(disciple.health) ? disciple.health : STARTING_HEALTH;
  const age = Number.isFinite(disciple.age) ? disciple.age : 10;
  const gender = normalizeDiscipleGender(disciple.gender, disciple.portrait);

  return {
    id: disciple.id ?? crypto.randomUUID(),
    name: disciple.name ?? "이름 없는 제자",
    age,
    lifespan: Number.isFinite(disciple.lifespan) ? disciple.lifespan : MAX_LIFESPAN,
    health,
    dead: Boolean(disciple.dead) || health <= 0,
    stage: disciple.stage ?? "입문",
    trait: disciple.trait ?? "평범",
    gender,
    portrait: getDisciplePortraitId(gender, age)
  };
}

function normalizeSave(save) {
  const migrated = cloneSeed();
  migrated.runMode = save?.runMode ?? (save?.founder?.role === "무명 무인" ? "wanderer" : "sect");
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
    candidates: normalizeRecruitmentCandidates(save?.recruitment?.candidates),
    acceptedCandidates: normalizeAcceptedCandidates(save?.recruitment?.acceptedCandidates)
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
  characterCreationView.hidden = true;
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

function showCharacterCreation({ historyMode = "push" } = {}) {
  activeView = "character";
  welcomeView.hidden = true;
  characterCreationView.hidden = false;
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

function showFounderCreation({ historyMode = "push" } = {}) {
  activeView = "founder";
  welcomeView.hidden = true;
  characterCreationView.hidden = true;
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
  characterCreationView.hidden = true;
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
  characterCreationView.hidden = true;
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
  characterCreationView.hidden = true;
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

function applyPortraitColors(element, portraitId, age = null) {
  const portrait = allPortraits.find((item) => item.id === portraitId) ?? portraits[0];
  element.style.setProperty("--face", portrait.colors.face);
  element.style.setProperty("--hair", portrait.colors.hair);
  element.style.setProperty("--robe", portrait.colors.robe);
  element.style.setProperty("--robe-dark", portrait.colors.robeDark);
  element.style.setProperty("--bg-a", portrait.colors.bgA);
  element.style.setProperty("--bg-b", portrait.colors.bgB);

  const image = getPortraitImage(portrait, age);

  if (image) {
    element.style.setProperty("--portrait-image", `url("${image}")`);
    element.classList.add("portrait-image");
  } else {
    element.style.removeProperty("--portrait-image");
    element.classList.remove("portrait-image");
  }
}

function createPortraitPreview(portraitId, age = null) {
  const preview = document.createElement("span");
  preview.className = "portrait";
  applyPortraitColors(preview, portraitId, age);
  return preview;
}

function createFounderAgePreview(portrait) {
  const stages = [
    { label: "시작", age: FOUNDER_AGE },
    ...(portrait.ageImages ?? []).map((item) => ({
      label: `${item.age}대`,
      age: item.age
    }))
  ];

  const previewList = document.createElement("span");
  previewList.className = "portrait-life-preview";
  previewList.setAttribute("aria-hidden", "true");

  previewList.replaceChildren(
    ...stages.map((stage) => {
      const item = document.createElement("span");
      item.className = "portrait-age-card";

      const label = document.createElement("span");
      label.className = "portrait-age-label";
      label.textContent = stage.label;

      item.append(createPortraitPreview(portrait.id, stage.age), label);
      return item;
    })
  );

  return previewList;
}

function createSelectedPortraitPreview(portrait) {
  const previewPanel = document.createElement("div");
  previewPanel.className = "portrait-selected-preview";
  previewPanel.setAttribute("aria-label", "선택한 개파조사 나이별 초상화 미리보기");

  previewPanel.append(createFounderAgePreview(portrait));
  return previewPanel;
}

function createSelectedCharacterPortraitPreview(portrait) {
  const previewPanel = document.createElement("div");
  previewPanel.className = "portrait-selected-preview character-portrait-preview";
  previewPanel.setAttribute("aria-label", "선택한 캐릭터 초상화 미리보기");

  const previewList = document.createElement("span");
  previewList.className = "portrait-life-preview";
  previewList.setAttribute("aria-hidden", "true");

  const item = document.createElement("span");
  item.className = "portrait-age-card";

  const label = document.createElement("span");
  label.className = "portrait-age-label";
  label.textContent = "선택";

  item.append(createPortraitPreview(portrait.id), label);
  previewList.append(item);
  previewPanel.append(previewList);
  return previewPanel;
}

function keepSelectedPortraitInView(container = portraitOptions) {
  if (!window.matchMedia("(max-width: 420px)").matches) {
    return;
  }

  requestAnimationFrame(() => {
    container
      .querySelector(".portrait-selected-preview")
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  });
}

function renderCharacterPortraitOptions() {
  const selectedPortrait = portraits.find((portrait) => portrait.id === selectedPortraitId) ?? portraits[0];

  characterPortraitOptions.replaceChildren(
    ...portraits.map((portrait) => {
      const isSelected = portrait.id === selectedPortraitId;
      const button = document.createElement("button");
      button.className = `portrait-option${isSelected ? " is-selected" : ""}`;
      button.type = "button";
      button.setAttribute("aria-pressed", String(isSelected));
      button.setAttribute("aria-label", `${portrait.namePool === "female" ? "여성" : "남성"} 캐릭터 초상화`);

      button.append(createPortraitPreview(portrait.id));
      button.addEventListener("click", () => {
        selectedPortraitId = portrait.id;
        if (!characterNameTouched) {
          pickRandomCharacterName();
        }
        renderCharacterPortraitOptions();
        keepSelectedPortraitInView(characterPortraitOptions);
      });

      return button;
    }),
    createSelectedCharacterPortraitPreview(selectedPortrait)
  );
}

function renderPortraitOptions() {
  const selectedPortrait = portraits.find((portrait) => portrait.id === selectedPortraitId) ?? portraits[0];

  portraitOptions.replaceChildren(
    ...portraits.map((portrait) => {
      const isSelected = portrait.id === selectedPortraitId;
      const button = document.createElement("button");
      button.className = `portrait-option${isSelected ? " is-selected" : ""}`;
      button.type = "button";
      button.setAttribute("aria-pressed", String(isSelected));
      button.setAttribute("aria-label", `${portrait.namePool === "female" ? "여성" : "남성"} 개파조사 초상화`);

      button.append(createPortraitPreview(portrait.id));
      button.addEventListener("click", () => {
        selectedPortraitId = portrait.id;
        if (!founderNameTouched) {
          pickRandomName();
        }
        renderPortraitOptions();
        keepSelectedPortraitInView(portraitOptions);
      });

      return button;
    }),
    createSelectedPortraitPreview(selectedPortrait)
  );
}

function getWeaponById(weaponId) {
  return startingWeapons.find((weapon) => weapon.id === weaponId) ?? startingWeapons[0];
}

function renderWeaponOptions() {
  const fallbackWeapon = startingWeapons.find((weapon) => weapon.unlocked) ?? startingWeapons[0];
  const selectedWeapon = getWeaponById(selectedWeaponId);
  if (!selectedWeapon.unlocked) {
    selectedWeaponId = fallbackWeapon.id;
  }

  weaponOptions.replaceChildren(
    ...startingWeapons.map((weapon) => {
      const isSelected = weapon.id === selectedWeaponId;
      const button = document.createElement("button");
      button.className = `weapon-option${isSelected ? " is-selected" : ""}${weapon.unlocked ? "" : " is-locked"}`;
      button.type = "button";
      button.disabled = !weapon.unlocked;
      button.setAttribute("aria-pressed", String(isSelected));

      const header = document.createElement("span");
      header.className = "weapon-header";

      const name = document.createElement("strong");
      name.textContent = weapon.name;

      const badge = document.createElement("span");
      badge.className = weapon.unlocked ? "weapon-badge" : "weapon-badge lock-badge";
      badge.textContent = weapon.unlocked ? weapon.trait : "잠김";

      header.append(name, badge);

      const summary = document.createElement("span");
      summary.className = "weapon-summary";
      summary.textContent = weapon.summary;

      const meta = document.createElement("span");
      meta.className = "weapon-meta";
      meta.textContent = `연관 스탯: ${weapon.stats.join(", ")}`;

      button.append(header, summary, meta);
      button.addEventListener("click", () => {
        if (!weapon.unlocked) {
          return;
        }
        selectedWeaponId = weapon.id;
        renderWeaponOptions();
      });

      return button;
    })
  );
}

function pickRandomCharacterName() {
  const portrait = portraits.find((item) => item.id === selectedPortraitId) ?? portraits[0];
  const names = founderNamePools[portrait.namePool] ?? founderNamePools.male;
  const name = names[Math.floor(Math.random() * names.length)];
  characterNameInput.value = name;
  characterNameTouched = false;
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

function pickCandidateName(gender, excludedNames = []) {
  const names = candidateNamePools[gender] ?? candidateNamePools.male;
  const availableNames = names.filter((name) => !excludedNames.includes(name));
  const pool = availableNames.length > 0 ? availableNames : names;
  return pool[Math.floor(Math.random() * pool.length)];
}

function isCandidateNameForGender(name, gender) {
  return (candidateNamePools[gender] ?? []).includes(name);
}

function clampAge(age) {
  return Math.max(8, Number(age) || 8);
}

function createCandidates(count = 2) {
  const usedNames = [];
  return Array.from({ length: count }, (_, index) => {
    const gender = discipleGenders[index % discipleGenders.length];
    const age = 8 + Math.floor(Math.random() * 5);
    const name = pickCandidateName(gender, usedNames);
    usedNames.push(name);
    return normalizeCandidate({
      id: crypto.randomUUID(),
      name,
      age,
      lifespan: CANDIDATE_LIFESPAN,
      health: STARTING_HEALTH,
      gender,
      decision: "defer"
    });
  });
}

function normalizeCandidate(candidate) {
  const age = clampAge(candidate.age);
  const gender = normalizeDiscipleGender(candidate.gender, candidate.portrait);

  return {
    id: candidate.id ?? crypto.randomUUID(),
    name: candidate.name ?? "이름 없는 후보",
    age,
    lifespan: Number.isFinite(candidate.lifespan) ? candidate.lifespan : CANDIDATE_LIFESPAN,
    health: Number.isFinite(candidate.health) ? candidate.health : STARTING_HEALTH,
    gender,
    portrait: getDisciplePortraitId(gender, age),
    decision: ["defer", "reject", "accept"].includes(candidate.decision) ? candidate.decision : "defer"
  };
}

function normalizeRecruitmentCandidates(candidates) {
  if (!Array.isArray(candidates)) {
    return createCandidates();
  }

  const usedNames = [];
  return candidates.map((candidate, index) => {
    const gender = normalizeDiscipleGender(candidate.gender, candidate.portrait) ?? discipleGenders[index % discipleGenders.length];
    const name = isCandidateNameForGender(candidate.name, gender)
      ? candidate.name
      : pickCandidateName(gender, usedNames);
    usedNames.push(name);

    return normalizeCandidate({
      ...candidate,
      id: candidate.id ?? crypto.randomUUID(),
      name,
      age: Number.isFinite(candidate.age) ? candidate.age : 8 + Math.floor(Math.random() * 5),
      gender,
      lifespan: Number.isFinite(candidate.lifespan) ? candidate.lifespan : CANDIDATE_LIFESPAN,
      health: Number.isFinite(candidate.health) ? candidate.health : STARTING_HEALTH,
      decision: candidate.decision ?? "defer"
    });
  });
}

function normalizeAcceptedCandidates(candidates) {
  return Array.isArray(candidates) ? candidates.map(normalizeCandidate) : [];
}

function createDiscipleFromCandidate(candidate) {
  return {
    id: candidate.id,
    name: candidate.name,
    age: candidate.age,
    lifespan: candidate.lifespan,
    health: STARTING_HEALTH,
    gender: candidate.gender,
    portrait: getDisciplePortraitId(candidate.gender, candidate.age),
    dead: false,
    stage: "입문",
    trait: "신입"
  };
}

function admitAcceptedCandidates() {
  const acceptedCandidates = currentSave.recruitment.acceptedCandidates ?? [];
  if (acceptedCandidates.length === 0) {
    return;
  }

  currentSave.disciples.push(...acceptedCandidates.map(createDiscipleFromCandidate));
  currentSave.stats.recruitedCount += acceptedCandidates.length;
  acceptedCandidates.forEach((candidate) => {
    currentSave.log.push(`제자 모집: ${candidate.name} 입문`);
  });
  currentSave.recruitment.acceptedCandidates = [];
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

function isWandererRun(save = currentSave) {
  return save?.runMode === "wanderer";
}

function renderGame(save, options = {}) {
  sessionStorage.removeItem(WELCOME_LOCK_KEY);
  currentSave = normalizeSave(save);
  admitAcceptedCandidates();

  if (currentSave.ended) {
    renderEnding(currentSave, options);
    return;
  }

  const wandererRun = isWandererRun(currentSave);
  const weapon = wandererRun ? getWeaponById(currentSave.founder.weaponId) : null;

  sectContextLabel.textContent = wandererRun ? "현재 여정" : "현재 문파";
  sectName.textContent = currentSave.sect.name;
  seasonText.textContent = formatTime(currentSave.sect);
  mainStatus.textContent = wandererRun
    ? `${formatTime(currentSave.sect)} 현재 수련 상황`
    : `${formatTime(currentSave.sect)} 현재 문파 상황`;
  saveState.textContent = currentSave.savedAt
    ? `저장됨 ${new Date(currentSave.savedAt).toLocaleString()}`
    : "새 게임";

  applyPortraitColors(founderPortrait, currentSave.founder.portrait, currentSave.founder.age);
  founderCard.setAttribute("aria-label", `${currentSave.founder.name} 상세 정보 열기`);
  founderRoleKicker.textContent = wandererRun ? "주인공" : currentSave.founder.role;
  founderRoleBadge.textContent = wandererRun ? (weapon?.name ?? "무공 미정") : "장문인";
  founderNameDisplay.textContent = currentSave.founder.name;
  const healthText = document.createElement("span");
  healthText.className = `health-chip health-${getHealthTone(currentSave.founder.health)}`;
  healthText.textContent = `건강 ${currentSave.founder.health}`;
  founderMeta.replaceChildren(`${currentSave.founder.age}세 · `, healthText);

  memberListTitle.textContent = wandererRun ? "동료" : "제자";
  openRecruitmentButton.hidden = wandererRun;
  if (wandererRun) {
    recruitmentModal.hidden = true;
    recruitmentModalHistoryOpen = false;
  }
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
  const wandererRun = isWandererRun(currentSave);
  const freshStats = createEndingStats(currentSave.ended?.reason ?? "문파 내에 살아있는 사람이 없습니다.");
  const stats = {
    ...freshStats,
    ...(currentSave.ended?.stats ?? {}),
    eventCount: freshStats.eventCount,
    majorEvents: freshStats.majorEvents
  };
  const lineage = stats.leaderLineage ?? currentSave.stats.leaderLineage ?? [];
  const majorEvents = stats.majorEvents ?? [];

  endingKicker.textContent = wandererRun ? "여정 종료" : "문파 멸망";
  endingTitle.textContent = wandererRun ? `${currentSave.founder.name}의 여정 종료` : `${currentSave.sect.name} 멸망`;
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
      title.textContent = record.save?.runMode === "wanderer"
        ? `${record.save.founder?.name ?? record.sectName} 여정 종료`
        : `${record.sectName} 멸망`;

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

function createDiscipleCard(disciple) {
  const card = document.createElement("button");
  card.className = "disciple-card";
  card.type = "button";
  card.setAttribute("aria-label", `${disciple.name} 상세 정보 열기`);
  card.addEventListener("click", () => {
    openDiscipleModal(disciple.id);
  });

  const portrait = document.createElement("div");
  portrait.className = "portrait portrait-small disciple-portrait";
  applyPortraitColors(portrait, disciple.portrait);

  const identity = document.createElement("div");
  identity.className = "disciple-identity";

  const name = document.createElement("strong");
  name.textContent = disciple.name;

  const meta = document.createElement("span");
  meta.textContent = `${disciple.age}세 · ${disciple.stage} · ${disciple.trait}`;

  identity.append(name, meta);
  card.append(portrait, identity);
  return card;
}

function renderDisciples() {
  if (currentSave.disciples.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = isWandererRun() ? "아직 동료가 없습니다." : "아직 제자가 없습니다.";
    discipleList.replaceChildren(empty);
    return;
  }

  discipleList.replaceChildren(
    ...currentSave.disciples.map(createDiscipleCard)
  );
}

function renderCharacterDetail(character, { title = character.role ?? "상세 정보", role = character.role ?? "인물", badge = "" } = {}) {
  founderModalTitle.textContent = title;

  const profile = document.createElement("article");
  profile.className = "founder-card detail-character";

  const portrait = document.createElement("div");
  portrait.className = "portrait portrait-small";
  applyPortraitColors(portrait, character.portrait, character.age);

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
  activeDetailDiscipleId = null;
  const weapon = isWandererRun() ? getWeaponById(currentSave.founder.weaponId) : null;
  renderCharacterDetail(currentSave.founder, {
    title: isWandererRun() ? "캐릭터 상세" : currentSave.founder.role,
    role: isWandererRun() ? "주인공" : currentSave.founder.role,
    badge: isWandererRun() ? (weapon?.name ?? "") : "장문인"
  });
}

function renderDiscipleDetail(discipleId) {
  const disciple = currentSave.disciples.find((item) => item.id === discipleId);
  if (!disciple) {
    renderFounderDetail();
    return false;
  }

  activeDetailDiscipleId = disciple.id;
  renderCharacterDetail(disciple, {
    title: "제자 상세",
    role: disciple.stage ?? "제자",
    badge: disciple.trait ?? ""
  });
  return true;
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

  return ["개파", "수련 시작", "제자 모집", "장문인 승계", "사망", "멸망", "종료"].some((keyword) =>
    entry.includes(keyword)
  );
}

function endSect(reason) {
  const endingKeyword = isWandererRun() ? "여정 종료" : "멸망";
  currentSave.ended = {
    reason,
    endedAt: new Date().toISOString(),
    stats: createEndingStats(reason)
  };
  currentSave.log.push(`${currentSave.sect.name} ${endingKeyword}: ${reason}`);
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
  if (isWandererRun()) {
    if (currentSave.founder.dead || currentSave.founder.health <= 0) {
      endSect(`${currentSave.founder.name}이 사망했습니다.`);
    }
    return;
  }

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

function openDiscipleModal(discipleId, { historyMode = "push" } = {}) {
  if (!renderDiscipleDetail(discipleId)) {
    return;
  }

  founderModal.classList.remove("stacked-modal");
  founderModal.hidden = false;

  if (historyMode === "push" && !founderModalHistoryOpen) {
    founderModalHistoryOpen = true;
    history.pushState({ view: "game", modal: "disciple", discipleId }, "", location.href);
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

  activeDetailDiscipleId = null;
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
  currentSave.disciples.push(createDiscipleFromCandidate(candidate));
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
    currentSave.disciples = currentSave.disciples.map((disciple) => {
      const age = disciple.age + 1;
      const gender = normalizeDiscipleGender(disciple.gender, disciple.portrait);
      return {
        ...disciple,
        age,
        gender,
        portrait: getDisciplePortraitId(gender, age)
      };
    });
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

  admitAcceptedCandidates();
  if (currentSave.recruitment.candidates.length === 0) {
    currentSave.recruitment.candidates = createCandidates();
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
  save.runMode = options.runMode ?? "sect";
  save.sect.name = sectNameValue;
  save.founder = {
    id: "founder",
    name: founderName,
    age: options.age ?? FOUNDER_AGE,
    lifespan: options.lifespan ?? MAX_LIFESPAN,
    health: STARTING_HEALTH,
    role: options.role ?? "개파조사",
    portrait: selectedPortraitId,
    weaponId: options.weaponId ?? null,
    origin: options.origin ?? null
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
  save.log = [options.openingLog ?? `${save.sect.name} 개파`];

  await writeSave(save);
  renderGame(save, options);
}

async function startCharacterRun(characterName, weaponId, options = {}) {
  const weapon = getWeaponById(weaponId);

  await startNewGame(characterName, WANDERER_SECT_NAME, {
    ...options,
    runMode: "wanderer",
    role: "무명 무인",
    age: STARTING_CHARACTER_AGE,
    lifespan: CANDIDATE_LIFESPAN,
    weaponId: weapon.id,
    origin: "무소속",
    openingLog: `${characterName} ${weapon.name} 수련 시작`
  });
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
  selectedWeaponId = startingWeapons.find((weapon) => weapon.unlocked)?.id ?? startingWeapons[0].id;
  characterNameTouched = false;
  founderNameTouched = false;
  pickRandomCharacterName();
  renderCharacterPortraitOptions();
  renderWeaponOptions();
  showCharacterCreation({ historyMode: "push" });
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

randomCharacterNameButton.addEventListener("click", pickRandomCharacterName);
characterNameInput.addEventListener("input", () => {
  characterNameTouched = true;
});
characterForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const fallbackPortrait = portraits.find((item) => item.id === selectedPortraitId) ?? portraits[0];
  const fallbackNames = founderNamePools[fallbackPortrait.namePool] ?? founderNamePools.male;
  const characterName = characterNameInput.value.trim() || fallbackNames[0];

  startCharacterRun(characterName, selectedWeaponId, { historyMode: "replace" }).catch(() => {
    showCharacterCreation({ historyMode: "replace" });
  });
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
      if (event.state?.modal === "disciple") {
        founderModalHistoryOpen = true;
        openDiscipleModal(event.state.discipleId, { historyMode: "none" });
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

  if (view === "character") {
    showCharacterCreation({ historyMode: "none" });
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

updateAppScale();
window.addEventListener("resize", updateAppScale);
window.visualViewport?.addEventListener("resize", updateAppScale);

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
