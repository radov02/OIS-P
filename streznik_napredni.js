const port = process.env.port || 8080;

const mime = require("mime-types");
const formidable = require("formidable");
const http = require("http");
const fs = require("fs");
const path = require("path");

// objekt strežnika:
const streznik = http.createServer((zahteva, odgovor) => {
    let potDoDatoteke = false;
    if(zahteva.url == "/"){
        potDoDatoteke = "./public/index.html";
    }
    else {
        potDoDatoteke = "./public" + zahteva.url;
    }
    posredujStaticnoVsebino(odgovor, potDoDatoteke);
})