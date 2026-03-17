/*
MIT License

Copyright (c) 2026 Department of Metaphysical Sciences

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const metrics = [
  {
    label: "Active Anomalies",
    value: "17",
    note: "3 events currently in cross-biome phase drift.",
  },
  {
    label: "Archived Cases",
    value: "491",
    note: "Case files sealed across 9 vault nodes.",
  },
  {
    label: "Clearance Level",
    value: "OMEGA-3",
    note: "Threshold raised after Incident 24-9.",
  },
  {
    label: "Open Investigations",
    value: "08",
    note: "Field operations active in two sectors.",
  },
];

const archiveCards = [
  {
    tag: "CLASSIFIED",
    title: "Entity Index",
    text: "Catalog of observed nonstandard entities and encounter outcomes.",
  },
  {
    tag: "RESTRICTED",
    title: "Experiment Records",
    text: "Trials involving lattice instability and synthetic portal stress.",
  },
  {
    tag: "LEVEL 3",
    title: "Incident Reports",
    text: "Chronological breach files with suppression directives.",
  },
  {
    tag: "TOKENIZED",
    title: "Clearance Access",
    text: "Verification protocols and authorization request logs.",
  },
  {
    tag: "LIVE FEED",
    title: "Field Logs",
    text: "Operational transcripts from unstable reality seams.",
  },
  {
    tag: "EYES ONLY",
    title: "Redacted Materials",
    text: "Sanitized summaries of sealed directives and annexes.",
  },
];

const timeline = [
  {
    date: "November 03, 1998",
    location: "Raven Ridge, West Virginia",
    title: "Initial Geometric Collapse",
    summary:
      "Forty-two acres reorganized into uniform cubic strata over 14 minutes.",
    redacted: "Survey maps referenced subterranean marks labeled [REDACTED].",
  },
  {
    date: "June 14, 2005",
    location: "Site Osprey, New Mexico",
    title: "Obsidian Growth Sequence",
    summary:
      "Vitreous pillars emerged around a comms bunker. Local sunrise lagged 9 minutes.",
    redacted: "Visual feed contains silhouette carrying sample [REDACTED].",
  },
  {
    date: "February 27, 2012",
    location: "Lake Mercer Array, Oregon",
    title: "Signal Layer Interference",
    summary:
      "Towers transmitted 8-bit clock-like pulses mapped to inactive mine shafts.",
    redacted: "Payload phrase repeated 256 times: [REDACTED].",
  },
  {
    date: "September 09, 2018",
    location: "Transit Tunnel 6, Illinois",
    title: "Looped Corridor Event",
    summary:
      "Team Alpha traversed one corridor segment repeatedly while moving forward.",
    redacted: "Telemetry shows heartbeat sync at [REDACTED] BPM.",
  },
  {
    date: "January 19, 2025",
    location: "Northern Sector 7F",
    title: "Void Horizon Exposure",
    summary:
      "Skybox replacement observed during containment outage at Site 7F.",
    redacted: "Emergency transcript references Protocol BEDROCK [REDACTED].",
  },
];

const divisions = [
  {
    tag: "LEVEL 3",
    title: "Research & Development",
    text: "Builds stabilization hardware and predictive anomaly models.",
  },
  {
    tag: "RESTRICTED",
    title: "Field Containment",
    text: "Runs lockdown, witness isolation, and suppression operations.",
  },
  {
    tag: "EYES ONLY",
    title: "Signal Analysis",
    text: "Processes corrupted telemetry and unknown packet signatures.",
  },
  {
    tag: "LEVEL 4",
    title: "Internal Review",
    text: "Audits failures, tampering, and unauthorized disclosures.",
  },
];

const docLines = [
  "Containment gap lasted 11 minutes, 42 seconds.",
  "External timestamps were adjusted to remove discontinuity records.",
  "Operator badge 03-771 entered restricted hatch without escort.",
  "Wall scoring phrase: [REDACTED] WATCHES [REDACTED].",
  "Recommendation: deny atmospheric replacement event in public records.",
];

const terminalBoot = [
  "> BOOTSTRAP DMS ARCHIVE NODE",
  "> LOADING INCIDENT INDEX...",
  "> VERIFYING OPERATOR CREDENTIAL HASH",
  "> ARCHIVAL SUBSYSTEM ONLINE",
  "> WARNING: TWO FILE CLUSTERS PARTIALLY CORRUPTED",
  "> ACCESSING SHADOW BACKUP...",
  "> PARTIAL FILE RESTORATION COMPLETE",
];

const configuredApiBase = document
  .querySelector('meta[name="dms-api-base"]')
  ?.getAttribute("content")
  ?.trim();

const isLocalHost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.protocol === "file:";

const API_BASE = configuredApiBase || (isLocalHost
  ? "http://localhost:1638"
  : "https://dms-backend.bisfd.ru");

const tokenResponses = {
  ALEX: {
    title: "Legacy Token Accepted",
    classification: "Clearance Override // Transitional",
    message:
      "Legacy profile restored. Sealed corridor ALEX-12 marked beneath Site Osprey.",
    log: "ROUTE OPENED: /archive/legacy/alex-12",
  },
  VOID: {
    title: "Deep Vault Unlocked",
    classification: "Clearance Override // BEDROCK CHANNEL",
    message: "Hidden incident segment recovered from the January 19, 2025 outage.",
    log: "HIDDEN SEGMENT RESTORED: INCIDENT-7F-VOID-HZN",
  },
  BEDROCK: {
    title: "Containment Addendum Exposed",
    classification: "Clearance Override // Foundation Layer",
    message: "Directive 11-B indicates anchors were manually disabled.",
    log: "SEALED DIRECTIVE MIRRORED: DMS-11B-BEDROCK",
  },
};

async function requestTerminalAccess(token) {
  const response = await fetch(`${API_BASE}/api/terminal`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`);
  }

  return response.json();
}

function cardTemplate(item, extra = "") {
  return `
    <article class="card">
      <p class="tag">${item.tag}</p>
      <p class="title">${item.title}</p>
      <p class="muted ${extra}">${item.text || item.note}</p>
    </article>
  `;
}

function renderCollections() {
  const metricsRoot = document.getElementById("metrics");
  const archiveRoot = document.getElementById("archive-cards");
  const timelineRoot = document.getElementById("timeline");
  const divisionsRoot = document.getElementById("divisions-cards");
  const docRoot = document.getElementById("doc-lines");

  metricsRoot.innerHTML = metrics
    .map(
      (item) => `
      <article class="card">
        <p class="tag">${item.label}</p>
        <p class="metric-value">${item.value}</p>
        <p class="muted">${item.note}</p>
      </article>
    `,
    )
    .join("");

  archiveRoot.innerHTML = archiveCards.map((item) => cardTemplate(item)).join("");
  divisionsRoot.innerHTML = divisions.map((item) => cardTemplate(item)).join("");

  timelineRoot.innerHTML = timeline
    .map(
      (item) => `
      <article class="timeline-item">
        <p class="timeline-meta">${item.date} | ${item.location}</p>
        <h3>${item.title}</h3>
        <p class="muted">${item.summary}</p>
        <p class="timeline-redacted">${item.redacted}</p>
      </article>
    `,
    )
    .join("");

  docRoot.innerHTML = docLines.map((line) => `<li>${line}</li>`).join("");
}

function initModal() {
  const modal = document.getElementById("doc-modal");
  const open = document.getElementById("open-doc");
  const close = document.getElementById("close-doc");
  const closeBackdrop = document.getElementById("close-doc-backdrop");

  function hide() {
    modal.classList.add("hidden");
  }

  open.addEventListener("click", () => modal.classList.remove("hidden"));
  close.addEventListener("click", hide);
  closeBackdrop.addEventListener("click", hide);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hide();
    }
  });
}

function initTerminal() {
  const output = document.getElementById("terminal-output");
  const form = document.getElementById("token-form");
  const input = document.getElementById("token-input");
  const note = document.getElementById("terminal-note");

  const log = [];
  const maxLines = 12;
  let index = 0;

  function draw() {
    const lines = [...log, "> AWAITING TOKEN <span class=\"cursor\">_</span>"];
    output.innerHTML = lines.map((line) => `<p>${line}</p>`).join("");
  }

  const interval = window.setInterval(() => {
    if (index >= terminalBoot.length) {
      clearInterval(interval);
      draw();
      return;
    }
    log.push(terminalBoot[index]);
    if (log.length > maxLines) log.shift();
    index += 1;
    draw();
  }, 560);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const token = input.value.trim().toUpperCase();
    if (!token) return;

    log.push(`> TOKEN RECEIVED: ${token}`);
    let response;
    let source = "backend";

    try {
      response = await requestTerminalAccess(token);
    } catch {
      // Local fallback allows preview even when backend is offline.
      source = "local-fallback";
      response = tokenResponses[token] ?? {
        status: "denied",
        title: "Access Denied",
        classification: "Standard Archive Channel",
        message: "Credential not recognized. Request supervisor authorization.",
        log: "REQUEST QUEUED FOR INTERNAL REVIEW",
      };
    }

    if (response.status === "granted") {
      log.push("> CLEARANCE TOKEN VALID");
      log.push(`> ${response.log}`);
      note.innerHTML = `
        <p class="label">${response.classification}</p>
        <h3>${response.title}</h3>
        <p class="muted">${response.message}</p>
        <p class="hint">${source === "backend" ? "Response source: dms-backend.bisfd.ru" : "Response source: local fallback mode"}</p>
      `;
      note.style.borderColor = "var(--border-strong)";
      note.style.background = "rgba(11, 23, 17, 0.82)";
    } else {
      log.push("> CLEARANCE TOKEN INVALID");
      log.push(`> ${response.log ?? "REQUEST QUEUED FOR INTERNAL REVIEW"}`);
      note.innerHTML = `
        <p class="label">${response.classification ?? "Standard Archive Channel"}</p>
        <h3>${response.title ?? "Access Denied"}</h3>
        <p class="muted">${response.message ?? "Credential not recognized. Request supervisor authorization."}</p>
        <p class="hint">${source === "backend" ? "Response source: dms-backend.bisfd.ru" : "Response source: local fallback mode"}</p>
      `;
      note.style.borderColor = "rgba(170,102,102,0.5)";
      note.style.background = "rgba(26, 14, 14, 0.72)";
    }

    while (log.length > maxLines) log.shift();
    input.value = "";
    draw();
  });

  draw();
}

renderCollections();
initModal();
initTerminal();
