import express from 'express';
import cors from 'cors';
import MongoDB from './MongoDB/MongoConnection.js';
import User from './MongoDB/MongoSchema.js';

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
MongoDB();

/**
 * POST: Create a new post
 */
app.post('/api/data', async (req, res) => {
    try {
        const { title, description, date, imageUrl } = req.body;
        const newPost = new User({
            title,
            description,
            date,
            imageUrl,
        });

        await newPost.save(); // Save to MongoDB
        res.status(201).json({ message: 'Data added successfully', newPost });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

/**
 * GET: Retrieve all posts
 */
app.get('/api/data', async (req, res) => {
    try {
        const posts = await User.find(); // Fetch all posts
        res.json(posts);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

/**
 * GET: Retrieve a single post by ID
 */
app.get('/api/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await User.findById(id); // Fetch post by ID
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

/**
 * PUT: Update a post by ID
 */
app.put('/api/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, imageUrl } = req.body;

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, description, date, imageUrl },
            { new: true, runValidators: true } // Return the updated document
        );

        if (updatedPost) {
            res.json({ message: 'Post updated successfully', updatedPost });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

/**
 * DELETE: Delete a post by ID
 */
app.delete('/api/data/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await User.findByIdAndDelete(id); // Delete post by ID

        if (deletedPost) {
            res.json({ message: 'Post deleted successfully', deletedPost });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
