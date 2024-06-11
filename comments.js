//Create Web Server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');
var comments = [];

var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        fs.readFile('./index.html', function(err, data){
            if(err){
                console.log(err);
            }else{
                res.end(data);
            }
        });
    }else if(pathname == '/post'){
        var comment = urlObj.query;
        comment.dateTime = new Date();
        comments.push(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    }else if(pathname == '/comment'){
        var str = JSON.stringify(comments);
        res.end(str);
    }else{
        static(pathname, res);
    }

});

server.listen(8080, function(){
    console.log('Server is running at http://localhost:8080');});