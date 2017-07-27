//Load the mongodb module to connect to mongodb database
//Create a new MongoClient instance 
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/database";

var prompt = require('prompt');

menu()

function menu() {
    var lista = 'Choice an operation:\n' +  ' 1. Insert new product\n' + ' 2. List of product\n' + ' 3. Update a product\n' + ' 4. Delete a product\n' + ' 5. Exit'
    console.log(lista);
       
    prompt.start();
    prompt.get(['choice'], function (err, result) {
    if (err) { return onErr(err); }
   
    switch (result.choice) {
        case "1":
            create();
            break;
        case "2":
            read();            
            break;
        case "3":
            update();            
            break;
        case "4":
            remove();            
            break;
        case "5":                       
            break;             
        default:
            console.log('\nSELECT A CHOICE\n');
            menu();
            break;
    }
  })
    
}

function create() {
    console.log('  INSERT ');
    MongoClient.connect(url, function (err, db){
    var product = [{ name: 'name',},{ name: 'price',}];
    
    prompt.start();

    prompt.get(product, function (err, result) {
        if (err) { return onErr(err); }
        
        wine='{"name":"'+result.name+'","price":"'+result.price+'"}'
        console.log(wine)
        db.collection("product").insert(JSON.parse(wine), function (err, result) {
            if (err) {
                db.close()
                console.log('Sorry unable to connect to Mongodb \nError: ' + err)
            }
            db.close()
                console.log('OK')

            menu()
        })
            
        })
    });  

}

function read() {
    console.log(' READ ');
    MongoClient.connect(url, function (err, db){
        db.collection("product").find({}).limit(10).toArray( function (err, res) {
            if (err) {
                db.close()
                console.log('Error: ' + err)
            }
            console.log(res)
            db.close()

            menu()
        })
    })    
}

function update() {
    console.log(' UPDATE ');
    MongoClient.connect(url, function (err, db){

        var product = ['oldname','name','price'];

        console.log(product)
        prompt.start();
        prompt.get(product, function (err, result) {
            if (err) { return onErr(err); }
            old='{"name":"'+result.oldname+'"}'
            newprod='{"name":"'+result.name+'","price":"'+result.price+'"}'

            db.collection("product").update(JSON.parse(old), JSON.parse(newprod), function (err, result) {
                if (err) {
                    db.close()
                    console.log('Error: ' + err)
                }
                db.close()

                menu()
                
            })
        })
    })
}

function remove() {
    console.log(' REMOVE ');
    
    MongoClient.connect(url, function (err, db){

        var product = [{ name: 'name',}];

        prompt.start();
        prompt.get(product, function (err, result) {
            wine='{"name":"'+result.name+'"}'
            db.collection("product").remove(JSON.parse(wine), function (err, result) {
                if (err) {
                    db.close()
                    console.log('Error: ' + err)
                }
                db.close()
                    console.log('Deleted Product ')

                    menu()
            })
        })
    })
}
