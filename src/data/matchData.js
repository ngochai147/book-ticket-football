// src/data/matchData.js

// Placeholder function to generate simple logo URLs (Replace with actual URLs)
const generateLogoUrl = (teamName) => {
    const initials = teamName.split(' ').map(n => n[0]).slice(0, 3).join('').toUpperCase();
    return `https://via.placeholder.com/50x50.png/eee/777?text=${initials}`;
};

export const allMatchData = [
  {
    id: 'mu-vs-liv-20240915',
    team1: { name: 'Manchester United', shortName: 'MUN', logoUrl: generateLogoUrl('Manchester United') },
    team2: { name: 'Liverpool', shortName: 'LIV', logoUrl: generateLogoUrl('Liverpool') },
    date: '15 Sep 2024',
    time: '20:00',
    league: 'Premier League',
    status: 'Scheduled', // Scheduled, Live, Full-Time
    score: { team1: null, team2: null },
    stadium: { name: 'Old Trafford', city: 'Manchester', imageUrl: 'https://images.unsplash.com/photo-1518604666861-cb9aaf972e80?q=80&w=400&h=250&auto=format&fit=crop' }, // Placeholder stadium image
    ticketUrl: '#', // Placeholder URL
    details: {
      previewText: 'A classic North-West derby clash awaits as Manchester United host rivals Liverpool at the Theatre of Dreams. Expect fireworks!',
      // Add more details like lineups, stats later if needed
    }
  },
  {
    id: 'ars-vs-mci-20240922',
    team1: { name: 'Arsenal', shortName: 'ARS', logoUrl: generateLogoUrl('Arsenal') },
    team2: { name: 'Manchester City', shortName: 'MCI', logoUrl: generateLogoUrl('Man City') },
    date: '22 Sep 2024',
    time: '19:30',
    league: 'Premier League',
    status: 'Scheduled',
    score: { team1: null, team2: null },
    stadium: { name: 'Emirates Stadium', city: 'London', imageUrl: 'https://images.unsplash.com/photo-1598057080189-35064db0c793?q=80&w=400&h=250&auto=format&fit=crop' },
    ticketUrl: '#',
    details: {
      previewText: 'Two title contenders go head-to-head in North London. Can Arsenal overcome the reigning champions?',
    }
  },
  {
    id: 'che-vs-tot-20240925',
    team1: { name: 'Chelsea', shortName: 'CHE', logoUrl: generateLogoUrl('Chelsea') },
    team2: { name: 'Tottenham Hotspur', shortName: 'TOT', logoUrl: generateLogoUrl('Tottenham') },
    date: '25 Sep 2024',
    time: '19:45',
    league: 'Premier League',
    status: 'Scheduled',
    score: { team1: null, team2: null },
    stadium: { name: 'Stamford Bridge', city: 'London', imageUrl: 'https://images.unsplash.com/photo-1608205511968-ef615a5d66c4?q=80&w=400&h=250&auto=format&fit=crop' },
    ticketUrl: '#',
    details: {
        previewText: 'A fierce London derby under the lights at Stamford Bridge.'
    }
  },
   {
    id: 'eve-vs-new-20240910', // Example of a past match
    team1: { name: 'Everton', shortName: 'EVE', logoUrl: generateLogoUrl('Everton') },
    team2: { name: 'Newcastle United', shortName: 'NEW', logoUrl: generateLogoUrl('Newcastle') },
    date: '10 Sep 2024',
    time: '15:00',
    league: 'Premier League',
    status: 'Full-Time',
    score: { team1: 1, team2: 1 },
    stadium: { name: 'Goodison Park', city: 'Liverpool', imageUrl: 'https://images.unsplash.com/photo-1586251769981-a8a7a46f9867?q=80&w=400&h=250&auto=format&fit=crop' },
    ticketUrl: null, // No tickets for past matches
    details: {
        previewText: 'A hard-fought draw at Goodison Park with both sides sharing the points.'
    }
  },
  // Add more matches (upcoming and past)
];