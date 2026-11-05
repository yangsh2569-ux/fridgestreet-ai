const base = `${import.meta.env.BASE_URL}assets/`;
export const brandLogos = {
  white: `${base}logo-white.png`,
  blue: `${base}logo-blue.png`,
};
const phoneFiles = [
  "phone-01-find-map",
  "phone-02-find-list",
  "phone-03-on-the-way",
  "phone-04-arrived",
  "phone-05-scan-capture",
  "phone-06-scanning",
  "phone-07-ai-suggestions",
  "phone-08-review-items",
  "phone-09-inline-edit",
  "phone-10-add-item",
  "phone-11-photo-apples",
  "phone-12-submitting",
  "phone-13-brand-splash",
  "phone-14-volunteer-dashboard",
  "phone-15-onsite-check",
  "phone-16-next-neighbor-verified",
] as const;
const descriptions = [
  "Bayard St Fridge map and shared photos, with Get directions",
  "Nearby community fridges list with example update times",
  "On the way to Bayard St Fridge in Chinatown",
  "You’ve arrived! Optional camera invitation and Not now",
  "Take a clear food photo, camera capture view",
  "Finding visible food. AI suggestions; review comes next",
  "AI suggestions over bread, peppers, and corn. Retake or Review items",
  "Review visible items and their names and quantities",
  "Inline editing of green peppers, with Save changes",
  "Optional apple item added for review",
  "Photograph the apples, optional camera view",
  "Submitting report, illustrative progress state",
  "FridgeStreet AI original mascot and brand splash",
  "Volunteer Hub, sample report queue and separate on-site check due",
  "Authorized on-site check, initially NOT VERIFIED; inspection checklist",
  "Bayard St, Chinatown: Recently Checked after an authorized volunteer’s on-site check",
];
export type UiAsset = {
  key: string;
  src: string;
  webp: string;
  alt: string;
  width: number;
  height: number;
  flat?: boolean;
};
export const phones: UiAsset[] = phoneFiles.map((file, i) => ({
  key: file,
  src: `${base}ui/${file}.png`,
  webp: `${base}ui/${file}.webp`,
  alt: descriptions[i],
  width: i < 13 ? 1728 : 1704,
  height: i < 13 ? 3524 : 3520,
}));
export const flatScreens: Record<"submitted" | "thanks" | "apple", UiAsset> = {
  submitted: {
    key: "submitted",
    src: `${base}ui/flat-14-report-submitted.png`,
    webp: `${base}ui/flat-14-report-submitted.webp`,
    alt: "Original Flow V2 screen: Report submitted!",
    width: 393,
    height: 852,
    flat: true,
  },
  thanks: {
    key: "thanks",
    src: `${base}ui/flat-15-thanks.png`,
    webp: `${base}ui/flat-15-thanks.webp`,
    alt: "Original Flow V2 thanks: Your update is on its way to the community.",
    width: 393,
    height: 852,
    flat: true,
  },
  apple: {
    key: "apple",
    src: `${base}ui/flat-16-apple-added.png`,
    webp: `${base}ui/flat-16-apple-added.webp`,
    alt: "Original Apple Added confirmation, ready for human review",
    width: 393,
    height: 945,
    flat: true,
  },
};
const filmNames = [
  "01-reality-nyc",
  "02-human-need-walk",
  "03-finding-way-phone-up",
  "04a-fridge-discovery",
  "05-open-fridge",
  "06-take-corn",
  "07a-remaining-food",
  "08-volunteer-onsite-check",
  "09-next-neighbor",
  "10-the-next-neighbor-film",
] as const;
export const media = filmNames.map((name) => ({
  name,
  src: `${base}video/${name}.mp4`,
  mobile: `${base}video/${name}-mobile.mp4`,
  poster: `${base}images/${name}.jpg`,
}));
export const chapters = [
  ["opening", "The beginning"],
  ["reality", "The reality"],
  ["need", "A human need"],
  ["finding", "Finding a way"],
  ["arrival", "Discovery & arrival"],
  ["open", "Open to everyone"],
  ["take", "A simple moment"],
  ["contribute", "AI, with people"],
  ["check", "The human check"],
  ["neighbor", "The next neighbor"],
  ["film", "The film"],
] as const;
export const contributionBeats = [
  {
    label: "Capture",
    title: "A photo is a choice.",
    body: "What if one small contribution could help the next neighbor? A photo is never a condition for food. After taking what you need, leave a little context if you choose.",
    asset: phones[4],
  },
  {
    label: "Analysis",
    title: "Visible doesn’t mean safe.",
    body: "AI looks at what’s visible — not what’s safe to eat. These suggestions begin as a draft.",
    asset: phones[5],
  },
  {
    label: "Suggestions",
    title: "AI suggests.\nPeople decide.",
    body: "Bread. Green peppers. Corn. Possible labels, waiting for a person’s judgment.",
    asset: phones[6],
  },
  {
    label: "Review",
    title: "Look again.\nThen share.",
    body: "Review the names and quantities before sharing. A person gets the final say.",
    asset: phones[7],
  },
  {
    label: "Edit",
    title: "You know more\nthan a photograph.",
    body: "Correct what the model couldn’t know. Change a name, record a quantity, or remove an incorrect suggestion.",
    asset: phones[8],
  },
  {
    label: "Add",
    title: "Notice something\nmissing?",
    body: "Add it yourself. A second photo is an optional branch, never an extra obligation.",
    asset: phones[9],
  },
  {
    label: "Share",
    title: "A report.\nA starting point.",
    body: "Reviewed suggestions can be shared as a community report. This is not a verified inspection.",
    asset: phones[11],
  },
  {
    label: "Pending",
    title: "Report submitted!",
    body: "The report is pending community review. Sharing a photograph does not change a section to Recently Checked.",
    asset: flatScreens.submitted,
  },
  {
    label: "Thanks",
    title: "A small act is\non its way.",
    body: "Your update is on its way to the community. There is still a human check ahead.",
    asset: flatScreens.thanks,
  },
];
export const evidence = [
  {
    title: "The scale of the need",
    type: "Published evidence",
    text: "USDA estimates that 13.7% of U.S. households—18.3 million households—experienced food insecurity at some time during 2024. This is a national annual household measure, not an estimate for New York City or a claim of continuous hunger.",
    source: "USDA ERS · ERR-358 · December 30, 2025",
    url: "https://www.ers.usda.gov/publications/113622",
  },
  {
    title: "Reading the numbers carefully",
    type: "Published evidence",
    text: "Food insecurity describes constrained or uncertain access to enough food because of insufficient money or other resources. The national estimate gives context for the design; it does not measure the impact of FridgeStreet AI.",
    source: "USDA ERS · Key Statistics & Graphics · 2024 data",
    url: "https://www.ers.usda.gov/topics/food-nutrition-assistance/food-security-in-the-us/key-statistics-graphics",
  },
  {
    title: "Three questions for the design",
    type: "Design framing",
    text: "Uncertain availability: how can a visitor judge when information was last shared? Manual updates: how can reporting ask less of a neighbor? Fragmented coordination: how can a report reach someone able to check it? These are authored design challenges, not findings from interviews or field studies.",
    source: "FridgeStreet AI · project design brief",
  },
  {
    title: "Participation without a condition",
    type: "Design principle",
    text: "The main story follows Not now at arrival, takes food first, and returns to optional reporting afterwards. Food access is never conditional on a photograph, a report, or an account.",
    source: "Exploration 10 · Flow V2 · Blue & Yellow",
  },
  {
    title: "Trust requires a separate visit",
    type: "Proposed service",
    text: "A community report is pending information. A Recently Checked section follows a separate physical inspection by an authorized volunteer, with a section, observation time, and source. A check does not certify food safety.",
    source: "Exploration 11 · Trust Loop · Blue & Yellow",
    url: "https://www.figma.com/design/6eawjhe8IpiFk6Kz72FlKT/FridgeStreetAI?node-id=105-2614",
  },
  {
    title: "What this case study establishes",
    type: "Concept boundaries",
    text: "The website demonstrates a proposed service and its interactions. It does not demonstrate a deployed system, live inventory, actual AI recognition, completed inspections, interviews, partnerships, or measured outcomes. Bayard St, Chinatown is the illustrative prototype destination.",
    source: "Project scope · no live operational data",
  },
];
