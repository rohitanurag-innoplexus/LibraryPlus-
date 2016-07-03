var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            ISBN: req.body.ISBN,
            name: req.body.name,
            author: req.body.author,
            publisher: req.body.publisher,
            pnumber: req.body.pnumber,
            desc: req.body.desc,
            tnum: req.body.tnum,
            img: req.body.img

                  }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            ISBN: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    app.put('/api/todos/:todo_id', function (req, res) {
      Todo.findOne({ ISBN: req.params.todo_id }, function(err, book) {
        if (err) {
          return res.send(err);
        }

        for (prop in req.body) {
       // console.log(req.body);
          book[prop] = req.body[prop];
        }

        book.save(function(err) {
          if (err) {
            return res.send(err);
          }

          res.json({ message: 'Book updated!' });

        });
      });
    });

    app.put('/api/upd/:todo_id', function (req, res) {
      Todo.findOne({ ISBN: req.params.todo_id }, function(err, book) {
        if (err) {
          return res.send(err);
        }

        for (prop in req.body) {

          book[prop] = parseInt(book[prop]) + parseInt(req.body[prop]);
        }

        book.save(function(err) {
          if (err) {
            return res.send(err);
          }

        if(book["tnum"]<=0)
{

        Todo.remove({
            ISBN: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
}
else{
            getTodos(res);}

        });
      });
    });

    app.put('/api/new/:todo_id', function (req, res) {
      Todo.findOne({ ISBN: req.params.todo_id }, function(err, book) {
        if (err) {
          return res.send(err);
        }



          book["tnum"] = parseInt(book["tnum"]) + parseInt(req.body["tnum"]);
          
          book["issued"] = book["issued"] +"," + req.body["issued"];
          

        book.save(function(err) {
          if (err) {
            return res.send(err);
          }



            getTodos(res);

        });
      });
    });


    // application -------------------------------------------------------------

};
