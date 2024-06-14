import express from 'express';
import { searchUser, searchPost } from '../controllers/search.js';

const router = express.Router();

router.get('/search-users', searchUser);
router.get('/search-posts', searchPost);
export default router