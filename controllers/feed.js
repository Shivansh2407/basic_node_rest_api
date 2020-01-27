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
        return res
        .status(422)
        .json({
                message : 'Validation failed, entered data is incorrect.', 
                errors:errors.array()
            });
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
        console.log(err);
    });
    //Create post in DB
};
//Creating a POST Endpoint