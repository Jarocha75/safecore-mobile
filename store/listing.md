# Podklady pre Google Play a App Store

Jazyk: slovenčina. Texty sú hotové na skopírovanie do Play Console a App Store Connect.
Limity: Play názov 30, krátky popis 80, plný popis 4000 · App Store názov 30, podtitul 30, promo text 170, kľúčové slová 100 (oddelené čiarkou, bez medzier), popis 4000.

## Základ

| | |
|---|---|
| Názov | SafeCore |
| Bundle ID / balík | `sk.safecore.mobile` |
| Kategória | Vzdelávanie (Education) |
| Cena | Zadarmo (prístup len pre zákazníkov kurzov z safecore.sk) |
| Zásady ochrany osobných údajov | https://safecore.sk/ochrana-osobnych-udajov |
| Zmazanie účtu (Play požaduje URL) | https://safecore.sk/zmazanie-uctu |
| Podpora / kontakt | info@safecore.sk · +421 949 433 262 · https://safecore.sk |
| Vývojár / firma | SafeCore, s.r.o. |

## Google Play

**Krátky popis (max 80):**
Príprava na zbrojný preukaz a SBS: testy, zákony, pripomienka platnosti.

**Plný popis (max 4000):**
```
SafeCore je sprievodná aplikácia pre študentov kurzov SafeCore na zbrojný preukaz a odbornú spôsobilosť pre súkromnú bezpečnostnú službu (SBS). Všetko na prípravu na skúšku máte po ruke v telefóne.

Prístup majú zákazníci, ktorí majú zakúpený kurz SafeCore. Prihlásite sa rovnakým e-mailom a heslom ako na webe safecore.sk.

ČO V APLIKÁCII NÁJDETE

• Testy na precvičovanie – otázky k jednotlivým kurzom (typ Z, S a P) s okamžitou kontrolou správnej odpovede a výsledkom na konci.
• Cvičná skúška – test v rovnakom formáte, rozsahu a bodovaní ako ostrá skúška, vrátane časového limitu.
• Pokračuj v štúdiu – appka si pamätá rozpracovaný test, takže pokračujete tam, kde ste skončili.
• Offline režim – stiahnite si testy a pripravujte sa aj bez pripojenia (napr. vo vlaku).
• Zákony a legislatíva – aktuálne znenia predpisov v PDF priamo v aplikácii, s možnosťou stiahnuť na offline čítanie a vytlačiť.
• Dokumenty a tlačivá – tlačivá k zbrojnému preukazu a k SBS na stiahnutie a tlač.
• Rady a tipy – ako podať žiadosť, ako prebieha skúška, čo robiť po výsledku alebo pri náhradnom termíne.
• Platnosť preukazu – uložte si dátum platnosti zbrojného preukazu alebo preukazu SBS a zapnite si upozornenie. Pošleme vám SMS a notifikáciu 3 mesiace a 7 dní pred koncom platnosti, aby ste si obnovu vybavili včas. Upozornenie môžete kedykoľvek zrušiť.

OCHRANA ÚDAJOV

Číslo a meno z preukazu zostávajú len vo vašom telefóne v zabezpečenom úložisku. Na server sa posiela len dátum platnosti a telefónne číslo, ak si zapnete SMS upozornenie. Účet môžete kedykoľvek zmazať priamo v aplikácii (Profil → Zmazať účet).

O SAFECORE

SafeCore, s.r.o. pripravuje kurzy a skúšky pre záujemcov o zbrojný preukaz a pre pracovníkov bezpečnostných služieb. Viac na safecore.sk.
```

**Údaje na Data safety (Play Console → Zásady aplikácie → Bezpečnosť údajov):**

| Údaj | Zbiera sa | Zdieľa sa | Účel | Povinné |
|---|---|---|---|---|
| E-mail a meno (účet) | Áno | Nie | Správa účtu, autentifikácia | Áno |
| Telefónne číslo | Áno (len ak zapnete SMS upozornenie) | Áno – SMS bránou Twilio (spracovateľ) | Funkcie aplikácie (upozornenie) | Nie |
| Dátum platnosti preukazu | Áno (len pri upozornení) | Nie | Funkcie aplikácie | Nie |
| Výsledky a postup v testoch | Áno | Nie | Funkcie aplikácie | Áno |
| Identifikátor zariadenia (push token) | Áno (po povolení notifikácií) | Áno – Expo Push Service (spracovateľ) | Funkcie aplikácie | Nie |

- Žiadna reklama, žiadne sledovanie, žiadna analytika ani crash-reporting tretích strán.
- Údaje sú šifrované pri prenose (HTTPS).
- Používateľ môže požiadať o zmazanie údajov: áno (v aplikácii aj na webe).
- Cieľová skupina: dospelí (18+ je bezpečná voľba; nie je to aplikácia pre deti).

## App Store (iOS)

**Podtitul (max 30):**
Zbrojný preukaz a SBS

