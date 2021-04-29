const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require("../../utils/auth");


//Create a comment
router.post('/', withAuth, async(req,res)  => {
    try {
        const newComment = await Comment.create({
            text: req.body.text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        res.redirect(`/user/post/${req.body.post_id}`)
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})





module.exports = router;