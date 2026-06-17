import jobs from '../jobs.json';

// https://cv-generator-sz5i.onrender.com/api/rewrite-description
export async function rewriteDescription(description) {
  const res = await fetch("https://cv-generator-sz5i.onrender.com/api/rewrite-description", {
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

export function findJob(title) {
  const lowerTitle = title.toLowerCase();
  return jobs.find(job => {
    const jobTitle = job.title.toLowerCase();
    return jobTitle.includes(lowerTitle) || jobTitle.includes(lowerTitle + "s");
  });
}
