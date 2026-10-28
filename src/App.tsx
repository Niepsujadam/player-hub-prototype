import { useEffect, useMemo, useState } from 'react'

type Status = 'live' | 'upcoming' | 'finished' | 'unavailable'
type Player = {
  id: string
  name: string
  surname: string
  club: string
  position: string
  status: Status
  fixture: string
  time: string
  summary: string
  color: string
  image: string
}

const photos = [
  'https://images.unsplash.com/photo-1600985366045-c20ec2d3298a?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1791318322299-365f1eb65484?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1762505031623-1e9a2f31858e?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1781863075870-b13ed7323dda?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1791318322287-7d6f7cd6eabf?auto=format&fit=crop&w=320&q=80',
  'https://images.unsplash.com/photo-1789681106268-12bd7aad8771?auto=format&fit=crop&w=320&q=80',
]

const players: Player[] = [
  { id: 'saka', name: 'Bukayo Saka', surname: 'Saka', club: 'Arsenal', position: 'RW', status: 'live', fixture: 'Arsenal v Chelsea', time: "LIVE 68'", summary: '3 shots · 2 on target · 1 assist', color: '#d71920', image: photos[0] },
  { id: 'haaland', name: 'Erling Haaland', surname: 'Haaland', club: 'Man City', position: 'ST', status: 'upcoming', fixture: 'Man City v Liverpool', time: 'Today 17:30', summary: '4 goals in last 5 matches', color: '#6cabdd', image: photos[1] },
  { id: 'palmer', name: 'Cole Palmer', surname: 'Palmer', club: 'Chelsea', position: 'AM', status: 'live', fixture: 'Arsenal v Chelsea', time: "LIVE 68'", summary: '1 shot · 22 passes', color: '#034694', image: '/assets/c5022.png' },
  { id: 'salah', name: 'Mohamed Salah', surname: 'Salah', club: 'Liverpool', position: 'RW', status: 'upcoming', fixture: 'Man City v Liverpool', time: 'Today 17:30', summary: '7 shots on target in last 5', color: '#c8102e', image: photos[3] },
  { id: 'rice', name: 'Declan Rice', surname: 'Rice', club: 'Arsenal', position: 'CM', status: 'live', fixture: 'Arsenal v Chelsea', time: "LIVE 68'", summary: '48 passes · 4 tackles', color: '#d71920', image: photos[4] },
  { id: 'son', name: 'Son Heung-min', surname: 'Son', club: 'Tottenham', position: 'LW', status: 'finished', fixture: 'Tottenham 2–1 Everton', time: 'FT', summary: '1 goal · 3 shots', color: '#132257', image: photos[5] },
  { id: 'odegaard', name: 'Martin Ødegaard', surname: 'Ødegaard', club: 'Arsenal', position: 'AM', status: 'upcoming', fixture: 'Arsenal v Brighton', time: 'Sat 15:00', summary: '2 assists in last 5 matches', color: '#d71920', image: photos[2] },
  { id: 'cash', name: 'Matty Cash', surname: 'Cash', club: 'Aston Villa', position: 'RB', status: 'unavailable', fixture: 'Villa v Newcastle', time: 'Doubtful', summary: 'Hamstring issue · Fitness test before kick-off', color: '#670e36', image: photos[4] },
  { id: "raya", name: "David Raya", surname: "Raya", club: "Arsenal", position: "GK", status: "live", fixture: "Arsenal v Chelsea", time: "LIVE 68'", summary: "Goalkeeper · Matchday squad", color: "#d71920", image: photos[0] },
  { id: "alisson", name: "Alisson Becker", surname: "Alisson", club: "Liverpool", position: "GK", status: "upcoming", fixture: "Man City v Liverpool", time: "Today 17:30", summary: "Goalkeeper · Matchday squad", color: "#c8102e", image: photos[1] },
  { id: "ederson", name: "Ederson", surname: "Ederson", club: "Man City", position: "GK", status: "upcoming", fixture: "Man City v Liverpool", time: "Today 17:30", summary: "Goalkeeper · Matchday squad", color: "#6cabdd", image: photos[2] },
  { id: "saliba", name: "William Saliba", surname: "Saliba", club: "Arsenal", position: "CB", status: "live", fixture: "Arsenal v Chelsea", time: "LIVE 68'", summary: "Central defender · Matchday squad", color: "#d71920", image: photos[3] },
  { id: "gabriel", name: "Gabriel Magalhães", surname: "Gabriel", club: "Arsenal", position: "CB", status: "live", fixture: "Arsenal v Chelsea", time: "LIVE 68'", summary: "Central defender · Matchday squad", color: "#d71920", image: photos[4] },
  { id: "van-dijk", name: "Virgil van Dijk", surname: "Van Dijk", club: "Liverpool", position: "CB", status: "upcoming", fixture: "Man City v Liverpool", time: "Today 17:30", summary: "Central defender · Matchday squad", color: "#c8102e", image: photos[5] },
  { id: "dias", name: "Rúben Dias", surname: "Dias", club: "Man City", position: "CB", status: "upcoming", fixture: "Man City v Liverpool", time: "Today 17:30", summary: "Central defender · Matchday squad", color: "#6cabdd", image: photos[0] },
  { id: "timber", name: "Jurrien Timber", surname: "Timber", club: "Arsenal", position: "LB", status: "live", fixture: "Arsenal v Chelsea", time: "LIVE 68'", summary: "Left-back · Matchday squad", color: "#d71920", image: photos[1] },
  { id: "robertson", name: "Andy Robertson", surname: "Robertson", club: "Liverpool", position: "LB", status: "upcoming", fixture: "Man City v Liverpool", time: "Today 17:30", summary: "Left-back · Matchday squad", color: "#c8102e", image: photos[2] },
  { id: "james", name: "Reece James", surname: "James", club: "Chelsea", position: "RB", status: "live", fixture: "Arsenal v Chelsea", time: "LIVE 68'", summary: "Right-back · Matchday squad", color: "#034694", image: photos[3] },
  { id: "white", name: "Ben White", surname: "White", club: "Arsenal", position: "RB", status: "live", fixture: "Arsenal v Chelsea", time: "LIVE 68'", summary: "Right-back · Matchday squad", color: "#d71920", image: photos[4] },
  { id: "caicedo", name: "Moisés Caicedo", surname: "Caicedo", club: "Chelsea", position: "CM", status: "live", fixture: "Arsenal v Chelsea", time: "LIVE 68'", summary: "Central midfield · Matchday squad", color: "#034694", image: photos[5] },
  { id: "mac-allister", name: "Alexis Mac Allister", surname: "Mac Allister", club: "Liverpool", position: "CM", status: "upcoming", fixture: "Man City v Liverpool", time: "Today 17:30", summary: "Central midfield · Matchday squad", color: "#c8102e", image: photos[0] },
  { id: "foden", name: "Phil Foden", surname: "Foden", club: "Man City", position: "AM", status: "upcoming", fixture: "Man City v Liverpool", time: "Today 17:30", summary: "Attacking midfield · Matchday squad", color: "#6cabdd", image: photos[1] },
  { id: "martinelli", name: "Gabriel Martinelli", surname: "Martinelli", club: "Arsenal", position: "LW", status: "live", fixture: "Arsenal v Chelsea", time: "LIVE 68'", summary: "Left wing · Matchday squad", color: "#d71920", image: photos[2] },
  { id: "gordon", name: "Anthony Gordon", surname: "Gordon", club: "Newcastle", position: "LW", status: "upcoming", fixture: "Villa v Newcastle", time: "Today 17:30", summary: "Left wing · Matchday squad", color: "#241f20", image: photos[3] },
  { id: "havertz", name: "Kai Havertz", surname: "Havertz", club: "Arsenal", position: "ST", status: "live", fixture: "Arsenal v Chelsea", time: "LIVE 68'", summary: "Striker · Matchday squad", color: "#d71920", image: photos[4] },
  { id: "watkins", name: "Ollie Watkins", surname: "Watkins", club: "Aston Villa", position: "ST", status: "upcoming", fixture: "Villa v Newcastle", time: "Today 17:30", summary: "Striker · Matchday squad", color: "#670e36", image: photos[5] },
]

// Keep eleven stable slots, including empty positions, through edits and persistence.
function normaliseLineup(value: unknown): string[] {
  const seen = new Set<string>()
  return Array.from({ length: 11 }, (_, slot) => {
    const id = Array.isArray(value) ? value[slot] : ''
    if (typeof id !== 'string' || !players.some(player => player.id === id) || seen.has(id)) return ''
    seen.add(id)
    return id
  })
}

function placeLineupPlayer(lineup: string[], slot: number, id: string): string[] {
  const next = normaliseLineup(lineup)
  if (slot < 0 || slot >= 11 || !Number.isInteger(slot) || !players.some(player => player.id === id)) return next
  if (next.includes(id) && next[slot] !== id) return next
  next[slot] = id
  return next
}

function toggleLineupPlayer(lineup: string[], id: string): string[] {
  const next = normaliseLineup(lineup)
  const existing = next.indexOf(id)
  if (existing !== -1) { next[existing] = ''; return next }
  const empty = next.indexOf('')
  return empty === -1 ? next : placeLineupPlayer(next, empty, id)
}

