const internalRouteMap = new Map([
  ["beratung-po00.htm", "/#/leistungen/prozessoptimierung"],
  ["begriffaerklaerung01.htm", "/#/leistungen/prozessoptimierung/begriffserklaerung"],
  ["beratung-vi00.htm", "/#/leistungen/prozessoptimierung/vision-strategie"],
  ["def-bab.htm", "/#/leistungen/prozessoptimierung/bab"],
  ["def-bep.htm", "/#/leistungen/prozessoptimierung/bep"],
  ["def-db.htm", "/#/leistungen/prozessoptimierung/deckungsbeitrag"],
  ["def-kosten.htm", "/#/leistungen/prozessoptimierung/kosten"],
  ["kaizen00.htm", "/#/leistungen/prozessoptimierung/kaizen"],
  ["5s00.htm", "/#/leistungen/prozessoptimierung/5s"],
  ["sixsigma00.htm", "/#/leistungen/prozessoptimierung/six-sigma"],
  ["def-lean-00.htm", "/#/leistungen/prozessoptimierung/lean"],
  ["def-sgp.htm", "/#/leistungen/prozessoptimierung/sgp"],
  ["tps00.htm", "/#/leistungen/prozessoptimierung/tps"],
  ["transparenz040_saving.htm", "/#/leistungen/prozessoptimierung/savings"],
]);

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
    .replace(
      /\s(class|style|bgcolor|align|face|size|width|height|border|cellpadding|cellspacing|valign|marginwidth|marginheight|leftmargin|topmargin)=(".*?"|'.*?'|[^\s>]+)/gi,
      ""
    );
}

function addIdsToNamedAnchors(html) {
  return html.replace(/<a\b([^>]*?)\bname=(["'])([^"']+)\2([^>]*)>/gi, (match, before, quote, name, after) => {
    if (/\bid=(["']).*?\1/i.test(match)) return match;
    return `<a${before} id=${quote}${name}${quote} name=${quote}${name}${quote}${after}>`;
  });
}

function rewriteImages(html) {
  return html.replace(/src="([^"]+?\.(?:jpg|jpeg|gif|png))"/gi, (match, src) => {
    if (/^(https?:)?\/\//i.test(src)) return match;
    if (src.includes("/")) return `src="/migrated/process/${src.split("/").pop()}"`;
    return `src="/migrated/process/${src}"`;
  });
}

function rewriteLinks(html) {
  return html.replace(/href="([^"]+?\.htm)(#[^"]*)?"/gi, (match, href, hash = "") => {
    if (/^(https?:)?\/\//i.test(href)) return match;
    const normalized = href.split("/").pop().toLowerCase();
    const mapped = internalRouteMap.get(normalized);
    if (!mapped) return match;
    if (!hash) return `href="${mapped}"`;
    const section = hash.startsWith("#") ? hash.slice(1) : hash;
    return `href="${mapped}?section=${encodeURIComponent(section)}"`;
  });
}

export function sanitizeLegacyProcessHtml(html) {
  let output = html;
  output = stripScriptsAndStyles(output);
  output = stripWrapperTags(output);
  output = addIdsToNamedAnchors(output);
  output = stripFontAndAttrs(output);
  output = rewriteImages(output);
  output = rewriteLinks(output);
  return output.trim();
}

export function extractLegacyBody(html) {
  const normalized = html.replace(/\r\n/g, "\n");
  const bodyMatch = /<body\b[^>]*>([\s\S]*?)<\/body>/i.exec(normalized);
  return bodyMatch ? bodyMatch[1].trim() : normalized;
}
