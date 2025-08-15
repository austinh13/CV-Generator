import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Dropdown from './components/Dropdown'
import General from './components/General'
import Education from './components/Education'
function App() {
  const [count, setCount] = useState(0);
  const [generalData, setGeneralData] = useState({
      name: "",
      email: "",
      number: "",
      location: ""
    });
  const [educationData, setEducationData] = useState({
    degree: "",
    school: "",
    sDate: "",
    eDate: ""
  })

  const handleGeneralChange = (field, value) => {
    setGeneralData(prev => ({ ...prev, [field]: value }));
  };

  const handleEducation = (field,value) => {
    setEducationData(prev => ({...prev,[field]: value}))
  }

  return (
    <>
    <div className="leftSide">
      <div className="save">
        <p>Download Resume!</p>
        <button>Download</button>
      </div>
      <General formData={generalData} handleGeneralChange={handleGeneralChange}></General>
      <Education formData={educationData} handleEducation={handleEducation}></Education>
    </div>
    <div className = "rightSide">

    </div>
    </>
    
  );
}

export default App;
