console.log(process.env.MONGODB_URI);

//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const Run = require('./models/runs.js')
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3001;

//___________________
//Database
//database
var words = {
  "rainbow": 5,
  "univcorn": 3,
  "poop": 2
}
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Fix Depreciation Warnings from Mongoose*
// May or may not need these depending on your Mongoose version
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
app.get('/', (req,res) => {
  res.redirect('/runs')
})
app.get('/runs', (req, res) => {
    Run.find({}, (error, allRuns) => {//takes two parameters
    res.render('index.ejs', {
    runs: allRuns
  })
  })


})
// app.get('/runs', (req, res) => {
//   res.render('show.ejs')
// })
app.get('/runs/new' , (req, res) => {
  res.render('new.ejs');
});

app.post('/runs', (req, res) => {
  // res.send(req.body)
  Run.create(req.body, (error, createdRun) => {
    // console.log(error);
    res.redirect('/runs')
  })
})

// app.get('/run/:id', (req, res) => {
//   Run.findById(req.params.id, (err, foundRun) => {
//     res.send(foundRun)
//   })
// })
// app.get('/runs/:id', (req, res) => {
//   Run.find({}, (err, foundRun) => {
//     res.render('index.ejs', {
//       runs:foundRun
//     })
//   })
// })

app.get('/runs/:id', (req, res) => {
  Run.findById(req.params.id, (err, foundRun) => {//foundRun comes from database
    res.render('show.ejs',{
      run:foundRun//this comes from property
    })
    // res.render('show.ejs',{
      // run:foundRun
    // })
  })
})
app.delete('/runs/:id', (req, res) => {
  Run.findByIdAndRemove(req.params.id, (error, foundRun) => {
    res.redirect('/runs')
  })
  // res.send('delete man')
})
//to post use form to delete use anchor tage or vice versa
app.get('/runs/:id/edit', (req, res) => {
  Run.findById(req.params.id, (err, foundRun) => {
    res.render(
      'update.ejs',
      {
        run: foundRun
      }
    )
  })
  // res.send('haha')
})
// app.get('/all', sendAll);
//
// function sendAll(request, response) {
//   response.send(words);
//
// }
// //edit
// app.get('/run/:id/edit', (req, res) => {
//     Fruit.findById(req.params.id, (error, foundRun) => {
//         res.render(
//             'update.ejs',
//             {
//                 run:foundRun
//             }
//         );
//     });
// });
// //
// app.get('/run', (req, res) => {
//   console.log('running');
//   // res.render('./new.ejs')
//
// })
//
// app.get('/run/new', (req, res) => {
//   console.log('new run');
//   res.send('newrun')
// })
// app.get('/run/new/:id', (req, res) => {
//     Run.findById(req.params.id, (err, foundRun) => {
//         res.render('show.ejs',{
//             run:foundRun
//         });
//     });
// });
//
// app.post('/', (req, res) => {
//     if(req.body.runGood === 'on'){
//         req.body.runGood = true;
//     } else {
//         req.body.runGood = false;
//     }
//     Run.create(req.body, (error, createdRun) => {
//         // res.redirect('/Run');
//         res.send("create post")
//     });
// });

// app.get('/run/:runnum', addRun);
// function addRun(req, res) {
//   var data = request.params;
//   var log = data.distance
// }
//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
