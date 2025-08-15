import '../styles/cv.css'
import GeneralCV from './GeneralCV'
import EducationCV from './EducationCV'
export default function CV({generalData,educationData}){
    return(
        <div className="ResumeHolder">
            <GeneralCV data={generalData}></GeneralCV>
            <EducationCV sections={educationData} ></EducationCV>
        </div>
    );
}
