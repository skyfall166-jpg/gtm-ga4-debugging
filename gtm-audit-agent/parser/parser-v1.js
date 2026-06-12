/**
 * GTM Audit Agent — Parser v1
 * Node: Code in JavaScript (n8n)
 * Input: HTTP Request fetching GTM container export JSON
 * Output: Structured signals block + orphan lists + unused variables
 */

const cv = $('HTTP Request').first().json.containerVersion;
if (!cv) throw new Error('containerVersion not found in HTTP response');

// --- Tag extraction ---
const tags = (cv.tag || []).map(tag => {
  const params = {};
  (tag.parameter || []).forEach(p => { params[p.key] = p.value; });
  return {
    id: tag.tagId,
    name: tag.name,
    type: tag.type,
    params,
    trigger_ids: tag.firingTriggerId || [],
    folderId: tag.parentFolderId || null,
    isPaused: tag.paused || false,
    consentStatus: tag.consentSettings?.consentStatus || null
  };
});

// --- Trigger extraction ---
const triggers = (cv.trigger || []).map(t => ({
  id: t.triggerId,
  name: t.name,
  type: t.type
}));

// --- Variable extraction ---
const variables = (cv.variable || []).map(v => ({
  id: v.variableId,
  name: v.name,
  type: v.type
}));

// --- Signal: GA4 config tags (googtag = Google Tag, gaawc = GA4 Config legacy) ---
const ga4ConfigTags = tags.filter(t => ["gaawc", "googtag"].includes(t.type));
const ga4EventTags = tags.filter(t => t.type === 'gaawe');

// --- Signal: Orphaned tags (no firing trigger) ---
const orphanedTags = tags.filter(t => t.trigger_ids.length === 0);

// --- Signal: Orphaned triggers (not referenced by any tag) ---
const allFiringIds = new Set(tags.flatMap(t => t.trigger_ids));
const orphanedTriggers = triggers.filter(t => !allFiringIds.has(t.id));

// --- Signal: Unused variables ---
// Exclude dlv-ecommerce.* — these are referenced via {{var}} template syntax
// which is not directly captured in flat param value scan
const allParamValues = tags.flatMap(t => Object.values(t.params).map(String));
const unusedVariables = variables.filter(v => {
  if (v.name.startsWith("dlv-ecommerce")) return false; // ecommerce DLVs always referenced
  return !allParamValues.some(val => val.includes(v.name));
});

// --- Signal: Paused tags ---
const pausedTags = tags.filter(t => t.isPaused);

// --- Signal: Consent NOT_SET ---
const consentNotSetTags = tags.filter(
  t => !t.consentStatus || t.consentStatus === 'NOT_SET'
);

// --- Signal: Ecommerce event coverage ---
const GA4_ECOM_EVENTS = [
  'view_item', 'view_item_list', 'add_to_cart', 'remove_from_cart',
  'view_cart', 'begin_checkout', 'add_payment_info', 'purchase'
];
const ecommerceEventNames = ga4EventTags
  .map(t => t.params.eventName || t.params.event_name || null)
  .filter(Boolean)
  .filter(e => GA4_ECOM_EVENTS.includes(e));

return [{
  json: {
    container_name: cv.container?.name || 'unknown',
    container_id: cv.container?.publicId || 'unknown',
    signals: {
      totalTags: tags.length,
      totalTriggers: triggers.length,
      totalVariables: variables.length,
      ga4ConfigTagCount: ga4ConfigTags.length,
      ga4EventTagCount: ga4EventTags.length,
      duplicateGA4ConfigRisk: ga4ConfigTags.length > 1,
      orphanedTagCount: orphanedTags.length,
      orphanedTriggerCount: orphanedTriggers.length,
      unusedVariableCount: unusedVariables.length,
      pausedTagCount: pausedTags.length,
      customHtmlTagCount: tags.filter(t => t.type === 'html').length,
      consentNotSetCount: consentNotSetTags.length,
      ecommerceEventNames
    },
    orphanedTags: orphanedTags.map(t => ({ id: t.id, name: t.name })),
    orphanedTriggers: orphanedTriggers.map(t => ({ id: t.id, name: t.name })),
    unusedVariables: unusedVariables.map(v => ({ id: v.id, name: v.name }))
  }
}];