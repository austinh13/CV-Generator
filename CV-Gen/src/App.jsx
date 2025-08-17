
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
      doc.setFontSize(25);
      doc.text(`${generalData.name}`,90,20);

      doc.setFontSize(14);
      doc.text(`${generalData.email}  |  ${generalData.number}  |  ${generalData.location}`, 45, 30);

      doc.setLineWidth(0.5); // thin line
      doc.line(10, 40, pdfWidth - 10, 40); // from left margin to right margin
}