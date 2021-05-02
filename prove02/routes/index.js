const express = require("express")
const path = require("path")
const router = express.Router()
const fs = require("fs")


/* Request handler for adding a summary */
router.post('/add-summary', (req, res, next) => {
    const summaries = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'prove02-summaries.json')))
    summaries.push({
        bookName: req.body.bookName,
        bookSummary: req.body.bookSummary
    })
    fs.writeFileSync(path.join(__dirname, '..', 'prove02-summaries.json'), JSON.stringify(summaries), err => {})
    res.redirect('/')
})

/* Request handler for main page */
router.get('/', (req, res, next) => {
    const summaries = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'prove02-summaries.json')))
    res.render('add-summary', {
        pageTitle: 'Add New Summary',
        path: '/',
        summaries: summaries,
    })
})

module.exports = router
