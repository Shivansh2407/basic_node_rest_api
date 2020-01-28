const { validationResult } = require('express-validator/check');

const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts:[
            {
                _id: '1',
                title:'First Post',
                content: 'This is the first post!', 
                imageUrl: 'images/pup.jpeg',
                creator:{
                    name: 'Maximilian'
                },
            createdAt: new date()
            }
        ]
    });
};
exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
            title: title, 
            content: content,
            imageUrl: 'images/pup.jpeg',
            creator: { name: 'Maximilian' }
            
    });
    post
    .save()
    .then(result => {
        res.status(201).json({
            message:'Post Created Successfully!',
            post: result 
        });
    })
    .catch(err => {
        if (!err.statusCode){
            err.statusCode = 500 ;
        }
        next(err);
    });
    //Create post in DB
};
//Creating a POST Endpoint

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(post => {
            if(!post){
                const error = new Error('Could not find post');
                error.statusCode = 404;
                throw error;
            }
            res.status(200).json({message:'Post Fetched.', post:post})
        })
        .catch(err =>{
            if(!err.statusCode){
                err.statusCode = 500 ;
            }
            next(err);
        });
};