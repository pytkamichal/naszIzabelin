// Demographic data for Izabelin. Source: Polska w liczbach (GUS / NSP 2021).
// women + men and the three age groups each sum to village.population (90).

export const villageStats = {
  censusYear: 2021,
  women: 49,
  men: 41,
  // Age structure (count of residents).
  childrenUnder18: 24, // wiek przedprodukcyjny (<18)
  workingAge: 52, // wiek produkcyjny
  postWorkingAge: 14, // wiek poprodukcyjny
  // Population change 1998–2021.
  growthSince1998Pct: 42.9,
  source: {
    label: "Polska w liczbach (NSP 2021)",
    url: "https://www.polskawliczbach.pl/wies_Izabelin_jakubow_mazowieckie",
  },
};
