const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")

var app=Express()
app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())

var studentModel=Mongoose.model("students",
new Mongoose.Schema({
    admno:String,
    rollno:String,
    name:String,
    classs:String,
    parentname:String,
    mobile:String,
    address:String
}))

var facultyModel=Mongoose.model("faculty",
new Mongoose.Schema({
    fname:String,
    education:String,
    fmobile:String,
    faddress:String,
    pincode:String,
    district:String
}))

Mongoose.connect("mongodb+srv://anjalireghunath:9846434831@cluster0.ursz9.mongodb.net/studentDB")



app.post("/api/studentadd",(req,res)=>{
    var getAdmno=req.body.admno
    var getRollno=req.body.rollno
    var getName=req.body.name
    var getClass=req.body.classs
    var getParentName=req.body.parentname
    var getMobile=req.body.mobile
    var getaddress=req.body.address
    data={"admno":getAdmno,"rollno":getRollno,"name":getName,"classs":getClass,"parentname":getParentName,"mobile":getMobile,"address":getaddress}
let mystudent=new studentModel(data)
mystudent.save((error,data)=>{
    if(error)
    {
        res.send({"status":"error","data":error})
    }
    else{
        res.send({"status":"success","data":data})
    }
})
})

app.post("/api/addfaculty",(req,res)=>{
    var getfname=req.body.fname
    var geteducation=req.body.education
    var getfmobile=req.body.fmobile
    var getfaddress=req.body.faddress
    var getpincode=req.body.pincode
    var getdistrict=req.body.district
    data={"fname":getfname,"education":geteducation,"fmobile":getfmobile,"faddress":getfaddress,"pincode":getpincode,"district":getdistrict}
    let myfaculty=new facultyModel(data)
    myfaculty.save((error,data)=>{
        if(error){
            res.send({"status":"error","data":error})
        }
        else{
            res.send({"status":"success","data":data})
        }
    })
})

app.get("/api/studentview",(req,res)=>{
    res.send("view all students")
})

app.get("/api/facultiesview",(req,res)=>{
    res.send("view all faculties")
})
app.listen(4008,()=>{
    console.log("server running")
})