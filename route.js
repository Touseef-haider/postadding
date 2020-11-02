const express = require('express');
const posts = require('./Model/post');
const route = express.Router();


route.get('/getposts',(req,res)=>{
    posts.find({},(err,posts)=>{
        if (err) {
            res.json(err)
        } else {
            res.json(posts)
        }
    })
})

route.post('/addpost',(req,res)=>{
    const newPost = new posts({
        title: req.body.title,
        body: req.body.body
    })
    newPost.save((err,result)=>{
        if (err) {
            res.json(err)
        } else {
            res.json("Post Added")
        }
    })
})

route.put('/updatepost/:id',(req,res)=>{
    posts.findByIdAndUpdate({_id:req.params.id},{
        title:req.body.title,
        body:req.body.body
    },(err,result)=>{
        if (err) {
            res.send(err)
        } else {
            res.send("post Updated")
        }
    })
})

route.delete('/deletepost/:id',(req,res)=>{
    posts.deleteOne({_id:req.params.id},(err,result)=>{
        if (err) {
            res.send(err)
        } else {
            res.send("post Deleted")
        }
    })
})

module.exports = route;