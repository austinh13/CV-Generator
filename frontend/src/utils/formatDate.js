// Converts an <input type="date"> value ("YYYY-MM-DD") to "MM/DD/YYYY".
// Returns an empty string for missing/invalid input.
export function formatDateUS(dateString) {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    if (!year || !month || !day) return dateString;
    return `${month}/${day}/${year}`;
}
