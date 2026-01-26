import { useState } from "react";
import { Link } from "react-router-dom";
import { defaultSettings, getSettings, setSettings } from "../lib/storage";

export default function Settings() {
  const current = getSettings();
  const [webhookUrl, setWebhookUrl] = useState(current.webhookUrl);
  const [targetSampleRate, setTargetSampleRate] = useState(current.targetSampleRate);
  const [username, setUsername] = useState(current.username || "");
  const [password, setPassword] = useState(current.password || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSettings({
      webhookUrl: webhookUrl.trim() || defaultSettings.webhookUrl,
      targetSampleRate: targetSampleRate.trim(),
      username: username.trim(),
      password: password,
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
            <p className="text-sm text-slate-500">Webhook und Metadaten fuer Uploads.</p>
          </div>
          <div className="flex items-center gap-2">
            {saved ? (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Gespeichert
              </span>
            ) : null}
            <Link
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:border-slate-300"
              to="/Recorder"
            >
              Recorder
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-slate-600">
            Basic Auth Username
            <input
              className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-slate-400 focus:outline-none"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Benutzername"
              type="text"
              autoComplete="username"
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-600">
            Basic Auth Passwort
            <input
              className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-slate-400 focus:outline-none"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Passwort"
              type="password"
              autoComplete="current-password"
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-600">
            Webhook URL
            <input
              className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-slate-400 focus:outline-none"
              value={webhookUrl}
              onChange={(event) => setWebhookUrl(event.target.value)}
              placeholder={defaultSettings.webhookUrl}
              type="url"
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-600">
            Sample Rate (Ziel)
            <input
              className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-slate-400 focus:outline-none"
              value={targetSampleRate}
              onChange={(event) => setTargetSampleRate(event.target.value)}
              placeholder="auto"
              inputMode="numeric"
              type="text"
            />
          </label>
        </div>

        <button
          className="mt-6 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          onClick={handleSave}
          type="button"
        >
          Speichern
        </button>
      </div>
    </div>
  );
}
