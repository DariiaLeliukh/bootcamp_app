const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'bootcampx',
  port: 5432
});

const arguments = process.argv.slice(2, process.argv.length);

if (arguments.length === 2) {
  let requestedCohort = arguments[0];
  let limit = arguments[1];
  pool.query(`
  SELECT students.id, students.name as student_name, cohorts.name as cohort_name 
  FROM students 
  JOIN cohorts ON cohorts.id = students.cohort_id 
  WHERE cohorts.name LIKE '%${requestedCohort}%'
  LIMIT ${limit};`)
    .then(res => {
      console.log(res.rows);
    })
    .catch(err => console.error('query error', err.stack));
} else if (arguments.length > 0 && arguments.length !== 2) {
  console.log('Too many or too little arguments');
} else {
  pool.query(`
SELECT students.id, students.name as student_name, cohorts.name as cohort_name 
FROM students 
JOIN cohorts ON cohorts.id = students.cohort_id 
LIMIT 5;`)
    .then(res => {
      console.log(res.rows);
    })
    .catch(err => console.error('query error', err.stack));
}
