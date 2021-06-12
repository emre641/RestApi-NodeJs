//mysql ve express tanımlanıyor.
const mysql = require('mysql');
const express = require('express');



var app = express();
//const bodyparser = require('body-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Veri tabınıyla bağlantının oluşturulması
var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database : 'nodejsmysql',
    multipleStatements :true
});


//veri tabanıyla olan bağlantısının kontrolü
mysqlConnection.connect((err) => {
    if(!err){
        console.log('DB connection succeded');
    }
    else{
        console.log('DB not connection \n Error : ' + JSON.stringify(err,undefined, 2));
    }
});


//Listening
app.listen(3000, () => console.log('Express server is running at port no : 3000'));

//Get All person methot
app.get('/person', (req, res)=> {
    mysqlConnection.query('SELECT * FROM person', (err, rows, fields)=> {
        if(!err){
            //console.log(rows);
            res.send(rows);
        }
        else{
            res.send("Persons not found");
        }
    })
});

//Get Name methot
app.get('/person/:name', (req, res)=> {
    mysqlConnection.query('SELECT * FROM person WHERE name=?',[req.params.name], (err, rows, fields)=> {
        if(!err){
            
            res.send(rows);
        }
        else{
            res.send("Person not found");
        }
    })
});

//Get id methot
app.get('/person/:id', (req, res)=> {
    mysqlConnection.query('SELECT * FROM person WHERE id=?',[req.params.id], (err, rows, fields)=> {
        if(!err){
            
            res.send(rows);
        }
        else{
            res.send("Person not found");
        }
    })
});


//Get Age methot
app.get('/person/age', (req, res)=> {
    mysqlConnection.query('SELECT * FROM person WHERE age=?',[req.params.age], (err, rows, fields)=> {
        if(!err){
            
            res.send(rows);
        }
        else{
            res.send("No person found at the entered age");
        }
    })
});


//deletion method by name 
app.delete('/person/:name', (req, res)=> {
    mysqlConnection.query('DELETE FROM person WHERE name=?',[req.params.name], (err, rows, fields)=> {
        if(!err){
            //console.log(rows);
            res.send('Person successfully deleted');
        }
        else{
            res.send("Failed to delete person");
        }
    })
});


//Deletion method by person id
app.delete('/person/:id', (req, res)=> {
    mysqlConnection.query('DELETE FROM person WHERE id=?',[req.params.id], (err, rows, fields)=> {
        if(!err){
            //console.log(rows);
            res.send('Person successfully deleted');
        }
        else{
            res.send("Failed to delete person");
        }
    })
});

//Insert person methot
app.post('/person', (req, res)=> {
    let emp = req.body;
    var sql ="SET @id =?;SET @name =?;SET @age =?; SET @count =?, SET @createdDate = ?; \ CALL personAddOrEdit(@id,@name,@age,@count,@createdDate); ";
    mysqlConnection.query(sql,[emp.id, emp.name, emp.age, emp.count, emp.createdDate],[req.params.name], (err, rows, fields)=> {
        if(!err){
            rows.forEach(element => {
                if(element.constructors == Array)
                res.send('Insert person name : '+element[0].name);
            });
            
        }
        else{
            res.send("Could not add person");
        }
    })
});


//Update person methot
 app.put('person', (req, res) => {
     let emp = req.body;
     var sql = "SET @name = ? SET @age = ?; SET @count =?, SET @createdDate = ?; \ CALL personAddOrEdit(@name, @age, @count, @createdDate); ";
     mysqlConnection.query(sql, [emp.name, emp.age, emp.count, emp.createdDate], (err, rows, fields) => {
         if(!err)
            res.send('Person successfully update');
        else
        res.send("Could not update person");
     })
 })