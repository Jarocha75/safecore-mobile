import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Palette } from "@/constants/palette";
import type { TipTopic } from "@/types/tips";

const ICON_SIZE = 28;

/**
 * Rady a tipy. Novú tému alebo sekciu pridaj sem, nie do obrazovky.
 * Sekcia = nadpis + bloky (`paragraph` = odsek, `list` = odrážky).
 */
export const TIP_TOPICS: TipTopic[] = [
  {
    id: "zbrojny-preukaz",
    icon: (
      <MaterialCommunityIcons
        name="pistol"
        size={ICON_SIZE}
        color={Palette.primary}
      />
    ),
    title: "Zbrojný preukaz",
    description: "Ako podať žiadosť a čo k nej priložiť",
    sections: [
      {
        id: "podanie-ziadosti",
        title: "Podanie žiadosti",
        blocks: [
          {
            type: "paragraph",
            text: "V žiadosti o vydanie zbrojného preukazu žiadateľ uvedie:",
          },
          {
            type: "list",
            items: [
              "osobné údaje (meno a priezvisko, rodné číslo, dátum narodenia, miesto pobytu),",
              "číslo dokladu totožnosti, cudzinec číslo cestovného dokladu alebo dokladu nahrádzajúceho cestovný doklad,",
              "skupinu zbrojného preukazu, o vydanie ktorej žiada,",
              "odôvodnenie žiadosti o vydanie zbrojného preukazu.",
            ],
          },
          {
            type: "paragraph",
            text: "K žiadosti o vydanie zbrojného preukazu žiadateľ pripojí",
          },
          {
            type: "list",
            items: [
              "dve fotografie s rozmermi 30 x 35 mm, ktoré zodpovedajú súčasnej podobe žiadateľa, zobrazujúce žiadateľa v čelnom pohľade s výškou tvárovej časti hlavy od očí k brade najmenej 13 mm, v občianskom odeve, bez okuliarov s tmavými sklami a bez prikrývky hlavy, ak jej použitie nie je odôvodnené náboženskými alebo zdravotnými dôvodmi; v tomto prípade nesmie prikrývka hlavy zakryť tvárovú časť spôsobom znemožňujúcim identifikáciu žiadateľa,",
              "lekársky posudok o zdravotnej spôsobilosti a psychologický posudok o psychickej spôsobilosti držať alebo nosiť zbraň a strelivo,",
              "potvrdenie orgánu štátnej správy, že má oprávnenie podľa osobitného predpisu, ak žiada o vydanie zbrojného preukazu na výkon tohto oprávnenia,",
              "potvrdenie právnickej osoby zaoberajúcej sa športovou činnosťou, ktorej súčasťou je športová streľba podľa pravidiel platných na území Slovenskej republiky alebo medzinárodných pravidiel o členstve, ak žiada o vydanie skupiny E zbrojného preukazu,",
              "(predloží) originál dokladu, na základe ktorého možno započítať skúšku odbornej spôsobilosti alebo jej časť.",
            ],
          },
          {
            type: "paragraph",
            text: "Žiadateľ o vydanie zbrojného preukazu, ktorý sa za posledných desať rokov pred podaním žiadosti nepretržite zdržiaval viac ako šesť mesiacov mimo územia Slovenskej republiky, predloží tiež doklad obdobný odpisu z registra trestov zo štátu, v ktorom sa trvale zdržiaval, a jeho preklad do štátneho jazyka vyhotovený tlmočníkom zapísaným v zozname znalcov a tlmočníkov; ak nemôže takýto doklad predložiť, pretože mu ho štát nevydá, predloží čestné vyhlásenie o tom, že nebol v cudzine uznaný vinným z trestného činu, pre ktorý nemôže byť považovaný za bezúhonného, alebo nebol uznaný vinným z priestupku, pre ktorý nemôže byť považovaný za spoľahlivého.",
          },
          {
            type: "paragraph",
            text: "Žiadateľ, ktorý je v čase podania žiadosti príslušníkom ozbrojených síl Slovenskej republiky vykonávajúcim profesionálnu službu, príslušníkom ozbrojeného bezpečnostného zboru, ozbrojeného zboru, Slovenskej informačnej služby alebo Národného bezpečnostného úradu, predkladá písomné potvrdenie nadriadeného s personálnou právomocou, ktorým sa osvedčuje bezúhonnosť a spoľahlivosť žiadateľa a jeho zdravotná spôsobilosť používať služobnú zbraň. Nadriadený je povinný bezodkladne oznámiť policajnému útvaru, ktorý zbrojný preukaz vydal, zmeny, ktoré majú za následok stratu bezúhonnosti, spoľahlivosti alebo zdravotnej spôsobilosti držiteľa zbrojného preukazu.",
          },
          {
            type: "paragraph",
            text: "Predložené doklady nesmú byť v čase podania žiadosti o vydanie zbrojného preukazu staršie ako tri mesiace.",
          },
        ],
      },
    ],
  },
  {
    id: "preukaz-sbs",
    icon: <Ionicons name="id-card" size={ICON_SIZE} color={Palette.primary} />,
    title: "Preukaz SBS",
    description: "Čoskoro",
    sections: [],
  },
];
