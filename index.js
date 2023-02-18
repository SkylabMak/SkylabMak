const express = require("express");
const app = express();
const path = require('path');

let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
    PORT = 4000;
}

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
})

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/main')));
app.use(express.static(path.join(__dirname, '/public/friend')));
app.use(express.static(path.join(__dirname, '/public/profile')));
app.use(express.static(path.join(__dirname, '/public/admin')));
app.use(express.static(path.join(__dirname, '/public/chatbot_line')));
app.use(express.static(path.join(__dirname, '/public/meteor-shot')));
app.use(express.static(path.join(__dirname, '/public/42rush')));
app.use(express.static(path.join(__dirname, '/public/resource')));



app.get('', function (req, res) {
    //console.log(path.join(__dirname, 'public/main/Html/index.html'))
    res.sendFile(path.join(__dirname, '/public/main/index.html'));
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
app.get('/chatbot-line', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/chatbot_line/chatbot-line.html'));
});
app.get('/shooting-meteorite', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/meteor-shot/meteor-shot.html'));
});
app.get('/42_discovery_piscine', function (req, res) {
    res.sendFile(path.join(__dirname, '/public/42rush/index.html'));
});


//tps://www.digitalocean.com/community/tutorials/use-expressjs-to-deliver-html-files
//https://stackoverflow.com/questions/38757235/express-how-to-send-html-together-with-css-using-sendfile
module.exports = app
