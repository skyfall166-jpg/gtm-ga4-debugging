\# Bug 3 — Price and Quantity Passed as Strings



\*\*Finding ID:\*\* F2b

\*\*Severity:\*\* Low / Medium

\*\*Confidence:\*\* Confirmed

\*\*Surface:\*\* \[DATALAYER]

\*\*Status:\*\* Open



\## Symptom



price and quantity are pushed as string values instead of numeric values.



\## Evidence



Console inspection showed:



price: "339.00"



quantity: "1"



Expected:



price: 339



quantity: 1



\## Root Cause



Product values are being stringified before being pushed into the dataLayer.



Likely caused by templating logic that outputs all values as strings.



\## Business Impact



\* Data quality risk

\* Potential downstream reporting inconsistencies

\* Additional type handling required in BigQuery and BI tools

\* Increased debugging complexity



\## Fix



Cast numeric values before pushing to the dataLayer.



Example:



price: Number(price)



quantity: Number(quantity)



\## Verification



typeof items\[0].price should return:



number



typeof items\[0].quantity should return:



number



