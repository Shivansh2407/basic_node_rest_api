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
    const title = req.body.title;
    const content = req.body.content;
    //Create post in DB
    res.status(201).json({
        message:'Post Created Successfully!',
        post:{ _id: new Date().toISOString(), 
            title: title, 
            content: content,
            creator: { name: 'Maximilian' },
            createdAt: new Date()
        }
    })
};