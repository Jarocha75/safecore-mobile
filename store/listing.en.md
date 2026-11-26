# Store listing – English version (Google Play and App Store)

English counterpart of [listing.md](listing.md). The review notes are the part that matters most: App Review and Play reviewers read English. The store description and keywords are optional and only shown for an English localization; the default language of the app is Slovak.

Limits: Play title 30, short description 80, full description 4000 · App Store name 30, subtitle 30, promotional text 170, keywords 100 (comma-separated, no spaces), description 4000.

## Basics

| | |
|---|---|
| Name | SafeCore |
| Bundle ID / package | `sk.safecore.mobile` |
| Category | Education |
| Price | Free (access only for customers of SafeCore courses on safecore.sk) |
| Privacy policy | https://safecore.sk/ochrana-osobnych-udajov (Slovak) |
| Account deletion (required by Play) | https://safecore.sk/zmazanie-uctu |
| Support / contact | info@safecore.sk · +421 949 433 262 · https://safecore.sk |
| Developer | SafeCore, s.r.o. |

## Google Play

**Short description (max 80):**
Exam prep for the Slovak firearms licence and security guard (SBS) licence.

**Full description (max 4000):**
```
SafeCore is the companion app for students of SafeCore courses preparing for the Slovak firearms licence exam and the professional competence exam for private security services (SBS). Everything you need to prepare is in your pocket.

Access is for customers who have purchased a SafeCore course. Sign in with the same e-mail and password you use on safecore.sk. The app and its content are in Slovak.

WHAT YOU GET

• Practice tests – questions for each course (types Z, S and P) with instant feedback on every answer and a score at the end.
• Mock exam – a test in the same format, length and scoring as the real exam, including a time limit.
• Continue studying – the app remembers your unfinished test so you can pick up where you left off.
• Offline mode – download tests and keep practising without a connection.
• Laws and legislation – current texts of the relevant regulations as PDF inside the app, with offline download and printing.
• Documents and forms – forms for the firearms licence and for SBS, ready to download and print.
• Tips – how to apply, how the exam works, what to do after the result or for a retake.
• Licence validity – save the expiry date of your firearms or SBS licence and turn on a reminder. We send an SMS and a notification 3 months and 7 days before it expires, so you can renew in time. You can cancel the reminder at any time.

YOUR DATA

Your licence number and name stay only on your phone, in secure storage. Only the expiry date and, if you turn on the SMS reminder, your phone number are sent to our server. You can delete your account at any time in the app (Profile → Delete account).

ABOUT SAFECORE

SafeCore, s.r.o. runs courses and exam preparation for people applying for a firearms licence and for security industry staff. More at safecore.sk.
```

## App Store (iOS)

**Subtitle (max 30):**
Firearms licence & SBS exam

**Promotional text (max 170):**
Practice tests, mock exam, laws and forms for the Slovak firearms and SBS licence exams. Get reminded before your licence expires.

**Keywords (max 100):**
```
firearms licence,SBS,exam,practice tests,security guard,Slovakia,quiz,legislation,weapon,course
```

**Description:** same as the full description for Google Play.

## Review access

**Never write the demo account passwords into this file** (it is tracked by git). Enter all credentials directly in App Store Connect and Play Console. There are two demo accounts with the same access (courses Z, S and P): a main one and a backup one for testing account deletion. If a reviewer deletes one, recreate it before the next submission.

### App Store Connect → App Review Information

Tick **Sign-in required** and put the main account into the user name and password fields. Fill in the `[BACKUP …]` placeholders only in App Store Connect.

**Notes:**
```
ABOUT THE APP
SafeCore is a study companion for existing customers of SafeCore preparation courses in Slovakia. It helps them practise for the firearms licence exam (course Z) and the private security (SBS) professional competence exams (courses S and P). The user interface is in Slovak.

SIGN-IN
Please use the demo account from the sign-in fields. On the first screen tap "Prihlásiť sa" (Sign in), enter the e-mail and password, then tap "Prihlásiť sa" again. The demo account has access to all three courses (Z, S and P).

NO REGISTRATION OR PURCHASES IN THE APP
The app is sign-in only. It is free to download and is intended for customers who already bought a course on our website. It offers no registration, no purchases and no links or buttons for buying courses.

WHERE TO FIND THE MAIN FEATURES
Bottom tabs: "Domov" (Home), "Testy" (Tests), "Preukaz" (Licence), "Profil" (Profile).
- Practice tests: "Testy" > choose a course > choose a test.
- Mock exam (courses S and P): the "Cvičný test" card at the top of the course's test list.
- Offline use: the "Stiahnuť na offline" (Download for offline use) card in the course's test list.
- Legislation, forms and study tips: cards on the "Domov" tab.
- Licence expiry reminders: "Preukaz" tab. SMS reminders are optional and require explicit consent; a phone number is not needed to use the rest of the app.
- Notification settings: "Profil" > "Notifikácie". Notifications are optional.

ACCOUNT DELETION
"Profil" tab > "Zmazať účet" (Delete account) at the bottom > "Pokračovať" (Continue) > "Zmazať účet" to confirm.
Deletion is permanent and removes access to the courses. If you want to test it, please do so last, using the backup account below, so that the main demo account stays available.

BACKUP DEMO ACCOUNT (same access)
E-mail: [BACKUP E-MAIL]
Password: [BACKUP PASSWORD]

INDEPENDENCE
SafeCore is a private company. The app does not represent any government entity.
```

### Play Console → App content → App access

Add two separate sets of instructions, each with its own user name and password.

**Main account:**
```
Tap "Prihlásiť sa" (Sign in), enter the credentials, then tap it again. The account has courses Z, S and P. The app is in Slovak and is sign-in only for existing customers: no registration or purchases. Tests are in the "Testy" tab. Account deletion: "Profil" > "Zmazať účet" > "Pokračovať" > "Zmazať účet". It is permanent, so please test it last, on the backup account.
```

**Backup account:**
```
Backup account with the same access. Use it to test account deletion.
```

**App Privacy (nutrition label):**
- Data linked to the user: contact info (e-mail, name, phone number – only if the SMS reminder is on), identifiers (device push token), user content / progress (test results).
- Purpose: App functionality. Not used for tracking, not used for advertising.
- Encryption: standard HTTPS only → `ITSAppUsesNonExemptEncryption = false` (already set).

## Google Play Data safety

| Data | Collected | Shared | Purpose | Required |
|---|---|---|---|---|
| E-mail and name (account) | Yes | No | Account management, authentication | Yes |
| Phone number | Yes (only if SMS reminder is on) | Yes – SMS gateway Twilio (processor) | App functionality (reminder) | No |
| Licence expiry date | Yes (only for the reminder) | No | App functionality | No |
| Test results and progress | Yes | No | App functionality | Yes |
| Device identifier (push token) | Yes (after notifications are allowed) | Yes – Expo Push Service (processor) | App functionality | No |

- No ads, no tracking, no third-party analytics or crash reporting.
- Data is encrypted in transit (HTTPS).
- Users can request data deletion: yes (in the app and on the website).
- Target audience: adults.
