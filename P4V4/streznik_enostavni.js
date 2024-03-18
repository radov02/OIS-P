const port = process.env.PORT || 8080;

const http = require("http");   // uvoz knjižnice

let steviloUporabnikov = 0;

// kreiranje objekta strežnika:
http.createServer((zahteva, odgovor) => {   // The requestListener is a function which is automatically added to the 'request' event.
    steviloUporabnikov++;
    odgovor.writeHead(200, {"Content-Type": "text/plain"});
    odgovor.end("Pozdravljen " + steviloUporabnikov + ". vsi ljubitelj predmeta OIS\n");
}).listen(port);    // zagon strežnika na vratih port


console.log("Strežnik je pognan.");