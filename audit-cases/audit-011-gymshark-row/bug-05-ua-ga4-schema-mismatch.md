Bug 5 — UA Enhanced Ecommerce Schema Not Migrated

Classification



\[DATALAYER] — Critical



Finding



The dataLayer continues to use UA Enhanced Ecommerce event names:



ee-productView

ee-addToCart

ee-productClick

ee-productImpression



GA4-standard ecommerce events were not observed.



Impact



Product information exists but is not available through GA4-standard ecommerce reporting.



Evidence



Screenshots:



04-datalayer-ee-events.png

05-console-product-object.png





