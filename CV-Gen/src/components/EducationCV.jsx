export default function EducationCV({ sections }) {
  return (
    <div className="educationSection">
      {sections.map((sec, index) => (
        
        <div className = "educationTab">
          <div key={index} className="educationItem">
            <h4>{sec.school}, {sec.city}</h4>
            <p>A {sec.degree} Degree</p>
            <p>From: {sec.sDate} To: {sec.eDate}</p>
            <p>GPA: {sec.gpa}</p>
          </div>
          <button className = "deleteEducation" onClick={
              (e) => e.target.parentNode.remove()}>
          Delete</button>

        </div>
        
      ))}
    </div>
  );
}
