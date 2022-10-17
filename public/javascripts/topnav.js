function topnav(user)
{
    let topnav = "";

    if (user === undefined)
    {

        topnav = 	     `<a class="active" href="/">Home</a>`+
                         `<a method = "get" href="/login">Login</a>`+
                         `<a method = "get" href="/methodology">Methodology</a>`+
                         `<a method = "get" href="/location">Location</a>`;


    }
    else
    {
        topnav =        '<a class="active" href="/">Home</a>'+
                         '<a method = "get" href="/logout">Logout</a>'+
                         '<a method = "get" href="/methodology">Methodology</a>'+
                         '<a method = "get" href="/location">Location</a>'+
                         '<a class="active" href="/mycourses">My courses</a>';
    }
    return topnav;

}




module.exports = topnav;