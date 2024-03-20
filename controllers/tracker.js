const User = require('../models/User')

module.exports = {
    getIndex: (req,res)=>{
        res.render('home.ejs', { user: req.user })
    },
    getResult: async (req, res)=>{
     try {
        res.redirect('/home.ejs')
        
     } catch(err){
        console.log(err)
     }
    },
    getShow: async (req, res)=>{
        try {
            const response = await fetch(`https://api.tvmaze.com/shows/${req.params.id}`)
            const show = await response.json()
            let summary = 'NO SUMMARY AVAILABLE'
            if (show.summary) {
                summary = show.summary.replace(/[>]/g, e=> `${e} `)
                                .replace(/<.*\b>\b/gi, '')
                                .replace(/</g, ' ')
                                .split(' ').filter(e=> !e.includes('>'))
                                .join(' ')
            }

            res.render('show.ejs', {
                user: req.user,
                show: show,
                summary: summary
            })
        } catch(err){
            console.log(err)
        }
    },
    getLiked: (req,res)=>{
        try {
        console.log(req.user)
        let liked = req.user.liked

        res.render('liked.ejs', { 
            user: req.user,
            liked: req.user.liked
         })
        } catch(err){
            console.log(err)
        }
    },
    likePost: async (req, res) => {
        try {
            const userId = req.user.id;
            const showId = req.params.id;
    
            const user = await User.findById(userId);
            const isAlreadyLiked = user.liked.some(show => show.showId === showId);
    
            if (isAlreadyLiked) {
                // Remove the show from liked if it's already there
                await User.findByIdAndUpdate(userId, {
                    $pull: { liked: { showId: showId } }
                });
            } else {
                // If not liked, fetch show details and add to liked shows
                const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
                const show = await response.json();
                let showYear = show.premiered ? show.premiered.slice(0, 4) : 'N/A';
    
                await User.findByIdAndUpdate(userId, {
                    $push: { liked: {
                        showId: showId,
                        showName: show.name,
                        showImg: show.image.medium,
                        showYear: showYear,
                        showLanguage: show.language
                    }}
                });
            }
    
            res.redirect(`/tracker/search/${showId}`);
        } catch (err) {
            console.log(err);
        }
    }
}