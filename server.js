// MEAN Stack RESTful API Tutorial - Contact List App

var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request ');
  
  db.contactlist.find({
	  timeStamp: {
		  $gt: new Date(new Date().getTime()  - (1000*60*60))

	  }
  },function (err, docs){
	//  console.log(docs);
    res.json(docs);
  });
});
/*app.get('/contactlist/predict', function (req, res) {
	  console.log('I received a GET request in total turbine');
	
	  db.contactlist.find({ timeStamp: {
		  $gt: new Date(new Date().getTime()  - (1000*60*60*24))

	  }
  },function (err, docs) {
	  // console.log(docs);
	    res.json(docs);
	  });
	});*/
app.get('/contactlist/predict/:id', function (req, res) {
	  console.log('I received a GET request in /predict/:id');
	  var id = req.params.id;
	  var turbineI = 'T' + id;
	console.log("turbineI==>"+turbineI)
	  db.contactlist.find({ timeStamp: {
		  $gt: new Date(new Date().getTime()  - (1000*60*60*24)) },
	  turbineID : turbineI
},function (err, docs) {
	  // console.log(docs);
	    res.json(docs);
	  });
	});
/*app.get('/contactlist', function (req, res) {
	  console.log('I received a GET request');

	  db.contactlist.find({
		  timeStamp: {
			  $gt: new Date(Date().getTime() - 1000 * 60 * 60),,
		       
		    }},function (err, docs) {
	   // console.log(docs);
	    res.json(docs);
	  });
	});*/

app.post('/contactlist', function (req, res) {
  console.log(req.body);
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.siteName);
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {turbineID: req.body.turbineID,siteName: req.body.siteName, customerName: req.body.customerName, 
    	projectName: req.body.projectName, powerGenerated: req.body.powerGenerated, status: req.body.status,
    	timeStamp: req.body.timeStamp, }},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

app.listen(3000);
console.log("Server running on port 3000");