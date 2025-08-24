import { useState, useEffect } from "react";
import jobs from '../jobs.json';



export default function ExperienceCV({ sections, setExp }) {
  const [rewrittenDescriptions, setRewrittenDescriptions] = useState({});

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

  // Rewrite descriptions on mount
  useEffect(() => {
    sections.forEach(async (sec, index) => {
      if (sec.descrip.toLowerCase() !== "suggested") {
        const rewritten = await rewriteDescription(sec.descrip);
        setRewrittenDescriptions(prev => ({ ...prev, [index]: rewritten }));
      }
    });
  }, [sections]);

  return (
    <div className="experienceSection">
      <h2>Experience</h2>
      {sections.map((sec, index) => (
        <div key={index} className="experienceTab">
          <div className="experienceUnit">
            <h4>{sec.job} at {sec.company}, {sec.address}</h4>
            <p>
              {sec.descrip}
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
