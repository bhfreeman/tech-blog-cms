const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require('../../utils/auth')

//Create a new post
router.post('/',withAuth, async(req,res) => {
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
router.delete('/:id', withAuth, async (req,res) => {
    try{
        // console.log(req.params.id)
        await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/user')
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Update a specific post
router.put('/:id', withAuth, async(req,res) => {
    try{
        console.log(req.body)
        await Post.update({
            title: req.body.update_title,
            post_text: req.body.update_text
        },{
            where: {
                id: req.params.id
            }
        })
        res.redirect(`/user`)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

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
