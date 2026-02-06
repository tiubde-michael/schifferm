import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { profileContent } from "../src/content/profile.js";
import { siteConfig } from "../src/lib/site.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const publicDir = path.join(rootDir, "public");

const localeCopy = {
  de: {
    profileTitle: "Profil",
    summary: "Kurzprofil",
    coreDomains: "Kernbereiche",
    skills: "Skills",
    experience: "Erfahrung",
    education: "Ausbildung",
    workTypes: "Representative Work Types",
    certifications: "Zertifikate",
  },
  en: {
    profileTitle: "Profile",
    summary: "Summary",
    coreDomains: "Core Domains",
    skills: "Skills",
    experience: "Experience",
    education: "Education",
    workTypes: "Representative Work Types",
    certifications: "Certifications",
  },
};

const writeFile = (targetPath, content) => {
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, content, "utf8");
};

const fileUrl = (file) => encodeURI(`/docs/${file}`);

const buildProfileJson = (lang) => {
  const positioning = profileContent.positioning[lang];
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
    skills: profileContent.skills,
    experience: profileContent.experience.map((item) => ({
      period: item.period,
      title: typeof item.title === "string" ? item.title : item.title[lang],
      details: typeof item.details === "string" ? item.details : item.details[lang],
    })),
    education: profileContent.education,
    workTypes: profileContent.workTypes.map((work) => ({
      id: work.id,
      title: work.title[lang],
      status: work.status[lang],
      stack: work.stack,
      outcomes: work.outcomes[lang],
    })),
    certifications: profileContent.certifications,
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
    `- AI: ${profileContent.skills.ai.join(", ")}`,
    `- Automation: ${profileContent.skills.automation.join(", ")}`,
    `- Programming: ${profileContent.skills.programming.join(", ")}`,
    `- Databases: ${profileContent.skills.databases.join(", ")}`,
    `- Ops: ${profileContent.skills.ops.join(", ")}`,
    `- Office/PM: ${profileContent.skills.officePm.join(", ")}`,
    `- CAD: ${profileContent.skills.cad.join(", ")}`,
    "",
    `## ${copy.experience}`,
    ...profileContent.experience.map((item) => {
      const title = typeof item.title === "string" ? item.title : item.title[lang];
      const details = typeof item.details === "string" ? item.details : item.details[lang];
      return `- ${item.period}: ${title} — ${details}`;
    }),
    "",
    `## ${copy.education}`,
    ...profileContent.education.map((item) => `- ${item.period}: ${item.title} — ${item.details}`),
    "",
    `## ${copy.workTypes}`,
    ...profileContent.workTypes.map(
      (work) =>
        `- ${work.id}: ${work.title[lang]} (${work.status[lang]}) — ${work.stack}; outcomes: ${work.outcomes[lang].join(
          ", "
        )}`
    ),
    "",
    `## ${copy.certifications}`,
    ...Object.values(profileContent.certifications).flatMap((items) => items.map((item) => `- ${item}`)),
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
    "Experience:",
    ...profileContent.experience.map((item) => {
      const title = typeof item.title === "string" ? item.title : item.title[lang];
      const details = typeof item.details === "string" ? item.details : item.details[lang];
      return `- ${item.period}: ${title} — ${details}`;
    }),
    "",
    "Education:",
    ...profileContent.education.map((item) => `- ${item.period}: ${item.title} — ${item.details}`),
    "",
    "Representative Work Types:",
    ...profileContent.workTypes.map(
      (work) =>
        `- ${work.id}: ${work.title[lang]} (${work.status[lang]}) — ${work.stack}; outcomes: ${work.outcomes[lang].join(
          ", "
        )}`
    ),
    "",
    "Certifications:",
    ...Object.values(profileContent.certifications).flatMap((items) => items.map((item) => `- ${item}`)),
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
