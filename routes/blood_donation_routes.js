const express = require('express');
const upload = require('../middleware/upload');


const {
    getAllBloods,
    createABlood,
    uploadImage,
    getBloodById,
    updateBlood,
    deleteBloodById,
    getAllMyBlood,
    

} = require('../controller/blood_donation')

const { verifyUser } = require('../middleware/auth');
const router = express.Router();

router.get('/getAllBloods', verifyUser, getAllBloods);
router.post('/addBloods', verifyUser, createABlood);
router.put((req, res, next) => {
    res.status(405).json({ error: "Put request is not allowed" });
});
router.post("/uploadImage/:postId", upload, uploadImage);
router.get('/getMyBloods',verifyUser, getAllMyBlood);



router.get('/:blood_id', verifyUser,  getBloodById);

router.put('/getMyBloods/:blood_id',    updateBlood);
router.delete('/getMyBloods/:blood', deleteBloodById);
router.post((req, res) => {
    res.status(405).json({ error: "POST method is not allowed here" })
});


module.exports = router;