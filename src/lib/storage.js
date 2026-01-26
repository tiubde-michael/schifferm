const STORAGE_KEY = "recorderSettings";

const defaultSettings = {
  webhookUrl: "https://n8n.ti-ub-ki.ddns.net/webhook/audio-upload",
  targetSampleRate: "",
  username: "",
  password: "",
};

export function getSettings() {
  if (typeof window === "undefined") {
    return { ...defaultSettings };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { ...defaultSettings };
    }
    const parsed = JSON.parse(raw);
    return { ...defaultSettings, ...parsed };
  } catch {
    return { ...defaultSettings };
  }
}

export function setSettings(nextSettings) {
  if (typeof window === "undefined") {
    return;
  }
  const merged = { ...defaultSettings, ...nextSettings };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
}

export { defaultSettings };
