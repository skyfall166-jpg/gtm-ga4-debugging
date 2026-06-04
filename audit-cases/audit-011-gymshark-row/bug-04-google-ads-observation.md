\# Bug 4 — Parallel GA4 and Google Ads Collection



\*\*Finding ID:\*\* F4  

\*\*Severity:\*\* Observation  

\*\*Confidence:\*\* Confirmed  

\*\*Surface:\*\* \[TAG] \[ADS]  

\*\*Status:\*\* Monitoring



\## Symptom



Ecommerce interactions generate both GA4 and Google Ads collection requests.



\## Evidence



Network inspection showed simultaneous requests being sent to:



\- GA4 endpoints

\- Google Ads endpoints



during ecommerce interactions.



\## Root Cause



Likely intentional dual-platform measurement implementation.



\## Business Impact



Observation only.



Dual collection is common but should be reviewed to ensure:



\- Measurement consistency

\- Proper attribution

\- No duplicate counting



\## Fix



Validate mapping consistency across GA4 and Google Ads implementations.



\## Verification



Equivalent ecommerce interactions should generate expected requests in both platforms without duplication.

