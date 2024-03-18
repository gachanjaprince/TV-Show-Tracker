const User = require('../models/User')

module.exports = {
    getIndex: (req,res)=>{
        res.render('home.ejs', { user: req.user })
    },
    getResult: async (req, res)=>{
     try {
        res.redirect('/')
        
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
    likePost: async (req, res)=> {
        try {
            const response = await fetch(`https://api.tvmaze.com/shows/${req.params.id}`)
            const show = await response.json()

            let showYear = 'N/A'
            if (show.premiered) { showYear = show.premiered.slice(0, 4) }

            await User.findByIdAndUpdate(req.user.id, {
                $push: {"liked": {
                    showId: req.params.id,
                    showName: show.name,
                    showImg: show.image.medium,
                    showYear: showYear,
                    showLanguage: show.language
                
                }}
            })
        res.redirect(`/search/${req.params.id}`)
        } catch(err){
            console.log(err)
        }
    }
}