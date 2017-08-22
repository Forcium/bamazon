var mysql = require('mysql');
var prompt = require('prompt');
var Table = require("cli-table");
prompt.message = "";

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bamazonDB'
});

function showInventory() {

  var queryData = "SELECT * FROM products";

  connection.query(queryData, function(err, getBack) {
    if (err) throw err;

    if (!err) {

      console.log("\n\n");

      var saleTable = new Table({
        head: ["ID", "Product Name", "Department Name", "Price", "# In Stock"],
        colWidths: [5, 27, 18, 10, 12]
      });

      for (shop in getBack) {
        saleTable.push([getBack[shop].item_id, getBack[shop].product_name, getBack[shop].department_name, getBack[shop].price, getBack[shop].stock_quantity]);

      }
      console.log(saleTable.toString());

      console.log("Choose ID of product to buy");
      console.log("Choose quantity of this product to buy");

      prompt.get(["product_id", "quantity"], function(err, result) {

        queryData = "SELECT * FROM products WHERE item_id=" + result.product_id;

        connection.query(queryData, function(err, getBack) {
          if (err) throw err;

          if (!err) {
            var totalAvail = getBack[0].stock_quantity;

            if (totalAvail >= result.quantity) {

              var saleTotal = getBack[0].price * result.quantity;
              var itemDept = getBack[0].department_name;
              console.log("\n Total cost of purchase: $" + saleTotal + "\n");

              var totalLeft = getBack[0].stock_quantity - result.quantity;

              queryData = "UPDATE products SET stock_quantity=" + totalLeft + " WHERE item_id=" + result.product_id;

              connection.query(queryData, function(err, updateBack) {
                if (err) throw err;

                if (updateBack.changedRows == 1) console.log("Updated stock quantity!");


                queryData = "SELECT SUM(total_sales) AS total_sales FROM departments WHERE department_name='" + itemDept + "'";

                connection.query(queryData, function(err, getBack) {
                  if (err) throw err;

                  if (getBack[0].total_sales != undefined) {
                    var sumSales = getBack[0].total_sales;
                    sumSales += saleTotal;
                  } else {
                    sumSales = 1;
                  }

                  queryData = "UPDATE departments SET total_sales=" + sumSales + " WHERE department_name='" + itemDept + "'";

                  connection.query(queryData, function(err, getBack) {
                    if (err) throw err;
                    prompt.get("[ENTER to continue]", function(err, ok) {
                      showInventory();
                    });
                  });
                });
              });
            } else {
              console.log("Sorry, we don't have that many " + getBack[0].product_name + " in stock!");
              showInventory();
            }
          }
        });
      });
    }
  });
}

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  prompt.start();
  showInventory();

});
