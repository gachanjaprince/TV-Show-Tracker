const User = require('../models/User')

module.exports = {
    getIndex: (req,res)=>{
        res.redirect('/')
    },
    getResult: async (req, res)=>{
     try {
        // changed from /home.ejs
        res.redirect('/home.ejs')
        
     } catch(err){
        console.log(err)
     }
    },
    getShow: async (req, res)=>{
        try {
            const showId = req.params.id;
            let userId
            if (req.user) {userId = req.user.id}
            // Fetch the user document and check if the "liked" array contains the show
            const user = await User.findById(userId);
            let isLiked
            if (req.user) {isLiked = user.liked.some(show => show.showId === showId)};

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
                summary: summary,
                isLiked: isLiked,
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
    toggleLike: async (req, res) => {
        try {
            const userId = req.user.id;
            const showId = req.params.id;
    
            // Fetch the user document and check if the "liked" array contains the show
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
                let showYear = 'N/A'
                if (show.premiered) { showYear = show.premiered.slice(0, 4) }
    
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