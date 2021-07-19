//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
const _ = require("lodash");
const app = express();
var count=0;
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/portfolio", {useNewUrlParser: true, useUnifiedTopology: true});

const portSchema={
  name:String,
  education:String,
  project:String
};

const Portfolio=mongoose.model("Portfolio",portSchema);
//////////////////////////////////Request targeting all articles//////////////////////////////////
app.route("/portfolios")

.get(function(req,res){
  Portfolio.find(function(err,foundPortfolios){
if(!err)
{
    res.send(foundPortfolios);
}
else
{
  res.send(err);
}
  });
})

.post(function(req,res){
  console.log();
  console.log();

  const newPortfolio=new Portfolio({
    name:req.body.name,
    education:req.body.education,
    project:req.body.project

  });
  newPortfolio.save(function(err){
    if(!err){

      count++;
      res.send("Successfully added a new article and value of count is:"+count);
      console.log(count);
    }
    else{
      res.send(err);
    }
  });
});


////////////////////////////////////////////////Request targeting a specific Education section///////////

app.route("/portfolios/:portfolioEducation")



.put(function(req,res){
  Portfolio.update(
    {education:req.params.portfoliEducation},
    {education:req.body.education,name:req.body.name,project:req.body.project},
    {overwrite:true},
    function(err)
    {if(!err){

      count++;
      res.send("Successfully updated article and value of count is:"+count);
      console.log(count);
    }
  }
);
})
.patch(function(req,res){
  Portfolio.update(
    {education:req.params.portfolioEducation  },
    {$set:req.body},   // or if we want just title to update{title:req.body.title}
    function(err){
      if(!err)
      {

       count++;
         res.send("Successfully updated and value of count is:"+count);
      }
    }
  );
})




app.listen(3000, function() {
  console.log(count);
  console.log("Server started on port 3000");
});
