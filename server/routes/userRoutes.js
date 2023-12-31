import express from 'express';
import { authUser, getUserProfile, getUserShareLink, logoutUser, registerUser, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, upload.single('image'), updateUserProfile);
router.get('/:id', getUserShareLink);

export default router;
