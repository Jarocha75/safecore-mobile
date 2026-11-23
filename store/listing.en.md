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

**App Review Information → Notes:**
```
SafeCore is a companion app for existing customers of SafeCore, s.r.o. courses (safecore.sk). Courses are purchased and managed outside the app. The app contains no purchase flow, no offer to buy and no link to a payment page. It only gives users access to content they have already obtained elsewhere (reader-style access, no in-app purchases).

There is no registration in the app: accounts are created on our website after a course is purchased. Sign-in is e-mail + password only. The content is in Slovak.

Test account:
  E-mail:   <TO BE FILLED IN>
  Password: <TO BE FILLED IN>
The account has an active course, so all features are available: practice tests, mock exam, legislation, documents, tips and the licence expiry reminder.

Account deletion: Profile → Delete account (the app calls DELETE on our API; the account is anonymised and access is removed).
Push notifications and the SMS reminder for licence expiry are optional and require explicit consent in the app.
The licence number and name are stored only in the device's secure storage.
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
