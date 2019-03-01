const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost:27017/employeedb',{useNewUrlParser:true}, (err)=> {
  if(!err) {console.log('Mongodb connection done') }
   else {console.log('error in db connection: '+err) }
}
);
require('./employee.model');
