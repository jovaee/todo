const express = require('express');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

let todolist = [];

/* The to do list and the form are displayed */
app.get('/todo', (req, res) => {
    res.render('todo.ejs', { todolist, clickHandler:"func1();" });
})

/* Adding an item to the to do list */
.post('/todo/add/', urlencodedParser, (req, res) => {
    console.log('Received a request on /todo/add/');
    if (req.body.newtodo !== '') {
        todolist.push(req.body.newtodo);
    }

    res.redirect('/todo');
})

/* Deletes an item from the to do list */
.get('/todo/delete/:id', (req, res) => {
    console.log('Received a request on /todo/delete/:id');
    if (req.params.id !== '') {
        todolist.splice(req.params.id, 1);
    }

    res.redirect('/todo');
})

// Update an item in the to do list
.post('/todo/update/:id', urlencodedParser, (req, res) => {
    console.log('Received a request on /todo/update/:id');
    if (req.body.updatedtodo !== '') {
        todolist[req.params.id] = req.body.updatedtodo;
    }

    res.redirect('/todo');
})

/* Redirects to the to do list if the page requested is not found */
.use((req, res, next) => {
    res.redirect('/todo');
})

.listen(8080);

console.log('====| Server is running |====');
