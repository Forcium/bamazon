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

prompt.start();

function viewSales() {

  var saleTable = new Table({
    head: ["Dept#", "Department", "Over Head", "Total Sales", "Profit"],
    colWidths: [7, 15, 15, 15, 12]
  });

  var queryData =
    "SELECT department_id, department_name, overhead, total_sales, total_sales-overhead AS total_profit FROM departments";

  connection.query(queryData, function(err, result) {

    for (shop in result) {
      saleTable.push([result[shop].department_id,
        result[shop].department_name,
        result[shop].overhead,
        result[shop].total_sales, result[shop].total_profit
      ]);
    }

    console.log(saleTable.toString());

    main();

  });
}

function createNewDept() {

  console.log("Create a New Department.  Enter New Department Name and Overhead cost\n");
  prompt.get(["name", "overheadcost"], function(err, result) {

    var queryData = "INSERT INTO departments(department_name, overhead, total_sales) VALUES('" + result.name + "', '" + result.overheadcost + "', 0)";

    connection.query(queryData, function(err, getBack) {

      if (err) throw err;

      viewSales();

      main();
    });
  });
}


function main() {

  console.log("\n(1) View Product Sales by Department\n(2) Create New Department\n");

  prompt.get(["choice"], function(err, result) {

    switch (Number(result.choice)) {
      case 1:
        viewSales();
        break;

      case 2:
        createNewDept();
        break;

      default:
        console.log("not a valid choice\n\n");
        main();
        break;

    }
  });
}

main();
