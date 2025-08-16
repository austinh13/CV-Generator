
import { useState } from 'react';
import General from './components/General'
import Education from './components/Education'
import CV from './components/CV'
import Experience from './components/Experience';
import { jsPDF } from "jspdf";

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
      const doc = new jsPDF();

      doc.setFontSize(16);
      doc.text(`Name: ${generalData.name}`,10,20);
      doc.text(`Email: ${generalData.email}`, 10, 30);

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
      <Experience addExpereince={addExpereince}></Experience>
    </div>

      <div className="rightSide">
        <CV generalData={generalData} educationData={educationData} setSections ={setEducationData} />
      </div>
    </>
    
  );
}

export default App;
