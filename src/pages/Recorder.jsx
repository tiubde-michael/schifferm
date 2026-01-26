import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import UploadQueue from "../components/UploadQueue";
import { saveRecording, saveTextEntry, markAsUploaded } from "../lib/audioDB";
import { uploadRecording, uploadTextOnly } from "../lib/api";
import { getSettings } from "../lib/storage";

const STATUS = {
  idle: "Bereit",
  recording: "Aufnahme laeuft",
  paused: "Pausiert",
  uploading: "Upload laeuft",
  uploadFailed: "Upload fehlgeschlagen",
  uploadSuccess: "Upload erfolgreich",
  error: "Fehler",
};

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function buildFilename(mode, prefix, createdAt) {
  const safeTimestamp = createdAt.replace(/[:.]/g, "-");
  const safeMode = mode && mode !== "2 Personen" ? mode.replace(/\s+/g, "_") : "";
  const safePrefix = (prefix || "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9-_]/g, "");
  const base = `recording-${safeTimestamp}.webm`;
  const withPrefix = safePrefix ? `${safePrefix}-${base}` : base;
  return safeMode ? `${safeMode}-${withPrefix}` : withPrefix;
}

function buildTextLabel(mode, prefix, createdAt) {
  const safeTimestamp = createdAt.replace(/[:.]/g, "-");
  const safeMode = mode && mode !== "2 Personen" ? mode.replace(/\s+/g, "_") : "";
  const safePrefix = (prefix || "")
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9-_]/g, "");
  const base = `text-${safeTimestamp}`;
  const withPrefix = safePrefix ? `${safePrefix}-${base}` : base;
  return safeMode ? `${safeMode}-${withPrefix}` : withPrefix;
}

