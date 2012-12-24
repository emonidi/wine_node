
/*
 * GET home page.
 */

exports.index = function(req, res){

  var producerModel = require('../models/mproducer');
  var data =  new Object;
  data.producers = new Object();
  data.active = true;
  producerModel.getProducerIndex(function(err,rows){
        if(rows){
            data.producers = rows;
        }
  });



  var winesModel = require('../models/mwine');


  var interval = setInterval(function(){
    if(data.producers.length > 0){
          res.render('index',data);

    }
  });

};