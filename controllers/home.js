module.exports = {
    getIndex: (req,res)=>{
        res.render('home.ejs')
    },
    getResult: async (req, res)=>{
     try {
        res.redirect('/')
        
     } catch(err){
        console.log(err)
     }
    },
    getShow: async (req, res)=>{
        console.log(req.params)
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
                show: show,
                summary: summary
            })
        } catch(err){
            console.log(err)
        }
    }
}