# Mobilutvikling_Gruppe3

* åpne en terminal inne i prosjekt mappen, og kjør npm install komandoen
* start applikasjonen med npx expo run:android

## Flyt og kode struktur

Når appen først åpnes, sjekkes secure store for en bruker id. Hvis en bruker id blir funnet, logges brukeren automatisk inn. Hvis ikke, blir brukeren sendt til loggin siden.
En bruker starter ved og registrere en konto. Da blir brukernavnet og passordet validert, slik at passordet ikke kan ha mellomrom og brukernavnet kan bare ha bokstaver og tall. Hvis valideringen passer, sennes dataen til cloudflair workeren via https. Dær sjekkes det om en bruker med samme brukernavn allerede eksisterer, i så fal, blir det sendt tilbake en 409 respons.
Hvis ikke, hashes passordet, og en userId blir opprettet. userIden, brukernavnet og passord hashen skrives til databasen.
Deretter logger en bruker inn, og de samme validerings sjekkene blir utført på frontend. brukernavnet og passordet blir sendt til cloudflair workeren.

## Testing

for å starte testene må npm være installert med npm install, etter ferdig installasjon kan testene kjøres med npm test i terminalen for ..\MobilProgFiskeApp

npm installering:
npm install 

kjøring av tester:
npm test

