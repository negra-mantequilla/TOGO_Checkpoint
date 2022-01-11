// const {createPool} = require('mysql')
// const mysql = require('mysql')
const {createConnection} = require('mysql')

let connection = createConnection({
  host: 'database-3.cz4udqblsmpm.us-east-2.rds.amazonaws.com',
  user: 'admin',
  password: 'Jp96860463',
  database: 'ToDo_Table'
})

module.exports = connection