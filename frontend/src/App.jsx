
import { useState } from 'react';
import General from './components/General'
import Education from './components/Education'
import CV from './components/CV'
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import SectionCard from './components/SectionCard';
import { formatDateUS } from './utils/formatDate';
import { jsPDF } from "jspdf";
import {
  DownloadSimple,
  CheckCircle,
  SpinnerGap,
  IdentificationCard,
  GraduationCap,
  Briefcase,
  FolderSimple,
  Toolbox,
  NotePencil,
  FileText,
} from "@phosphor-icons/react";

const pdfWidth = 215.9;
const pdfHeight = 279.4;
const MARGIN_X = 14;
const PAGE_RIGHT = pdfWidth - MARGIN_X;
const PAGE_CENTER = pdfWidth / 2;

function App() {

  const [generalData, setGeneralData] = useState({
      name: "",
      email: "",
      number: "",
      location: "",
      linkedin: "",
      github: ""
    });

  // An array of educations
  const [educationData, setEducationData] = useState([]);

  const [experienceData, setExperienceData] = useState([]);

  const [projectsData, setProjectsData] = useState([]);

  const [skillsData, setSkillsData] = useState({
    languages: "",
    frameworks: "",
    developerTools: "",
    libraries: ""
  });

  const [downloadState, setDownloadState] = useState("idle"); // idle | working | done
  const [mobilePane, setMobilePane] = useState("edit"); // edit | preview

  const personalComplete = Boolean(
    generalData.name && generalData.email && generalData.number && generalData.location
  );
  const skillsComplete = Boolean(
    skillsData.languages || skillsData.frameworks || skillsData.developerTools || skillsData.libraries
  );

  const generatePDF = async () => {
      height = 42; // reset the running cursor so repeat downloads don't drift down the page
      const doc = new jsPDF({
        unit: "mm",
        format: [pdfWidth, pdfHeight] // Letter
      });

      await registerResumeFont(doc);
      doc.setFont("CMUSerif", "normal");

      createBio(doc, generalData);
      createEducations(doc, educationData);
      createJobs(doc, experienceData);
      createProjects(doc, projectsData);
      createSkills(doc, skillsData);
      doc.save("resume.pdf");
  };

  const handleDownload = async () => {
    if (downloadState === "working") return;
    setDownloadState("working");
    try {
      await generatePDF();
      setDownloadState("done");
    } catch (err) {
      console.error("Failed to generate PDF", err);
      setDownloadState("idle");
      return;
    }
    setTimeout(() => setDownloadState("idle"), 1800);
  };


  const handleGeneralChange = (field, value) => {
    setGeneralData(prev => ({ ...prev, [field]: value }));
  };

  const addEducation = (newEducation) => {
    setEducationData(prev => [...prev, newEducation]);
  };

  const addExperience = (newExp) => {
    setExperienceData(prev => [...prev, newExp]);
  };

  const addProject = (newProject) => {
    setProjectsData(prev => [...prev, newProject]);
  };

  const handleSkillsChange = (field, value) => {
    setSkillsData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-mark">
            <FileText size={20} weight="bold" color="#FFFFFF" />
          </span>
          <div className="brand-text">
            <span className="brand-name">CV Builder</span>
            <span className="brand-tag">AI-assisted resume writing</span>
          </div>
        </div>

        <div className="header-actions">
          <ProgressPill
            personalComplete={personalComplete}
            hasEducation={educationData.length > 0}
            hasExperience={experienceData.length > 0}
            hasProjects={projectsData.length > 0}
            hasSkills={skillsComplete}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleDownload}
            disabled={downloadState === "working"}
          >
            {downloadState === "working" && <SpinnerGap size={18} weight="bold" className="spin" />}
            {downloadState === "done" && <CheckCircle size={18} weight="fill" />}
            {downloadState === "idle" && <DownloadSimple size={18} weight="bold" />}
            {downloadState === "working" ? "Preparing" : downloadState === "done" ? "Downloaded" : "Download PDF"}
          </button>
        </div>
      </header>

      <div className="pane-toggle">
        <button
          type="button"
          className={`btn btn-secondary ${mobilePane === "edit" ? "is-active" : ""}`}
          onClick={() => setMobilePane("edit")}
        >
          <NotePencil size={16} weight="bold" />
          Edit
        </button>
        <button
          type="button"
          className={`btn btn-secondary ${mobilePane === "preview" ? "is-active" : ""}`}
          onClick={() => setMobilePane("preview")}
        >
          <FileText size={16} weight="bold" />
          Preview
        </button>
      </div>

      <main className="workspace" data-active-pane={mobilePane}>
        <section className="builder-pane">
          <div className="intro">
            <h1>Let's build your resume</h1>
            <p>Fill in your details below, your resume takes shape on the right as you go.</p>
          </div>

          <SectionCard
            icon={IdentificationCard}
            title="Personal details"
            subtitle="Name and contact info"
            defaultOpen
            meta={personalComplete ? <CheckCircle size={20} weight="fill" color="var(--color-accent)" /> : null}
          >
            <General formData={generalData} handleGeneralChange={handleGeneralChange} />
          </SectionCard>

          <SectionCard
            icon={GraduationCap}
            title="Education"
            subtitle="Schools, degrees, dates"
            meta={educationData.length > 0 ? <span className="section-card__badge">{educationData.length}</span> : null}
          >
            <Education addEducation={addEducation} />
          </SectionCard>

          <SectionCard
            icon={Briefcase}
            title="Work experience"
            subtitle="Roles, companies, impact"
            meta={experienceData.length > 0 ? <span className="section-card__badge">{experienceData.length}</span> : null}
          >
            <Experience addExp={addExperience}></Experience>
          </SectionCard>

          <SectionCard
            icon={FolderSimple}
            title="Projects"
            subtitle="Personal or class projects"
            meta={projectsData.length > 0 ? <span className="section-card__badge">{projectsData.length}</span> : null}
          >
            <Projects addProject={addProject} />
          </SectionCard>

          <SectionCard
            icon={Toolbox}
            title="Technical skills"
            subtitle="Languages, frameworks, tools"
            meta={skillsComplete ? <CheckCircle size={20} weight="fill" color="var(--color-accent)" /> : null}
          >
            <Skills skillsData={skillsData} handleSkillsChange={handleSkillsChange} />
          </SectionCard>
        </section>

        <section className="preview-pane">
          <div className="resume-shell">
            <p className="resume-shell-label">Live preview</p>
            <CV
              generalData={generalData}
              educationData={educationData}
              experienceData={experienceData}
              projectsData={projectsData}
              skillsData={skillsData}
              setSections={setEducationData}
              setExp={setExperienceData}
              setProjects={setProjectsData}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function ProgressPill({ personalComplete, hasEducation, hasExperience, hasProjects, hasSkills }) {
  const steps = [personalComplete, hasEducation, hasExperience, hasProjects, hasSkills];
  const done = steps.filter(Boolean).length;
  return (
    <div className="progress-pill">
      <span>{done} of {steps.length} done</span>
      <span className="progress-pill-dots">
        {steps.map((filled, i) => (
          <span key={i} className={`progress-pill-dot ${filled ? "is-filled" : ""}`} />
        ))}
      </span>
    </div>
  );
}

export default App;

// ---------------------------------------------------------------------
// PDF generation
//
// The resume is meant to match Jake Ryan's well known LaTeX resume
// template (github.com/jakeryang/resume): a single black-and-white,
// densely set page using the default LaTeX article font, Computer
// Modern. We embed a subsetted copy of that font (CMU Serif) into the
// PDF so the download genuinely matches the on-screen preview, rather
// than approximating with a built-in PDF font.
// ---------------------------------------------------------------------

function bytesToBase64(buffer) {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

async function registerResumeFont(doc) {
  const files = [
    ["cmu-serif-500-roman.subset.ttf", "normal"],
    ["cmu-serif-500-italic.subset.ttf", "italic"],
    ["cmu-serif-700-roman.subset.ttf", "bold"],
    ["cmu-serif-700-italic.subset.ttf", "bolditalic"],
  ];

  for (const [file, style] of files) {
    const res = await fetch(`/fonts/cmu-serif/${file}`);
    const buffer = await res.arrayBuffer();
    const base64 = bytesToBase64(buffer);
    doc.addFileToVFS(file, base64);
    doc.addFont(file, "CMUSerif", style);
  }
}

function toAbsoluteUrl(value) {
  if (!value) return "";
  return value.startsWith("http") ? value : `https://${value.replace(/^\/+/, "")}`;
}

// Draws a centered row of " | "-separated segments, underlining and
// linking any segment that has a url (mirrors the template's
// \href{...}{\underline{...}} contact line).
function drawContactRow(doc, segments, y, fontSize) {
  if (segments.length === 0) return;
  doc.setFont("CMUSerif", "normal");
  doc.setFontSize(fontSize);

  const sep = "    ";
  const sepWidth = doc.getTextWidth(sep);
  const widths = segments.map((s) => doc.getTextWidth(s.text));
  const totalWidth = widths.reduce((a, b) => a + b, 0) + sepWidth * (segments.length - 1);

  let x = PAGE_CENTER - totalWidth / 2;
  segments.forEach((seg, i) => {
    if (seg.url) {
      doc.textWithLink(seg.text, x, y, { url: seg.url });
      doc.setDrawColor(0);
      doc.setLineWidth(0.1);
      doc.line(x, y + 0.7, x + widths[i], y + 0.7);
    } else {
      doc.text(seg.text, x, y);
    }
    x += widths[i];
    if (i < segments.length - 1) {
      doc.text("|", x + sepWidth / 2 - doc.getTextWidth("|") / 2, y);
      x += sepWidth;
    }
  });
}

function sectionHeading(doc, label, y) {
  doc.setFont("CMUSerif", "bold");
  doc.setFontSize(13);
  doc.text(label.toUpperCase(), MARGIN_X, y);
  doc.setDrawColor(0);
  doc.setLineWidth(0.35);
  doc.line(MARGIN_X, y + 1.6, PAGE_RIGHT, y + 1.6);
}

function createBio(doc, generalData) {
  doc.setFont("CMUSerif", "bold");
  doc.setFontSize(26);
  doc.text((generalData.name || "").toUpperCase(), PAGE_CENTER, 20, { align: "center" });

  const segments = [
    generalData.number ? { text: generalData.number } : null,
    generalData.email ? { text: generalData.email, url: `mailto:${generalData.email}` } : null,
    generalData.location ? { text: generalData.location } : null,
    generalData.linkedin ? { text: generalData.linkedin.replace(/^https?:\/\//, ""), url: toAbsoluteUrl(generalData.linkedin) } : null,
    generalData.github ? { text: generalData.github.replace(/^https?:\/\//, ""), url: toAbsoluteUrl(generalData.github) } : null,
  ].filter(Boolean);

  drawContactRow(doc, segments, 27, 10);

  doc.setDrawColor(0);
  doc.setLineWidth(0.3);
  doc.line(MARGIN_X, 33, PAGE_RIGHT, 33);
}

let height = 42;

function createEducations(doc, educationData) {
  if (educationData.length === 0) return;
  sectionHeading(doc, "Education", height);
  height += 7;

  educationData.forEach((section) => {
    doc.setFont("CMUSerif", "bold");
    doc.setFontSize(11);
    doc.text(section.school, MARGIN_X, height);
    doc.setFont("CMUSerif", "normal");
    doc.text(section.city || "", PAGE_RIGHT, height, { align: "right" });
    height += 5;

    doc.setFont("CMUSerif", "italic");
    doc.setFontSize(9.5);
    const degreeLine = section.gpa ? `${section.degree} (GPA: ${section.gpa})` : section.degree;
    doc.text(degreeLine, MARGIN_X, height);
    doc.text(`${formatDateUS(section.sDate)} \u2013 ${formatDateUS(section.eDate)}`, PAGE_RIGHT, height, { align: "right" });
    height += 6.5;
  });
  height += 2;
}

function createJobs(doc, experienceData) {
  if (experienceData.length === 0) return;
  sectionHeading(doc, "Experience", height);
  height += 7;

  experienceData.forEach((section) => {
    doc.setFont("CMUSerif", "bold");
    doc.setFontSize(11);
    doc.text(section.job, MARGIN_X, height);
    doc.setFont("CMUSerif", "normal");
    doc.text(`${formatDateUS(section.sDate)} \u2013 ${formatDateUS(section.eDate)}`, PAGE_RIGHT, height, { align: "right" });
    height += 5;

    doc.setFont("CMUSerif", "italic");
    doc.setFontSize(9.5);
    doc.text(section.company, MARGIN_X, height);
    doc.text(section.address || "", PAGE_RIGHT, height, { align: "right" });
    height += 5.5;

    if (section.descrip) {
      doc.setFont("CMUSerif", "normal");
      doc.setFontSize(9.5);
      const bulletX = MARGIN_X + 4;
      doc.text("\u2022", MARGIN_X + 1, height);
      const lines = doc.splitTextToSize(section.descrip, PAGE_RIGHT - bulletX);
      doc.text(lines, bulletX, height);
      height += lines.length * 4.3 + 2;
    } else {
      height += 1.5;
    }
  });
  height += 2;
}

function createProjects(doc, projectsData) {
  if (projectsData.length === 0) return;
  sectionHeading(doc, "Projects", height);
  height += 7;

  projectsData.forEach((section) => {
    doc.setFont("CMUSerif", "bold");
    doc.setFontSize(11);
    doc.text(section.name, MARGIN_X, height);
    const nameWidth = doc.getTextWidth(section.name + " ");

    if (section.technologies) {
      doc.setFont("CMUSerif", "italic");
      doc.setFontSize(9.5);
      doc.text(`| ${section.technologies}`, MARGIN_X + nameWidth, height);
    }

    doc.setFont("CMUSerif", "normal");
    doc.setFontSize(11);
    doc.text(`${formatDateUS(section.sDate)} \u2013 ${formatDateUS(section.eDate)}`, PAGE_RIGHT, height, { align: "right" });
    height += 5.5;

    if (section.descrip) {
      doc.setFont("CMUSerif", "normal");
      doc.setFontSize(9.5);
      const bulletX = MARGIN_X + 4;
      doc.text("\u2022", MARGIN_X + 1, height);
      const lines = doc.splitTextToSize(section.descrip, PAGE_RIGHT - bulletX);
      doc.text(lines, bulletX, height);
      height += lines.length * 4.3 + 2;
    } else {
      height += 1.5;
    }
  });
  height += 2;
}

function createSkills(doc, skillsData) {
  const rows = [
    ["Languages", skillsData.languages],
    ["Frameworks", skillsData.frameworks],
    ["Developer Tools", skillsData.developerTools],
    ["Libraries", skillsData.libraries],
  ].filter(([, value]) => value);

  if (rows.length === 0) return;
  sectionHeading(doc, "Technical Skills", height);
  height += 7;

  rows.forEach(([label, value]) => {
    doc.setFont("CMUSerif", "bold");
    doc.setFontSize(9.5);
    doc.text(`${label}: `, MARGIN_X, height);
    const labelWidth = doc.getTextWidth(`${label}: `);
    doc.setFont("CMUSerif", "normal");
    doc.text(value, MARGIN_X + labelWidth, height);
    height += 5;
  });
}
