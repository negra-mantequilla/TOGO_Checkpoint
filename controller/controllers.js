
const connection = require('../SQL/connection')

const mysql = require('mysql')

const getUsers = (req,res)=>{
  console.log('Inside get /TODOList')
  let sql = 'SELECT * FROM TODO_LIST'
  connection.query(sql, function(err, rows){
      if (err){
        console.log(err.sqlMessage)
        res.status(500).send('Did not get rows')
      }
      res.json(rows)
  })
}


const getUserById = (req,res)=>{
  const {id} = req.params
  console.log(id);
  let sql = 'SELECT * FROM TODO_LIST WHERE TODO_ID = ?'
  connection.query(sql, [id], function(err, results){
    if (err){
      console.log(err.sqlMessage)
      res.status(500).send('Did not get correct id')
    } 
    if (results.length == 0){
      return res.json('does not exist')
    }
    res.json(results)
  })
}

function addTODO(req, res) {
  console.log('Inside add TODO route', req.body);
  const {TODO_ITEMS} = req.body
  console.log(TODO_ITEMS);
  let sql = 'INSERT INTO TODO_LIST (TODO_ITEMS) VALUES (?)'
  // We are calling mysql to handle our sql injection
  const body = mysql.format(sql, TODO_ITEMS)
  connection.query(body, (err, results)=>{
    if (err){
      console.log(err.sqlMessage)
      res.status(500).send('Did not get correct body info')
    } 
    res.json(`Inserted TODO at ${results.insertId}`)
  })
}


function deleteTODO(req, res) {
  const id = req.params.id
  console.log(id);
  let sql = 'DELETE FROM TODO_LIST WHERE TODO_ID = ?'
  connection.query(sql, [id], function(err, results){
    if (err){
      console.log(err.sqlMessage)
      res.status(500).send(err.sqlMessage)
    } if(results.affectedRows == 0) {
      return res.status(501).send('ID does not exist')
    }
  res.json(`Deleted Item at ${id}`)
  })
}


function updateTODO(req, res) {
  const id = req.params.id
  const body = req.body.TODO_ITEMS
  console.log(id, body);
  
  let sql = 'UPDATE TODO_LIST SET TODO_ITEMS = ? WHERE TODO_ID = ?'
  connection.query(sql, [body, id], function(err, results){
    if (err){
      console.log(err.sqlMessage)
      return res.status(500).send(err.sqlMessage)
    } 
    console.log(results);
    if(results.changedRows == 0) {
      return res.status(501).send('No changes were made')
    } if(results.affectedRows == 0){
      return res.status(501).send('ID does not exist')
    }
  res.json(`Updated Item at ${id}`)
  })
}


module.exports = {getUsers, getUserById, addTODO, deleteTODO, updateTODO}