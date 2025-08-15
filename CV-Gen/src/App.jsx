
import { useState } from 'react';
import General from './components/General'
import Education from './components/Education'
import CV from './components/CV'


function App() {

  const [generalData, setGeneralData] = useState({
      name: "",
      email: "",
      number: "",
      location: ""
    });

  // An array of educations
  const [educationData, setEducationData] = useState([]);


  const handleGeneralChange = (field, value) => {
    setGeneralData(prev => ({ ...prev, [field]: value }));
  };

  const addEducation = (newEducation) => {
    setEducationData(prev => [...prev, newEducation]);
  };


  return (
    <>
    <div className="leftSide">
      <div className="save">
        <p>Download Resume!</p>
        <button>Download</button>
      </div>
       <General formData={generalData} handleGeneralChange={handleGeneralChange} />

        <Education addEducation={addEducation} />
      </div>

      <div className="rightSide">
        <CV generalData={generalData} educationData={educationData} />
      </div>
    </>
    
  );
}

export default App;
