const inquirer = require("inquirer");
const express = require('express');


const PORT = process.env.PORT || 8080;
const mysql = require('mysql');

const app = express();
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));



class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config );
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
  }
  
const db = new Database({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "testtest",
    database: "InFactDB"
  });

  async function main(){

    let task = await inquirer
            .prompt([
                {
                    type: "list",
                    message: "Please Select",
                    name: "enter",
                    choices: [
                        "Log In",
                        "Sign Up"
                    ]
                },
            ])
            if (task.enter == "Sign Up"){
                await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Please enter First Name",
                        name: "firstName",
                    },
                    {
                        type: "input",
                        message: "Please enter Last Name",
                        name: "lastName",
                    },
                    {
                        type: "input",
                        message: "Please enter valid email address",
                        name: "email",
                    },
                    {
                        type: "input",
                        message: "Please enter valid password",
                        name: "password",
                    },
                    {
                        type: "input",
                        message: "Please enter a bio. Tell us a little more about yourself",
                        name: "bio",
                    },
                    {
                        type: "input",
                        message: "City",
                        name: "city",
                    },
                    {
                        type: "input",
                        message: "Country",
                        name: "country",
                    },

                ]).then(
                    //check if username or email already exists in db and add user to database
                    async (response)=>{
                        let existUser = await db.query(`SELECT * FROM user WHERE email = '${response.email}'`);
                        //console.log(existUser[0]);
                        if (existUser[0] !== undefined){
                            //console.log("user exists");
                            console.log("User with this email address already exists, try log in");
                            await main();
                        }
                        else{
                            //console.log("can add user");
                            await db.query(`INSERT INTO user (firstName, lastName, email, password, bio, city, country) VALUES ('${response.firstName}', '${response.lastName}', '${response.email}', '${response.password}', '${response.bio}', '${response.city}', '${response.country}')`);
                            let useridObj = await db.query(`SELECT id FROM user WHERE email = '${response.email}'`);
                            userid = useridObj[0].id;
                            console.log("Congrats user created,Happy job hunting");
                            await mainUser();
                    }
                }
                )
                
            }
            else if(task.enter == "Log In"){

                try{
                    await inquirer
                        .prompt([
                            {
                                type: "input",
                                message: "Please enter email",
                                name: "email",
                            },
                            {
                                type: "input",
                                message: "Please enter password",
                                name: "password", 
                            }
                        ]).then(
                                async (response)=>{
                                
                                let useridObj = await db.query(`SELECT id FROM user WHERE email = '${response.email}' AND password = '${response.password}'`);
                                userid = useridObj[0].id;
                                let jobObj = await db.query(`SELECT * FROM savedjobs WHERE userid = '${userid}'`);
                                //companyid = companyidObj[0].companyId;
                                if (jobObj[0] == undefined){
                                    console.log("You have not saved any jobs yet")
                                    await mainUser();
                                }
                                else{
                                    console.log("Your saved jobs")
                                    console.table(jobObj);
                                    await mainUser();
                                }
            
                                
                        })
                    } catch(error){
                        console.log("Incorrect Log in information")
                        await main();
                    }
                }

            }
  
  main();

  async function mainUser(){
    let task = await inquirer
            .prompt([
                {
                    type: "list",
                    message: "What would you like to do",
                    name: "job",
                    choices: [
                        "Search Users",
                        "See your saved jobs ",
                        "Edit profile",
                        "Add comment on user profile"
                    ]
                },
            ])
            if (task.job == "Search Users"){
                await inquirer
                .prompt([
                    {
                        type: "input",
                        message: "Please enter search",
                        name: "search",
                    }

                ]).then(
                    async (response)=>{
                        let usersearch = await db.query(`SELECT * FROM user WHERE firstName LIKE '%${response.search}%' OR lastName LIKE '%${response.search}%'`);
                        console.table(usersearch);
                                //userid = useridObj[0].id;
                    }
                )
            }
  }