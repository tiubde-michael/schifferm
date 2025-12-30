function stripScriptsAndStyles(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
}

export function extractLegacyBody(html) {
  const normalized = html.replace(/\r\n/g, "\n");
  const bodyMatch = /<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(normalized);
  return bodyMatch ? bodyMatch[1] : normalized;
}

function stripFontTags(html) {
  return html.replace(/<\/?font\b[^>]*>/gi, "");
}

function stripWrapperTags(html) {
  return html.replace(/<!doctype[^>]*>/gi, "").replace(/<\/?(html|head|body)\b[^>]*>/gi, "");
}

function stripNavLinks(html) {
  return html.replace(/<p\b[^>]*>\s*<font\b[^>]*Arial Black[^>]*>[\s\S]*?<\/font>\s*<\/p>/i, "");
}

function stripCenteredHeaderBlock(html) {
  return html.replace(/<p\b[^>]*align=(["'])center\1[^>]*>[\s\S]*?<\/p>/i, "");
}

function stripImages(html) {
  return html.replace(/<img\b[^>]*>/gi, "");
}

function stripLinksKeepText(html) {
  return html.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/gi, "$1");
}

function normalizeStructuralTags(html) {
  return html
    .replace(/<p\b[^>]*>/gi, "<p>")
    .replace(/<ul\b[^>]*>/gi, "<ul>")
    .replace(/<ol\b[^>]*>/gi, "<ol>")
    .replace(/<li\b[^>]*>/gi, "<li>");
}

function convertBold(html) {
  return html.replace(/<b>/gi, "<strong>").replace(/<\/b>/gi, "</strong>");
}

function collapseWhitespace(html) {
  return html
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/<p>\s*<\/p>/gi, "")
    .trim();
}

function fixCommonMojibake(text) {
  return (
    text
      // Common German mojibake variants
      .replaceAll("Ausf³hrung", "Ausführung")
      .replaceAll("Ausf”rung", "Ausführung")
      .replaceAll("AusfÃ¼hrung", "Ausführung")
      .replaceAll("EinfÃ¼hrung", "Einführung")
      .replaceAll("FÃ¼hrung", "Führung")
      .replaceAll("UnterstÃ¼tzung", "Unterstützung")
      .replaceAll("bewÃ¤hrten", "bewährten")
      .replaceAll("bewÃ¤hrte", "bewährte")
      .replaceAll("AblÃ¤ufe", "Abläufe")
      .replaceAll("EngpÃ¤sse", "Engpässe")
      // Quotes/dashes
      .replaceAll("â€“", "–")
      .replaceAll("â€”", "—")
      .replaceAll("â€ž", "„")
      .replaceAll("â€œ", "“")
      .replaceAll("â€", "”")
      .replaceAll("â€™", "’")
      // Residual artifact
      .replaceAll("Â", "")
  );
}

function extractTitleFromLegacy(html) {
  const match = /<font\b[^>]*\bsize=(["'])6\1[^>]*>([\s\S]*?)<\/font>/i.exec(html);
  if (!match) return "";
  return match[2].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function parseLegacyProjektmanagementHtml(rawHtml) {
  const title = extractTitleFromLegacy(rawHtml);
  let html = extractLegacyBody(rawHtml);
  html = fixCommonMojibake(html);
  html = stripScriptsAndStyles(html);
  html = stripWrapperTags(html);
  html = stripNavLinks(html);
  html = stripCenteredHeaderBlock(html);
  html = stripImages(html);
  html = stripLinksKeepText(html);
  html = stripFontTags(html);
  html = convertBold(html);
  html = normalizeStructuralTags(html);
  html = collapseWhitespace(html);
  return { title, html };
}

