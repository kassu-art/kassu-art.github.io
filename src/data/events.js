export const LOCATIONS = [
  { id: 'dur-kurigalzu', lat: 295, lng: 265, nameKey: 'location_dur_kurigalzu_name', descKey: 'location_dur_kurigalzu_desc' },
  { id: 'susa', lat: 395, lng: 320, nameKey: 'location_susa_name', descKey: 'location_susa_desc' },
  { id: 'nippur', lat: 280, lng: 355, nameKey: 'location_nippur_name', descKey: 'location_nippur_desc' },
  { id: 'babylon', lat: 258, lng: 310, nameKey: 'location_babylon_name', descKey: 'location_babylon_desc' },
  { id: 'ur', lat: 240, lng: 460, nameKey: 'location_ur_name', descKey: 'location_ur_desc' },
  { id: 'assur', lat: 340, lng: 168, nameKey: 'location_assur_name', descKey: 'location_assur_desc' },
  { id: 'zagros-highlands', lat: 480, lng: 195, nameKey: 'location_zagros_highlands_name', descKey: 'location_zagros_highlands_desc' },
  { id: 'eridu', lat: 225, lng: 508, nameKey: 'location_eridu_name', descKey: 'location_eridu_desc' },
  { id: 'sahtaakhaman', lat: 320, lng: 230, nameKey: 'location_sahtaakhaman_name', descKey: 'location_sahtaakhaman_desc' },
  { id: 'shatt-al-arab', lat: 250, lng: 530, nameKey: 'location_shatt_al_arab_name', descKey: 'location_shatt_al_arab_desc' },
];

export const LOC_MAP = Object.fromEntries(LOCATIONS.map(l => [l.id, l]));

// Pixel coordinates on the SVG viewBox (700×600)
export const LOC_COORDS = {
  "dur-kurigalzu":    { x: 268, y: 285 },
  "susa":             { x: 430, y: 320 },
  "nippur":           { x: 268, y: 355 },
  "babylon":          { x: 252, y: 315 },
  "ur":               { x: 235, y: 455 },
  "assur":            { x: 338, y: 170 },
  "zagros-highlands": { x: 500, y: 220 },
  "eridu":            { x: 220, y: 505 },
  "sahtaakhaman":     { x: 308, y: 238 },
  "shatt-al-arab":    { x: 235, y: 540 }
};

