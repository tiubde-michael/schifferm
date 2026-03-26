import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { profileContent } from "../src/content/profile.js";
import { siteConfig } from "../src/lib/site.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

// Load career_data.json (generated from career.db)
const careerDataPath = path.join(publicDir, "career", "career_data.json");
const careerData = JSON.parse(fs.readFileSync(careerDataPath, "utf8"));

const l = (obj, field, lang) => obj[`${field}_${lang}`] ?? obj[`${field}_de`] ?? null;

const localeCopy = {
  de: {
    profileTitle: "Profil",
    summary: "Kurzprofil",
    coreDomains: "Kernbereiche",
    skills: "Skills",
    experience: "Erfahrung",
    education: "Ausbildung",
    projects: "Projekte",
    certifications: "Zertifikate",
  },
  en: {
    profileTitle: "Profile",
    summary: "Summary",
    coreDomains: "Core Domains",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    certifications: "Certifications",
  },
};

const writeFile = (targetPath, content) => {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, "utf8");
};

const fileUrl = (file) => encodeURI(`/docs/${file}`);

// Group skills by category
const getSkillsGrouped = (lang) => {
  const grouped = {};
  for (const s of careerData.skills) {
    if (!grouped[s.category]) grouped[s.category] = [];
    grouped[s.category].push(`${s.name} (${l(s, "level", lang)})`);
  }
  return grouped;
};

// Get work experience
const getExperience = (lang) =>
  careerData.work_experience.map((we) => ({
    period: `${we.date_from}–${we.date_to || (lang === "de" ? "heute" : "present")}`,
    title: we.employer,
    role: l(we, "role", lang),
    description: l(we, "description", lang),
  }));

// Get projects
const getProjects = (lang) =>
  careerData.projects.map((p) => ({
    title: l(p, "title", lang),
    client: p.client,
    dateFrom: p.date_from,
    dateTo: p.date_to,
    category: p.category,
    description: l(p, "description_short", lang) || l(p, "description", lang),
  }));

// Get education
const getEducation = (lang) =>
  careerData.education.map((e) => ({
    period: `${e.date_from}–${e.date_to || ""}`,
    title: `${l(e, "degree", lang)} ${l(e, "field", lang)}`,
    institution: e.institution,
    grade: e.grade,
  }));

// Get certifications grouped
const getCertsGrouped = (lang) => {
  const grouped = {};
  for (const c of careerData.certifications) {
    const cat = c.category || "misc";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(`${l(c, "name", lang)} — ${c.issuer || "—"} (${c.date_from})`);
  }
  return grouped;
};

const buildProfileJson = (lang) => {
  const positioning = profileContent.positioning[lang];
  const skills = getSkillsGrouped(lang);
  const experience = getExperience(lang);
  const projects = getProjects(lang);
  const education = getEducation(lang);
  const certifications = getCertsGrouped(lang);

  return {
    name: profileContent.person.name,
    location: profileContent.person.location,
    email: profileContent.person.email,
    mobile: profileContent.person.mobile,
    languages: profileContent.person.languages,
    headline: positioning.headline,
    oneLiner: positioning.oneLiner,
    keywords: positioning.keywords,
    coreDomains: profileContent.coreDomains.map((domain) => ({
      title: domain.title[lang],
      focus: domain.focus[lang],
    })),
    skills,
    experience,
    projects,
    education,
    certifications,
    publications: profileContent.publications[lang].map((item) => ({
      title: item.title,
      file: fileUrl(item.file),
    })),
    diplomaFiles: profileContent.diplomaFiles.map((file) => fileUrl(file)),
    sameAs: profileContent.site.sameAs,
  };
};

