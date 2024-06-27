//var needa change
let totalproj = 1 + 6;
//variables
let homenav = document.getElementById("homenav");
let hamoptions = document.getElementById("hamoptions");
let topanimate = document.getElementById("topanimate");
let bottomanimate = document.getElementById("bottomanimate");
let havescrolled = 0;
let haveseen = 0;
let currenttool = "yarn";
// class to track slideshow
let slideshow = {
    purrcat: 1,
    greenshirt: 1,
    billie: 1,
    bee: 1,
    crochetfrog: 1,
    skull: 1,
};


//functions
function brownnav() {
    homenav.style["background-color"] = "#893f04";
    homenav.style.color = "#dbc5b6";
}
function clearnav() {
    homenav.style["background-color"] = "";
    homenav.style.color = "#893f04";
}

function checkscroll() {
    if (document.documentElement.scrollTop > 1) {
        brownnav();

    } else if (hamoptions.style.display != "block") {
        clearnav();
    } 
    if ((haveseen < (totalproj - 1)) && document.documentElement.scrollTop > havescrolled) {
        havescrolled = document.documentElement.scrollTop;
        //for not mobile
        if ((window.innerWidth > 768) && ((havescrolled - 100) / (window.innerHeight * 0.7) > haveseen)) {
            haveseen++;
            document.getElementById("section" + (totalproj - haveseen)).style.animation = "fadein 1s linear";
            document.getElementById("section" + (totalproj - haveseen)).style["animation-fill-mode"] = "forwards";
        } else if ((havescrolled - 100) / (window.innerHeight * 0.85) > haveseen) {
            //for mobile
            haveseen++;
            document.getElementById("section" + (totalproj - haveseen)).style.animation = "fadein 1s linear";
            document.getElementById("section" + (totalproj - haveseen)).style["animation-fill-mode"] = "forwards";
        }

    } 
}
function disableslide(project) {
    document.getElementById(project + slideshow[project]).style.display = "none";
    document.getElementById(project + slideshow[project]).style.animation = "";
    document.getElementById(project + "span" + slideshow[project]).style["background-color"] = "#dbc5b6";
}
function enableslide(project) {
    document.getElementById(project + slideshow[project]).style.display = "block";
    document.getElementById(project + "span" + slideshow[project]).style["background-color"] = "#546344";
    document.getElementById(project + slideshow[project]).style.animation = "fadein .5s";
}

function changeslide(project, add, max) {
    //disable current slide's display and span
    disableslide(project);
    //update slideshow class
    if (slideshow[project] + add == max + 1) {
        slideshow[project] = 1;
    } else if (slideshow[project] + add == 0) {
        slideshow[project] = max;
    } else {
        slideshow[project] += add;
    }
    //change new slide display and span
    enableslide(project);
}

function selectslide(project, slide) {
    disableslide(project);
    slideshow[project] = slide;
    enableslide(project);
}

function tooldescription(tool) {
    document.getElementById(currenttool + "desc").style.display = "none";
    document.getElementById(tool + "desc").style.display = "block";
    currenttool = tool;
}
function openbar() {
    if (hamoptions.style.display == "block") {
        //close hamburger
        document.getElementById("greyedout").style.display = "none";
        document.getElementById("greyedout").style.opacity = "0";
        hamoptions.style.display = "none";
    } else {
        //open hamburger
        document.getElementById("greyedout").style.display = "block";
        document.getElementById("greyedout").style.opacity = "1";
        hamoptions.style.display = "block";
        hamoptions.style.animation = "hambar .25s linear";
    }
}
function validateemail(email) {
    let button = document.getElementById("subscribe");
    var params = {
        subemail: document.getElementById("subscribeinput").value
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        emailjs.send("service_1yw1hkh", "template_e2bytus", params).then(function () {
            button.onclick = "";
            button.style.cursor = "not-allowed";
            button.style["background-color"] = "#a26737";
        });
        return "Subscribed!";
        
    } else {
        document.getElementById("subscribeinput").value = "";
        return "Invalid!";
    }
}
function subscribe() {
    document.getElementById("subscribe").innerText = validateemail(document.getElementById("subscribeinput").value); 
}
function invalidmsg(input, type) {
    if (type == "number") {
        input.target.setCustomValidity("Only numbers and spaces are allowed");
    } else {
        input.target.setCustomValidity("Please do not include symbols other than ! , . ?");
    }
}
function clearinvalid(input) {
    input.target.setCustomValidity("");
}



//call functions or event listeners
if (document.title == "homepage" ) {
    window.onscroll = function() {
        checkscroll();
    }
    window.onbeforeunload = function () {
        //to make sure if they refresh they go back to the top
        window.scrollTo(0,0);
    }
}


if (document.title == "requests") {
    //check for form invalid inputs
    document.querySelector("input[name='name']").addEventListener("invalid", function(event){invalidmsg(event, "text")});
    document.querySelector("input[name='name']").addEventListener("change", function(event){clearinvalid(event)});
    document.querySelector("input[name='comments']").addEventListener("invalid", function(event){invalidmsg(event, "text")});
    document.querySelector("input[name='comments']").addEventListener("change", function(event){clearinvalid(event)});
    document.querySelector("input[name='number']").addEventListener("invalid", function(event){invalidmsg(event, "number")});
    document.querySelector("input[name='number']").addEventListener("change", function(event){clearinvalid(event)});
}
