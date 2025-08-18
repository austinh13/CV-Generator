
import { useState } from 'react';
import General from './components/General'
import Education from './components/Education'
import CV from './components/CV'
import Experience from './components/Experience';
import { jsPDF } from "jspdf";

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

  const generatePDF = () => {
      const doc = new jsPDF({
        unit: "mm",
        format: [215.9, 279.4] // Letter
      });

      doc.setFont("times", "normal"); // Optional: set style ("normal", "bold", "italic", "bolditalic")


      createBio(doc,generalData);
      createEducations(doc,educationData);
      createJobs(doc,experienceData);
      doc.save("resume.pdf");
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
    <>
    <div className="leftSide">
      <div className="save">
        <p>Download Resume!</p>
        <button id = "saveButton" onClick={(generatePDF)}>Download</button>
      </div>
      <General formData={generalData} handleGeneralChange={handleGeneralChange} />
      <Education addEducation={addEducation} />
      <Experience addExp={addExpereince}></Experience>
    </div>

      <div className="rightSide">
        <CV generalData={generalData} educationData={educationData} experienceData={experienceData} setSections ={setEducationData} setExp ={setExperienceData} />
      </div>
    </>
    
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
    console.log(section.descrip.length);
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