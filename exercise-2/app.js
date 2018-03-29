var http=require('http');
http.createServer(function(req,res){
    res.writeHead(200, {'Content-type':'text/plain'});
    res.end('Hello world');
}).listen(9000,'localhost');

console.log('Server running at http://localhost:9000');

console.log('One');
console.log('Two');
setTimeout(function() {
    console.log('Three');
}, 2000);
console.log('Four');
console.log('Five');