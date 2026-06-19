import '../styles/resume.css'
import GeneralCV from './GeneralCV'
import EducationCV from './EducationCV'
import ExperienceCV from './ExperienceCV';
import ProjectsCV from './ProjectsCV';
import SkillsCV from './SkillsCV';

export default function CV({
    generalData,
    educationData,
    experienceData,
    projectsData,
    skillsData,
    setSections,
    setExp,
    setProjects
}) {
    return (
        <div className="resume">
            <GeneralCV data={generalData}></GeneralCV>
            <EducationCV sections={educationData} setSections={setSections}></EducationCV>
            <ExperienceCV sections={experienceData} setExp={setExp}></ExperienceCV>
            <ProjectsCV sections={projectsData} setSections={setProjects}></ProjectsCV>
            <SkillsCV data={skillsData}></SkillsCV>
        </div>
    );
}
