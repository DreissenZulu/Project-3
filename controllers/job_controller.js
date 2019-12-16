const express = require("express");
const axios = require("axios");
const path = require("path");
const orm = require('../config/orm');
const indeed = require('indeed-scraper');
// Import the test module to access database functions
// const model = require("../models/test_models.js");

// The router is like using app = express(), where the server is defined in another file
let router = express.Router();

router.get("/search/:search/:location?", async (req, res) => {
    const search = req.params.search
    const location = req.params.location
    
    const queryOptions = {
        host: 'www.indeed.com',
        query: req.params.search,
        city: req.params.location,
        radius: '25',
        level: 'entry_level',
        jobType: 'freelance',
        maxAge: '7',
        sort: 'date',
        limit: 10
    };
    let searchParams = `${search ? "&keywords="+search : ""}${location ? "&location="+location : ""}`
    let queryURL = `https://authenticjobs.com/api/?format=json&api_key=cb2d8eec4216145cb45cf496d7b00323&method=aj.jobs.search${searchParams}&perpage=10`
    let results = await axios.get(queryURL)
    let indeedResults = await indeed.query(queryOptions)
    console.log(indeedResults)
    res.send(results.data.listings.listing);
})

router.get("/api/post/:id", async (req, res) => {
    let queryURL = `https://authenticjobs.com/api/?format=json&api_key=cb2d8eec4216145cb45cf496d7b00323&method=aj.jobs.get&id=${req.params.id}`
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

router.get("/api/jobs/:id/:jobid", (req, res) => {
    let id = Number(req.params.id);
    let jobID = Number(req.params.jobid);

    orm.selectData("savedjobs", "*", `WHERE userid=${id} AND jobid=${jobID}`, result => {
        if (result.length > 0) {
            res.send("saved")
        } else {
            res.send("none")
        }
    })
})

router.get("/api/people/:id", (req, res) => {
    let id = Number(req.params.id);

    orm.selectData("connections", "connectedid", `WHERE connecterid=${id}`, result => {
        res.send(result)
    })
})



router.get("/api/users/", (req, res) => {
    let query = req.query.query;
    let location = req.query.location;

    orm.selectData('user', 'id, firstName, lastName, city, country, image_url', `WHERE CONCAT(firstName, " ", lastName) LIKE "%${query}%" AND CONCAT(city, " ", country) LIKE "%${location}%"`, (result) => {
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

router.put("/user", async (req, res) => {
    let id = req.body.id;
    let name = req.body.name;
    let firstName = name.split(' ')[0];
    let lastName = name.split(' ')[1];
    let title = req.body.title;

    let location = req.body.location;
    if (location.indexOf(',') > -1) {
        let index = location.indexOf(',');
        let l1 = location.substring(0, index);
        let l2 = location.slice(index + 1);
        location = `${l1}${l2}`;
    }
    let city = location.split(' ')[0];
    let country = location.split(' ')[1];

    let phoneNumber = req.body.number;
    let bio = req.body.bio;

    try {
        let result = await orm.updateData(
            'user',
            `firstName="${firstName}", lastName="${lastName}", title="${title}", city="${city}", country="${country}", phoneNumber="${phoneNumber}", bio="${bio}"`,
            `id=${id}`,
            (result) => {
                res.send(result);
            }
        );
    }
    catch{
        res.send(false);
    };
});

router.post("/savejob", async (req, res) => {

    let jobtitle = req.body.jobtitle;
    let jobid = req.body.jobid;
    let userid = req.body.userId;

    orm.insertData(
        'savedjobs', 'jobtitle, jobid, userid',
        `"${jobtitle}","${jobid}","${userid}"`,
        (result) => {
            res.send(result);
        }
    );
})

router.post("/adduser", async (req, res) => {
    let userid = req.body.userId;
    let friend = req.body.addedUser; 

    orm.insertData(
        'connections', 'connecterid, connectedid',
        `"${userid}","${friend}"`,
        (result) => {
            res.send(result);
        }
    );
})

router.put("/setup", async (req, res) => {
    await orm.updateData('user', `role="${req.body.role}", city="${req.body.city}", country="${req.body.country}", image_url="${req.body.imageURL}", bio="${req.body.bio}"`, `id=${req.body.id}`, result => {
        res.send(result);
    })
})


module.exports = router;
