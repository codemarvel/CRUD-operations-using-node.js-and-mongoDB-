const express= require('express');
var router=express.Router();
const mongoose=require('mongoose');
const Employee=mongoose.model('employee');
router.get('/',(req,res) =>{
  res.render("employee/addOrEdit",{
    viewTitle:"Insert employee"
  });
});
router.post('/',(req,res) =>{
 if(req.body._id =="")
  insertRecord(req,res);
  else {
    updateRecord(req,res);
  }
});
function insertRecord(req,res){
  var employee=new Employee();
  employee.fullName=req.body.fullName;
  employee.email=req.body.email;
  employee.mobile=req.body.mobile;
  employee.city=req.body.city;
  employee.save((err,doc) => {
    if(!err)
    res.redirect("employee/list");
    else {
        console.log("error"+err);
    }
  });
}
function updateRecord(req,res){
  Employee.findOneAndUpdate({ _id: req.body._id},req.body,{new: true},(err,doc)=>{
    if(!err)
    { res.redirect('employee/list');}
    else {
      console.log("error");
    }
  });
}
router.get("/list",(req,res) =>{

  Employee.find((err,docs) =>{
    if(!err){
      res.render("employee/list",{
        list :docs
      });
    }
    else {

        console.log("error in retreiving data from the list:"+err);

    }
  });
});
/*function handleValidationError(err,body)
{
  for(field err.errors
}*/
router.get('/:id',(req,res) =>{
  Employee.findById(req.params.id,(err,doc)=>{
    if(!err)
    {
      res.render("employee/addOrEdit",{
        viewTitle:"Update Employee",
        employee: doc
      });
    }
  });
});
router.get('/delete/:id',(req,res)=>{
  Employee.findByIdAndRemove(req.params.id,(err,doc) =>{
    if(!err){
      res.redirect('/employee/list');
    }
    else {
      console.log("error");
    }
  });
});
module.exports =router;
