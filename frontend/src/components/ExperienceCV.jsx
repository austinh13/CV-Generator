import { Briefcase, Trash } from "@phosphor-icons/react";

export default function ExperienceCV({ sections, setExp }) {

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
    <div className="resume-section">
      <h2 className="resume-section-title">
        <Briefcase size={18} weight="bold" />
        Work Experience
      </h2>

      {sections.length === 0 ? (
        <div className="resume-empty">
          <Briefcase size={28} weight="light" />
          <p>Add a role on the left and we'll lay it out here automatically.</p>
        </div>
      ) : (
        <div className="resume-list">
          {sections.map((sec, index) => (
            <div key={index} className="resume-item">
              <div className="resume-item-main">
                <p className="resume-item-title">{sec.job} · {sec.company}</p>
                <p className="resume-item-sub">{sec.address}</p>
                <p className="resume-item-desc">{sec.descrip}</p>
                <p className="resume-item-meta">{formatDateUS(sec.sDate)} – {formatDateUS(sec.eDate)}</p>
              </div>
              <button
                type="button"
                className="resume-item-delete"
                aria-label={`Remove ${sec.job} at ${sec.company}`}
                onClick={() => handleDelete(index)}
              >
                <Trash size={15} weight="bold" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
