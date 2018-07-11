var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var methodOverride = require('method-override')
mongoose.connect('mongodb://localhost/restfull_blog_app')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type:Date, default: Date.now}
})

var Blog = mongoose.model('Blog', blogSchema)
app.get('/', function (req, resp) {
  resp.redirect('/blog')
})
// REST FULL ROUTE OF 7
app.get('/blog', function (req, resp) {
  Blog.find({}, function (err, data) {
    if (err) { console.log(err) }
    else {
        resp.render('index' , {blogs: data})
    }
  })
})

app.get('/blog/new', function (req,resp) {
  resp.render('newblog')
})

app.post('/blog', function (req, resp) {
  Blog.create(req.body.blog, function (err, data) {
    if (err) { console.log(err)
    resp.redirect('/blog/new') }
    else {
      console.log(data)
      resp.redirect('/blog')
    }
  })
})

app.get('/blog/:id', function (req, resp) {
  Blog.findById(req.params.id, function (err, data) {
    if (err) { console.log(err)
      resp.redirect('/blog')
    }
    else {
      resp.render('showblog', {blog: data} )
    }
  })
})

app.get('/blog/:id/edit', function (req, resp) {
  Blog.findById(req.params.id, function (err, data) {
    if (err) { console.log(err)
      resp.redirect('/blog')
    }
    else {
      resp.render('editblog', {blog: data})
    }
  })

})

app.put('/blog/:id', function (req, resp) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, data){
    if (err) { console.log(err)
    resp.redirect('/blog')}
    else {
      console.log(data)
      resp.redirect('/blog')
    }
  })
})

app.delete('/blog/:id', function (req, resp) {
  Blog.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) { console.log(err)}
    else{
      console.log(data)
    }
    resp.redirect('/blog')
  })
})
app.listen(1230, function () {
  console.log('Server running in 1230')
})
