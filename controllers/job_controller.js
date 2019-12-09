const express = require("express");
const axios = require("axios");
// Import the test module to access database functions
// const model = require("../models/test_models.js");

// The router is like using app = express(), where the server is defined in another file
let router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

router.get("/search/:search", async (req, res) => {
    let queryURL = `https://authenticjobs.com/api/?format=json&api_key=${process.env.AJ_API}&method=aj.jobs.search&keywords=${req.params.search}&perpage=10`
    let results = await axios.get(queryURL)
    res.send(results.data.listings.listing);
})

// router.get("/api/posts", (req, res) => {
//     model.selectAll(result => {
//         res.status(200).send(result);
//     })
// });

// router.post("/api/post", (req, res) => {
//     model.insertOne(req.body.newPost, result => {
//         res.status(200).send(result);
//     })
// });

module.exports = router;