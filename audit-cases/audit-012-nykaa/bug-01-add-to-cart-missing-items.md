\# Bug 1 — Missing ecommerce.items\[] Array



\*\*Finding ID:\*\* F1

\*\*Severity:\*\* High

\*\*Confidence:\*\* Confirmed

\*\*Surface:\*\* \[GA4] \[NETWORK]

\*\*Status:\*\* Open



\## Symptom



add\_to\_cart events fire without a populated ecommerce.items\[] array.



\## Evidence



Network payload inspection showed add\_to\_cart requests missing expected GA4 item parameters such as:



\* item\_id

\* item\_name

\* item\_brand

\* item\_category



The ecommerce event fired successfully, but product item data was absent.



\## Root Cause



GA4 ecommerce item mapping appears incomplete.



The event fires, but required product information is not being passed into the GA4 ecommerce schema.



\## Business Impact



\* Product-level cart attribution is incomplete

\* Add-to-cart analysis lacks product context

\* Merchandising teams lose visibility into which products drive cart activity



\## Fix



Populate ecommerce.items\[] before firing add\_to\_cart.



Ensure all required GA4 ecommerce item fields are mapped correctly.



\## Verification



Network payload should contain:



\* items.0.item\_id

\* items.0.item\_name

\* items.0.item\_brand

\* items.0.item\_category



