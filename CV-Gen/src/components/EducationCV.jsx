export default function EducationCV({ sections , setSections}) {

    const formatDateUS = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${month}/${day}/${year}`;
    };

  const handleDelete = (indexToDelete) => {
    setSections(prevSections =>
      prevSections.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="educationSection">
      {sections.map((sec, index) => (
        <div className = "educationTab">
          <div key={index} className="educationItem">
            <h4>{sec.school}, {sec.city}</h4>
            <p>A {sec.degree} Degree</p>
            <p>From: {formatDateUS(sec.sDate)} To: {formatDateUS(sec.eDate)}</p>
            <p>GPA: {sec.gpa}</p>
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
