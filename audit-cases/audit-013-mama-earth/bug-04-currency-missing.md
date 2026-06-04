\# Bug 4 — Currency Missing from Ecommerce Payload



\*\*Finding ID:\*\* F2c

\*\*Severity:\*\* Medium

\*\*Confidence:\*\* Confirmed

\*\*Surface:\*\* \[DATALAYER]

\*\*Status:\*\* Open



\## Symptom



No currency value was observed within the view\_item payload.



\## Evidence



Full payload inspection found no:



\* cu=

\* currency=

\* event-level currency parameter



Console inspection also showed:



items\[0].currency



returned undefined.



\## Root Cause



Currency is not being added to the ecommerce implementation.



Additional evidence suggests incomplete ecommerce migration due to the presence of non-standard fields such as:



\* product\_id

\* inStock



\## Business Impact



\* Reliance on GA4 property default currency

\* Increased implementation risk

\* Potential future issues in multi-currency reporting

\* Ecommerce data quality degradation



\## Fix



Add currency at the ecommerce event level.



Example:



currency: "INR"



Remove or properly map non-standard ecommerce fields.



\## Verification



Network payload should contain:



currency=INR



or



cu=INR



