# Architecture — GTM Audit Agent v1

## Design Principles

1. **JS rule engine owns all PASS/FAIL logic.** The LLM never makes audit decisions.
2. **LLM is narrative-only.** Gemini receives the structured findings object and generates readable prose. It cannot add or remove findings.
3. **Stateless per run.** Each execution is independent — no persistent state between runs.
4. **Deterministic output.** Same container JSON always produces the same findings array.

## Node Sequence

| Step | Node | Role |
|------|------|------|
| 1 | Manual Trigger | Initiates workflow |
| 2 | HTTP Request | Fetches GTM export JSON from GitHub raw URL |
| 3 | JS Parser (parser-v1.js) | Extracts tags/triggers/variables, computes signals block |
| 4 | Rule Engine (rule-engine-v1.js) | Applies GTM-01 through GTM-08, outputs findings[] + health score |
| 5 | HTTP Request (Gemini API) | POST findings to Gemini with structured prompt |
| 6 | JS Report Extractor | Pulls `candidates[0].content.parts[0].text` from Gemini response |

## Signals Block

The parser produces a `signals` object before any rule evaluation. 
Signals are facts — counts, booleans, lists. 
Rules are logic applied to signals.
This separation means rules can be added, removed, or adjusted without touching the parser.

## Rule Schema (BOSS-aligned)

Each finding object:
```json
{
  "rule": "GTM-03",
  "status": "FAIL",
  "severity": "HIGH",
  "issue": "Tag has no firing trigger",
  "evidence": "Tag \"GA4_purchase\" (ID: 24)",
  "root_cause": "[GTM] Tag will never fire",
  "recommendation": "Assign a trigger to GA4_purchase or remove it"
}
```

Severity levels: CRITICAL / HIGH / MEDIUM / LOW  
Root cause prefix: [TAG] / [GTM] / [DATALAYER] / [GA4] / [NETWORK]

## Health Score

`score = 100 - (CRITICAL × 25) - (HIGH × 15) - (MEDIUM × 10) - (LOW × 3)`  
Floor: 0

## Known Constraints

- Parser scans tag `parameter` values for variable references using string matching on `{{var_name}}` syntax. Variables with complex reference patterns (e.g. referenced only inside Custom HTML) may not be detected as used.
- `dlv-ecommerce.*` variables are explicitly excluded from unused variable detection — they are referenced via `{{dlv-ecommerce.items}}` template syntax which is captured in param values. If your scan still flags them, verify the exclusion filter in parser-v1.js line 38.
- Rule GTM-02, GTM-06, GTM-07 planned but not yet implemented.

## Planned Expansions

- GTM-06: Missing required ecommerce events (view_item_list, view_cart)
- GTM-07: Trigger naming convention violations
- GTM-09: `sendEcommerceData: false` on all event tags (currently the case in this container — all use explicit eventSettingsTable instead of auto-collection)
- Broken container test suite (GTM-NGQ678HH copy with 4 deliberate bugs)