var express = require("express");
var app = express();
const path = require('path');

app.use(express.static("public"));
app.use(express.static("public/main"));
app.use(express.static("public/friend"));
app.use(express.static("public/profile"));
app.use(express.static("public/admin"));

app.get('', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/main/Html/index.html'));
});
app.get('/friend', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/friend/friendMain.html'));
});
app.get('/profile', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/profile/profile.html'));
});
app.get('/admin', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/admin/admin.html'));
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 1000;
}

app.listen(port, () => {
    console.log('App listening on port ' + port);
})
//tps://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
//https://stackoverflow.com/questions/38757235/express-how-to-send-html-together-with-css-using-sendfile
