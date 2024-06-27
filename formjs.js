var formdata = location.search;

//for email data
var mailarray = [];

//remove the '?'
formdata = formdata.substring(1);

//replace the symbols
formdata = formdata.replace(/%40/g, "@");
formdata = formdata.replace(/%3A/g, ":");
formdata = formdata.replace(/%2F/g, "/");
formdata = formdata.replace(/%2C/g, ",");
formdata = formdata.replace(/%21/g, "!");
formdata = formdata.replace(/%3F/g, "?");
formdata = formdata.replace(/[+]/g, " ");
//split the data into an array
arraydata = formdata.split("&");

//loop through each data and write it out, but -1 to skip the "submit: submit"
for (let i = 0; i < arraydata.length - 1; i++) {
    document.write(arraydata[i].replace("=", ": ") + "<br><br>");
    mailarray.push(arraydata[i].slice(arraydata[i].indexOf("=") + 1));
}
//make sure form had been submitted
if (mailarray.length == 6) {
    var params = {
        name: mailarray[0],
        useremail: mailarray[1],
        number: mailarray[2],
        link: mailarray[3],
        price: mailarray[4],
        comments: mailarray[5],
    }
    document.getElementById("emailstatus").innerHTML = "<b>sending email...</b>";
    //send the email via emailjs
    emailjs.send("service_1yw1hkh", "template_3dyggnc", params).then(function () {
        //show confirmation
        document.getElementById("emailstatus").innerHTML = "<b>response has been emailed to me successfully!</b>";
    });
    
} else {
    document.write("form error. please resubmit")
}

//if they refresh need to redirect so the email doesnt send again
window.onbeforeunload = function () {
    window.setTimeout(function () {
        window.location.replace('homepage.html');
    }, 0);
    window.onbeforeunload = null; 
}