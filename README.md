
# Løsningsforslag

Løsningsforslaget er bygget med inspirasjon fra Finansportalen sin egen sammenligningstjeneste. 

- Hovedfunksjonaliteten som er bygd er sammenligningstjenesten der du kan sammenligne flere kontoer opp mot hverandre, og se hvordan utviklingen på disse kan bli om renten holder seg stabil.

- Tanken rundt løsningen er å bygge den så stabil som mulig gitt forutsetningen, så data og filter kan tilpasses og utvikles basert på A/B tester og bruker feedback. Gitt forutsetningene er det forsatt mye forbedringspotesialle der. 

## Forutsetninger
Case oppgaven er løst under fortusetningen at XML-filen kan endre seg, men at dette ikke vil skjer veldig regelmessig (maks 1 gang i måneden, og ofte sjeldnere). Og at de fleste kunder er mest interessert i den renten de får fra første krone. 


Derfor er det lagt opp for en semi-manuell konvertering/validering fra xml -> JSON/Typescript.
  
Utover det vil kunden se all bankkontoer som er tilgjengelig for allmenheten uten å filtrere, dette inkluderer blandt annet lokale tilbud da det varierer hvor strengt kriteriene for å benytte seg av disse. Derfor er balndt annet kontoer som forutsetter medlemskap i feks LO filtrert ut so standard, med mulighet for å vise de.


Det også bygd et API-lag som formatterer og filtrerer ut data basert på forespørsler fra frontend


## Mangler, bugs og videreutvikling

- En del komponenter/ funskjoner er mindre DRY enn det kunne vært.
- Følgende filter kan legges inn:
  -    Krav om månedlig sparing (lagt inn i API men ikke implementert)
  -    Krav om kundeforhold 
  -    Område: Lokal/Nasjonal (lagt inn i API men ikke implementert)
  -    Trapp type (rente pr intervall/rente fra første krone / nei)
  -    Frie uttak (lagt inn i API men ikke implementert)

- Anbefalningen er pr nå kun basert på rente fra først krone, dette kan opptimaliseres for å gi brukeren en mer personlig anbefaling basert på spare horisont, og total sum.
- UX/ brukeropplevelsen kan bli en del mer intuitiv
- Som UI bibliotek er shadcn/ui brukt, som gir en litt "generisk" følelse, som jeg gjerne skulle bruk mer tid på å tilpasse.
- Radix som er underligende under shadcn/ui har jeg opplevd noen issues med tidligere, som det kan brukes mer tid på å undersøke.
- API-laget kan på sikt utvides til å bruke en database, der tjenesten kan supplere data. Feks historisk rente, og hvordan banken tilpasser seg når styringsrenten endres.
- Accessibility er hensyntatt ved at Radix har en del innebygd, utover det er det mye som kan gjøres
- Optimalisering av innlastning av side, første load av data kan statisk genereres feks.
- Det er noen steder der det er brukt type casting etc, som burde oppdateres til å bruke generics.
- inkonsistent bruk av zod/types
- Error / empty states når noe går galt, eller filteret ikke returnerer noe data


- Gameification av sammenligningen, forskjellen på 6,5% og 6,8% er ikke sykt mye. Så en fin feature å få inn hadde vært å la brukeren velge en enhet de vil se besparelsene sine i. Feks du sparer 3 latter i året på å bytte bank. 




