export const profileContent = {
  site: {
    name: "Michael Schiffer",
    fullName: "Dipl.-Ing. Michael Schiffer, MBA",
    baseUrl: "https://schifferm.de",
    sameAs: ["https://the-implementers.de"],
  },
  person: {
    name: "Dipl.-Ing. Michael Schiffer, MBA",
    location: "Spremberg, Deutschland",
    email: "Schiffer@TIUB.de",
    mobile: "+49 172 25 6 42 48",
    languages: [
      { code: "de", label: "DE", level: "native" },
      { code: "en", label: "EN", level: "very good" },
      { code: "fr", label: "FR", level: "basic" },
      { code: "es", label: "ES", level: "basic" },
      { code: "pl", label: "PL", level: "basic" },
    ],
  },
  positioning: {
    de: {
      headline: "Prozessoptimierung • Program Management • Generative AI • Healthcare Automation",
      oneLiner:
        "Senior Program Manager und Prozessoptimierer mit 20+ Jahren Automotive/Industrie (Serienanlauf, globale Werksstrukturen). Seit 2025 Schwerpunkt: Generative AI, Healthcare Automation, Datenanalyse, KI-gestützte Prozessoptimierung und Telemedizin-Workflows.",
      keywords: [
        "Prozessoptimierung",
        "Program Management",
        "Serienanlauf",
        "Lieferantenentwicklung",
        "Generative AI",
        "Healthcare Automation",
        "RAG",
        "n8n",
        "Python",
        "SQL",
        "Telemedizin Workflows",
      ],
    },
    en: {
      headline: "Process Optimization • Program Management • Generative AI • Healthcare Automation",
      oneLiner:
        "Senior program manager and process optimizer with 20+ years in automotive/industrial operations — since 2025 focused on generative AI, healthcare automation and data-driven workflow optimization.",
      keywords: [
        "process optimization",
        "program management",
        "launch management",
        "supplier development",
        "generative AI",
        "healthcare automation",
        "RAG",
        "n8n",
        "Python",
        "SQL",
        "telemedicine workflows",
      ],
    },
  },
  coreDomains: [
    {
      title: {
        de: "Automotive- & Manufacturing Operations",
        en: "Automotive & Manufacturing Operations",
      },
      focus: {
        de: [
          "Serienanlauf",
          "globale Werke",
          "Ausschussreduzierung",
          "Lieferantenentwicklung",
          "Relocations",
          "Cost-Down",
        ],
        en: [
          "serial launches",
          "global plants",
          "scrap reduction",
          "supplier development",
          "relocations",
          "cost-down",
        ],
      },
    },
    {
      title: {
        de: "Healthcare Operations & Automation",
        en: "Healthcare Operations & Automation",
      },
      focus: {
        de: [
          "klinische Dokumentations-Workflows",
          "strukturierte Aufnahme/Frageboegen",
          "Evaluation/Reporting",
          "Telemedizin-Workflows",
        ],
        en: [
          "clinical documentation workflows",
          "structured intake/questionnaires",
          "evaluation/reporting",
          "telemedicine workflows",
        ],
      },
    },
    {
      title: {
        de: "AI / Data / Workflow Engineering",
        en: "AI / Data / Workflow Engineering",
      },
      focus: {
        de: [
          "RAG + Vector DBs",
          "LLM-Workflows",
          "Python+SQL Pipelines",
          "lokale LLMs (Ollama/LM Studio)",
          "n8n",
        ],
        en: [
          "RAG + vector DBs",
          "LLM workflows",
          "Python+SQL pipelines",
          "local LLMs (Ollama/LM Studio)",
          "n8n",
        ],
      },
    },
  ],
  skills: {
    ai: ["RAG", "vector databases", "LLM workflows", "local LLMs (Ollama/LM Studio)", "agent workflows"],
    automation: ["n8n"],
    programming: ["Python", "C# (basic)", "VB/VB.NET (basic)"],
    databases: ["MySQL (basic)", "Postgres (basic)"],
    ops: ["SAP (basic)"],
    officePm: ["Excel (very good)", "MS Project (good)", "PowerPoint (good)", "Word (good)"],
    cad: ["OnShape (good)", "AutoCAD 3D (good)", "CATIA V5 (basic)"],
  },
  experience: [
    {
      period: "1997–2010",
      title: "Johnson Controls",
      details: {
        de: "Test Engineering, Electronics coordination, PMO, Plant leadership, Launch/Taskforce roles",
        en: "Test engineering, electronics coordination, PMO, plant leadership, launch/taskforce roles",
      },
    },
    {
      period: "Since 2010",
      title: "The Implementers",
      details: {
        de: "Program management, supplier development, relocations, cost-down",
        en: "Program management, supplier development, relocations, cost-down",
      },
    },
    {
      period: "Aug 2025",
      title: {
        de: "Implementierung KI-Auswertungen und Dokumentation im Krankenhaus",
        en: "Hospital automation initiative",
      },
      details: {
        de: "Implementierung KI-Auswertungen und Dokumentation im Krankenhaus",
        en: "Implementation of AI-driven evaluation and documentation in hospital operations.",
      },
    },
  ],
  education: [
    {
      period: "1995–1998",
      title: "Dipl.-Ing. (FH) Maschinenbau, Rheinische FH Köln",
      details: "Thesis: Versuchsstand ECE-R17 Kopfstützenprüfung.",
    },
    {
      period: "2001–2003",
      title: "MBA International Management, UEL/ELBS London",
      details: "Thesis: Successful Implementation of Kaizen.",
    },
  ],
  workTypes: [
    {
      id: "A",
      title: {
        de: "KI-gestuetzte Auswertung & Dokumentation im Krankenhaus",
        en: "AI-driven evaluation & documentation in hospital operations",
      },
      status: {
        de: "implementiert, seit 2025",
        en: "implemented, since 2025",
      },
      stack: "Python/SQL/n8n/LLM workflows",
      outcomes: {
        de: ["standardisierte Outputs", "reduzierter manueller Aufwand", "verbesserte Konsistenz"],
        en: ["standardized outputs", "reduced manual effort", "improved consistency"],
      },
    },
    {
      id: "B",
      title: {
        de: "Strukturierte Patientenaufnahme & Workflow-Automation",
        en: "Structured patient intake & workflow automation",
      },
      status: {
        de: "aktiv",
        en: "active",
      },
      stack: "n8n/SQL/LLM workflows",
      outcomes: {
        de: ["strukturierte Intake-Daten", "Routing-Logik", "auswertungsfaehige Datensaetze"],
        en: ["structured intake data", "routing logic", "evaluation-ready datasets"],
      },
    },
    {
      id: "C",
      title: {
        de: "Serienanlauf / Programmmanagement",
        en: "Serial launch / program management",
      },
      status: {
        de: "wiederkehrend",
        en: "recurring",
      },
      stack: "program management methods",
      outcomes: {
        de: ["stabile SOP", "Qualitaets- und Lieferperformance", "Risikominderung"],
        en: ["stable SOP", "quality + delivery performance", "risk mitigation"],
      },
    },
  ],
  certifications: {
    quality: [
      "DGQ Auditor / Qualitätsmanager (Qualitätstechnik II) — DGQ — 1996",
      "REFA-Grundschein – REFA-Sachbearbeiter — REFA-Verband — 1997",
      "Six Sigma Black Belt — Johnson Controls — 2001",
      "Wertstrom-Engineering — Fraunhofer IAO — 2012",
    ],
    program: [
      "Program & Launch Management (PMI / PLUS) — Program & Launch Management University — 2002",
      "KMU-Fachberater Sanierung® — KMU-Akademie e.V. — 2010",
    ],
    healthcare: [
      "Generative AI im Gesundheitswesen (Kursreihe) — Coursera — 2025",
      "Healthcare Operations & Project Management (Kursreihe) — Coursera — 2025",
    ],
    aiData: [
      "Vector Databases for RAG — IBM — 2025",
      "Build Intelligent Agents using DeepSeek & n8n — Board Infinity — 2025",
      "MySQL for Data Engineering — Duke University — 2025",
      "Python for Everybody (Modules) — University of Michigan — 2025",
      "Deep Learning with PyTorch, Keras and TensorFlow — IBM — 2026",
    ],
  },
  publications: {
    de: [
      {
        title: "Diplomarbeit (Rheinische FH Koeln, 1998): Versuchsstand ECE-R17 Kopfstuetzenpruefung.",
        file: "00-DIP-Inhalt.pdf",
      },
      {
        title: "MBA-Thesis (UEL/ELBS London, 2003): Successful Implementation of Kaizen.",
        file: "Kaizen MR _Final.pdf",
      },
    ],
    en: [
      {
        title: "Diploma thesis (Rheinische FH Cologne, 1998): Versuchsstand ECE-R17 Kopfstuetzenpruefung.",
        file: "00-DIP-Inhalt.pdf",
      },
      {
        title: "MBA thesis (UEL/ELBS London, 2003): Successful Implementation of Kaizen.",
        file: "Kaizen MR _Final.pdf",
      },
    ],
  },
  diplomaFiles: [
    "00-DIP-Inhalt.pdf",
    "01-DIP-Einleitung.pdf",
    "02-DIP-Grundlagen.pdf",
    "03-Dip-Entwurf-eines-Pendels.pdf",
    "04-Dip-Entwurf-einer-linearen.pdf",
    "05-Dip-Bestaetigung-der-Theorie.pdf",
    "06-DIP-Ermittlung-der-Ko.pdf",
    "07-Dip-Bewertung-der-beiden-Loes.pdf",
    "08-DIP-Konstruktion-der-Posi.pdf",
    "09-DIP-Steuerung.pdf",
    "10-DIP-Bau-und-Inbetriebnahme.pdf",
    "11-DIP-Ist kosten.pdf",
    "12-DIP-Literaturn.pdf",
    "13-DIP-Erklaerung.pdf",
    "147-DIP-An_CFC 600.pdf",
    "148-DIP-An_Der-Lineare-Pruefstand.pdf",
  ],
  machineReadable: {
    profileMdTitle: "Michael Schiffer Profile (Machine-Readable)",
  },
};
