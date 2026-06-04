\# Bug 5 — UA-GA4 Ecommerce Schema Mismatch



\*\*Finding ID:\*\* F5  

\*\*Severity:\*\* Critical  

\*\*Confidence:\*\* Confirmed  

\*\*Surface:\*\* \[DATALAYER] \[GA4]  

\*\*Status:\*\* Open



\## Symptom



Gymshark appears to be collecting ecommerce data through GA4 while continuing to rely on UA-style ecommerce architecture.



\## Evidence



Rich product metadata exists within browser-observable ecommerce objects including:



\- Product ID

\- Product Name

\- Category

\- SKU

\- Variant Information



However equivalent GA4 items\[] mappings were not consistently present within ecommerce payloads.



\## Root Cause



Migration to GA4 collection appears complete.



Migration of underlying ecommerce data architecture appears incomplete.



\## Business Impact



\- Product attribution gaps

\- SKU reporting limitations

\- Variant analysis limitations

\- Ecommerce funnel reporting gaps

\- Reduced visibility into product performance



\## Fix



Complete migration from UA Enhanced Ecommerce structures to GA4-native ecommerce schema.



Ensure all ecommerce events populate items\[] correctly.



\## Verification



GA4 ecommerce events should consistently contain populated items\[] arrays carrying complete product metadata.

