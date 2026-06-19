export default function SkillsCV({ data }) {
  const rows = [
    { label: "Languages", value: data?.languages },
    { label: "Frameworks", value: data?.frameworks },
    { label: "Developer Tools", value: data?.developerTools },
    { label: "Libraries", value: data?.libraries },
  ].filter(row => row.value);

  return (
    <div className="resume-section">
      <h2 className="resume-section-title">Technical Skills</h2>

      {rows.length === 0 ? (
        <p className="resume-empty-line">Add your skills on the left to see them appear here.</p>
      ) : (
        <div>
          {rows.map((row, i) => (
            <p key={i} className="resume-skills-line">
              <span className="resume-strong">{row.label}</span>: {row.value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
