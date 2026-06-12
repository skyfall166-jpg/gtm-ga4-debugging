## Pipeline Architecture

```text
GTM Export JSON
        │
        ▼
HTTP Request
(Fetch Container Export)
        │
        ▼
Parser (parser-v1.js)
- Extract tags
- Extract triggers
- Extract variables
- Generate signals
        │
        ▼
Rule Engine (rule-engine-v1.js)
- Apply GTM audit rules
- Generate findings
- Calculate health score
        │
        ▼
Gemini API
- Analyze findings
- Generate narrative insights
        │
        ▼
Report Generator
        │
        ▼
GTM Audit Report
```