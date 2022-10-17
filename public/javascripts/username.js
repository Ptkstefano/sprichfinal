var db = require('./dbController.js');

async function username(user)
{
    let username = "";

    if (user === undefined)
    {
       return username;
    }
    else
    {
        let firstNameQuery = await db("SELECT user_firstName FROM users WHERE user_id = "+user);
        let lastNameQuery = await db("SELECT user_lastName FROM users WHERE user_id = "+user);


        let firstName = firstNameQuery[0]["user_firstname"]
        let lastName = lastNameQuery[0]["user_lastname"]

        username = "Logged in as "+ firstName + " " + lastName;
        //is working: console.log(username)
        
    }

    return username;

}


module.exports = username;