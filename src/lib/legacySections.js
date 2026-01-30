function stripScriptsAndStyles(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "");
}

function stripWrapperTags(html) {
  return html
    .replace(/<!doctype[^>]*>/gi, "")
    .replace(/<\/?(html|head|body)\b[^>]*>/gi, "");
}

function stripFontAndAttrs(html) {
  return html
    .replace(/<\/?font\b[^>]*>/gi, "")
    .replace(/\s(class|style|bgcolor|align|face|size|width|height|border|cellpadding|cellspacing|valign|marginwidth|marginheight|leftmargin|topmargin)=(".*?"|'.*?'|[^\s>]+)/gi, "");
}

function normalizeLinks(html) {
  return html
    .replace(/href="Datenschutzerklaerung\.htm(#.*?)?"/gi, 'href="/datenschutz"')
    .replace(/href="Disclaimer\.htm(#.*?)?"/gi, 'href="/disclaimer"')
    .replace(/href="Impressum\.htm(#.*?)?"/gi, 'href="/impressum"')
    .replace(/href="AGB\/TI-DO-AGB\.pdf"/gi, 'href="/agb/TI-DO-AGB.pdf"');
}

function extractFromAnchor(html, anchorName, stopAnchors = []) {
  const normalized = html.replace(/\r\n/g, "\n");
  const startMatch = new RegExp(`(<a\\s+name=["']${anchorName}["'][^>]*>\\s*<\\/a>)`, "i").exec(
    normalized
  );
  if (!startMatch) return "";

  const startIndex = startMatch.index + startMatch[0].length;
  let endIndex = normalized.length;

  for (const stop of stopAnchors) {
    const stopRe = new RegExp(`<a\\s+name=["']${stop}["'][^>]*>\\s*<\\/a>`, "i");
    const stopMatch = stopRe.exec(normalized.slice(startIndex));
    if (stopMatch) {
      endIndex = Math.min(endIndex, startIndex + stopMatch.index);
    }
  }

  return normalized.slice(startIndex, endIndex).trim();
}

export function sanitizeLegacyHtml(html) {
  let output = html;
  output = stripScriptsAndStyles(output);
  output = stripWrapperTags(output);
  output = stripFontAndAttrs(output);
  output = normalizeLinks(output);
  return output.trim();
}

export function getLegacySection({ html, anchorName, stopAnchors }) {
  const section = extractFromAnchor(html, anchorName, stopAnchors);
  return sanitizeLegacyHtml(section);
}
