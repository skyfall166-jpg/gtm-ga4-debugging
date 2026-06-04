\# Bug 3 — Price Discrepancy Between UI and Payload



\*\*Finding ID:\*\* F3  

\*\*Severity:\*\* Investigative  

\*\*Confidence:\*\* Investigative  

\*\*Surface:\*\* \[GA4] \[NETWORK]  

\*\*Status:\*\* Monitoring



\## Symptom



Product pricing observed in analytics payloads differs from pricing displayed on the website.



\## Evidence



Price displayed on the PDP did not match the value transmitted in ecommerce requests.



Unable to determine whether this is caused by:



\- Sale pricing

\- Discount logic

\- Tax treatment

\- Tracking issue



using browser-side evidence alone.



\## Root Cause



Unknown.



Additional implementation access required.



\## Business Impact



\- Revenue validation becomes more difficult

\- Analysts may struggle to reconcile reporting with storefront values

\- Increased QA effort



\## Fix



Review pricing logic used by ecommerce tracking implementation.



Verify whether payload values represent:



\- Base price

\- Sale price

\- Discounted price

\- Tax-inclusive price



\## Verification



Displayed product price and tracked ecommerce price should align with documented business logic.