const buildProfileMarkdown = (lang) => {
  const copy = localeCopy[lang];
  const positioning = profileContent.positioning[lang];
  const skills = getSkillsGrouped(lang);
  const experience = getExperience(lang);
  const projects = getProjects(lang);
  const education = getEducation(lang);
  const certifications = getCertsGrouped(lang);
  const present = lang === "de" ? "heute" : "present";

  return [
    `# ${profileContent.site.fullName} — ${copy.profileTitle}`,
    "",
    `## ${copy.summary}`,
    positioning.oneLiner,
    "",
    `## ${copy.coreDomains}`,
    ...profileContent.coreDomains.map((domain) => `- ${domain.title[lang]}: ${domain.focus[lang].join(", ")}`),
    "",
    `## ${copy.skills}`,
    ...Object.entries(skills).map(([cat, items]) => `- ${cat}: ${items.join(", ")}`),
    "",
    `## ${copy.experience}`,
    ...experience.map((item) => `- ${item.period}: ${item.title} — ${item.role}`),
    "",
    `## ${copy.projects}`,
    ...projects.map((p) => `- ${p.title}${p.client ? ` (${p.client})` : ""} ${p.dateFrom}–${p.dateTo || present}: ${p.description || ""}`),
    "",
    `## ${copy.education}`,
    ...education.map((item) => `- ${item.period}: ${item.title}, ${item.institution}${item.grade ? ` (${item.grade})` : ""}`),
    "",
    `## ${copy.certifications}`,
    ...Object.entries(certifications).flatMap(([, items]) => items.map((item) => `- ${item}`)),
    "",
    "## Publications",
    ...profileContent.publications[lang].map((item) => `- ${item.title} (${fileUrl(item.file)})`),
    "",
    "## Diploma thesis PDF files",
    ...profileContent.diplomaFiles.map((file) => `- ${fileUrl(file)}`),
    "",
  ].join("\n");
};

const buildProfileText = (lang) => {
  const positioning = profileContent.positioning[lang];
  const skills = getSkillsGrouped(lang);
  const experience = getExperience(lang);
  const projects = getProjects(lang);
  const education = getEducation(lang);
  const certifications = getCertsGrouped(lang);
  const present = lang === "de" ? "heute" : "present";

  return [
    profileContent.site.fullName,
    "",
    positioning.oneLiner,
    "",
    `Location: ${profileContent.person.location}`,
    `Email: ${profileContent.person.email}`,
    `Mobile: ${profileContent.person.mobile}`,
    "",
    "Keywords:",
    positioning.keywords.join(", "),
    "",
    "Core Domains:",
    ...profileContent.coreDomains.map((domain) => `- ${domain.title[lang]}: ${domain.focus[lang].join(", ")}`),
    "",
    "Skills:",
    ...Object.entries(skills).map(([cat, items]) => `- ${cat}: ${items.join(", ")}`),
    "",
    "Experience:",
    ...experience.map((item) => `- ${item.period}: ${item.title} — ${item.role}`),
    "",
    "Projects:",
    ...projects.map((p) => `- ${p.title}${p.client ? ` (${p.client})` : ""} ${p.dateFrom}–${p.dateTo || present}: ${p.description || ""}`),
    "",
    "Education:",
    ...education.map((item) => `- ${item.period}: ${item.title}, ${item.institution}${item.grade ? ` (${item.grade})` : ""}`),
    "",
    "Certifications:",
    ...Object.entries(certifications).flatMap(([, items]) => items.map((item) => `- ${item}`)),
    "",
    "Publications:",
    ...profileContent.publications[lang].map((item) => `- ${item.title} (${fileUrl(item.file)})`),
    "",
    "Diploma thesis PDF files:",
    ...profileContent.diplomaFiles.map((file) => `- ${fileUrl(file)}`),
    "",
  ].join("\n");
};

for (const lang of siteConfig.locales) {
  const basePath = path.join(publicDir, lang, "machine-readable");
  const jsonPath = path.join(basePath, "profile.json");
  const mdPath = path.join(basePath, "profile.md");
  const txtPath = path.join(basePath, "profile.txt");

  writeFile(jsonPath, `${JSON.stringify(buildProfileJson(lang), null, 2)}\n`);
  writeFile(mdPath, `${buildProfileMarkdown(lang)}\n`);
  writeFile(txtPath, `${buildProfileText(lang)}\n`);
}
