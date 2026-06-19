import { Trash } from "@phosphor-icons/react";
import { formatDateUS } from "../utils/formatDate";

export default function ProjectsCV({ sections, setSections }) {

  const handleDelete = (indexToDelete) => {
    setSections(prevSections =>
      prevSections.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="resume-section">
      <h2 className="resume-section-title">Projects</h2>

      {sections.length === 0 ? (
        <p className="resume-empty-line">Add a project on the left to see it appear here.</p>
      ) : (
        <div className="resume-entries">
          {sections.map((sec, index) => (
            <div key={index} className="resume-entry">
              <div className="resume-row">
                <span className="resume-row-left">
                  <span className="resume-strong">{sec.name}</span>
                  {sec.technologies && <span className="resume-em"> | {sec.technologies}</span>}
                </span>
                <span className="resume-row-right">{formatDateUS(sec.sDate)} &ndash; {formatDateUS(sec.eDate)}</span>
              </div>
              {sec.descrip && (
                <ul className="resume-bullets">
                  <li>{sec.descrip}</li>
                </ul>
              )}
              <button
                type="button"
                className="resume-item-delete"
                aria-label={`Remove ${sec.name}`}
                onClick={() => handleDelete(index)}
              >
                <Trash size={13} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