export const EVENTS = [
  { id: 'e01', yearKey: 'event_e01_year', eraKey: 'era_ancient_origins', titleKey: 'event_e01_title', location_id: 'zagros-highlands', type: 'founding', ritualTextKey: 'event_e01_ritual', descriptionKey: 'event_e01_description', significanceKey: 'event_e01_significance' },
  { id: 'e02', yearKey: 'event_e02_year', eraKey: 'era_ancient_origins', titleKey: 'event_e02_title', location_id: 'dur-kurigalzu', type: 'founding', ritualTextKey: 'event_e02_ritual', descriptionKey: 'event_e02_description', significanceKey: 'event_e02_significance' },
  { id: 'e03', yearKey: 'event_e03_year', eraKey: 'era_early_bright_age', titleKey: 'event_e03_title', location_id: 'babylon', type: 'founding', ritualTextKey: 'event_e03_ritual', descriptionKey: 'event_e03_description', significanceKey: 'event_e03_significance' },
  { id: 'e04', yearKey: 'event_e04_year', eraKey: 'era_early_bright_age', titleKey: 'event_e04_title', location_id: 'eridu', type: 'discovery', ritualTextKey: 'event_e04_ritual', descriptionKey: 'event_e04_description', significanceKey: 'event_e04_significance' },
  { id: 'e05', yearKey: 'event_e05_year', eraKey: 'era_early_bright_age', titleKey: 'event_e05_title', location_id: 'dur-kurigalzu', type: 'ritual', ritualTextKey: 'event_e05_ritual', descriptionKey: 'event_e05_description', significanceKey: 'event_e05_significance' },
  { id: 'e06', yearKey: 'event_e06_year', eraKey: 'era_early_bright_age', titleKey: 'event_e06_title', location_id: 'nippur', type: 'cultural', ritualTextKey: 'event_e06_ritual', descriptionKey: 'event_e06_description', significanceKey: 'event_e06_significance' },
  { id: 'e07', yearKey: 'event_e07_year', eraKey: 'era_early_bright_age', titleKey: 'event_e07_title', location_id: 'sahtaakhaman', type: 'ritual', ritualTextKey: 'event_e07_ritual', descriptionKey: 'event_e07_description', significanceKey: 'event_e07_significance' },
  { id: 'e08', yearKey: 'event_e08_year', eraKey: 'era_early_bright_age', titleKey: 'event_e08_title', location_id: 'dur-kurigalzu', type: 'cultural', ritualTextKey: 'event_e08_ritual', descriptionKey: 'event_e08_description', significanceKey: 'event_e08_significance' },
  { id: 'e09', yearKey: 'event_e09_year', eraKey: 'era_transition', titleKey: 'event_e09_title', location_id: 'dur-kurigalzu', type: 'collapse', ritualTextKey: 'event_e09_ritual', descriptionKey: 'event_e09_description', significanceKey: 'event_e09_significance' },
  { id: 'e10', yearKey: 'event_e10_year', eraKey: 'era_late_silence_age', titleKey: 'event_e10_title', location_id: 'babylon', type: 'cultural', ritualTextKey: 'event_e10_ritual', descriptionKey: 'event_e10_description', significanceKey: 'event_e10_significance' },
  { id: 'e11', yearKey: 'event_e11_year', eraKey: 'era_late_silence_age', titleKey: 'event_e11_title', location_id: 'nippur', type: 'ritual', ritualTextKey: 'event_e11_ritual', descriptionKey: 'event_e11_description', significanceKey: 'event_e11_significance' },
  { id: 'e12', yearKey: 'event_e12_year', eraKey: 'era_late_silence_age', titleKey: 'event_e12_title', location_id: 'susa', type: 'cultural', ritualTextKey: 'event_e12_ritual', descriptionKey: 'event_e12_description', significanceKey: 'event_e12_significance' },
  { id: 'e13', yearKey: 'event_e13_year', eraKey: 'era_late_silence_age', titleKey: 'event_e13_title', location_id: 'dur-kurigalzu', type: 'cultural', ritualTextKey: 'event_e13_ritual', descriptionKey: 'event_e13_description', significanceKey: 'event_e13_significance' },
  { id: 'e14', yearKey: 'event_e14_year', eraKey: 'era_passive_dissolution', titleKey: 'event_e14_title', location_id: 'eridu', type: 'collapse', ritualTextKey: 'event_e14_ritual', descriptionKey: 'event_e14_description', significanceKey: 'event_e14_significance' },
  { id: 'e15', yearKey: 'event_e15_year', eraKey: 'era_passive_dissolution', titleKey: 'event_e15_title', location_id: 'babylon', type: 'collapse', ritualTextKey: 'event_e15_ritual', descriptionKey: 'event_e15_description', significanceKey: 'event_e15_significance' },
  { id: 'e16', yearKey: 'event_e16_year', eraKey: 'era_passive_dissolution', titleKey: 'event_e16_title', location_id: 'dur-kurigalzu', type: 'collapse', ritualTextKey: 'event_e16_ritual', descriptionKey: 'event_e16_description', significanceKey: 'event_e16_significance' },
  { id: 'e17', yearKey: 'event_e17_year', eraKey: 'era_modern_rediscovery', titleKey: 'event_e17_title', location_id: 'susa', type: 'collapse', ritualTextKey: 'event_e17_ritual', descriptionKey: 'event_e17_description', significanceKey: 'event_e17_significance' },
];
