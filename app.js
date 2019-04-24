var express = require("express"),
app 		= express(),
bodyParser 	= require("body-parser"),
mongoose 	= require("mongoose");

//App Config
mongoose.connect("mongodb://localhost/blog", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

//Mongoose Model Config
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

Blog.create({
    title: "Test Blog", 
    image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",    
    body: "Hello this is a blog post"
});

//RESTful Routes

//Index Route
app.get("/", (req,res) => {
    res.redirect("/blogs");
});

app.get("/blogs", (req,res) => {
    Blog.find({}, (err,blogs) => {
        if(err) {
            console.log(err);
        } else {
            res.render("index", {blogs:blogs});
        }
    });
});

//New Route
app.get("/blogs/new", (req, res) => {
    res.render("new");
}); 

//Create Route
app.post("/blogs", (req,res) => {
    //create blog
    Blog.create(req.body.blog, (err, newBlog) => {
        if(err) {
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
    //redirect to index
});

//Show Route
app.get("/blogs/:id", (req,res) => {
    res.send("Show Page!")
});

app.listen(3000, () => {
    console.log("server is running");
});