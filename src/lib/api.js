export async function uploadRecording(recording, settings) {
  const { webhookUrl, targetSampleRate, username, password } = settings;
  if (!webhookUrl) {
    throw new Error("Webhook URL fehlt.");
  }

  const formData = new FormData();
  const filename = recording.filename || `recording-${recording.id || "unknown"}.webm`;
  const blobType = recording.blob?.type || "audio/webm";
  const file = new File([recording.blob], filename, { type: blobType });

  formData.append("file", file);
  formData.append("patient", recording.patient || "");
  formData.append("dob", recording.dob || "");
  formData.append("topic", recording.topic || "");
  formData.append("clientTimestamp", recording.createdAt || new Date().toISOString());
  const targetSampleRateValue = String(targetSampleRate || "").trim();
  const resolvedSampleRate =
    targetSampleRateValue && !Number.isNaN(Number(targetSampleRateValue))
      ? String(Number(targetSampleRateValue))
      : "";
  formData.append("targetSampleRate", resolvedSampleRate);

  const headers = {};
  if (username || password) {
    const credentials = `${username || ""}:${password || ""}`;
    headers.Authorization = `Basic ${btoa(credentials)}`;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    const detail = text ? ` ${text}` : "";
    throw new Error(`Upload fehlgeschlagen (${response.status}).${detail}`);
  }

  return response;
}

export async function uploadTextOnly(payload, settings) {
  const { webhookUrl, targetSampleRate, username, password } = settings;
  if (!webhookUrl) {
    throw new Error("Webhook URL fehlt.");
  }

  const formData = new FormData();
  formData.append("patient", payload.patient || "");
  formData.append("dob", payload.dob || "");
  formData.append("topic", payload.topic || "");
  formData.append("clientTimestamp", payload.createdAt || new Date().toISOString());

  const targetSampleRateValue = String(targetSampleRate || "").trim();
  const resolvedSampleRate =
    targetSampleRateValue && !Number.isNaN(Number(targetSampleRateValue))
      ? String(Number(targetSampleRateValue))
      : "";
  formData.append("targetSampleRate", resolvedSampleRate);

  const headers = {};
  if (username || password) {
    const credentials = `${username || ""}:${password || ""}`;
    headers.Authorization = `Basic ${btoa(credentials)}`;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers,
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    const detail = text ? ` ${text}` : "";
    throw new Error(`Upload fehlgeschlagen (${response.status}).${detail}`);
  }

  return response;
}
