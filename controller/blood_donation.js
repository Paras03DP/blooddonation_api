
const Bloods = require('../models/blood_donation');
const asyncHandler = require("../middleware/async");


exports.getAllBloods = asyncHandler(async (req, res) => {
    try {
        const blood = await Bloods.find();
        res.json({ data: blood });
    }
    catch (error) {
        console.log(error);
    }
});
exports.createABlood = (req, res, next) => {

    const newBlood = {
        ...req.body,
        user: req.user.id
    }

    console.log(newBlood)


    Bloods.create(newBlood)
        .then(blood => res.status(201).json(blood))
        .catch(next)


}

// exports.deleteAllRoom = (req, res) => {
//     Rooms.deleteMany()
//         .then(() => res.status(201).json({ "message": "Deleted all successfully" }))
//         .catch(next);
// }

exports.getBloodById = (req, res, next) => {
    Bloods.findById(req.params.blood_id)
        .then(blood => {
            if (!blood) {
                res.status(404).json({ error: "Blood Not Found" })
            }
            res.json({data: blood});
        })
        .catch(next);
}

exports.getAllMyBloods = (req, res, next) => {
    Bloods.find({user: req.user.id})
    .then(bloods => {
        if(!bloods){
            res.status(404).json({error: "You haven't added any bloods"})
        }
        res.json({data: bloods})
    })
    .catch(next);

}
exports.updateBLood = (req, res, next) => {
    Bloods.findByIdAndUpdate(
        req.params.blood_id,
        { $set: req.body },
        { new: true }
    )
        .then(updatedBlood => res.status(200).json(updatedBlood))
        .catch(next)
}

exports.deleteBloodById = async(req, res, next) => {
    await Bloods.findByIdAndDelete(req.params.blood_id).then((blood) => {
        if (!blood) {
          return res
            .status(404)
            .json({ message: "Blood not found with id of ${req.params.id}" });
        }
        res.status(200).json({data: blood });
      });
    };



exports.uploadImage = asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    Bloods.findById(postId)
        .then(blood => {
            console.log(blood);
            if (!req.file) {
                return res.status(400).send({ message: "Please upload a file" });
            }
            const imageName = req.file.filename
            Bloods.findByIdAndUpdate(
                postId,
                { $set: { image: imageName } },
                { new: true }
            )
                .then(success => {
                    res.status(200).json({
                        success: true,
                        data: req.file.filename,
                    });
                })
                .catch(error => res.status(500).json({ error: error.message }))

        })
        .catch(error => res.send({ error: error.message }))

});

