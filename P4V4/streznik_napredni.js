const port = process.env.port || 8080;

const mime = require("mime-types");
const formidable = require("formidable");
const http = require("http");
const fs = require("fs");
const path = require("path");

let predpomnilnik = {}; // objekt kamor bomo shranjevali statične datoteke

// objekt strežnika:
const streznik = http.createServer((zahteva, odgovor) => {  // SERVERSKA CALLBACK FUNKCIJA (izvede se ob dogodku na strežniku - pridobimo zahtevo, oddamo odgovor)
    let potDoDatoteke = false;
    if(zahteva.url == "/"){
        potDoDatoteke = "./P4V4/public/index.html";
    }
    else if(zahteva.url == "/posredujSporocilo"){
        obdelajSporocilo(zahteva, odgovor);
    }
    else {
        potDoDatoteke = "./P4V4/public" + zahteva.url;
    }

    if(potDoDatoteke){  // statično vsebino postrežemo le takrat, ko pride takšna zahteva
        posredujStaticnoVsebino(odgovor, potDoDatoteke);
    }
})

// poženemo strežnik:
streznik.listen(port, () => {
    console.log("Strežnik pognan na portu: " + port);
})

function posredujStaticnoVsebino(odgovor, potDoDatoteke) {

    if(predpomnilnik[potDoDatoteke]){   // če v predpomnilniku že obstaja datoteka s to potjo (ni null)
        posredujDatoteko(odgovor, potDoDatoteke, predpomnilnik[potDoDatoteke]);
    }
    else{
        fs.access(potDoDatoteke, (napaka) => {      // ali obstaja datoteka in ali imamo dostop
            if(!napaka){
                fs.readFile(potDoDatoteke, (napaka, datotekaVsebina) => {
                    if(napaka){
                        posredujNapako(odgovor, 500);   // napaka na strežniku
                    }
                    else {
                        predpomnilnik[potDoDatoteke] = datotekaVsebina;     // dodamo v predpomnilnik
                        posredujDatoteko(odgovor, potDoDatoteke, datotekaVsebina);
                    }
                })
            }
            else {
                posredujNapako(odgovor, 404);   // napaka pri clientu
            }
        })
    }
}

function posredujNapako(odgovor, tip) {
    odgovor.writeHead(tip, {"Content-Type": "text/plain"});
    if(tip == 404){
        odgovor.end("Napaka 404: Vira ni mogoče najti.");
    }
    else if(tip == 500){
        odgovor.end("Napaka 500: Prišlo je do napake strežnika.");
    }
    else {
        odgovor.end("Napaka " + tip + ": Neka druga napaka");
    }
}

function posredujDatoteko(odgovor, datotekaPot, datotekaVsebina){
    odgovor.writeHead(200, {"Content-Type": mime.lookup(path.basename(datotekaPot))});
    odgovor.end(datotekaVsebina);
}

function obdelajSporocilo(zahteva, odgovor) {   // obdelamo sporočilo na strežniku
    let obrazec = new formidable.IncomingForm();
    obrazec.parse(zahteva, (napaka, vrednosti) => {
        if(napaka){
            posredujNapako(odgovor, 404);
        }
        else {
            let sporociloUporabnika = new Date().toJSON() + "|" + vrednosti.oseba + "|" + vrednosti.komentar + "|" + vrednosti.strah + "\n";
            fs.appendFile("./P4V4/komentarjiLog.txt", sporociloUporabnika, (napaka) => {     // LOG datoteka komentarjev
                if(napaka){
                    posredujNapako(odgovor, 500);
                }
                else {
                    posredujZahvaloZaPosredovanKomentar(odgovor);
                }
            })
        }
    })
}

function posredujZahvaloZaPosredovanKomentar(odgovor){
    odgovor.writeHead(200, {"Content-Type": "text/plain"});
    odgovor.end("Hvala za posredovane komentarje!");
}