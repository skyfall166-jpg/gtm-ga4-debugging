\# Bug 2 — UA Enhanced Ecommerce Payload Present in GA4



\*\*Finding ID:\*\* F2a

\*\*Severity:\*\* High

\*\*Confidence:\*\* Confirmed

\*\*Surface:\*\* \[GTM]

\*\*Status:\*\* Open



\## Symptom



The view\_item request contains UA-style pr1 product encoding inside a GA4 payload.



\## Evidence



Network payload contained:



pr1=nmVitamin C Daily Glow Face Serum...

\~pr339.00

\~brMamaearth



Request simultaneously contained:



\* v=2

\* tid=G-NEB3G7SX9B



Console inspection confirmed a valid GA4-style ecommerce.items structure existed in the dataLayer.



\## Root Cause



\*\*Suspected\*\*



UA Enhanced Ecommerce payload generation remains active somewhere in the tagging stack.



Possible sources:



\* Legacy UA tag

\* Custom template

\* Migration shim

\* Third-party vendor script



\## Business Impact



\* Product-level reporting may be incomplete

\* Item attribution becomes unreliable

\* Ecommerce performance analysis may be inaccurate

\* Product reporting may not fully populate in GA4



\## Fix



\* Audit ecommerce-related tags

\* Remove UA payload generation

\* Ensure GA4 tags read ecommerce.items directly

\* Validate using GTM Preview and DebugView



\## Verification



view\_item payload should contain GA4 item parameters and no pr1 encoding.



