import { useState, useEffect } from "react";
import jobs from '../jobs.json';

async function rewriteDescription(description) {
  const res = await fetch("http://localhost:3000/api/rewrite-description", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });

  let data = {};
  try {
    data = await res.json();
  } catch (err) {
    console.error("Failed to parse JSON:", err);
  }

  return data.rewritten || description;

}

function findJob(title) {
  const lowerTitle = title.toLowerCase();
  return jobs.find(job => {
    const jobTitle = job.title.toLowerCase();
    return jobTitle.includes(lowerTitle) || jobTitle.includes(lowerTitle + "s");
  });
}

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
              {sec.descrip.toLowerCase() === "suggested"
                ? (findJob(sec.job)?.description || "No description found!")
                : (rewrittenDescriptions[index] || "Loading...")}
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
