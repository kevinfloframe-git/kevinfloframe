// Session types, tiers, durations, and pricing for Kevin Flo Frame
// All prices in USD. Deposit = 50% non-refundable retainer.

export const SESSIONS = {
  headshots: {
    label: 'Headshots',
    description: 'Individual or professional headshots — studio or on-location, one setup.',
    requiresConsultation: false,
    tiers: {
      essential: {
        label: 'Essential',
        duration: 45,
        price: 200,
        deposit: 100,
        images: 5,
        outfits: 1,
        turnaround: '7 business days',
        highlights: ['45 min session', '5 edited images', '1 outfit', 'Hi-res + web-res files'],
      },
      signature: {
        label: 'Signature',
        duration: 75,
        price: 250,
        deposit: 125,
        images: 10,
        outfits: 2,
        turnaround: '5 business days',
        highlights: ['75 min session', '10 edited images', '2 outfits', 'Hi-res + web-res files'],
      },
      elite: {
        label: 'Elite',
        duration: 120,
        price: 325,
        deposit: 163,
        images: 20,
        outfits: 3,
        turnaround: '3 business days',
        highlights: ['2 hr session', '20 edited images', '3 outfits', '$50 print credit'],
      },
    },
  },

  portrait: {
    label: 'Portrait Session',
    description: 'Individuals, couples, and families. Up to 3 locations.',
    requiresConsultation: false,
    tiers: {
      essential: {
        label: 'Essential',
        duration: 60,
        price: 275,
        deposit: 138,
        images: 15,
        locations: 1,
        turnaround: '10 business days',
        highlights: ['1 hr session', '15 edited images', '1 location'],
      },
      signature: {
        label: 'Signature',
        duration: 90,
        price: 325,
        deposit: 163,
        images: 25,
        locations: '1–2',
        turnaround: '7 business days',
        highlights: ['90 min session', '25 edited images', '1–2 locations', '$50 print credit'],
      },
      elite: {
        label: 'Elite',
        duration: 150,
        price: 425,
        deposit: 213,
        images: 40,
        locations: 3,
        turnaround: '5 business days',
        highlights: ['2.5 hr session', '40 edited images', 'Up to 3 locations', '$100 print credit'],
      },
    },
  },

  mini: {
    label: 'Mini Session',
    description: 'Quick 20-minute session. One location, one lighting setup. 5–8 edited images.',
    requiresConsultation: false,
    tiers: {
      standard: {
        label: 'Mini',
        duration: 20,
        price: 125,
        deposit: 50,
        images: '5–8',
        turnaround: '5 business days',
        highlights: ['20 min session', '5–8 edited images', '1 location', '$50 non-refundable booking fee'],
      },
    },
  },

  event: {
    label: 'Event Photography',
    description: 'Corporate events, brand launches, and social events. Requires a consultation.',
    requiresConsultation: true,
    tiers: {
      essential: {
        label: 'Essential — 3 hrs',
        duration: 180,
        price: 600,
        deposit: 300,
        images: '75–100',
        turnaround: '10 business days',
        highlights: ['3 hr coverage', '75–100 edited images', 'Online gallery'],
      },
      signature: {
        label: 'Signature — 5 hrs',
        duration: 300,
        price: 800,
        deposit: 400,
        images: '150–200',
        turnaround: '7 business days',
        highlights: ['5 hr coverage', '150–200 edited images', '48-hr sneak peek'],
      },
      elite: {
        label: 'Elite — 8 hrs',
        duration: 480,
        price: 1400,
        deposit: 700,
        images: '300–400',
        turnaround: '5 business days',
        highlights: ['8 hr coverage', '300–400 edited images', '48-hr sneak peek'],
      },
    },
  },

  product: {
    label: 'Product Photography',
    description: 'Commercial hero shots for e-commerce, packaging, or advertising. Requires a consultation.',
    requiresConsultation: true,
    tiers: {
      essential: {
        label: 'Essential — Half Day',
        duration: 240,
        price: 450,
        deposit: 225,
        images: 10,
        turnaround: '5 business days',
        highlights: ['4 hr session', 'Up to 5 products', '10 retouched images', '1 backdrop'],
      },
      signature: {
        label: 'Signature',
        duration: 300,
        price: 600,
        deposit: 300,
        images: 25,
        turnaround: '4 business days',
        highlights: ['Half day + setup', 'Up to 15 products', '25 retouched images', '2 backdrops'],
      },
      elite: {
        label: 'Elite — Full Day',
        duration: 480,
        price: 1100,
        deposit: 550,
        images: 50,
        turnaround: '3 business days',
        highlights: ['8 hr session', 'Up to 30 products', '50 retouched images', '3+ backdrops'],
      },
    },
  },

  corporate: {
    label: 'Corporate Headshot Day',
    description: 'On-site bulk headshot sessions for your team. Priced per person. Requires a consultation.',
    requiresConsultation: true,
    tiers: {
      essentials: {
        label: 'Essentials',
        duration: null,
        price: null,
        deposit: null,
        perPerson: 175,
        minimum: 875,
        minPeople: 5,
        turnaround: '7 business days',
        highlights: ['5+ people', '$175/person', '3 images per person', '1 outfit per person'],
      },
      premium: {
        label: 'Premium',
        duration: null,
        price: null,
        deposit: null,
        perPerson: 150,
        minimum: 1500,
        minPeople: 10,
        turnaround: '5 business days',
        highlights: ['10+ people', '$150/person', '5 images per person', '2 outfits per person'],
      },
    },
  },
}

// Buffer added after each session before next slot is available (minutes)
export const BUFFER_MINUTES = 30

// Available shooting hours by day type (24-hour, Central Time)
export const AVAILABILITY = {
  // 0=Sunday, 1=Monday, ..., 6=Saturday
  weekday: { days: [1, 2, 3, 4, 5], start: 17, end: 21 }, // Mon–Fri 5pm–9pm
  weekend: { days: [0, 6], start: 8, end: 20 },            // Sat–Sun 8am–8pm
}

// Booking window
export const MIN_NOTICE_HOURS = 48   // Client must book at least 48hrs out
export const MAX_DAYS_AHEAD = 60     // Show availability up to 60 days out

export const TIMEZONE = 'America/Chicago'
