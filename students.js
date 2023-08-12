const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
});


pool.query(`
SELECT students.id, students.name as student_name, cohorts.name as cohort_name 
FROM students 
JOIN cohorts ON cohorts.id = students.cohort_id 
LIMIT 5;`)
  .then(res => {
    console.log(res.rows);
  })
  .catch(err => console.error('query error', err.stack));