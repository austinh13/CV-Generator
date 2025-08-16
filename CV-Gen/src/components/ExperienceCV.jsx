import jobs from '../jobs.json';

function findJob(title) {
  const lowerTitle = title.toLowerCase();
  
  return jobs.find(job => {
    const jobTitle = job.title.toLowerCase();
    // Match if the title includes the word or plural
    return jobTitle.includes(lowerTitle) || jobTitle.includes(lowerTitle + "s");
  });
}

export default function ExperienceCV({sections, setExp}){
  const formatDateUS = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleDelete = (indexToDelete) => {
    setExp(prevSections =>
      prevSections.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className = "experienceSection">
        <h2>Experience</h2>
       {sections.map((sec,index) => (
          <div className = "experienceTab">
            <div key={index} className="experienceUnit">
              <h4>{sec.job} at {sec.company}, {sec.address}</h4>
              <p>
                {sec.descrip.toLowerCase() === "suggested" ?
                
                (findJob(sec.job)?.description|| "No description found!") : (sec.descrip)}
                
              </p>
              <p>From: {formatDateUS(sec.sDate)} To: {formatDateUS(sec.eDate)}</p>
            </div>
            <button
              className="deleteEducation"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>    
       ))}
    </div>
  );
}