type NewsArticle = { id: string; playerId: string; category: string; title: string; fixture: string; time: string; lead: string; paragraphs: string[] }
const newsArticles: NewsArticle[] = [
  { id: 'cash-fitness', playerId: 'cash', category: 'Player availability', title: 'Cash faces late fitness test ahead of Newcastle fixture', fixture: 'Aston Villa · Villa v Newcastle', time: 'Today · 2 min read', lead: 'Matty Cash will be assessed before kick-off as Aston Villa prepare to face Newcastle.', paragraphs: ['The defender remains doubtful with a hamstring issue. A final decision on his involvement is expected after the squad completes its pre-match checks.', 'Villa have been preparing options on the right side of defence while giving Cash time to prove his fitness. His availability could influence how the team balances its attacking runs and defensive cover.', 'The confirmed matchday squad will provide the next update. Until then, his place in the starting lineup remains uncertain.'] },
  { id: 'saka-update', playerId: 'saka', category: 'Live', title: 'Saka records his second shot on target', fixture: "Arsenal v Chelsea · 68'", time: 'Now · 2 min read', lead: 'Bukayo Saka continues to threaten down the right as Arsenal and Chelsea enter the closing stages.', paragraphs: ['Saka has registered his second shot on target of the match, bringing his total to three attempts with 68 minutes played.', 'The Arsenal winger has also contributed an assist, finding space between Chelsea’s midfield and defence to help create chances for his teammates.', 'With the match still in progress, his movement on the flank remains a key part of Arsenal’s attacking play. Follow his player profile for the latest performance snapshot.'] },
  { id: 'palmer-lineup', playerId: 'palmer', category: 'Live', title: 'Palmer is confirmed in Chelsea’s lineup', fixture: 'Arsenal v Chelsea', time: '1h ago · 2 min read', lead: 'Cole Palmer takes his place in Chelsea’s starting lineup for their meeting with Arsenal.', paragraphs: ['Palmer is included in an attacking midfield role, giving Chelsea a creative outlet between the lines.', 'His ability to link play and carry the ball into the final third could be central to Chelsea’s approach. The visitors will look to involve him early as they build through midfield.', 'Keep an eye on his passing, shooting and chance creation as the match unfolds. His player profile brings together the relevant match statistics.'] },
  { id: 'haaland-preview', playerId: 'haaland', category: 'Upcoming', title: 'Haaland faces Liverpool later today', fixture: 'Man City v Liverpool · 17:30', time: '2h ago · 2 min read', lead: 'Erling Haaland heads into Manchester City’s meeting with Liverpool with four goals in his last five matches.', paragraphs: ['The striker’s recent scoring form adds another point of interest to a fixture that brings together two ambitious attacking sides.', 'City will look to create opportunities around the penalty area, while Liverpool’s defence will need to track Haaland’s runs behind the back line.', 'Kick-off is scheduled for 17:30 in this match preview. Confirmed lineups will offer a clearer picture of the players supporting him in attack.'] },
  { id: 'son-report', playerId: 'son', category: 'Results', title: 'Son scores in Tottenham win', fixture: 'Tottenham 2–1 Everton · FT', time: 'Yesterday · 2 min read', lead: 'Son Heung-min found the net as Tottenham secured a 2–1 victory over Everton.', paragraphs: ['Son finished the match with a goal and three shots, providing an attacking spark in a closely contested encounter.', 'Tottenham were made to work for the result, with Everton keeping the game competitive until the final whistle. Son’s contribution helped his side turn their attacking pressure into a winning outcome.', 'The result adds a positive chapter to his recent form. Explore his player profile to review the performance alongside his other appearances.'] },
]

const clubMeta: Record<string, { code: string; color: string; fixture: string; image: string }> = {
  Arsenal: { code: 'ARS', color: '#d71920', fixture: 'Arsenal v Chelsea', image: photos[4] },
  Chelsea: { code: 'CHE', color: '#034694', fixture: 'Arsenal v Chelsea', image: '/assets/c5022.png' },
  'Man City': { code: 'MCI', color: '#6cabdd', fixture: 'Man City v Liverpool', image: photos[1] },
  Liverpool: { code: 'LFC', color: '#c8102e', fixture: 'Man City v Liverpool', image: photos[3] },
  Tottenham: { code: 'TOT', color: '#132257', fixture: 'Tottenham v Everton', image: photos[5] },
  Everton: { code: 'EVE', color: '#003399', fixture: 'Tottenham v Everton', image: photos[2] },
  Brighton: { code: 'BHA', color: '#0057b8', fixture: 'Brighton v Newcastle', image: photos[0] },
  Newcastle: { code: 'NEW', color: '#241f20', fixture: 'Brighton v Newcastle', image: photos[4] },
}

const formations: Record<string, string[]> = {
  '4-3-3': ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'LW', 'ST', 'RW'],
  '4-4-2': ['GK', 'LB', 'CB', 'CB', 'RB', 'LM', 'CM', 'CM', 'RM', 'ST', 'ST'],
  '3-5-2': ['GK', 'CB', 'CB', 'CB', 'LWB', 'CM', 'AM', 'CM', 'RWB', 'ST', 'ST'],
  '4-2-3-1': ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CM', 'LW', 'AM', 'RW', 'ST'],
}

const rows: Record<string, number[]> = {
  '4-3-3': [1, 4, 3, 3],
  '4-4-2': [1, 4, 4, 2],
  '3-5-2': [1, 3, 5, 2],
  '4-2-3-1': [1, 4, 2, 3, 1],
}

type IconName = 'search' | 'user' | 'star' | 'plus' | 'close' | 'back' | 'slip' | 'pitch' | 'list' | 'activity' | 'home' | 'swap' | 'shield' | 'shirt' | 'down'

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4 4" /></>,
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.8-4 3.1-6 7-6s6.2 2 7 6" /></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z" />,
    plus: <path d="M12 5v14M5 12h14" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    down: <path d="m6 9 6 6 6-6" />,
    back: <path d="m15 5-7 7 7 7" />,
    slip: <><path d="M7 3h10v18l-2-1.5-3 1.5-3-1.5L7 21Z" /><path d="M10 8h4M10 12h4" /></>,
    pitch: <><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M12 5v14M3 9h4v6H3M21 9h-4v6h4" /><circle cx="12" cy="12" r="2.5" /></>,
    list: <><path d="M9 6h11M9 12h11M9 18h11" /><circle cx="4" cy="6" r=".5" /><circle cx="4" cy="12" r=".5" /><circle cx="4" cy="18" r=".5" /></>,
    activity: <path d="M3 13h4l2-6 4 11 2-6h6" />,
    home: <><path d="m3 11 9-7 9 7" /><path d="M6 10v10h12V10M10 20v-6h4v6" /></>,
    swap: <><path d="M4 8h13l-3-3M20 16H7l3 3" /><path d="m17 8-3 3M7 16l3-3" /></>,
    shield: <path d="M12 3 5 6v5c0 4.6 2.8 8 7 10 4.2-2 7-5.4 7-10V6Z" />,
    shirt: <path d="m8 4-5 3 2 5 3-1v9h8v-9l3 1 2-5-5-3c-.6 1.3-1.9 2-4 2S8.6 5.3 8 4Z" />,
  }
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>
}

function StatusPill({ status, time, className = '' }: { status: Status; time: string; className?: string }) {
  return <span className={`status status-${status} ${className}`}><span className="status-dot" />{time}</span>
}

