import fs from  'fs'

const sql =fs.readFileSync('jobs.sql','utf8')

const insertRegex = /INSERT INTO occupation_data .*?VALUES\s*\((.*?)\);/gs;
const inserts = [...sql.matchAll(insertRegex)];


const jobs = inserts.map(match =>{
    const values = match[1].split(/',(?:\s*)'/).map(v => v.replace(/^'|'$/g, '').trim());

     return {
        onetsoc_code: values[0],
        title: values[1],
        description: values[2]
    };
})

fs.writeFileSync('jobs.json', JSON.stringify(jobs, null, 2));
console.log(`Converted ${jobs.length} jobs to jobs.json`);
