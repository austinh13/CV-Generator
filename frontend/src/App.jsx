
import { useState } from 'react';
import General from './components/General'
import Education from './components/Education'
import CV from './components/CV'
import Experience from './components/Experience';
import SectionCard from './components/SectionCard';
import { jsPDF } from "jspdf";
import {
  DownloadSimple,
  CheckCircle,
  SpinnerGap,
  IdentificationCard,
  GraduationCap,
  Briefcase,
  NotePencil,
  FileText,
} from "@phosphor-icons/react";

const pdfWidth = 215.9;
const pdfHeight = 279.4;
function App() {

  const [generalData, setGeneralData] = useState({
      name: "",
      email: "",
      number: "",
      location: ""
    });

  // An array of educations
  const [educationData, setEducationData] = useState([]);

  const [experienceData, setExperienceData] = useState([]);

  const [downloadState, setDownloadState] = useState("idle"); // idle | working | done
  const [mobilePane, setMobilePane] = useState("edit"); // edit | preview

  const personalComplete = Boolean(
    generalData.name && generalData.email && generalData.number && generalData.location
  );

  const generatePDF = () => {
      height = 55; // reset the running cursor so repeat downloads don't drift down the page
      const doc = new jsPDF({
        unit: "mm",
        format: [pdfWidth, pdfHeight] // Letter
      });

      doc.setFont("times", "normal"); // Optional: set style ("normal", "bold", "italic", "bolditalic")


      createBio(doc,generalData);
      createEducations(doc,educationData);
      createJobs(doc,experienceData);
      doc.save("resume.pdf");
  };

  const handleDownload = () => {
    if (downloadState === "working") return;
    setDownloadState("working");
    // let the UI paint the "working" state before the (synchronous) PDF build runs
    requestAnimationFrame(() => {
      generatePDF();
      setDownloadState("done");
      setTimeout(() => setDownloadState("idle"), 1800);
    });
  };


  const handleGeneralChange = (field, value) => {
    setGeneralData(prev => ({ ...prev, [field]: value }));
  };

  const addEducation = (newEducation) => {
    setEducationData(prev => [...prev, newEducation]);
  };

  const addExpereince = (newExp) => {
    setExperienceData(prev => [...prev, newExp]);
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
            <Experience addExp={addExpereince}></Experience>
          </SectionCard>
        </section>

        <section className="preview-pane">
          <div className="resume-shell">
            <p className="resume-shell-label">Live preview</p>
            <CV
              generalData={generalData}
              educationData={educationData}
              experienceData={experienceData}
              setSections={setEducationData}
              setExp={setExperienceData}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function ProgressPill({ personalComplete, hasEducation, hasExperience }) {
  const steps = [personalComplete, hasEducation, hasExperience];
  const done = steps.filter(Boolean).length;
  return (
    <div className="progress-pill">
      <span>{done} of 3 done</span>
      <span className="progress-pill-dots">
        {steps.map((filled, i) => (
          <span key={i} className={`progress-pill-dot ${filled ? "is-filled" : ""}`} />
        ))}
      </span>
    </div>
  );
}

export default App;

function createBio(doc,generalData){
      doc.setFontSize(23);
      doc.setFont("times","bold");
      doc.text(`${generalData.name}`,90,20);

      doc.setFont("times","normal");
      doc.setFontSize(14);
      doc.text(`${generalData.email}  |  ${generalData.number}  |  ${generalData.location}`, 45, 30);

      doc.setLineWidth(0.3);
      doc.line(10, 37, pdfWidth - 10, 37); 
}

let height = 55;

function createEducations(doc,educationData){
    doc.setFontSize(18);
    doc.text("Education",(pdfWidth/2) - 15,45);
    educationData.forEach((section) =>{
      doc.setFontSize(14);
      doc.setFont("times","bold");
      doc.text(`${section.school} - ${section.city}`,12,height);
      height+=7;
      doc.setFontSize(13);
      doc.setFont("times","normal");
      doc.text(`${section.degree},  ${section.sDate} to ${section.eDate}`,12,height);
      height+=7;
      doc.text(`GPA: ${section.gpa}`,12,height);
      height+=9;
    })
    
    doc.setLineWidth(0.3);
    doc.line(10, height-4, pdfWidth - 10, height-4); 
    height+=5;
}

function createJobs(doc,experienceData){
  doc.setFontSize(18)
  doc.text("Experience",(pdfWidth/2)-15,height)
  height+=9;
  experienceData.forEach((section)=>{
    doc.setFontSize(14);
    doc.setFont("times","bold");
    doc.text(`${section.job} at ${section.company} - ${section.address}`,12,height)
    height+=7;
    doc.setFont("times","normal");
    doc.text(`${section.descrip}`,12,height, { maxWidth: 200 })
    if(section.descrip.length >= 180){
      height+=18;
    }
    else if(section.descrip.length >= 100){
      height += 13;
    }
    else{
    height+=7;
    }
    doc.text(`From: ${section.sDate} to ${section.eDate}`,12,height)
    height+=9;
  })
}
