import '../styles/resume.css'
import GeneralCV from './GeneralCV'
import EducationCV from './EducationCV'
import ExperienceCV from './ExperienceCV';
export default function CV({generalData,educationData,experienceData,setSections,setExp}){
    return(
        <div className="resume">
            <GeneralCV data={generalData}></GeneralCV>
            <EducationCV sections={educationData} setSections={setSections}></EducationCV>
            <ExperienceCV sections={experienceData} setExp={setExp}></ExperienceCV>
        </div>
    );
}
