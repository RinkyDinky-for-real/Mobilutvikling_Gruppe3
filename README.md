# Anglers Atlas.
## Introduksjon
For gruppe 3 sitt prosjekt valgte vi å lage en expo applikasjon for fiskere over verden som trenger en måte å lagre og dele lokasjoner med god/mye fangst, vi valgte da å lage en app som fungerer likt til sosiale medier som instagram og twitter (x) hvor brukere laster opp lokasjoner hvor de selv har opplevd gode fisketilstander og poster ett innlegg til en offentlig feed som viser
hvor og hva de fisket samt et bilde av geolokasjonen på ett kart.
## hvordan starte applikasjonen
* Sett opp android emulator
* last ned og installer npm, npx og node.js
* åpne en terminal inne i prosjekt mappen, og kjør npm install komandoen
* start applikasjonen med npx expo run:android
* registrere seg og logge seg inn i appen.
## flyt og kode struktur
Når appen først åpnes, sjekkes secure store for en bruker id. Hvis en bruker id blir funnet, logges brukeren automatisk inn. Hvis ikke, blir brukeren sendt til loggin siden.
En bruker starter ved å registrere en konto. Da blir brukernavnet og passordet validert, slik at passordet har en stor bokstav, minst 6 tegn og ett spesial symbol og ikke noen mellomrom mens brukernavnet kan bare ha bokstaver og tall. Hvis valideringen passer, sendes dataen til cloudflair workeren via https. Der sjekkes det om en bruker med samme brukernavn allerede eksisterer, i så fal, blir det sendt tilbake en 409 respons.
Hvis ikke, hashes passordet, og en userId blir opprettet. userId'en, brukernavnet og passord hashen skrives til databasen.
Deretter logger en bruker inn, og de samme validerings sjekkene blir utført på frontend. brukernavnet og passordet blir sendt til cloudflair workeren.
Hvis begge deler matcher en allerede eksisterene bruker, sendes bruker Id'en tilbake, og den blir lagret i secure store, og puttet inn i AuthContext. Deretter blir brukeren sendt til feed siden. 

Feed siden bruker en flatlist, henter tilfeldige innlegg fra databasen via endepunktet post/random, og viser de til brukeren. Brukeren kan klikke seg inn på en individuelt innlegg, for og få det i et større format.

Brukeren kan også navigere til Profil-siden, der det står informasjon om brukerkontoen, i dette tilfellet antall posts, favoritt-fisk, favoritt-sted, og favoritt-fiskemetode, alle tre skrives som streng. på denne siden kan brukeren også redigere disse favorittene. Når brukeren er ferdig med appen, kan brukeren logge seg ut på denne siden også.

For å lage posts, må brukeren gå til Create Post-siden. på denne siden får brukeren valgt lokasjon ved å klikke på et kart. koordinatene oppdateres hver gang man klikker på kartet. deretter skriver man en tittel for posten, og en kort brukerdefinert beskrivelse. for å laste opp posten, klikker man på upload, så behandles opplastingen.

i Fishing-spots siden kan brukeren få oversikt over alle innlegge sine med lokasjonen

Appen tar bruk av MapLibre-React-Native, et bibliotek for kart. MapLibre-react-native er en fork av det populære open-source biblioteket maplibre. I dette prosjektet brukes Maplibre for å vise fram alle kartene i prosjektet. 

## designvalg
Vi valgte å bruke MapLibre fordi det er et open-source bibliotek, som ikke krevde API-nøkler for å brukes, og hadde fortsatt alle featurene som vi trengte for prosjektet.

i Fishing-spots siden vises bare posts som tilhører brukeren. dette ble valgt fordi hvis appen skulle vise alle markers til alle brukere, ville kartet fort bli helt uleselig.

Tabs-navigering: vi valgte tabs-navigering, siden det er en oversiktlig måte å vise brukeren hvor de kan gå fram og tilbake.

## Testing

for å starte testene må npm være installert med npm install, etter ferdig installasjon kan testene kjøres med npm test i terminalen for ..\MobilProgFiskeApp

npm installering:
npm install 

kjøring av tester:
npm test


## bugs/ ting vi ikke fikk inkludert:
Delete-knappen: slett-knappen funker delvis, nemlig at den er satt opp i DB, men implementasjonen på frontend er delvis ferdig. Sånn som det funker nå er at man kan slette posts når man er brukeren bak det (dette sjekkes i DB med å sammenligne userID), men på frontend hadde vi ingen måte å sjekke om den aktive brukeren eier posten. Dette gjør at vi hadde ingen måte å sette opp pagen slik at slett-knappen ikke vises når man ikke er brukeren. dette er en mangel som vi oppdaget for sent i utviklingen for å få rettet den i tide. Vi bestemte oss som gruppe å fortsatt inkludere slett-knappen, for å vise at appen har delvis funksjonalitet for sletting av posts.

Markers på fishing spots: markers var originalt ment til å kunne redirecte til en post side, men på grunn av at markers og posts kom fra to forskjellige Zod-schemaer, fikk vi ikke det til å fungere i prosjektet på samme måte som å klikke på posts i feed/profil, siden vi fikk type-forskjeller. Zod-schemaet til markers inneholdt mindre data enn Zod-schemaet til post, siden det var tiltenkt til å bare vise lokasjon på et kart, men etterhvert som vi utviklet posts-siden, ble det nødvendig med mer informasjon, som MarkerSchema ikke hadde. Dette ble oppdaget for sent i prosjektet for å utbedres, siden det krevde å omskrive all koden relatert til markers. Allikevel viser markers fortsatt lokasjonen til fiskeområdene til brukeren. Om vi hadde startet på nytt, hadde vi implementert marker som property til Post.