**Promo text (max 170):**
Testy, cvičná skúška, zákony a tlačivá na zbrojný preukaz a SBS. Pripomíname vám platnosť preukazu, aby ste obnovu nezmeškali.

**Kľúčové slová (max 100):**
```
zbrojný preukaz,SBS,skúška,testy,legislatíva,bezpečnostná služba,zbraň,príprava,kurz,tlačivá
```

**Popis:** rovnaký ako plný popis pre Google Play.

**Poznámky pre review a prístupové pokyny (App Store aj Google Play):** anglické texty sú v [listing.en.md](listing.en.md#review-access). Prihlasovacie údaje demo účtov sa zadávajú len priamo v konzolách obchodov, nie do repozitára.

**Zásady súkromia (App Privacy – „nutrition label“):**
- Údaje spojené s používateľom: Kontaktné údaje (e-mail, meno, telefón – len pri SMS upozornení), Identifikátory (push token zariadenia), Používateľský obsah/postup (výsledky testov).
- Účel: Funkcie aplikácie. Nie na sledovanie (tracking: Nie), nie na reklamu.
- Šifrovanie: iba štandardné HTTPS → `ITSAppUsesNonExemptEncryption = false` (už nastavené).

**Vekové hodnotenie (dotazník):** obsah sa týka legálneho vlastníctva zbraní (vzdelávanie, bez zobrazenia násilia). Pri otázke na zbrane/násilie odpovedať podľa dotazníka (väčšinou „žiadne“ alebo „zriedkavé/mierne – iba textový/vzdelávací odkaz“). Výsledok skontrolovať, odporúčané 12+ až 17+ podľa toho, ako dotazník interpretuje tému zbraní.

## Screenshoty (treba nafotiť)

Odporúčané zábery (tmavý režim, s demo účtom):
1. Domov (sekcie, „Pokračuj v štúdiu“)
2. Zoznam kurzov / testov
3. Otázka v teste s označenou správnou odpoveďou
4. Cvičná skúška (hero karta, časovač)
5. Zákony a legislatíva (PDF čítačka)
6. Platnosť preukazu (detail so stavom)
7. Rady a tipy

Rozmery: iPhone 6,9″ (1320×2868) a 6,5″ (1284×2778) pre App Store; Play: min. 2 snímky telefónu, 16:9 alebo 9:16, 320–3840 px. Feature graphic Play: 1024×500.

## Čo ešte chýba pred odoslaním

Stav k 27. 11. 2026.

- [x] Demo účty pre reviewerov (hlavný a záložný) vytvorené.
- [x] Demo účty overené v simulátore: oba vidia kurzy Z, S a P; test, cvičný test a offline stiahnutie fungujú (mazanie účtu na nich neskúšať).
- [ ] Aktualizovať PDF predpisov na webe (`public/dokumenty`) podľa slov-lex.sk: zákon 473/2005 je vymenený (od 12. 6. 2026) a nasadený; Ústava SR je stále verzia platná do 4. 8. 1998; overiť zákon 190/2003 a vyhlášky 634/2005 a 555/2003. Preveriť, či sa novela 473/2005 netýka testových otázok a rád.
- [x] Formulár preukazu: údaje sa dajú uložiť len v telefóne; telefón a súhlas sa vyžadujú len pri zapnutí SMS (overené v simulátore). Upravený text súhlasu zahrnúť do právnej kontroly.
- [ ] Prihlasovacie údaje zadať v App Store Connect a Play Console.
- [x] Apple Developer účet overený.
- [x] Play Console účet organizácie vytvorený, poplatok zaplatený, status obchodníka deklarovaný.
- [x] Play Console: overenia účtu vybavené (totožnosť a ostatné úlohy na domovskej stránke).
- [ ] Play Console: vytvoriť appku SafeCore (balík `sk.safecore.mobile`).
- [ ] Play Console → Obsah aplikácie: status obchodníka pre appku, prístup k appke, Data safety, hodnotenie obsahu.
- [x] Screenshoty pre iOS: zábery 1–7 (1320×2868) v `store/screenshots/ios/`.
- [ ] Google Play: upraviť pomer strán screenshotov (max 2:1) a pripraviť feature graphic 1024×500.
- [ ] App Store Connect: zmeniť názov appky na „SafeCore“, doplniť `ascAppId` do `eas.json`.
- [ ] Produkčné buildy iOS a Android; Android otestovať na zariadení alebo emulátore (zatiaľ netestovaný).
- [ ] Otestovať zrušenie pripomienky nedokončeného testu po jeho dokončení a automatickú pripomienku platnosti zo servera.
- [ ] Právnik/zodpovedná osoba prejde text na webe (ochrana osobných údajov, Twilio DPF; či text a súhlas so SMS pokrývajú aj push).
- [ ] Popis pre Google Play: overiť, či treba vetu, že appka nezastupuje štátny orgán, a odkazy na oficiálne zdroje (zákony, tlačivá).
- [ ] Skontrolovať, že popis nepridáva odkaz na nákup (pravidlá obchodov).
