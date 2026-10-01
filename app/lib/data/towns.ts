export interface Town {
  name: string;
  state: string;
  county: string;
  type: 'city' | 'village' | 'unincorporated' | 'chicago_neighborhood';
  category: 'Loop Drive' | 'Richmond to Gurnee Corridor' | 'Richmond to West Dundee Corridor' | 'Chicago Metro Area';
  leg?: number;
}

export const TOWNS: Town[] = [
  // --- Chicago & Neighborhood Subdivisions ---
  { name: 'Chicago', state: 'IL', county: 'Cook', type: 'city', category: 'Chicago Metro Area' },
  { name: 'West Loop', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Loop / Downtown', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'River North', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Lincoln Park', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Lakeview', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Wicker Park', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Bucktown', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Logan Square', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Pilsen', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Hyde Park', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Bridgeport', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Chinatown', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Uptown', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Edgewater', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Rogers Park', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Avondale', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Bronzeville', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Gold Coast', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Old Town', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Roscoe Village', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Lincoln Square', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Albany Park', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Andersonville', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Irving Park', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },
  { name: 'Little Village', state: 'IL', county: 'Cook', type: 'chicago_neighborhood', category: 'Chicago Metro Area' },

  // --- Loop Leg 1: Chicago to Woodstock ---
  { name: 'Des Plaines', state: 'IL', county: 'Cook', type: 'city', category: 'Loop Drive', leg: 1 },
  { name: 'Arlington Heights', state: 'IL', county: 'Cook', type: 'village', category: 'Loop Drive', leg: 1 },
  { name: 'Palatine', state: 'IL', county: 'Cook', type: 'village', category: 'Loop Drive', leg: 1 },
  { name: 'Barrington', state: 'IL', county: 'Cook', type: 'village', category: 'Loop Drive', leg: 1 },
  { name: 'Crystal Lake', state: 'IL', county: 'McHenry', type: 'city', category: 'Loop Drive', leg: 1 },
  { name: 'Woodstock', state: 'IL', county: 'McHenry', type: 'city', category: 'Loop Drive', leg: 1 },

  // --- Loop Leg 2: Woodstock to Lake Geneva ---
  { name: 'Hebron', state: 'IL', county: 'McHenry', type: 'village', category: 'Loop Drive', leg: 2 },
  { name: 'Genoa City', state: 'WI', county: 'Walworth', type: 'village', category: 'Loop Drive', leg: 2 },
  { name: 'Lake Geneva', state: 'WI', county: 'Walworth', type: 'city', category: 'Loop Drive', leg: 2 },

  // --- Loop Leg 3: Lake Geneva to Kenosha ---
  { name: 'Slades Corners', state: 'WI', county: 'Kenosha', type: 'unincorporated', category: 'Loop Drive', leg: 3 },
  { name: 'New Munster', state: 'WI', county: 'Kenosha', type: 'unincorporated', category: 'Loop Drive', leg: 3 },
  { name: 'Wheatland', state: 'WI', county: 'Kenosha', type: 'unincorporated', category: 'Loop Drive', leg: 3 },
  { name: 'Paddock Lake', state: 'WI', county: 'Kenosha', type: 'village', category: 'Loop Drive', leg: 3 },
  { name: 'Pleasant Prairie', state: 'WI', county: 'Kenosha', type: 'village', category: 'Loop Drive', leg: 3 },
  { name: 'Kenosha', state: 'WI', county: 'Kenosha', type: 'city', category: 'Loop Drive', leg: 3 },

  // --- Loop Leg 4: Kenosha back to Chicago ---
  { name: 'Wadsworth', state: 'IL', county: 'Lake', type: 'village', category: 'Loop Drive', leg: 4 },
  { name: 'Winthrop Harbor', state: 'IL', county: 'Lake', type: 'village', category: 'Loop Drive', leg: 4 },
  { name: 'Gurnee', state: 'IL', county: 'Lake', type: 'village', category: 'Loop Drive', leg: 4 },
  { name: 'Waukegan', state: 'IL', county: 'Lake', type: 'city', category: 'Loop Drive', leg: 4 },
  { name: 'Lake Forest', state: 'IL', county: 'Lake', type: 'city', category: 'Loop Drive', leg: 4 },
  { name: 'Highland Park', state: 'IL', county: 'Lake', type: 'city', category: 'Loop Drive', leg: 4 },
  { name: 'Evanston', state: 'IL', county: 'Cook', type: 'city', category: 'Loop Drive', leg: 4 },

  // --- Richmond to Gurnee Corridor ---
  { name: 'Richmond', state: 'IL', county: 'McHenry', type: 'village', category: 'Richmond to Gurnee Corridor' },
  { name: 'Spring Grove', state: 'IL', county: 'McHenry', type: 'village', category: 'Richmond to Gurnee Corridor' },
  { name: 'Fox Lake', state: 'IL', county: 'Lake', type: 'village', category: 'Richmond to Gurnee Corridor' },
  { name: 'Channel Lake', state: 'IL', county: 'Lake', type: 'unincorporated', category: 'Richmond to Gurnee Corridor' },
  { name: 'Lake Catherine', state: 'IL', county: 'Lake', type: 'unincorporated', category: 'Richmond to Gurnee Corridor' },
  { name: 'Antioch', state: 'IL', county: 'Lake', type: 'village', category: 'Richmond to Gurnee Corridor' },
  { name: 'Lake Villa', state: 'IL', county: 'Lake', type: 'village', category: 'Richmond to Gurnee Corridor' },
  { name: 'Lindenhurst', state: 'IL', county: 'Lake', type: 'village', category: 'Richmond to Gurnee Corridor' },
  { name: 'Old Mill Creek', state: 'IL', county: 'Lake', type: 'village', category: 'Richmond to Gurnee Corridor' },

  // --- Richmond to West Dundee Corridor ---
  { name: 'Solon Mills', state: 'IL', county: 'McHenry', type: 'unincorporated', category: 'Richmond to West Dundee Corridor' },
  { name: 'Ringwood', state: 'IL', county: 'McHenry', type: 'village', category: 'Richmond to West Dundee Corridor' },
  { name: 'McHenry', state: 'IL', county: 'McHenry', type: 'city', category: 'Richmond to West Dundee Corridor' },
  { name: 'Prairie Grove', state: 'IL', county: 'McHenry', type: 'village', category: 'Richmond to West Dundee Corridor' },
  { name: 'Lakewood', state: 'IL', county: 'McHenry', type: 'village', category: 'Richmond to West Dundee Corridor' },
  { name: 'Lake in the Hills', state: 'IL', county: 'McHenry', type: 'village', category: 'Richmond to West Dundee Corridor' },
  { name: 'Algonquin', state: 'IL', county: 'McHenry', type: 'village', category: 'Richmond to West Dundee Corridor' },
  { name: 'Carpentersville', state: 'IL', county: 'Kane', type: 'village', category: 'Richmond to West Dundee Corridor' },
  { name: 'East Dundee', state: 'IL', county: 'Kane', type: 'village', category: 'Richmond to West Dundee Corridor' },
  { name: 'West Dundee', state: 'IL', county: 'Kane', type: 'village', category: 'Richmond to West Dundee Corridor' },
  { name: 'Sleepy Hollow', state: 'IL', county: 'Kane', type: 'village', category: 'Richmond to West Dundee Corridor' }
];

// Helper subsets & arrays
export const ALL_TOWN_NAMES: string[] = TOWNS.map((t) => t.name);

export const CHICAGO_SUBDIVISIONS: Town[] = TOWNS.filter(
  (t) => t.type === 'chicago_neighborhood'
);

export const RICHMOND_TO_GURNEE_CORRIDOR: Town[] = TOWNS.filter(
  (t) => t.category === 'Richmond to Gurnee Corridor'
);

export const RICHMOND_TO_WEST_DUNDEE_CORRIDOR: Town[] = TOWNS.filter(
  (t) => t.category === 'Richmond to West Dundee Corridor'
);

// Utility Functions
export function getTownsByState(state: string): Town[] {
  return TOWNS.filter((t) => t.state === state);
}

export function getTownsByLeg(legNumber: number): Town[] {
  return TOWNS.filter((t) => t.leg === legNumber);
}

export function getTownsByCategory(category: Town['category']): Town[] {
  return TOWNS.filter((t) => t.category === category);
}