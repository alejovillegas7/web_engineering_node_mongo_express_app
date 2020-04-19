var express = require("express");
var app = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var expressSanitizer = require("express-sanitizer");

mongoose.connect("mongodb://localhost/students_in_a_class", {useFindAndModify:false, useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

//STUDENT SCHEMA SETUP
var studentSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    age: Number,
    finalGrade: Number
});

var Student = mongoose.model("Student", studentSchema);

app.get("/", (req, res)=>{
    res.render("home");
});

//show all students
app.get("/students", (req, res)=>{
    //get all the students!!
    Student.find({}, (err, allStudents)=>{
        if(err) {
            console.log(err);
            res.redirect("/students");
        } else {
            res.render("studentsList", {students:allStudents});
        }
    });
});

//show add students form
app.get("/students/new", (req, res)=>{
    res.render("new");
});

//show the califications average
app.get("/students/grades-average", (req, res)=>{
    var average = 0;
    var numberOfData = 0;
    //get all the students notes!!
    Student.find({}, (err, allStudents)=>{
        if(err) {
            console.log(err);
            res.redirect("/students");
        } else {
            allStudents.forEach((student)=>{
                average += student.finalGrade;
                numberOfData += 1;
            });
            average = average / numberOfData;
            res.render("average", {average:average});
        }
    });
});

//edit students for age
app.get("/students/change-by-age", (req, res)=>{
    res.render("editForAge");
});

//update all students for age
app.put("/students/change-by-age", (req, res)=>{
    var agetoSearch = req.body.age;
    var newGrade=req.body.newGrade;
    var newAge = req.body.newAge;
    Student.updateMany({age:agetoSearch},{$set :{age :newAge, finalGrade: newGrade}}, (err, newInfo)=>{
        if(err){
            console.log(err);
            res.redirect("/students");
        }else{
            console.log(newInfo);
            res.redirect("/students");
        }
    });
});


//create new student logic
app.post("/students", (req, res)=>{
    //get data from form and add to students DB
    var name = req.body.name;
    var lastName = req.body.lastName;
    var age = req.body.age;
    var finalGrade = req.body.finalGrade;
    var newStudent = {name: name, lastName: lastName, age:age, finalGrade:finalGrade};
    Student.create(newStudent, (err, newlyCreated)=>{
        if(err){
            console.log(err);
            res.redirect("/students");
        }else{
            //redirect back to students page
            res.redirect("/students");
        }
    });
});

//show one student in particular!
app.get("/students/:id", (req, res)=>{
    //find the student with provider ID
    Student.findById(req.params.id, (err, foundStudent)=>{
        if(err){
            console.log(err);
            res.redirect("/students");
        }else{
            //render the template with the info of that student
            res.render("profile", {student:foundStudent});
        }
    });
});

//Edit student route
app.get("/students/:id/edit", (req, res)=>{
    Student.findById(req.params.id, (err, foundStudent)=>{
        if(err){
            console.log(err);
            res.redirect("/students");
        }else{
            //render the template with the info of that student
            res.render("edit", {student:foundStudent});
        }
    });
});

//update route
app.put("/students/:id", (req, res)=>{
    var name = req.body.name;
    var lastName = req.body.lastName;
    var age = req.body.age;
    var finalGrade = req.body.finalGrade;
    var studentEdited = {name: name, lastName: lastName, age:age, finalGrade:finalGrade};
    Student.findByIdAndUpdate(req.params.id, studentEdited, (err, updatedStudent)=>{
        if(err){
            console.log(err);
            res.redirect("/students");
        }else{
            //render the template with the info of that student
            res.redirect("/students/" + req.params.id);
        }
    });
});

//delete student
app.delete("/students/:id", (req, res)=>{
    //destroy a student data
    Student.findByIdAndRemove(req.params.id, (err)=>{
        if(err){
            console.log(err);
            res.redirect("/students");
        } else{
            //redirect somewhere
            res.redirect("/students");
        }
    });
});

app.listen(3030, ()=>{
    console.log("students app listening at port 3030");
});