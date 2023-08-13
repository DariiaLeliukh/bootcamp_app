const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
});

const arguments = process.argv.slice(2, process.argv.length);
let requestedCohort = arguments[0] || 'JUL02';
pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM assistance_requests
JOIN teachers ON assistance_requests.teacher_id = teachers.id
JOIN students ON assistance_requests.student_id = students.id
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name = $1
ORDER BY teacher;`, [requestedCohort])
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => console.error('query error', err.stack));