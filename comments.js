//Create Web Server
var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if (filename == "./") {
        filename = "./index.html";
    }
    fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}).listen(8080);

//Create Comments
http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var body = '';
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            var post = qs.parse(body);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('Name: ' + post.name + '<br>');
            res.write('Comment: ' + post.comment);
            res.end();
        });
    } else {
        res.writeHead(405, { 'Content-Type': 'text/html' });
        return res.end('<h1>Method not supported</h1>');
    }
}).listen(8081);