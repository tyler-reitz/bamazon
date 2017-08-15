const mysql = require('mysql')
const inquirer = require('inquirer')
const { table } = require('ascii-art')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'G1n&J00$3',
  database: 'bamazon_db',
  multipleStatements: true
})

/**
 * Main program
 */

connection.connect()

connection.query('SELECT * FROM products', (e,r,f) => {
  if (e) throw e
  
  const q = r.map(d => getObjVals(d))
    
  table({ 
    data: q
  }, (params) => {
    console.log(params)
    order()  
  })
})

/**
 * Inquirer
 */

const order = () => {
  inquirer
    .prompt([
      {
        name: "product_id",
        message: "What is the ID of the product"
      },
      {
        name: "unit_qty",
        message: "How many units would you like to purchase"
      }
    ])
    .then(ans => {
      getItems(ans)
    });
}

const getItems = (order) => {
  connection.query('SELECT * FROM products WHERE item_id = ?', [order.product_id], (e,r,f) => {
      if (e) throw e
      const cust_qty = order.unit_qty

      if (order.unit_qty > r[0].stock_quantity) {
        return console.log('Insufficient quantity!')
      }

      order.unit_qty = r[0].stock_quantity - order.unit_qty

      fillOrder(order, cust_qty)
  })
}

const fillOrder = ({ product_id, unit_qty }, cust_qty) => {
  connection.query(
    'UPDATE products SET stock_quantity = ? WHERE item_id = ?; SELECT * FROM products WHERE item_id = ' + product_id, 
    [unit_qty, product_id], 
    
    (e,r,f) => {
      if (e) throw e
      
      const q = r[1].map(d => getObjVals(d))
      
      table({ data: q }, (params) => {
        console.log(params)

        console.log(r[1][0].price, cust_qty, r[1][0].price * cust_qty)
      })
    }
  )
}


/**
 * Helpers
 * @param {*object} d 
 */

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