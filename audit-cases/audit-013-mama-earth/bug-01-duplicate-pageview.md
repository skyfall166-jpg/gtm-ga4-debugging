\# Bug 1 — Duplicate page\_view Firing



\*\*Finding ID:\*\* F1

\*\*Severity:\*\* High

\*\*Confidence:\*\* Confirmed

\*\*Surface:\*\* \[GTM] \[TAG]

\*\*Status:\*\* Open



\## Symptom



Two page\_view events fire during a single product page load without any user interaction.



\## Evidence



Network inspection showed two separate GA4 collect requests:



\* en=page\_view

\* Same CID

\* Same SID

\* Same page URL

\* Different execution batches (rcb=10 and rcb=11)



No navigation or interaction occurred between requests.



\## Root Cause



\*\*Suspected\*\*



Possible causes include:



\* Multiple GA4 Config tags

\* Config tag plus additional page\_view generation

\* Hardcoded gtag.js alongside GTM implementation



GTM access required for confirmation.



\## Business Impact



\* Inflated pageview counts

\* Distorted landing page reporting

\* Lower apparent conversion rates

\* Inaccurate funnel entry metrics



\## Fix



\* Audit all page\_view generation paths

\* Ensure only one GA4 Config implementation exists

\* Remove duplicate page\_view sources

\* Validate using GTM Preview



\## Verification



Single page load should generate exactly one page\_view request.



