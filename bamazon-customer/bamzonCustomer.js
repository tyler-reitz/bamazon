const mysql = require('mysql')
const inquirer = require('inquirer')
const { table } = require('ascii-art')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'G1n&J00$3',
  database: 'bamazon_db'
})

connection.connect()

connection.query('SELECT * FROM products', (e,r,f) => {
  if (e) throw e
  
  const q = r.map(d => getObjVals(d))
    
  table({ 
    data: q 
  }, (params) => {
    console.log(params)  
  })
})

connection.end()

const getObjVals = (d) => {
  for (var p in d) {
    if (d.hasOwnProperty(p)) {
      var element = d[p];
      d[p] = checkType(element)
    }
  }
  return d
}

const checkType = (el) => (typeof el === 'number') ? numToString(el) : el

const numToString = (num) => num.toString()