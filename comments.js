// Create web server
// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];
var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        fs.readFile('./index.html', 'utf-8', function(err, data){
            if(err){
                console.log(err);
            }else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            }
        });
    }else if(pathname == '/getComments'){
        var json = JSON.stringify(comments);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(json);
    }else if(pathname == '/postComment'){
        var comment = urlObj.query;
        comments.push(comment);
        res.end();
    }else{
        var file = path.normalize('.' + pathname);
        fs.exists(file, function(exists){
            if(exists){
                fs.readFile(file, 'utf-8', function(err, data){
                    if(err){
                        console.log(err);
                    }else{
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.end(data);
                    }
                });
            }else{
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('404 - Not Found');
            }
        });
    }
});
server.listen(3000, function(){
    console.log('Server started on http://localhost:3000');
});