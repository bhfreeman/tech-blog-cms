const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

//Create a new post
router.post('/', async(req,res) => {
    try{
        await Post.create({
            title: req.body.postTitle,
            post_text: req.body.postText,
            user_id: req.session.user_id
        }) 
        res.redirect('/')
    }catch(err){

    }
})

//Get posts from currently logged in user
router.get("/user", async (req, res) => {
  try {
      const postData = await Post.findAll({
          include: [
              {
                  model: Comment,
                  attributes: ['id', 'text']
              },
          ],
          where: {
              user_id: req.session.user_id
          }
      })

      const posts = postData.get()
      res.render('dashboard', posts)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Delete a post

//Get a specific post
router.get('/:id', async (req,res) => {
    try{
        const postData = await Post.findOne({
            where: {
                id: req.params.id
            },
            include: {all: true, nested: true}
            // [
            //     {
            //         model: Comment,
            //         attributes: ['id', 'text']
            //     },
            //     {
            //         model: User,
            //         attributes: ['name']
            //     }
            // ]
        })
        const post = postData.get({plain: true})

        res.render('post', {post, logged_in: req.session.logged_in})
    } catch(err) {
        console.log(err);
        res.status(500).json(err);      
    }
})

module.exports = router;
