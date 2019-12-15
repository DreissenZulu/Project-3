const express = require("express");
const axios = require("axios");
const path = require("path");
const orm = require('../config/orm');
const connection = require("../config/connection.js");
// Import the test module to access database functions
// const model = require("../models/test_models.js");

// The router is like using app = express(), where the server is defined in another file
let router = express.Router();

router.get("/search/:search", async (req, res) => {
    let queryURL = `https://authenticjobs.com/api/?format=json&api_key=${process.env.AJ_API}&method=aj.jobs.search&keywords=${req.params.search}&perpage=10`
    let results = await axios.get(queryURL)
    res.send(results.data.listings.listing);
})

router.get("/api/post/:id", async (req, res) => {
    let queryURL = `https://authenticjobs.com/api/?format=json&api_key=${process.env.AJ_API}&method=aj.jobs.get&id=${req.params.id}`
    let results = await axios.get(queryURL)
    res.send(results.data);
})

router.get("/api/user/:id", (req, res) => {
    let id = req.params.id;

    orm.selectData('user', '*', `WHERE id = ${id}`,
        (result) => {
            res.send(result);
        }
    );
});

router.get("/api/users/", (req, res) => {
    console.log(req.query)
    let query = req.query.query;
    let location = req.query.location;

    orm.selectData('user', 'id, firstName, lastName, city, country, image_url', `WHERE CONCAT(firstName, " ", lastName) LIKE "%${query}%" AND CONCAT(city, " ", country) LIKE "%${location}%"`, (result) => {
        console.log(result)
        res.send(result);
    })
})

router.get("/api/login", async (req, res) => {
    await orm.selectData('user', 'id, role', `WHERE email = '${req.query.email}' AND password = '${req.query.password}'`, result => {
        if (result.length != 0) {
            res.send(result);
        } else {
            res.send("failed");
        }
    });
});

router.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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

router.post("/register", async (req, res) => {
    await orm.selectData('user', '*', `WHERE email = '${req.body.email}'`, result => {
        if (result.length > 0) {
            res.send("exists");
        } else {
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let email = req.body.email;
            let password = req.body.password;

            orm.insertData(
                'user', 'firstName, lastName, email, password',
                `"${firstName}","${lastName}","${email}","${password}"`,
                (result) => {
                    res.send(result);
                }
            );
        }
    });
});

router.put("/user", async(req, res)=>{
    // console.log(req.body, 'req.BODY');res.end();

    let id = req.body.id;
    let name = req.body.name;
    let firstName = name.split(' ')[0];
    let lastName = name.split(' ')[1];
    let role = req.body.role;
    let location = req.body.location;
    let number = req.body.number;
    let bio = req.body.bio;

    try{
        let result = await orm.updateData(
            'user',
            `firstName="${firstName}", lastName="${lastName}", role="${role}", location="${location}", bio="${bio}"`,
            'id=${id}'
        );
        console.log(result, 'RESULT');
        res.send(result);
    }
    catch{
        res.send(false);
    };
});

module.exports = router;
