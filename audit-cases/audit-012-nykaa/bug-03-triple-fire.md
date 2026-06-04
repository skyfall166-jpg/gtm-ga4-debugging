\# Bug 3 — Triple-Firing add\_to\_cart Events



\*\*Finding ID:\*\* F3

\*\*Severity:\*\* High

\*\*Confidence:\*\* Confirmed

\*\*Surface:\*\* \[TAG] \[NETWORK]

\*\*Status:\*\* Open



\## Symptom



A single add-to-cart action generates three add\_to\_cart requests.



\## Evidence



Network inspection captured three add\_to\_cart requests triggered from a single user interaction.



Requests occurred during the same session and action sequence.



\## Root Cause



Multiple event generation paths are firing for the same interaction.



Container access is required to determine the exact implementation source.



\## Business Impact



\* Cart activity may be overstated up to 3×

\* Funnel conversion metrics become unreliable

\* Add-to-cart reporting is inflated

\* Ecommerce optimisation decisions may be affected



\## Fix



Audit all add\_to\_cart firing mechanisms.



Remove duplicate event generation paths.



\## Verification



One user click should generate one add\_to\_cart request.



