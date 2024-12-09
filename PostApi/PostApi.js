import express from 'express';

const PostApi = express.Router()

PostApi.post('/post', async (req, res) => {
    const result = await req.body
    console.log(result);    
})

export default PostApi;  