\# Bug 2 — Parameter Bloat on Ecommerce Hits



\*\*Finding ID:\*\* F2  

\*\*Severity:\*\* Medium  

\*\*Confidence:\*\* Confirmed  

\*\*Surface:\*\* \[TAG] \[NETWORK]  

\*\*Status:\*\* Open



\## Symptom



Ecommerce payloads contain excessive experiment and testing-related parameters.



\## Evidence



Network inspection identified more than 20 additional experiment parameters attached to ecommerce requests.



These parameters were unrelated to core ecommerce measurement.



\## Root Cause



Experimentation and testing metadata is being appended to production ecommerce payloads.



\## Business Impact



\- Increased implementation complexity

\- Harder debugging workflows

\- Reduced payload readability

\- Increased maintenance overhead



\## Fix



Review experiment-related parameters.



Remove unused or redundant fields from ecommerce payloads.



\## Verification



Ecommerce requests should contain only business-critical parameters required for reporting.

