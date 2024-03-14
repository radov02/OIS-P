var ime = "Janez";
var priimek = "Novak";

console.log("A ni lep dan, " + ime + " " + priimek + "?");

console.log(13.2 === 13.2); // === ...equal value and equal type
console.log("10" === 10);
console.log(2 == "2");  // == ...equal to (tries to cast and compares then)
console.log(10 < 5);

var ocena = 49.8;

// vejitve:
if(ocena >= 49.5){
    console.log("Izpit ste opravili");
}
else console.log("Izpita niste opravili");

// zanka:
for(var i = 0; i < 10; i++){
    console.log("i = " + i);
}

// funkcija:
var siOpravilIzpit = function(ocena){
    return (ocena >= 49.5 ? true : false);
}
console.log(siOpravilIzpit(49));
console.log(siOpravilIzpit(50));

// objekt:
var student = {
    ime: "Dejan",
    priimek: "Lavbič",
    izpit: 49,
    predstaviSe: function () {
        console.log("Sem " + this.ime + " " + this.priimek);
    }
};
student.predstaviSe();

// seznam:
var seznamZelja = ["hokaido buča", "melona"];
seznamZelja.push("vse");
console.log(seznamZelja);
console.log(seznamZelja[1]);
seznamZelja.pop();
console.log(seznamZelja);

// upravljanje z DOM ki ga ustvari brskalnik:
// window je objekt ki predstavlja okno prikaza; dodamo mu poslušalca akcij (akcije load)
window.addEventListener("load", function () {   // ta funkcija je callback funkcija, ki se pokliče PO izvedeni akciji (ko se asinhroni klic zaključi)
    console.log("Stran se je v celoti naložila.");

    var kontakt = document.getElementById("kontakt");   // PRIDOBI ELEMENT PO IDju
    console.log(kontakt);

    var pomembnoIzTabele = document.getElementsByClassName("pomembniPodatkiTabele");    // PRIDOBI ELEMENT PO CLASSu
    console.log(pomembnoIzTabele);

    var telSt = document.querySelector(".telefonska-stevilka"); // PRIDOBI ELEMENT PO SLEKTORJU
    console.log(telSt);

    var obdelajKlik = () => {   // funkcija, zapisana z arrow sintakso
        console.log("Potrebno je preveriti vnesene podatke");
    };
    
    var gumb = document.querySelector("input[type='button']");
    gumb.addEventListener("click", obdelajKlik);


    // uporabimo XHR (XML Http Request) - AJAX:
    var zahteva = new XMLHttpRequest(); // kreiramo zahtevo
    zahteva.onload = () => {    // to se izvede ko je klic zaključen
        console.log("Podatki oddaljene storitve pridobljeni");
        //console.log(this.responseText);
    };

    zahteva.open("get", "https://teaching.lavbic.net/api/kraji/iskanje/postnaStevilka/3000", true); // povemo odjemalcu da želimo odpreti povezavo s tega naslova (asinhrono)

    zahteva.send();

    // JSON:
    var nizAnakonda = JSON.stringify({  // ta objekt pretvorimo v niz (JSON)
        kaca: "Anakonda",
        habitat: "Južna Amerika",
        dolzina: "5-7 m"
    });
    console.log(nizAnakonda);
    var anakondaObjekt = JSON.parse(nizAnakonda);   // niz (JSON) parsamo v objekt
    console.log(anakondaObjekt.dolzina);

    
    // vse var spremenljivke deklarirane na začetku datoteke ne glede na to kje jih zapisemo
    var narediNekaj = function (){
        var a = 10;
    }
    narediNekaj();
    //console.log(a); // reference error: a is not defined
    a = 20;
    console.log(a); // NI NAPAKE, ker je a inicializiran


    var b = 10;
    if(b > 5){
        var c = 5;
    }
    console.log(b + c); // ker je c var, je deklariran na začetku datoteke IN ker se nato tudi inicializira na 5, ni napake - JS se interpretira po vrsticah

});