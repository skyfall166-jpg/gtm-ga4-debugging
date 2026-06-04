\# Bug 5 — Non-Standard Ecommerce Parameters



\*\*Finding ID:\*\* F5

\*\*Severity:\*\* Medium

\*\*Confidence:\*\* Confirmed

\*\*Surface:\*\* \[GA4] \[NETWORK]

\*\*Status:\*\* Open



\## Symptom



Ecommerce payload contains parameters that do not align with GA4 recommended ecommerce schema.



\## Evidence



Network inspection identified custom ecommerce parameters being sent instead of expected GA4 ecommerce item fields.



\## Root Cause



Implementation relies on custom ecommerce structures rather than GA4-native ecommerce architecture.



\## Business Impact



\* Non-standard fields may be ignored by GA4

\* Reporting gaps may occur

\* Product-level analysis becomes less reliable



\## Fix



Align ecommerce implementation with GA4 recommended ecommerce schema.



\## Verification



GA4 ecommerce requests should use standard ecommerce item parameters and structures.



