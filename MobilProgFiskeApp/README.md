# Anglers Atlas.
## Introduksjon
For gruppe 3 sitt prosjekt valgte vi å lage en expo applikasjon for fiskere over verden som trenger en måte å lagre og dele lokasjoner med god/mye fangst, vi valgte da å lage en app som fungerer likt til sosiale medier som instagram og twitter (x) hvor brukere laster opp lokasjoner hvor de selv har opplevd gode fisketilstander og poster ett innlegg til en offentlig feed som viser
hvor og hva de fisket samt et bilde av geolokasjonen på ett kart.
## hvordan starte applikasjonen
* Set op android emulator
* last ned og installer npm, npx og node.js
* åpne en terminal inne i prosjekt mappen, og kjør npm install komandoen
* start applikasjonen med npx expo run:android
## flyt og kode struktur
Når appen først opnes, sjekkes secure store for en bruker id. Hvis en bruker id blir funnet, logges brukeren automatisk inn. Hvis ikke, blir brukeren sendt til loggin siden.
En bruker starter ved og registrere en konto. Da blir brukernavnet og passordet validert, slik at passordet ikke kan ha mellomrom og brukernavnet kan bare ha bokstaver og tall. Hvis valideringen passer, sennes dataen til cloudflair workeren via https. Dær sjekkes det om en bruker med samme brukernavn allerede eksisterer, i så fal, blir det sendt tilbake en 409 respons.
Hvis ikke, hashes passordet, og en userId blir opprettet. userIden, brukernavnet og passord hashen skrives til databasen.
Deretter logger en bruker inn, og de samme validerings sjekkene blir utført på frontend. brukernavnet og passordet blir sendt til cloudflair workeren.
Hvis begge deler matcher en allerede eksisterene bruker, sendes bruker iden tilbake, og den blir lagret i secure store, og puttet inn i AuthContext. Derretter blir brukeren sendt til feed siden. Feed siden bruker en flatlist, henter tylfeldige innlegg fra databasen via endepunktet post/random, og viser de til brukeren. Brukeren kan klikke seg inn på en individuelt innlegg, for og få det i et større format.