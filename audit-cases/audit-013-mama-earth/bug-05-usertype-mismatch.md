\# Bug 5 — User Classification Mismatch



\*\*Finding ID:\*\* F3

\*\*Severity:\*\* Medium

\*\*Confidence:\*\* Suspected

\*\*Surface:\*\* \[DATALAYER] \[GA4]

\*\*Status:\*\* Open



\## Symptom



The dataLayer and GA4 payload classify the same user differently.



\## Evidence



dataLayer:



userType = returning



GA4 payload:



ep.Customer\_Type\_Analytics = Not\_Repeat



Both values were observed during the same page load and session.



\## Root Cause



\*\*Suspected\*\*



Possible causes include:



\* Different data sources

\* Cookie-based classification logic

\* CRM-based classification logic

\* Incorrect GTM variable mapping



Additional investigation is required.



\## Business Impact



\* Inconsistent user segmentation

\* Audience creation inaccuracies

\* CRM synchronization issues

\* Reduced confidence in lifecycle reporting



\## Fix



Identify the source feeding Customer\_Type\_Analytics.



Align both classifications to a single documented source of truth.



\## Verification



For the same user session:



userType



and



Customer\_Type\_Analytics



should return consistent values.