function App() {
  const [screen, setScreen] = useState<'discover' | 'matches' | 'xi' | 'activity' | 'profile' | 'squad' | 'eventMarkets' | 'article'>('discover')
  const [previous, setPrevious] = useState<'discover' | 'matches' | 'xi' | 'activity' | 'squad' | 'eventMarkets' | 'article'>('discover')
  const [articleId, setArticleId] = useState('cash-fitness')
  const [articleOrigin, setArticleOrigin] = useState<'discover' | 'activity'>('discover')
  const [articleScroll, setArticleScroll] = useState(0)
  const [activityFilter, setActivityFilter] = useState('All')
  const [profileId, setProfileId] = useState('saka')
  const [profileOverride, setProfileOverride] = useState<Player | null>(null)
  const [squadClub, setSquadClub] = useState('Arsenal')
  const [eventFixture, setEventFixture] = useState('Arsenal v Chelsea')
  const [query, setQuery] = useState('')
  const [formation, setFormation] = useState(() => localStorage.getItem('wh-formation') || '4-3-3')
  const [selected, setSelected] = useState<string[]>(() => {
    try { return normaliseLineup(JSON.parse(localStorage.getItem('wh-xi') || '["saka","haaland","palmer","rice","salah"]')) }
    catch { return normaliseLineup([]) }
  })
  const [followed, setFollowed] = useState<string[]>(() => JSON.parse(localStorage.getItem('wh-followed') || '["saka","haaland"]'))
  const [picker, setPicker] = useState<number | null>(null)
  const [view, setView] = useState<'pitch' | 'list'>('pitch')
  const [myPlayersTab, setMyPlayersTab] = useState<'following' | 'xi'>('following')
  const [editing, setEditing] = useState(false)
  const [profileTab, setProfileTab] = useState('Overview')
  const [stat, setStat] = useState('Shots on target')
  const [bets, setBets] = useState<string[]>([])
  const [showBetslip, setShowBetslip] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    localStorage.setItem('wh-formation', formation)
    localStorage.setItem('wh-xi', JSON.stringify(selected))
    localStorage.setItem('wh-followed', JSON.stringify(followed))
  }, [formation, selected, followed])

  const filtered = useMemo(() => players.filter(p => `${p.name} ${p.club} ${p.position}`.toLowerCase().includes(query.toLowerCase())), [query])
  const openArticle = (id: string) => {
    setArticleId(id)
    setArticleOrigin(screen === 'activity' ? 'activity' : 'discover')
    setArticleScroll(window.scrollY)
    setScreen('article')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
  const closeArticle = () => {
    setScreen(articleOrigin)
    requestAnimationFrame(() => window.scrollTo({ top: articleScroll, behavior: 'instant' }))
  }
  const openProfile = (id: string, tab = 'Overview') => {
    if (screen !== 'profile') setPrevious(screen)
    setProfileOverride(null)
    setProfileId(id)
    setScreen('profile')
    setProfileTab(tab)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const openSquadProfile = (name: string, position: string, club: string, id?: string) => {
    const existing = id ? players.find(player => player.id === id) : players.find(player => player.surname === name && player.club === club)
    if (existing) return openProfile(existing.id)
    if (screen !== 'profile') setPrevious(screen)
    const meta = clubMeta[club] || clubMeta.Chelsea
    setProfileOverride({
      id: `${club}-${name}`.toLowerCase().replace(/ /g, '-'),
      name,
      surname: name,
      club,
      position,
      status: 'live',
      fixture: meta.fixture,
      time: "LIVE 68'",
      summary: 'Confirmed in the matchday squad',
      color: meta.color,
      image: meta.image,
    })
    setScreen('profile')
    setProfileTab('Overview')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const toggleFollow = (id: string) => setFollowed(v => v.includes(id) ? v.filter(x => x !== id) : [...v, id])
  const togglePlayer = (id: string) => setSelected(v => toggleLineupPlayer(v, id))
  const addBet = (label: string) => setBets(v => v.includes(label) ? v.filter(x => x !== label) : [...v, label])
  const live = selected.filter(id => players.find(p => p.id === id)?.status === 'live').length
  const upcoming = selected.filter(id => players.find(p => p.id === id)?.status === 'upcoming').length
  const finished = selected.filter(id => players.find(p => p.id === id)?.status === 'finished').length
  const profile = profileOverride || players.find(p => p.id === profileId) || players[0]

  return (
    <div className="app-shell">
      <header className="brand-header">
        <button className="icon-button menu-button" aria-label="Menu"><span /><span /><span /></button>
        <button className="brand" onClick={() => setScreen('discover')} aria-label="William Hill home">
          <span className="brand-script">William HILL</span>
          <span className="brand-sport">SPORTS</span>
        </button>
        <button className="login-button"><Icon name="user" /> Log in</button>
      </header>

      {screen === 'article' ? (
        <ArticlePage article={newsArticles.find(article => article.id === articleId)!} onBack={closeArticle} onProfile={openProfile} />
      ) : screen === 'profile' ? (
        <PlayerProfile player={profile} onBack={() => setScreen(previous)} onMyXI={() => { setMyPlayersTab('xi'); setScreen('xi') }} followed={followed.includes(profile.id)} inTeam={selected.includes(profile.id)} onFollow={() => toggleFollow(profile.id)} onTeam={() => togglePlayer(profile.id)} tab={profileTab} setTab={setProfileTab} stat={stat} setStat={setStat} bets={bets} addBet={addBet} />
      ) : screen === 'squad' ? (
        <SquadPage club={squadClub} onBack={() => setScreen(previous)} onPlayer={(name, position, id) => openSquadProfile(name, position, squadClub, id)} bets={bets} addBet={addBet} openBetslip={() => setShowBetslip(true)} />
      ) : screen === 'eventMarkets' ? (
        <EventMarketsPage fixture={eventFixture} onBack={() => setScreen(previous)} bets={bets} addBet={addBet} openBetslip={() => setShowBetslip(true)} />
      ) : (
        <>
          <section className="page-title">
            <div><p className="eyebrow">FOOTBALL</p><h1>Player Hub</h1></div>
            <button className="round-action" aria-label="Player settings"><Icon name="user" /></button>
          </section>
          {screen === 'discover' && <InjuryFeature onArticle={() => openArticle('cash-fitness')} />}
          {screen === 'discover' && <OutrightOpportunity bets={bets} addBet={addBet} openBetslip={() => setShowBetslip(true)} onProfile={() => openProfile('haaland')} />}
          <nav className="top-tabs" aria-label="Player Hub sections">
            <button className={screen === 'discover' ? 'active' : ''} onClick={() => setScreen('discover')}>Discover</button>
            <button className={screen === 'matches' ? 'active' : ''} onClick={() => setScreen('matches')}>Matches</button>
            <button className={screen === 'xi' ? 'active' : ''} onClick={() => setScreen('xi')}>My Players</button>
            <button className={screen === 'activity' ? 'active' : ''} onClick={() => setScreen('activity')}>Activity</button>
          </nav>
          {screen === 'discover' && <Discover query={query} setQuery={setQuery} filtered={filtered} followed={followed} selected={selected} onFollow={toggleFollow} onTeam={togglePlayer} onProfile={openProfile} onMarkets={(fixture) => { setPrevious('discover'); setEventFixture(fixture); setScreen('eventMarkets'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} onSquad={(club) => { setPrevious('discover'); setSquadClub(club); setScreen('squad'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} bets={bets} addBet={addBet} openBetslip={() => setShowBetslip(true)} />}
          {screen === 'matches' && <Matches onEvent={(fixture) => { setPrevious('matches'); setEventFixture(fixture); setScreen('eventMarkets'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} onSquad={(club) => { setPrevious('matches'); setSquadClub(club); setScreen('squad'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} bets={bets} addBet={addBet} />}
          {screen === 'xi' && <MyPlayersPage active={myPlayersTab} setActive={setMyPlayersTab} followed={followed} selected={selected} onProfile={openProfile} onFollow={toggleFollow} onTeam={togglePlayer} formation={formation} setFormation={setFormation} setSelected={setSelected} picker={picker} setPicker={setPicker} view={view} setView={setView} editing={editing} setEditing={setEditing} live={live} upcoming={upcoming} finished={finished} saved={saved} setSaved={setSaved} bets={bets} addBet={addBet} openBetslip={() => setShowBetslip(true)} openAllMarkets={() => { setPrevious('xi'); setEventFixture('Arsenal v Chelsea'); setScreen('eventMarkets'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />}
          {screen === 'activity' && <Activity filter={activityFilter} setFilter={setActivityFilter} onArticle={openArticle} onProfile={openProfile} bets={bets} addBet={addBet} openBetslip={() => setShowBetslip(true)} />}
        </>
      )}

      <nav className="bottom-nav" aria-label="Primary navigation">
        <button><Icon name="home" /><span>Home</span></button>
        <button className="active"><Icon name="star" /><span>Player Hub</span></button>
        <button onClick={() => setShowBetslip(true)} className={bets.length ? 'has-bets' : ''}><span className="nav-icon-wrap"><Icon name="slip" />{bets.length > 0 && <span className="bet-count">{bets.length}</span>}</span><span>Betslip</span></button>
        <button><Icon name="user" /><span>Account</span></button>
      </nav>

      {picker !== null && <PlayerPicker selected={selected} slot={picker} formation={formation} onClose={() => setPicker(null)} onPick={(id) => { setSelected(v => placeLineupPlayer(v, picker, id)); setPicker(null) }} />}
      {showBetslip && <Betslip bets={bets} onClose={() => setShowBetslip(false)} onRemove={(b) => setBets(v => v.filter(x => x !== b))} />}
    </div>
  )
}

function Discover({ query, setQuery, filtered, followed, selected, onFollow, onTeam, onProfile, onMarkets, onSquad, bets, addBet, openBetslip }: { query: string; setQuery: (v: string) => void; filtered: Player[]; followed: string[]; selected: string[]; onFollow: (id: string) => void; onTeam: (id: string) => void; onProfile: (id: string) => void; onMarkets: (id: string) => void; onSquad: (club: string) => void; bets: string[]; addBet: (key: string) => void; openBetslip: () => void }) {
  const [clubFilter, setClubFilter] = useState('All clubs')
  const [positionFilter, setPositionFilter] = useState('All positions')
  const clubs = [...new Set(players.map(player => player.club))].sort()
  const positions = [...new Set(players.map(player => player.position))].sort()
  const displayedPlayers = filtered.filter(player => (clubFilter === 'All clubs' || player.club === clubFilter) && (positionFilter === 'All positions' || player.position === positionFilter))
  return <main className="discover-page">
    <section className="search-area">
      <label className="search-box"><Icon name="search" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search player, club or position" aria-label="Search players" />{query && <button onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" /></button>}</label>
      <div className="player-advanced-filters">
        <label><Icon name="shield" /><select value={clubFilter} onChange={event => setClubFilter(event.target.value)} aria-label="Filter by club"><option>All clubs</option>{clubs.map(club => <option key={club}>{club}</option>)}</select><span className="filter-chevron"><Icon name="down" /></span></label>
        <label><Icon name="shirt" /><select value={positionFilter} onChange={event => setPositionFilter(event.target.value)} aria-label="Filter by position"><option>All positions</option>{positions.map(position => <option key={position}>{position}</option>)}</select><span className="filter-chevron"><Icon name="down" /></span></label>
      </div>
    </section>
    {!query && <BettingOpportunity bets={bets} addBet={addBet} openBetslip={openBetslip} onProfile={() => onProfile('saka')} />}
    <section className="content-section">
      <div className="section-heading"><div><p className="eyebrow">{query ? 'SEARCH RESULTS' : 'TRENDING'}</p><h2>{query ? `${filtered.length} players found` : 'Popular players'}</h2></div><button>View all</button></div>
      <div className="player-list">
        {displayedPlayers.map(p => <PlayerCard key={p.id} player={p} followed={followed.includes(p.id)} inTeam={selected.includes(p.id)} onFollow={() => onFollow(p.id)} onTeam={() => onTeam(p.id)} onProfile={() => onProfile(p.id)} onMarkets={() => onMarkets(p.fixture)} onSquad={() => onSquad(p.club)} bets={bets} addBet={addBet} />)}
      </div>
      {!displayedPlayers.length && <div className="empty-state"><Icon name="search" /><h2>No players found</h2><p>Try another search or filter.</p><button onClick={() => { setQuery(''); setClubFilter('All clubs'); setPositionFilter('All positions') }}>Reset players</button></div>}
    </section>
    <section className="content-section recent">
      <div className="section-heading"><div><p className="eyebrow">PICK UP WHERE YOU LEFT OFF</p><h2>Recently viewed</h2></div></div>
      <button className="recent-player" onClick={() => onProfile('saka')}><img src={players[0].image} alt="" /><span><strong>Bukayo Saka</strong><small>Arsenal · Right winger</small></span><span className="chevron">›</span></button>
    </section>
  </main>
}

function InjuryFeature({ onArticle }: { onArticle: () => void }) {
  const injuryPlayer = players.find(player => player.status === 'unavailable') || players[7]
  return <button className="injury-feature injury-feature-nav" onClick={onArticle}>
    <div className="injury-feature-image">
      <img src={injuryPlayer.image} alt="" />
      <StatusPill status="unavailable" time="DOUBTFUL" />
      <span className="injury-news-tag">Club news</span>
    </div>
    <div className="injury-story">
      <p className="eyebrow">PLAYER AVAILABILITY</p>
      <h2>Cash faces late fitness test ahead of Newcastle fixture</h2>
      <div><span>{injuryPlayer.club} · {injuryPlayer.fixture}</span><strong>Read update ›</strong></div>
    </div>
  </button>
}

function Matches({ onEvent, onSquad, bets, addBet }: { onEvent: (fixture: string) => void; onSquad: (club: string) => void; bets: string[]; addBet: (key: string) => void }) {
  const [matchFilter, setMatchFilter] = useState('All')
  const fixtures = [
    { home: 'Arsenal', away: 'Chelsea', homeCode: 'ARS', awayCode: 'CHE', score: '2–1', status: 'Live 68’', type: 'Live', homeColor: '#d71920', awayColor: '#034694', prices: ['4/6', '3/1', '9/2'] },
    { home: 'Man City', away: 'Liverpool', homeCode: 'MCI', awayCode: 'LFC', score: '17:30', status: 'Today', type: 'Upcoming', homeColor: '#6cabdd', awayColor: '#c8102e', prices: ['11/10', '11/4', '21/10'] },
    { home: 'Tottenham', away: 'Everton', homeCode: 'TOT', awayCode: 'EVE', score: '2–1', status: 'Full time', type: 'Results', homeColor: '#132257', awayColor: '#003399', prices: ['–', '–', '–'] },
    { home: 'Brighton', away: 'Newcastle', homeCode: 'BHA', awayCode: 'NEW', score: '15:00', status: 'Saturday', type: 'Upcoming', homeColor: '#0057b8', awayColor: '#241f20', prices: ['7/5', '12/5', '19/10'] },
  ]
  const visible = fixtures.filter(match => matchFilter === 'All' || match.type === matchFilter)
  return <main className="matches-page">
    <section className="match-controls">
      <div className="match-selectors"><button>Premier League <Icon name="down" /></button><button>Matchweek 7 <Icon name="down" /></button></div>
      <div className="matchweek-nav"><button aria-label="Previous matchweek"><Icon name="back" /></button><div><strong>Matchweek 7</strong><span>Sat 17 Oct – Mon 19 Oct</span></div><button aria-label="Next matchweek"><Icon name="back" /></button></div>
      <div className="filter-row match-filters">{['All', 'Live', 'Upcoming', 'Results'].map(filter => <button key={filter} className={matchFilter === filter ? 'active' : ''} onClick={() => setMatchFilter(filter)}>{filter}</button>)}</div>
    </section>
    <section className="matchday-card">
      <div className="matchday-heading"><div><p className="eyebrow">FIXTURES</p><h2>Today’s matches</h2></div><span>{visible.length} events</span></div>
      <div className="fixture-list">{visible.map(match => <article key={`${match.home}-${match.away}`}>
        <div className="fixture-status"><span className={`match-status-dot ${match.type.toLowerCase()}`} />{match.status}</div>
        <div className="fixture-teams"><button onClick={() => onSquad(match.home)}><b style={{ background: match.homeColor }}>{match.homeCode}</b>{match.home}</button><strong>{match.score}</strong><button onClick={() => onSquad(match.away)}>{match.away}<b style={{ background: match.awayColor }}>{match.awayCode}</b></button></div>
        <div className="ninety-market"><span>90 minutes</span><div>{[['1', match.prices[0]], ['X', match.prices[1]], ['2', match.prices[2]]].map(([label, price]) => {
          const key = `${match.home} v ${match.away} · 90 minutes · ${label}`
          const active = bets.includes(key)
          return <button key={label} disabled={match.type === 'Results'} className={active ? 'selected' : ''} onClick={() => addBet(key)}><small>{label}</small><strong>{price}</strong></button>
        })}</div></div>
        <button className="fixture-action" onClick={() => onEvent(`${match.home} v ${match.away}`)}><span>Players & markets</span><b>View event ›</b></button>
      </article>)}</div>
      {!visible.length && <div className="empty-state"><Icon name="pitch" /><h2>No matches found</h2><p>There are no matches in this filter for the selected matchweek.</p></div>}
    </section>
  </main>
}

function OutrightOpportunity({ bets, addBet, openBetslip, onProfile }: { bets: string[]; addBet: (key: string) => void; openBetslip: () => void; onProfile: () => void }) {
  const key = 'Erling Haaland · Premier League top goalscorer'
  const active = bets.includes(key)
  return <section className="outright-opportunity">
    <button className="outright-opportunity-player" onClick={onProfile}>
      <img src={players[1].image} alt="" />
      <span><small>OUTRIGHT OPPORTUNITY</small><strong>Haaland to be top goalscorer</strong><em>Premier League · Season market</em></span>
      <b>›</b>
    </button>
    <button className={`outright-opportunity-price ${active ? 'selected' : ''}`} onClick={() => addBet(key)}><span>{active ? 'Added to betslip' : 'Enhanced price'}</span><strong>6/4</strong></button>
    {bets.length > 0 && <button className="outright-opportunity-betslip" onClick={openBetslip}>View all</button>}
  </section>
}

const arsenalStarters = [
  ['Raya', 'GK'], ['Timber', 'RB'], ['Saliba', 'CB'], ['Gabriel', 'CB'], ['Calafiori', 'LB'],
  ['Rice', 'CM', 'rice'], ['Partey', 'CM'], ['Ødegaard', 'AM', 'odegaard'],
  ['Saka', 'RW', 'saka'], ['Havertz', 'ST'], ['Martinelli', 'LW'],
]

const chelseaStarters = [
  ['Sánchez', 'GK'], ['James', 'RB'], ['Fofana', 'CB'], ['Colwill', 'CB'], ['Cucurella', 'LB'],
  ['Caicedo', 'CM'], ['Fernández', 'CM'], ['Palmer', 'AM', 'palmer'],
  ['Madueke', 'RW'], ['Jackson', 'ST'], ['Neto', 'LW'],
]

const manCityStarters = [
  ['Ederson', 'GK'], ['Walker', 'RB'], ['Rúben Dias', 'CB'], ['Aké', 'CB'], ['Gvardiol', 'LB'],
  ['Rodri', 'CM'], ['Kovačić', 'CM'], ['De Bruyne', 'AM'],
  ['Foden', 'RW'], ['Haaland', 'ST', 'haaland'], ['Doku', 'LW'],
]

const liverpoolStarters = [
  ['Alisson', 'GK'], ['Alexander-Arnold', 'RB'], ['Konaté', 'CB'], ['Van Dijk', 'CB'], ['Robertson', 'LB'],
  ['Mac Allister', 'CM'], ['Gravenberch', 'CM'], ['Szoboszlai', 'AM'],
  ['Salah', 'RW', 'salah'], ['Núñez', 'ST'], ['Díaz', 'LW'],
]

const additionalSquads: Record<string, string[][]> = {
  Tottenham: [['Vicario', 'GK'], ['Porro', 'RB'], ['Romero', 'CB'], ['Van de Ven', 'CB'], ['Udogie', 'LB'], ['Bissouma', 'CM'], ['Bentancur', 'CM'], ['Maddison', 'AM'], ['Kulusevski', 'RW'], ['Solanke', 'ST'], ['Son', 'LW', 'son']],
  Everton: [['Pickford', 'GK'], ['Young', 'RB'], ['Tarkowski', 'CB'], ['Branthwaite', 'CB'], ['Mykolenko', 'LB'], ['Gueye', 'CM'], ['Doucouré', 'CM'], ['Harrison', 'AM'], ['Ndiaye', 'RW'], ['Calvert-Lewin', 'ST'], ['McNeil', 'LW']],
  Brighton: [['Verbruggen', 'GK'], ['Veltman', 'RB'], ['Van Hecke', 'CB'], ['Dunk', 'CB'], ['Estupiñán', 'LB'], ['Baleba', 'CM'], ['Wieffer', 'CM'], ['Rutter', 'AM'], ['Minteh', 'RW'], ['Welbeck', 'ST'], ['Mitoma', 'LW']],
  Newcastle: [['Pope', 'GK'], ['Trippier', 'RB'], ['Schär', 'CB'], ['Burn', 'CB'], ['Hall', 'LB'], ['Tonali', 'CM'], ['Guimarães', 'CM'], ['Joelinton', 'AM'], ['Gordon', 'RW'], ['Isak', 'ST'], ['Barnes', 'LW']],
}

const additionalBenches: Record<string, string[][]> = {
  Tottenham: [['Forster', 'GK'], ['Dragusin', 'CB'], ['Davies', 'LB'], ['Sarr', 'CM'], ['Bergvall', 'CM'], ['Johnson', 'RW'], ['Richarlison', 'ST']],
  Everton: [['Virginia', 'GK'], ['Keane', 'CB'], ['Patterson', 'RB'], ['Garner', 'CM'], ['Iroegbunam', 'CM'], ['Lindstrøm', 'RW'], ['Beto', 'ST']],
  Brighton: [['Steele', 'GK'], ['Webster', 'CB'], ['Lamptey', 'RB'], ['Ayari', 'CM'], ['Enciso', 'AM'], ['Adingra', 'LW'], ['Ferguson', 'ST']],
  Newcastle: [['Dúbravka', 'GK'], ['Kelly', 'CB'], ['Livramento', 'RB'], ['Willock', 'CM'], ['Longstaff', 'CM'], ['Murphy', 'RW'], ['Wilson', 'ST']],
}

function SquadPage({ club, onBack, onPlayer, bets, addBet, openBetslip }: { club: string; onBack: () => void; onPlayer: (name: string, position: string, id?: string) => void; bets: string[]; addBet: (key: string) => void; openBetslip: () => void }) {
  const isArsenal = club === 'Arsenal'
  const isManCity = club === 'Man City'
  const isLiverpool = club === 'Liverpool'
  const isChelsea = club === 'Chelsea'
  const starters = isArsenal ? arsenalStarters : isManCity ? manCityStarters : isLiverpool ? liverpoolStarters : isChelsea ? chelseaStarters : additionalSquads[club] || chelseaStarters
  const substitutes = isArsenal
    ? [['Neto', 'GK'], ['Kiwior', 'CB'], ['Zinchenko', 'LB'], ['Jorginho', 'CM'], ['Merino', 'CM'], ['Trossard', 'LW'], ['Jesus', 'ST']]
    : isManCity
      ? [['Ortega', 'GK'], ['Stones', 'CB'], ['Akanji', 'CB'], ['Lewis', 'RB'], ['Bernardo', 'AM'], ['Grealish', 'LW'], ['Álvarez', 'ST']]
      : isLiverpool
        ? [['Kelleher', 'GK'], ['Gomez', 'CB'], ['Tsimikas', 'LB'], ['Endō', 'CM'], ['Jones', 'CM'], ['Gakpo', 'LW'], ['Jota', 'ST']]
        : isChelsea
          ? [['Jørgensen', 'GK'], ['Badiashile', 'CB'], ['Gusto', 'RB'], ['Lavia', 'CM'], ['Nkunku', 'AM'], ['Mudryk', 'LW'], ['Sancho', 'RW']]
          : additionalBenches[club] || []
  const meta = clubMeta[club] || clubMeta.Chelsea
  const substitutionPairs: Record<string, string> = isArsenal
    ? { Trossard: 'Martinelli', Jesus: 'Havertz' }
    : isManCity
      ? { Bernardo: 'Kovačić', Grealish: 'Doku' }
      : isLiverpool
        ? { Gakpo: 'Díaz', Jota: 'Núñez' }
        : isChelsea ? { Nkunku: 'Palmer', Sancho: 'Neto' } : {}
  const replacedPlayers = new Set(Object.values(substitutionPairs))
  return <main className="squad-page">
    <section className="squad-hero">
      <div className="profile-nav"><button className="icon-button dark" onClick={onBack}><Icon name="back" /></button><span>Team sheet</span><span className="squad-nav-spacer" /></div>
      <div className="squad-club-mark" style={{ background: meta.color }}>{meta.code}</div>
      <p className="eyebrow">CONFIRMED LINEUP</p><h1>{club} squad</h1><p>{meta.fixture} · Live 68’</p>
    </section>
    <section className="squad-meta"><span><b>Starting XI</b>4-3-3 formation</span><StatusPill status="live" time="CONFIRMED" className="status-squad-confirmed" /></section>
    <section className="team-sheet-pitch">
      <div className="team-sheet-lines" />
      <div className="team-sheet-grid">{[starters.slice(8, 11), starters.slice(5, 8), starters.slice(1, 5), starters.slice(0, 1)].map((row, rowIndex) => <div key={rowIndex}>{row.map(([name, position, id]) => <button key={name} className={`has-profile ${replacedPlayers.has(name) ? 'was-substituted' : ''}`} onClick={() => onPlayer(name, position, id)}><span>{name.slice(0, 2).toUpperCase()}</span><strong>{name}</strong><small>{position}</small>{replacedPlayers.has(name) && <em>OFF 63’</em>}</button>)}</div>)}</div>
    </section>
    <SquadBetting club={club} bets={bets} addBet={addBet} openBetslip={openBetslip} />
    <section className="substitutes">
      <div className="section-heading"><div><p className="eyebrow">BENCH</p><h2>Substitutes</h2></div><span>7 players</span></div>
      <div className="substitute-list">{substitutes.map(([name, position], index) => <button key={name} onClick={() => onPlayer(name, position)}><span>{index + 12}</span><strong>{name}</strong><small>{position}</small>{substitutionPairs[name] ? <em className="impact-sub"><Icon name="swap" /><span>Impact Sub<small>for {substitutionPairs[name]}</small></span></em> : <em>Substitute</em>}<b>›</b></button>)}</div>
    </section>
    <p className="data-note">Illustrative team sheet for prototype testing.</p>
  </main>
}

function SquadBetting({ club, bets, addBet, openBetslip }: { club: string; bets: string[]; addBet: (key: string) => void; openBetslip: () => void }) {
  const markets = club === 'Arsenal'
    ? [['Saka 2+ shots on target', '6/4'], ['Ødegaard to assist', '9/4'], ['Rice 60+ passes', '5/6']]
    : club === 'Man City'
      ? [['Haaland anytime scorer', '4/7'], ['De Bruyne to assist', '6/4'], ['Foden 2+ shots on target', '7/4']]
      : club === 'Liverpool'
        ? [['Salah anytime scorer', '13/8'], ['Díaz 2+ shots', '4/5'], ['Mac Allister 50+ passes', '10/11']]
        : [['Palmer to assist', '7/4'], ['Jackson anytime scorer', '2/1'], ['Caicedo 3+ tackles', '6/5']]
  return <section className="squad-betting">
    <div className="squad-betting-title"><div><p className="eyebrow">BETTING OPPORTUNITIES</p><h2>Confirmed starter markets</h2></div><StatusPill status="live" time="IN-PLAY" className="status-squad-market-live" /></div>
    <p>Markets based on players confirmed in today’s starting XI.</p>
    <div className="squad-market-list">{markets.map(([label, price]) => {
      const key = `${club} squad · ${label}`
      const active = bets.includes(key)
      return <button key={label} className={active ? 'selected' : ''} onClick={() => addBet(key)}><span>{label}</span><strong>{price}</strong></button>
    })}</div>
    {bets.length > 0 && <button className="squad-betslip-link" onClick={openBetslip}>View betslip ({bets.length}) <span>›</span></button>}
    <small>Singles only · Illustrative odds</small>
  </section>
}

function EventMarketsPage({ fixture, onBack, bets, addBet, openBetslip }: { fixture: string; onBack: () => void; bets: string[]; addBet: (key: string) => void; openBetslip: () => void }) {
  const isLive = fixture === 'Arsenal v Chelsea'
  const groups = [
    { title: 'Match result', items: [['Arsenal', '8/11'], ['Draw', '11/4'], ['Chelsea', '7/2']] },
    { title: 'Total goals', items: [['Over 2.5', '4/6'], ['Under 2.5', '6/5'], ['Both teams to score', '4/7']] },
    { title: 'Goalscorers', items: [['Saka anytime', '9/4'], ['Palmer anytime', '11/4'], ['Havertz next goal', '5/1']] },
    { title: 'Player performance', items: [['Saka 2+ shots on target', '6/4'], ['Palmer to assist', '7/4'], ['Rice 60+ passes', '5/6']] },
  ]
  return <main className="event-markets-page">
    <section className="event-markets-hero">
      <div className="profile-nav"><button className="icon-button dark" onClick={onBack}><Icon name="back" /></button><span>All markets</span><span className="squad-nav-spacer" /></div>
      <p className="eyebrow">ENGLISH PREMIER LEAGUE</p><h1>{fixture}</h1>
      <div className="event-market-status"><StatusPill status={isLive ? 'live' : 'upcoming'} time={isLive ? "LIVE 68'" : 'UPCOMING'} /><span>{isLive ? 'Arsenal 2–1 Chelsea' : 'Match not started'}</span></div>
    </section>
    <section className="event-market-tools"><div><strong>{groups.reduce((total, group) => total + group.items.length, 0)}</strong><span>Available markets</span></div><button onClick={openBetslip}><Icon name="slip" />Betslip {bets.length > 0 && <b>{bets.length}</b>}</button></section>
    <section className="all-market-groups">{groups.map(group => <article key={group.title} className="event-market-group">
      <div className="event-market-group-title"><h2>{group.title}</h2><span>⌃</span></div>
      <div className="event-market-selections">{group.items.map(([label, price]) => {
        const key = `${fixture} · ${label}`
        const active = bets.includes(key)
        return <button key={label} className={active ? 'selected' : ''} onClick={() => addBet(key)}><span>{label}</span><strong>{price}</strong></button>
      })}</div>
    </article>)}</section>
    <p className="data-note">Illustrative prototype odds. Availability may change during an event.</p>
  </main>
}

function PlayerCard({ player, followed, inTeam, onFollow, onTeam, onProfile, onMarkets, onSquad, bets, addBet }: { player: Player; followed: boolean; inTeam: boolean; onFollow: () => void; onTeam: () => void; onProfile: () => void; onMarkets: () => void; onSquad: () => void; bets: string[]; addBet: (key: string) => void }) {
  const market = getPlayerMarket(player)
  return <article className="player-card">
    <div className="player-card-header">
      <div><h3>{player.fixture}</h3><p>English Premier League</p></div>
      <div><StatusPill status={player.status} time={player.time} /><button onClick={onMarkets}>View all markets</button></div>
    </div>
    <div className="player-main" role="button" tabIndex={0} onClick={onProfile} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onProfile() }}>
      <div className="portrait-wrap"><img src={player.image} alt="" /></div>
      <div className="player-copy player-info-refresh">
        <div className="player-name-row"><h3>{player.name}</h3></div>
        <div className="player-info-club"><button onClick={(event) => { event.stopPropagation(); onSquad() }}><i style={{ background: player.color }}>{player.club.slice(0, 3).toUpperCase()}</i>{player.club}</button><span /><b>{player.position}</b></div>
        <div className="player-info-detail"><Icon name="pitch" /><span>{player.fixture}</span></div>
        <div className={`player-info-detail ${player.status === 'live' ? 'live-stat' : ''}`}><Icon name="activity" /><span>{player.summary}</span></div>
        {player.status === 'live' && <button className="player-starting-xi-link" onClick={(event) => { event.stopPropagation(); onSquad() }}>View {player.club} Starting XI ›</button>}
      </div>
      <span className="chevron">›</span>
    </div>
    <div className="inline-market">
      <div className="inline-market-title"><span><b>{player.status === 'live' ? 'In-play' : 'Player market'}</b>{market.name}</span></div>
      {player.status === 'unavailable' ? <div className="market-suspended"><span>Market currently suspended</span><small>Odds may become available closer to kick-off</small></div> : <div className="inline-odds">{market.odds.map(([label, price]) => {
        const key = `${player.surname} · ${label}`
        const active = bets.includes(key)
        return <button key={label} className={active ? 'selected' : ''} onClick={() => addBet(key)} aria-label={`${player.name}, ${label}, ${price}`}><small>{label}</small><strong>{price}</strong></button>
      })}</div>}
    </div>
    <div className="card-actions"><button className={followed ? 'selected' : ''} onClick={onFollow}><img src="/assets/9defc.svg" alt="" />{followed ? 'Following' : 'Follow'}</button><button className={inTeam ? 'selected' : ''} onClick={onTeam}><img src="/assets/0490c.svg" alt="" />{inTeam ? 'Remove from XI' : 'Add to XI'}</button></div>
  </article>
}

function getPlayerMarket(player: Player) {
  if (player.position === 'ST') return { name: 'Goals', odds: [['Over 0.5', '8/11'], ['Over 1.5', '11/4'], ['First scorer', '4/1']] }
  if (player.position === 'CM') return { name: 'Passes', odds: [['Over 49.5', '5/6'], ['Over 59.5', '6/4'], ['To assist', '9/2']] }
  if (player.position === 'AM') return { name: 'Goal contributions', odds: [['1+', '4/5'], ['2+', '13/5'], ['To assist', '7/4']] }
  if (player.position === 'LW') return { name: 'Shots', odds: [['Over 1.5', '4/7'], ['Over 2.5', '6/5'], ['Over 3.5', '5/2']] }
  return { name: 'Shots on target', odds: [['Over 0.5', '4/9'], ['Over 1.5', '6/4'], ['Over 2.5', '7/2']] }
}

function MyPlayersPage({ active, setActive, followed, selected, onProfile, onFollow, onTeam, ...startingXIProps }: any) {
  return <div className="my-players-page">
    <nav className="my-players-tabs" aria-label="My Players views">
      <button aria-pressed={active === 'following'} className={active === 'following' ? 'active' : ''} onClick={() => setActive('following')}>Following <span>{followed.length}</span></button>
      <button aria-pressed={active === 'xi'} className={active === 'xi' ? 'active' : ''} onClick={() => setActive('xi')}>My Starting XI <span>{selected.filter(Boolean).length}/11</span></button>
    </nav>
    {active === 'following'
      ? <FollowingPlayers followed={followed} selected={selected} onProfile={onProfile} onFollow={onFollow} onTeam={onTeam} />
      : <StartingXI {...startingXIProps} selected={selected} onProfile={onProfile} />}
  </div>
}

function FollowingPlayers({ followed, selected, onProfile, onFollow, onTeam }: { followed: string[]; selected: string[]; onProfile: (id: string) => void; onFollow: (id: string) => void; onTeam: (id: string) => void }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const allFollowedPlayers = players.filter(player => followed.includes(player.id))
  const followedPlayers = allFollowedPlayers.filter(player => `${player.name} ${player.club}`.toLowerCase().includes(search.trim().toLowerCase())).filter(player => statusFilter === 'All' || player.status === statusFilter.toLowerCase())
  return <section className="following-page" aria-label="Followed players">
    <div className="following-heading"><p className="eyebrow">YOUR PLAYERS</p><h2>Following</h2><p>Keep up with the players you follow.</p></div>
    <div className="search-area">
      <label className="search-box"><Icon name="search" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search followed players" aria-label="Search followed players" />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><Icon name="close" /></button>}</label>
      <div className="filter-row" aria-label="Filter followed players">{['All', 'Live', 'Upcoming', 'Finished', 'Unavailable'].map(filter => <button key={filter} aria-pressed={statusFilter === filter} className={statusFilter === filter ? 'active' : ''} onClick={() => setStatusFilter(filter)}>{filter}</button>)}</div>
    </div>
    <div className="following-results" role="status">{followedPlayers.length} {followedPlayers.length === 1 ? 'player' : 'players'}{statusFilter !== 'All' ? ` · ${statusFilter}` : ''}</div>
    <div className="following-list player-list">{followedPlayers.map(player => <article className="player-card" key={player.id}>
      <div className="player-card-header"><div><h3>{player.fixture}</h3><p>English Premier League</p></div><StatusPill status={player.status} time={player.time} /></div>
      <button className="player-main" onClick={() => onProfile(player.id)} aria-label={`View ${player.name} profile`}>
        <span className="portrait-wrap"><img src={player.image} alt="" /></span>
        <span className="player-copy player-info-refresh">
          <span className="player-name-row"><strong>{player.name}</strong></span>
          <span className="following-player-club"><i style={{ background: player.color }}>{player.club.slice(0, 3).toUpperCase()}</i>{player.club}<b>{player.position}</b></span>
          <span className={`player-info-detail ${player.status === 'live' ? 'live-stat' : ''}`}><Icon name="activity" /><span>{player.summary}</span></span>
        </span>
        <span className="chevron">›</span>
      </button>
      <div className="card-actions"><button className="selected" aria-label={`Unfollow ${player.name}`} aria-pressed={true} onClick={() => onFollow(player.id)}><Icon name="star" />Following</button><button className={selected.includes(player.id) ? 'selected' : ''} aria-label={`${selected.includes(player.id) ? 'Remove' : 'Add'} ${player.name} ${selected.includes(player.id) ? 'from' : 'to'} Starting XI`} aria-pressed={selected.includes(player.id)} onClick={() => onTeam(player.id)}><Icon name={selected.includes(player.id) ? 'close' : 'plus'} />{selected.includes(player.id) ? 'Remove from XI' : 'Add to XI'}</button></div>
    </article>)}</div>
    {!followedPlayers.length && <div className="empty-state"><Icon name={allFollowedPlayers.length ? 'search' : 'star'} /><h2>{allFollowedPlayers.length ? 'No matching players' : 'No followed players yet'}</h2><p>{allFollowedPlayers.length ? 'Try another name, club or match status.' : 'Follow players from Discover to see their updates here.'}</p>{allFollowedPlayers.length > 0 && <button className="text-button" onClick={() => { setSearch(''); setStatusFilter('All') }}>Clear filters</button>}</div>}
  </section>
}

function StartingXI({ formation, setFormation, selected, setSelected, picker, setPicker, view, setView, editing, setEditing, onProfile, live, upcoming, finished, saved, setSaved, bets, addBet, openBetslip, openAllMarkets }: any) {
  const [showFormation, setShowFormation] = useState(false)
  const lineup = selected.map((id: string) => players.find(p => p.id === id)) as (Player | undefined)[]
  const selectedPlayers = lineup.filter(Boolean) as Player[]
  let slotIndex = 0
  return <main className="xi-page">
    <section className="xi-summary"><div><strong>{live}</strong><span><i className="dot live" />Live</span></div><div><strong>{upcoming}</strong><span><i className="dot upcoming" />Upcoming</span></div><div><strong>{finished}</strong><span><i className="dot finished" />Finished</span></div></section>
    <section className="xi-toolbar">
      <div><p className="eyebrow">{editing ? 'EDITING TEAM' : 'YOUR TEAM'}</p><h2>{selected.filter(Boolean).length} of 11 players selected</h2></div>
      <button className="text-button" onClick={() => setEditing(!editing)}>{editing ? 'Done' : 'Edit team'}</button>
    </section>
    <div className="progress"><span style={{ width: `${selected.filter(Boolean).length / 11 * 100}%` }} /></div>
    <section className="controls-row">
      <button className="formation-button" onClick={() => setShowFormation(!showFormation)}><Icon name="pitch" /><span><small>Formation</small><strong>{formation}</strong></span><span className="chevron">⌄</span></button>
      <div className="view-switch"><button className={view === 'pitch' ? 'active' : ''} onClick={() => setView('pitch')} aria-label="Pitch view"><Icon name="pitch" /></button><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="List view"><Icon name="list" /></button></div>
    </section>
    {showFormation && <div className="formation-menu">{Object.keys(formations).map(f => <button key={f} className={formation === f ? 'active' : ''} onClick={() => { setFormation(f); setShowFormation(false) }}>{f}<span>{formation === f ? '✓' : ''}</span></button>)}</div>}
    {view === 'pitch' ? <section className="pitch" aria-label={`${formation} football pitch`}>
      <div className="pitch-lines"><span className="halfway" /><span className="centre-circle" /><span className="box top" /><span className="box bottom" /></div>
      <div className="pitch-players">{rows[formation].map((count: number, row: number) => <div className="pitch-row" key={row}>{Array.from({ length: count }).map(() => {
        const i = slotIndex++
        const p = lineup[i]
        const position = formations[formation][i]
        return <button key={i} aria-label={`${p ? editing ? 'Change' : 'View' : 'Add player to'} ${p ? p.name + ' at ' : ''}${position} slot ${i + 1}`} className={`pitch-player ${p ? 'occupied' : ''}`} onClick={() => p && !editing ? onProfile(p.id) : setPicker(i)}>
          {p ? <><span className="pitch-avatar"><img src={p.image} alt="" />{p.status === 'live' && <i />}</span><strong>{p.surname}</strong><small><b style={{ background: p.color }} />{position}</small>{editing && <span className="edit-dot"><Icon name="close" /></span>}</> : <><span className="empty-avatar"><Icon name="plus" /></span><strong>Add player</strong><small>{position}</small></>}
        </button>
      })}</div>)}</div>
    </section> : <section className="lineup-list">{selectedPlayers.length ? lineup.map((p, i) => p ? <button key={p.id} onClick={() => onProfile(p.id)}><span className="position-chip">{formations[formation][i]}</span><img src={p.image} alt="" /><span className="list-copy"><strong>{p.name}</strong><small>{p.club} · {p.fixture}</small></span><StatusPill status={p.status} time={p.time} /><span className="chevron">›</span></button> : null) : <div className="empty-state"><Icon name="pitch" /><h2>Your pitch is ready</h2><p>Add your first player to start tracking their matches.</p></div>}</section>}
    {selected.includes('saka') && <BettingOpportunity bets={bets} addBet={addBet} openBetslip={openBetslip} onProfile={() => onProfile('saka')} />}
    <SelectedPlayerMarkets selected={selected} bets={bets} addBet={addBet} openBetslip={openBetslip} openAllMarkets={openAllMarkets} />
  </main>
}

function SelectedPlayerMarkets({ selected, bets, addBet, openBetslip, openAllMarkets }: { selected: string[]; bets: string[]; addBet: (key: string) => void; openBetslip: () => void; openAllMarkets: () => void }) {
  const selectedPlayers = selected.map(id => players.find(player => player.id === id)).filter(Boolean) as Player[]
  return <section className="selected-player-markets">
    <div className="selected-markets-heading"><div><p className="eyebrow">MORE PLAYER MARKETS</p><h2>Based on your XI</h2></div><button onClick={openAllMarkets}>View all markets</button></div>
    {selectedPlayers.length ? <div className="selected-market-list">{selectedPlayers.slice(0, 6).map(player => {
      const market = getPlayerMarket(player)
      const [label, price] = market.odds[1] || market.odds[0]
      const key = `${player.surname} · ${label}`
      const active = bets.includes(key)
      return <div key={player.id} className="selected-market-row">
        <img src={player.image} alt="" />
        <span><strong>{player.name}</strong><small>{market.name} · {label}</small></span>
        <button className={active ? 'selected' : ''} onClick={() => addBet(key)}><small>{active ? 'Added' : 'Odds'}</small><strong>{price}</strong></button>
      </div>
    })}</div> : <div className="empty-state"><Icon name="pitch" /><h2>Add players to see markets</h2><p>Relevant markets will appear here as you build your XI.</p></div>}
    {bets.length > 0 && <button className="selected-markets-betslip" onClick={openBetslip}>View betslip ({bets.length}) <span>›</span></button>}
    <p>Markets update with your selected players · Illustrative odds</p>
  </section>
}

function BettingOpportunity({ bets, addBet, openBetslip, onProfile }: { bets: string[]; addBet: (key: string) => void; openBetslip: () => void; onProfile: () => void }) {
  const boostKey = 'Saka · 2+ shots on target · Price Boost'
  const active = bets.includes(boostKey)
  return <section className="bet-opportunity">
    <div className="bet-opportunity-head">
      <div><span className="boost-label">PRICE BOOST</span><p>Exclusive player market</p></div>
      <StatusPill status="live" time="68'" />
    </div>
    <button className="bet-context" onClick={onProfile}>
      <img src={players[0].image} alt="" />
      <span><strong>Bukayo Saka to have 2+ shots on target</strong><small>Arsenal v Chelsea · Live now</small></span>
      <span className="chevron">›</span>
    </button>
    <button className={`boost-price ${active ? 'selected' : ''}`} onClick={() => addBet(boostKey)}>
      <span><small>Was</small><del>6/4</del></span>
      <span><small>{active ? 'Added to betslip' : 'Boosted to'}</small><strong>2/1</strong></span>
    </button>
    <div className="opportunity-footer">
      <span>Limited time · Max stake applies · Illustrative odds</span>
      {bets.length > 0 && <button onClick={openBetslip}>View all</button>}
    </div>
  </section>
}

function PlayerPicker({ selected, slot, formation, onClose, onPick }: { selected: string[]; slot: number; formation: string; onClose: () => void; onPick: (id: string) => void }) {
  const [q, setQ] = useState('')
  const target = formations[formation][slot]
  const preferred: Record<string, string[]> = { LM: ['LM', 'LW'], RM: ['RM', 'RW'], LWB: ['LWB', 'LB'], RWB: ['RWB', 'RB'], CM: ['CM', 'AM'] }
  const matchesPosition = (player: Player) => (preferred[target] || [target]).includes(player.position)
  const list = players.filter(p => !selected.includes(p.id) && `${p.name} ${p.club} ${p.position}`.toLowerCase().includes(q.trim().toLowerCase())).sort((a, b) => Number(matchesPosition(b)) - Number(matchesPosition(a)))
  return <div className="sheet-backdrop" onMouseDown={e => e.target === e.currentTarget && onClose()}><section className="bottom-sheet" role="dialog" aria-modal="true" aria-label={`Choose a player for ${target} slot ${slot + 1}`}>
    <div className="sheet-handle" /><div className="sheet-title"><div><p className="eyebrow">ADD TO {target}</p><h2>Choose a player</h2></div><button className="icon-button" onClick={onClose} aria-label="Close player picker"><Icon name="close" /></button></div>
    <label className="search-box"><Icon name="search" /><input autoFocus value={q} onChange={e => setQ(e.target.value)} placeholder="Search player or club" /></label>
    <p className="recommendation">Choose for {target} · Position matches shown first</p>
    <div className="picker-list">{list.map(p => <button key={p.id} aria-label={`Add ${p.name} to ${target} slot ${slot + 1}`} onClick={() => onPick(p.id)}><img src={p.image} alt="" /><span><strong>{p.name}</strong><small>{p.club} · {p.position}</small></span><Icon name="plus" /></button>)}</div>
    {!list.length && <div className="empty-state"><h2>No matching players</h2><p>Try a different player name, club or position.</p></div>}
  </section></div>
}

function PlayerProfile({ player, onBack, onMyXI, followed, inTeam, onFollow, onTeam, tab, setTab, stat, setStat, bets, addBet }: any) {
  const odds = stat === 'Goals' ? [['Anytime goalscorer', '2/1'], ['2+ goals', '8/1'], ['First goalscorer', '11/2']] : stat === 'Assists' ? [['To record an assist', '7/4'], ['2+ assists', '9/1'], ['First assist', '4/1']] : [['Over 0.5', '4/9'], ['Over 1.5', '6/4'], ['Over 2.5', '7/2']]
  return <main className="profile-page">
    <section className="profile-hero">
      <div className="profile-nav"><button className="icon-button dark" onClick={onBack}><Icon name="back" /></button><span>Player profile</span><button className="icon-button dark" onClick={onMyXI} aria-label="Open My Starting XI"><Icon name="pitch" /></button></div>
      <div className="profile-identity"><img src={player.image} alt={`Illustrative portrait for ${player.name}`} /><div><StatusPill status={player.status} time={player.time} /><h1>{player.name}</h1><p><span className="mini-badge" style={{ background: player.color }} />{player.club} · {player.position}</p></div></div>
      <div className="profile-actions"><button className={followed ? 'selected' : ''} onClick={onFollow}><Icon name="star" />{followed ? 'Following' : 'Follow player'}</button><button className={inTeam ? 'selected' : ''} onClick={onTeam}><Icon name={inTeam ? 'close' : 'plus'} />{inTeam ? 'In Starting XI' : 'Add to your Starting XI'}</button></div>
    </section>
    <nav className="profile-tabs">{['Overview', 'Stats', 'Markets', 'History'].map((x: string) => <button className={tab === x ? 'active' : ''} onClick={() => setTab(x)} key={x}>{x}</button>)}</nav>
    {tab === 'Overview' && <><section className="match-card" aria-label={`${player.name} player stats`}><div className="match-top"><StatusPill status={player.status} time={player.time} /><span>Premier League</span></div><h2>{player.name} stats</h2><p className="player-stats-fixture">{player.fixture}</p><p>{player.status === 'live' ? 'Currently playing · Last updated moments ago' : 'Next player fixture'}</p>{player.status === 'live' && <div className="live-stats"><div><strong>3</strong><span>Shots</span></div><div><strong>2</strong><span>On target</span></div><div><strong>1</strong><span>Assists</span></div><div><strong>68</strong><span>Minutes</span></div></div>}</section><Performance player={player} stat={stat} setStat={setStat} odds={odds} bets={bets} addBet={addBet} /></>}
    {tab === 'Stats' && <Performance player={player} stat={stat} setStat={setStat} odds={odds} bets={bets} addBet={addBet} statsOnly />}
    {tab === 'Markets' && <Markets odds={odds} player={player} stat={stat} bets={bets} addBet={addBet} />}
    {tab === 'History' && <History player={player} />}
    <p className="data-note">Illustrative prototype data. Historical performance is context, not a prediction or guarantee.</p>
  </main>
}

function Performance({ player, stat, setStat, odds, bets, addBet, statsOnly }: any) {
  return <section className="profile-section"><div className="section-heading"><div><p className="eyebrow">PERFORMANCE</p><h2>{statsOnly ? `${player.name} stats` : 'Form & related markets'}</h2></div></div><div className="stat-tabs">{['Goals', 'Assists', 'Shots', 'Shots on target'].map(x => <button className={stat === x ? 'active' : ''} onClick={() => setStat(x)} key={x}>{x}</button>)}</div>
    <div className="chart-card"><div className="average"><span>Season average</span><strong>{stat === 'Goals' ? '0.6' : stat === 'Assists' ? '0.4' : stat === 'Shots' ? '3.1' : '1.8'} <small>per match</small></strong></div><div className="bar-chart">{[1, 2, 0, 3, 2].map((v, i) => <div key={i}><span className="bar-value">{v}</span><i style={{ height: `${24 + v * 22}%` }} /><small>{['MUN', 'BHA', 'NEW', 'TOT', 'CHE'][i]}</small></div>)}</div><p>Last 5 matches · {player.club}</p></div>
    {!statsOnly && <Markets odds={odds} player={player} stat={stat} bets={bets} addBet={addBet} />}
  </section>
}

function Markets({ odds, player, stat, bets, addBet }: any) {
  return <section className="market-card"><div className="market-title"><div><p className="eyebrow">PLAYER MARKET</p><h2>{player.surname}: {stat}</h2></div><span>⌃</span></div><div className="odds-list">{odds.map(([label, price]: string[]) => { const key = `${player.surname} · ${label}`; const active = bets.includes(key); return <div key={label}><span>{label}</span><button className={active ? 'selected' : ''} onClick={() => addBet(key)}><small>{active ? 'Added' : 'Odds'}</small><strong>{price}</strong></button></div> })}</div><p className="market-foot">Singles only · Selections from separate fixtures are not combined automatically.</p></section>
}

function History({ player }: { player: Player }) {
  return <section className="profile-section"><div className="section-heading"><div><p className="eyebrow">LAST FIVE MATCHES</p><h2>{player.name} stats</h2></div></div><div className="history-list">{['Chelsea', 'Tottenham', 'Newcastle', 'Brighton', 'Man United'].map((opponent, i) => <div key={opponent}><span className={i === 2 ? 'result loss' : 'result'}>{i === 2 ? 'L' : 'W'}</span><span><strong>{player.club} v {opponent}</strong><small>{player.name}: {['2 goals · 3 SOT', '1 assist · 2 SOT', '0 goals · 0 SOT', '1 goal · 2 SOT', '1 assist · 1 SOT'][i]}</small></span><b>{['3–1', '2–0', '0–1', '2–1', '3–2'][i]}</b></div>)}</div></section>
}

function Activity({ filter, setFilter, onArticle, onProfile, bets, addBet, openBetslip }: { filter: string; setFilter: (filter: string) => void; onArticle: (id: string) => void; onProfile: (id: string) => void; bets: string[]; addBet: (key: string) => void; openBetslip: () => void }) {
  const items = [
    { id: 'saka', articleId: 'saka-update', type: 'Live', title: 'Saka records his second shot on target', copy: "Arsenal v Chelsea · 68'", time: 'Now' },
    { id: 'palmer', articleId: 'palmer-lineup', type: 'Live', title: 'Palmer is confirmed in Chelsea’s lineup', copy: 'Arsenal v Chelsea', time: '1h' },
    { id: 'haaland', articleId: 'haaland-preview', type: 'Upcoming', title: 'Haaland faces Liverpool later today', copy: 'Man City v Liverpool · 17:30', time: '2h' },
    { id: 'son', articleId: 'son-report', type: 'Results', title: 'Son scores in Tottenham win', copy: 'Tottenham 2–1 Everton · FT', time: 'Yesterday' },
  ]
  return <main className="activity-page"><section className="activity-intro"><p>Updates from players you follow and your Starting XI, all in one place.</p></section><div className="filter-row activity-filters">{['All', 'Live', 'Upcoming', 'Results'].map(x => <button key={x} className={filter === x ? 'active' : ''} onClick={() => setFilter(x)}>{x}</button>)}</div>{(filter === 'All' || filter === 'Upcoming') && <OutrightOpportunity bets={bets} addBet={addBet} openBetslip={openBetslip} onProfile={() => onProfile('haaland')} />}{(filter === 'All' || filter === 'Live') && <div className="activity-market"><BettingOpportunity bets={bets} addBet={addBet} openBetslip={openBetslip} onProfile={() => onProfile('saka')} /></div>}<section className="activity-list">{items.filter(x => filter === 'All' || x.type === filter).map(x => { const p = players.find(p => p.id === x.id)!; return <button key={x.title} onClick={() => onArticle(x.articleId)}><div className="activity-portrait"><img src={p.image} alt="" /><span className={x.type.toLowerCase()} /></div><div><span className="activity-meta">{x.type} · {x.time}</span><h2>{x.title}</h2><p>{x.copy}</p></div><span className="chevron">›</span></button> })}</section></main>
}

function ArticlePage({ article, onBack, onProfile }: { article: NewsArticle; onBack: () => void; onProfile: (id: string) => void }) {
  const player = players.find(player => player.id === article.playerId)!
  return <main className="article-page">
    <nav className="article-nav" aria-label="Article navigation"><button onClick={onBack}><Icon name="back" />Back</button><span>Player news</span></nav>
    <article>
      <div className="article-image"><img src={player.image} alt="" /><span>{article.category}</span></div>
      <header className="article-heading"><p className="eyebrow">{article.category}</p><h1>{article.title}</h1><p className="article-fixture">{article.fixture}</p><p className="article-byline">William Hill Sport <span>·</span> {article.time}</p></header>
      <div className="article-body"><p className="article-lead">{article.lead}</p>{article.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}<p className="article-note">Sample article with illustrative match details.</p></div>
    </article>
    <section className="article-related"><p className="eyebrow">FEATURED PLAYER</p><button onClick={() => onProfile(player.id)}><img src={player.image} alt="" /><span><strong>{player.name}</strong><small>{player.club} · View player profile</small></span><Icon name="back" /></button></section>
  </main>
}

function Betslip({ bets, onClose, onRemove }: { bets: string[]; onClose: () => void; onRemove: (b: string) => void }) {
  return <div className="sheet-backdrop"><section className="bottom-sheet betslip"><div className="sheet-handle" /><div className="sheet-title"><div><p className="eyebrow">WILLIAM HILL</p><h2>Betslip <span className="count-badge">{bets.length}</span></h2></div><button className="icon-button" onClick={onClose}><Icon name="close" /></button></div>{bets.length ? <><div className="bet-items">{bets.map(b => <div key={b}><span><strong>{b}</strong><small>Illustrative market selection</small></span><button onClick={() => onRemove(b)}><Icon name="close" /></button></div>)}</div><label className="stake-box"><span>Stake</span><input inputMode="decimal" placeholder="0.00" aria-label="Stake amount" /></label><div className="returns"><span>Estimated returns</span><strong>£0.00</strong></div><button className="primary-button" disabled>Log in to place bet</button><p className="data-note">Prototype only. No real-money bet will be placed.</p></> : <div className="empty-state"><Icon name="slip" /><h2>Your betslip is empty</h2><p>Select some odds to add a player market.</p></div>}</section></div>
}

export default App
