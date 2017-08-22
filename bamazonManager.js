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

function showallProducts(nomenu, executeThis) {
  var queryData = "SELECT * FROM products";

  connection.query(queryData, function(err, getBack) {
    if (err) throw err;

    if (!err) {
      // console.log("\nItemID ... Product Name ... Dept Name ... Price ... Quantity in Stock");

      var saleTable = new Table({
        head: ["ID", "Product Name", "Department Name", "Price", "# In Stock"],
        colWidths: [5, 27, 18, 10, 12]
      });

      for (shop in getBack) {
        saleTable.push([getBack[shop].item_id, getBack[shop].product_name, getBack[shop].department_name, getBack[shop].price, getBack[shop].stock_quantity]);
      }
      console.log(saleTable.toString());
      try {
        if (executeThis) executeThis();
      } catch (e) {
        menu();
      }

    }

    if (!nomenu) menu();
  });
}

function viewlowInventory() {

  var queryData = "SELECT * FROM products WHERE stock_quantity < 5";

  connection.query(queryData, function(err, getBack) {
    if (err) throw err;

    if (!err) {

      if (getBack[0] == undefined) {
        console.log("\nYou have no items that are low in stock.\n");
      } else {
        console.log("Inventory Low.  Less than 5 items in stock.");
        var saleTable = new Table({
          head: ["ID", "Product Name", "Department Name", "Price", "# In Stock"],
          colWidths: [5, 27, 18, 10, 12]
        });

        for (shop in getBack) {
          saleTable.push([getBack[shop].item_id, getBack[shop].product_name, getBack[shop].department_name, getBack[shop].price, getBack[shop].stock_quantity]);
        }
        console.log(saleTable.toString());
      }
    }

    menu();

  });

}

function addtoInventory() {

  console.log("\nChoose an Item ID above to increase inventory.\n");
  console.log("Then choose how many of that item to add.\n");


  prompt.get(["item", "quantity_add"], function(err, result) {

    if (err) throw err;

    connection.query("SELECT(stock_quantity) FROM products WHERE item_id=" + result.item,
      function(err, data) {

        if (err) throw err;

        var amount = data[0].stock_quantity + Number(result.quantity_add);

        newQueryData = "UPDATE products SET stock_quantity=" + amount + " WHERE item_id=" + result.item;

        connection.query(newQueryData, function(err, data) {

          if (err) throw err;
          console.log("\n Inventory updated \n");
          menu();
        });

      });

  });
}

function addnewProducts() {
  console.log("Enter Product Name to add to database\n");

  var stuff = {
    properties: {
      productName: {
        description: "Enter Product Name",
        type: "string",
        required: true
      },
      departmentName: {
        description: "Enter Department Name",
        type: "string",
        required: true
      },
      price: {
        description: "Enter price",
        type: "number",
        required: true
      },

      stockQuantity: {
        description: "Total # of items to add to inventory",
        type: "integer",
        required: true
      }
    }
  };

  prompt.get(stuff, function(err, result) {

    var queryData = "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('" + result.productName + "','" + result.departmentName + "'," + result.price + "," +
      result.stockQuantity + ")";
    console.log("QUERY: " + queryData);
    connection.query(queryData, function(err, getBack) {
      if (err) throw err;
      if (!err) console.log("Product added!\n");
      menu();
    });

  });

}

function menu() {

  console.log("\n(1) View Products for Sale");
  console.log("\n(2) View Low Inventory");
  console.log("\n(3) Add to Inventory");
  console.log("\n(4) Add New Product");

  prompt.get(["choice"], function(err, result) {
    console.log("** " + result.choice);
    switch (result.choice) {

      case "1":
        console.log("ok");
        showallProducts();
        break;

      case "2":
        viewlowInventory();
        break;

      case "3":
        showallProducts(true, addtoInventory);
        break;

      case "4":
        showallProducts(true, addnewProducts);
        break;

      default:

        console.log("Not a valid option.");
        menu();
        break;
    }
  });
}

prompt.start();

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  menu();

});