export default function Recorder() {
  const [status, setStatus] = useState(STATUS.idle);
  const [statusDetail, setStatusDetail] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [refreshToken, setRefreshToken] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [savedNotice, setSavedNotice] = useState(false);
  const [logs, setLogs] = useState([]);
  const [mode, setMode] = useState("2 Personen");
  const [hasAudioRecorded, setHasAudioRecorded] = useState(false);

  const [patient, setPatient] = useState("");
  const [dob, setDob] = useState("");
  const [topic, setTopic] = useState("");

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const startedAtRef = useRef(null);
  const accumulatedMsRef = useRef(0);
  const noticeTimerRef = useRef(null);

  const addLog = useCallback((message) => {
    setLogs((prev) => {
      const now = new Date();
      const next = [
        ...prev,
        { ts: now.toISOString(), localTs: now.toLocaleString(), message },
      ];
      return next.slice(-200);
    });
  }, []);

  useEffect(() => {
    if (!isRecording) {
      accumulatedMsRef.current = 0;
      startedAtRef.current = null;
      setElapsedSeconds(0);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (isPaused) {
      if (startedAtRef.current) {
        accumulatedMsRef.current += Date.now() - startedAtRef.current;
        startedAtRef.current = null;
      }
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    if (!startedAtRef.current) {
      startedAtRef.current = Date.now();
    }

    timerRef.current = window.setInterval(() => {
      const now = Date.now();
      const runningMs = startedAtRef.current ? now - startedAtRef.current : 0;
      const totalMs = accumulatedMsRef.current + runningMs;
      setElapsedSeconds(Math.floor(totalMs / 1000));
    }, 500);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPaused, isRecording]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
      if (noticeTimerRef.current) {
        window.clearTimeout(noticeTimerRef.current);
      }
    };
  }, []);

  const cleanupStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const attemptUpload = useCallback(async (recording) => {
    setIsUploading(true);
    setStatus(STATUS.uploading);
    setStatusDetail("");
    try {
      const settings = getSettings();
      const authMode = settings.username || settings.password ? "Basic Auth" : "Keine Auth";
      const authInfo = settings.username ? `user=${settings.username}` : "user=leer";
      addLog(`Upload start: ${recording.filename} (${authMode}, ${authInfo})`);
      if (recording.type === "text" || !recording.blob) {
        await uploadTextOnly(
          {
            patient: recording.patient,
            dob: recording.dob,
            topic: recording.topic,
            createdAt: recording.createdAt,
          },
          settings
        );
      } else {
        await uploadRecording(recording, settings);
      }
      await markAsUploaded(recording.id);
      setStatus(STATUS.uploadSuccess);
      addLog(`Upload OK: ${recording.filename}`);
      setRefreshToken((value) => value + 1);
      return true;
    } catch (error) {
      setStatus(STATUS.uploadFailed);
      const rawMessage = error?.message || "";
      const isAuthError = /401|403/.test(rawMessage);
      const message =
        rawMessage === "Failed to fetch"
          ? "Upload fehlgeschlagen. Netzwerk oder CORS-Blockierung."
          : isAuthError
            ? `Login fehlgeschlagen. ${rawMessage}`
            : rawMessage || "Upload fehlgeschlagen.";
      setStatusDetail(message);
      addLog(`Upload Fehler: ${recording.filename} - ${message}`);
      return false;
    } finally {
      setRefreshToken((value) => value + 1);
      setIsUploading(false);
    }
  }, [addLog]);

  const sendTextOnly = useCallback(async () => {
    const trimmedPatient = patient.trim();
    const trimmedDob = dob.trim();
    const trimmedTopic = topic.trim();
    if (!trimmedPatient && !trimmedDob && !trimmedTopic) {
      return;
    }
    const createdAt = new Date().toISOString();
    const settings = getSettings();
    const label = buildTextLabel(mode, settings.username, createdAt);
    const meta = {
      createdAt,
      filename: label,
      patient: trimmedPatient,
      dob: trimmedDob,
      topic: trimmedTopic,
      type: "text",
    };

    let id = null;
    try {
      id = await saveTextEntry(meta);
      setRefreshToken((value) => value + 1);
      addLog(`Text gespeichert lokal: ${label} (id ${id})`);
      setSavedNotice(true);
      if (noticeTimerRef.current) {
        window.clearTimeout(noticeTimerRef.current);
      }
      noticeTimerRef.current = window.setTimeout(() => setSavedNotice(false), 4000);
      setPatient("");
      setDob("");
      setTopic("");
    } catch (error) {
      setStatus(STATUS.error);
      setStatusDetail(error?.message || "Speichern fehlgeschlagen.");
      addLog(`Speichern fehlgeschlagen: ${error?.message || "unbekannt"}`);
      return;
    }

    await attemptUpload({
      id,
      blob: null,
      ...meta,
    });
  }, [addLog, attemptUpload, dob, mode, patient, topic]);

  const startRecording = useCallback(async () => {
    setStatusDetail("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setStatus(STATUS.error);
      setStatusDetail("Mikrofonzugriff wird nicht unterstuetzt.");
      return;
    }
    if (!window.MediaRecorder) {
      setStatus(STATUS.error);
      setStatusDetail("MediaRecorder wird nicht unterstuetzt.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const options = {};
      if (window.MediaRecorder?.isTypeSupported?.("audio/webm")) {
        options.mimeType = "audio/webm";
      }
      const recorder = new MediaRecorder(stream, options);

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onpause = () => {
        setIsPaused(true);
        setStatus(STATUS.paused);
      };

      recorder.onresume = () => {
        setIsPaused(false);
        setStatus(STATUS.recording);
      };

      recorder.onerror = (event) => {
        setStatus(STATUS.error);
        setStatusDetail(event.error?.message || "Fehler bei der Aufnahme.");
      };

      recorder.onstop = async () => {
        setIsRecording(false);
        setIsPaused(false);
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        chunksRef.current = [];
        cleanupStream();

        const createdAt = new Date().toISOString();
        const settings = getSettings();
        const filename = buildFilename(mode, settings.username, createdAt);
        const meta = {
          createdAt,
          filename,
          patient: patient.trim(),
          dob: dob.trim(),
          topic: topic.trim(),
          type: "audio",
        };

        let id = null;
        try {
          id = await saveRecording(blob, meta);
          setRefreshToken((value) => value + 1);
          addLog(`Gespeichert lokal: ${filename} (id ${id})`);
          setHasAudioRecorded(true);
          setSavedNotice(true);
          if (noticeTimerRef.current) {
            window.clearTimeout(noticeTimerRef.current);
          }
          noticeTimerRef.current = window.setTimeout(() => setSavedNotice(false), 4000);
          setPatient("");
          setDob("");
          setTopic("");
        } catch (error) {
          setStatus(STATUS.error);
          setStatusDetail(error?.message || "Speichern fehlgeschlagen.");
          addLog(`Speichern fehlgeschlagen: ${error?.message || "unbekannt"}`);
          return;
        }

        await attemptUpload({
          id,
          blob,
          ...meta,
        });
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setIsPaused(false);
      setStatus(STATUS.recording);
      addLog("Aufnahme gestartet");
    } catch (error) {
      setStatus(STATUS.error);
      setStatusDetail(error?.message || "Mikrofonzugriff fehlgeschlagen.");
      cleanupStream();
      addLog(`Start fehlgeschlagen: ${error?.message || "unbekannt"}`);
    }
  }, [addLog, attemptUpload, cleanupStream, dob, mode, patient, topic]);

  const stopRecording = useCallback(() => {
    if (!mediaRecorderRef.current) {
      return;
    }
    if (mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      addLog("Aufnahme gestoppt");
    }
  }, [addLog]);

  const pauseRecording = useCallback(() => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== "recording") {
      return;
    }
    mediaRecorderRef.current.pause();
    addLog("Aufnahme pausiert");
  }, [addLog]);

  const resumeRecording = useCallback(() => {
    if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== "paused") {
      return;
    }
    mediaRecorderRef.current.resume();
    addLog("Aufnahme fortgesetzt");
  }, [addLog]);

  const secureContext = window.isSecureContext;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Recorder</h1>
            <div className="mt-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Modus
              </label>
              <select
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                value={mode}
                onChange={(event) => setMode(event.target.value)}
              >
                <option>2 Personen</option>
                <option>Diktat</option>
                <option>Team</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700">
              {status}
            </div>
            <Link
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300"
              to="/Settings"
            >
              Settings
            </Link>
          </div>
        </div>

        {statusDetail ? (
          <p className="mt-2 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {statusDetail}
          </p>
        ) : null}

        {savedNotice ? (
          <p className="mt-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
            Gespeichert lokal. Upload startet automatisch.
          </p>
        ) : null}

        {!secureContext ? (
          <p className="mt-3 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-700">
            Hinweis: Mikrofonzugriff erfordert HTTPS oder localhost.
          </p>
        ) : null}

        <div className="mt-3 flex items-center gap-2 text-sm text-slate-600">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              isRecording && !isPaused ? "bg-rose-500" : isPaused ? "bg-amber-400" : "bg-slate-300"
            }`}
          />
          <span>{isRecording ? (isPaused ? "Pausiert" : "Aufnahme laeuft") : "Bereit"}</span>
          <span className="font-mono text-slate-700">{formatDuration(elapsedSeconds)}</span>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm text-slate-600">
            Patient/ID (optional)
            <input
              className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-slate-400 focus:outline-none"
              placeholder="Name"
              value={patient}
              onChange={(event) => {
                setPatient(event.target.value);
                setHasAudioRecorded(false);
              }}
              type="text"
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-600">
            DOB (optional)
            <input
              className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-slate-400 focus:outline-none"
              placeholder="Geburtsdatum"
              value={dob}
              onChange={(event) => {
                setDob(event.target.value);
                setHasAudioRecorded(false);
              }}
              type="text"
            />
          </label>
          <label className="grid gap-2 text-sm text-slate-600">
            Thema (optional)
            <input
              className="rounded-xl border border-slate-200 px-3 py-2 text-slate-900 focus:border-slate-400 focus:outline-none"
              placeholder="Infusion ..."
              value={topic}
              onChange={(event) => {
                setTopic(event.target.value);
                setHasAudioRecorded(false);
              }}
              type="text"
            />
          </label>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
            onClick={startRecording}
            type="button"
            disabled={isRecording || isUploading}
          >
            Start
          </button>
          <button
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={isPaused ? resumeRecording : pauseRecording}
            type="button"
            disabled={!isRecording || isUploading}
          >
            {isPaused ? "Resume" : "Pause"}
          </button>
          <button
            className="rounded-full border border-rose-300 px-5 py-2 text-sm font-semibold text-rose-600 transition hover:border-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={stopRecording}
            type="button"
            disabled={!isRecording || isUploading}
          >
            Stop
          </button>
          <button
            className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={sendTextOnly}
            type="button"
            disabled={
              isRecording ||
              isUploading ||
              hasAudioRecorded ||
              (!patient.trim() && !dob.trim() && !topic.trim())
            }
          >
            Text Senden
          </button>
        </div>
      </div>

      <UploadQueue
        refreshToken={refreshToken}
        onRetry={attemptUpload}
        logs={logs}
        onLog={addLog}
      />
    </div>
  );
}
