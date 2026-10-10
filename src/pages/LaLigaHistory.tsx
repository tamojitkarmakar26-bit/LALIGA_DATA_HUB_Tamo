import React, { useState, useEffect } from 'react';

export const LaLigaHistory: React.FC = () => {
  const [activeEra, setActiveEra] = useState<string>('all');
  const [selectedKaggleSeason, setSelectedKaggleSeason] = useState<string>('2023-24');
  const [kaggleTable, setKaggleTable] = useState<any[]>([]);
  const [loadingKaggle, setLoadingKaggle] = useState<boolean>(false);

  const kaggleSeasons = ['2025-26', '2024-25', '2023-24', '2022-23', '2021-22', '2020-21'];

  useEffect(() => {
    let isMounted = true;
    async function fetchHistoricalTable() {
      setLoadingKaggle(true);
      try {
        const res = await fetch(`/api/dataset/standings?season=${encodeURIComponent(selectedKaggleSeason)}`);
        if (res.ok) {
          const json = await res.json();
          if (isMounted) setKaggleTable(json.standings || []);
        }
      } catch (err) {
        console.error('Failed to load historical season:', err);
      } finally {
        if (isMounted) setLoadingKaggle(false);
      }
    }
    fetchHistoricalTable();
    return () => {
      isMounted = false;
    };
  }, [selectedKaggleSeason]);

  const milestones = [
    {
      id: 'm1',
      epoch: 'pioneers',
      year: '1929',
      badge: 'Inauguration',
      meta: 'Matchday 1: 10 Feb 1929',
      ringColor: 'ring-secondary',
      dotColor: 'bg-secondary',
      title: "The Genesis & Barça's Inaugural Crown",
      text: "José María Peña kicks off Spanish football's inaugural round. Ten founding clubs competed in an 18-fixture double round-robin. FC Barcelona edged Real Madrid by two points to capture the first historic title behind Romà Forns' tactical coaching.",
      stats: [
        { label: 'First Goalscorer', val: 'Pitus Prat (Espanyol)', color: 'text-on-surface' },
        { label: 'Founding Clubs', val: '10 Historic Franchises', color: 'text-secondary' },
        { label: 'First Champions', val: 'FC Barcelona (25 pts)', color: 'text-primary' },
      ],
      image: null,
    },
    {
      id: 'm2',
      epoch: 'classic',
      year: '1953 – 1964',
      badge: 'The Golden Dynasties',
      meta: 'Chamartín Revolution',
      ringColor: 'ring-secondary',
      dotColor: 'bg-secondary',
      title: 'Di Stéfano, Puskás & The Madrid Pentacampeonato',
      text: "Alfredo Di Stéfano transforms European sport. Real Madrid claims 8 titles in 11 seasons while establishing unprecedented offensive dominance alongside Ferenc Puskás and Paco Gento, matched only by Helenio Herrera’s thrilling Atlético and Barça outfits.",
      stats: null,
      image: {
        bg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOg_-sudNYynGkx8-0cB-20jS_95Wm4Lh9k9kvROsHOdGzb6hwZypOWJkArkt4WFlc87weOGkflLqi4NkEES1GnS6DiOF3AFPN3yyC6zpaUXAHaa835nONEWzZMzMuwT34IsTubLhxnzNlhtWU6YbTzoYzc0Py7fO_21xyyMg-qBLTqMWxwAz1dcJZFSi2k4qjbrO7cUsx3UECdHBlDjOMl9hIF477MwV70n4prTI',
        sub: 'Tactical Era',
        headline: 'WM Formation & Total Direct Transition',
        footerL: 'Gento’s record: 12 LaLiga medals',
        footerR: 'Puskás: 4 Pichichi trophies',
      },
    },
    {
      id: 'm3',
      epoch: 'classic',
      year: '1973 – 1978',
      badge: 'Tactical Vanguard',
      meta: 'Total Football Import',
      ringColor: 'ring-tertiary',
      dotColor: 'bg-tertiary',
      title: 'Cruyff Lands in Catalonia & Basque Regional Supremacy',
      text: "Johan Cruyff delivers Barcelona’s first league title in 14 years with a celebrated 0-5 El Clásico victory. The late 70s also birthed the ferocious Basque renaissance led by Real Sociedad and Athletic Club’s formidable homegrown philosophies.",
      stats: null,
      customBox: {
        icon: 'psychology',
        label: 'Cruyff 1973/74 impact factor',
        value: '24 matches unbeaten',
      },
      image: null,
    },
    {
      id: 'm4',
      epoch: 'dream',
      year: '1991 – 1999',
      badge: 'The Dream Team & Super Depor',
      meta: '4 STRAIGHT TITLES',
      ringColor: 'ring-primary',
      dotColor: 'bg-primary',
      title: 'The Dream Team Hegemony & Riazor Drama',
      text: 'Cruyff’s visionary 3-4-3 system orchestrated by Koeman, Laudrup, and Stoichkov claims four consecutive titles from 1991 to 1994, punctuated by final-day Tenerife heartbreak for Madrid. Arsenio Iglesias’s Deportivo de La Coruña mounts an unforgettable rebellion, setting up their 1999/2000 title conquest.',
      statsGrid: [
        { label: 'Dream Team 1991-94', val: '4 Consecutive Trophies', color: 'text-on-surface' },
        { label: '1995/96 Doblete', val: 'Atlético de Madrid (87 pts)', color: 'text-primary' },
      ],
      image: null,
    },
    {
      id: 'm5',
      epoch: 'titan',
      year: '2009 – 2018',
      badge: 'The Golden Titan Rivalry',
      meta: '100-POINT CENTURIES',
      ringColor: 'ring-primary-container',
      dotColor: 'bg-primary-container',
      title: 'Messi vs Cristiano: The Greatest Era in Club History',
      text: 'A celestial collision of footballing royalty. Pep Guardiola’s tiki-taka Barcelona squares off with José Mourinho and Zinedine Zidane’s hyper-counter Madrid. Both sides breached the impossible 100-point ceiling (Mourinho 2011/12, Vilanova 2012/13), while Diego Simeone’s Atlético forged a heroic title in 2014.',
      duel: true,
      image: null,
    },
    {
      id: 'm6',
      epoch: 'modern',
      year: '2020 – 2024+',
      badge: 'Modern Frontier',
      meta: 'ACTIVE ERA',
      ringColor: 'ring-tertiary',
      dotColor: 'bg-tertiary',
      title: 'Telemetry, New Arenas & Next-Gen Dominance',
      text: 'The transformation into EA SPORTS FC Telemetry and global broadcast dominance. Santiago Bernabéu and Spotify Camp Nou modernizations set multi-billion venue standards, while fresh prodigies Jude Bellingham, Vinícius Jr., Lamine Yamal, and Pedri steer Spanish football forward.',
      cvc: true,
      image: null,
    },
  ];

  const filteredMilestones = milestones.filter(
    (m) => activeEra === 'all' || m.epoch === activeEra
  );

  return (
    <div className="flex flex-col w-full">
      {/* Top Archival Banner with Historic Telemetry */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg shadow-xl mb-space-lg">
        {/* Ambient Heritage Watermark & Glowing Backdrop */}
        <div className="absolute -right-16 -top-24 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -left-12 -bottom-24 w-80 h-80 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col xl:flex-row xl:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary-container/20 text-secondary font-label-caps text-label-caps uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Heritage &amp; Archive Division
              </span>
              <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider">
                Doc Ref #1929-2024
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight leading-none mt-1">
              THE CHRONICLES OF{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-tertiary">
                LALIGA
              </span>
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Ninety-six editions of Spanish football royalty. From the dirt pitches of Getxo in 1929 to the computerized biometric telemetry of modern stadiums.
            </p>
          </div>

          {/* Quick Historic Metric Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md p-space-md rounded-xl bg-surface-container-lowest/80 backdrop-blur-md">
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase">Completed Editions</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-lg text-headline-lg text-on-surface font-tabular-data">96</span>
                <span className="font-label-caps text-label-caps text-tertiary">Seasons</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase">Unique Champions</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-lg text-headline-lg text-secondary font-tabular-data">10</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">Clubs</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase">Matches Recorded</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-lg text-headline-lg text-on-surface font-tabular-data">29,482</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-outline uppercase">Total All-Time Goals</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-headline-lg text-headline-lg text-primary font-tabular-data">84,319</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Era Selector Bar */}
      <div className="flex items-center justify-between gap-space-md overflow-x-auto pb-space-sm mb-space-lg scrollbar-none">
        <div className="flex items-center gap-space-xs p-1 rounded-xl bg-surface-container-low shrink-0">
          {[
            { id: 'all', label: 'Full Epic Timeline', hasDot: true },
            { id: 'pioneers', label: '1929–1940s Foundations', hasDot: false },
            { id: 'classic', label: '1950s–1970s Golden Masters', hasDot: false },
            { id: 'dream', label: '1980s–1990s Dream Teams', hasDot: false },
            { id: 'titan', label: '2000s–2010s The Rivalry', hasDot: false },
            { id: 'modern', label: '2020s Telemetry Era', hasDot: false },
          ].map((era) => (
            <button
              key={era.id}
              onClick={() => setActiveEra(era.id)}
              className={`px-space-md py-1.5 rounded-lg font-label-badge text-label-badge transition-all flex items-center gap-2 cursor-pointer ${
                activeEra === era.id
                  ? 'bg-surface-container-high text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {era.hasDot && <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>}
              {era.label}
            </button>
          ))}
        </div>
        <div className="hidden sm:flex items-center gap-2 shrink-0 text-on-surface-variant font-body-sm text-body-sm">
          <span className="material-symbols-outlined text-sm text-secondary">verified</span>
          <span>Certified RFEF &amp; LaLiga Historical Database</span>
        </div>
      </div>

      {/* Kaggle CSV Historical Standings Archive */}
      <section className="mb-space-lg p-5 rounded-2xl bg-surface-container-low border border-surface-container-high/60 shadow-xl flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-surface-container-high">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-tertiary text-2xl">table_chart</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Historical Season Tables (Kaggle Dataset)
              </h3>
              <p className="text-xs text-on-surface-variant">
                Live ingested standings across 8 key championship eras from 1928-29 to 2019-20
              </p>
            </div>
          </div>

          {/* Season Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {kaggleSeasons.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedKaggleSeason(s)}
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-label-badge transition-all cursor-pointer ${
                  selectedKaggleSeason === s
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {loadingKaggle ? (
          <div className="py-8 flex items-center justify-center gap-2 text-on-surface-variant text-sm">
            <div className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <span>Loading {selectedKaggleSeason} table from historical dataset...</span>
          </div>
        ) : kaggleTable.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-body-sm font-body-sm">
              <thead>
                <tr className="border-b border-surface-container-high text-[11px] font-label-caps text-on-surface-variant uppercase tracking-wider bg-surface-container-lowest/50">
                  <th className="py-2.5 px-3 text-center w-12">Pos</th>
                  <th className="py-2.5 px-4">Club</th>
                  <th className="py-2.5 px-3 text-center">Played</th>
                  <th className="py-2.5 px-3 text-center">Won</th>
                  <th className="py-2.5 px-3 text-center">Drawn</th>
                  <th className="py-2.5 px-3 text-center">Lost</th>
                  <th className="py-2.5 px-4 text-center font-bold text-on-surface">Points</th>
                  <th className="py-2.5 px-4">Achievement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/40">
                {kaggleTable.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="hover:bg-surface-container/50 transition-colors">
                    <td className="py-2 px-3 text-center font-tabular-data font-bold">
                      {row.pos === 1 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary-container/30 text-secondary text-xs">
                          🏆
                        </span>
                      ) : (
                        row.pos
                      )}
                    </td>
                    <td className="py-2 px-4 font-semibold text-on-surface">
                      <span className="mr-2 text-xs font-bold text-outline">{row.code}</span>
                      {row.name}
                    </td>
                    <td className="py-2 px-3 text-center font-tabular-data text-on-surface-variant">{row.p}</td>
                    <td className="py-2 px-3 text-center font-tabular-data text-tertiary font-semibold">{row.w}</td>
                    <td className="py-2 px-3 text-center font-tabular-data text-on-surface-variant">{row.d}</td>
                    <td className="py-2 px-3 text-center font-tabular-data text-primary-container">{row.l}</td>
                    <td className="py-2 px-4 text-center font-tabular-data font-bold text-on-surface bg-surface-container/40">
                      {row.pts}
                    </td>
                    <td className="py-2 px-4 text-xs">
                      {row.pos === 1 ? (
                        <span className="px-2 py-0.5 rounded bg-secondary-container/20 text-secondary font-bold font-label-caps uppercase">
                          Champion
                        </span>
                      ) : row.pos <= 4 ? (
                        <span className="px-2 py-0.5 rounded bg-tertiary-container/20 text-tertiary font-label-caps uppercase">
                          European Zone
                        </span>
                      ) : (
                        <span className="text-on-surface-variant text-[11px]">League Record</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-on-surface-variant">
            Historical season data ready.
          </div>
        )}
      </section>

      {/* Primary Asymmetric Grid: Epoch Timeline (7 cols) & Hall of Fame Hall (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT COLUMN: The Vertical Epoch Journey (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="flex items-center justify-between px-space-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">history_edu</span>
              <h2 className="font-headline-md text-headline-md text-on-surface">Milestone Chronicles</h2>
            </div>
            <span className="font-label-caps text-label-caps text-outline uppercase">Chronological Order</span>
          </div>

          {/* Chronological Stream Container */}
          <div className="relative pl-6 space-y-space-lg" id="timelineContainer">
            {/* Continuous Glowing Line */}
            <div className="absolute left-2.5 top-3 bottom-4 w-0.5 bg-gradient-to-b from-secondary via-primary to-tertiary opacity-40"></div>

            {filteredMilestones.map((m) => (
              <div key={m.id} className="timeline-entry relative group">
                <div
                  className={`absolute -left-[19px] top-1.5 w-4 h-4 rounded-full bg-surface-container-lowest flex items-center justify-center ring-2 ${m.ringColor} group-hover:scale-125 transition-transform`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${m.dotColor}`}></div>
                </div>
                <div className="p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-all shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-secondary font-tabular-data">
                        {m.year}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-caps text-label-caps">
                        {m.badge}
                      </span>
                    </div>
                    <span className="font-label-caps text-label-caps text-outline uppercase">{m.meta}</span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-2">
                    {m.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                    {m.text}
                  </p>

                  {/* Optional Stats Grid */}
                  {m.stats && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest">
                      {m.stats.map((s, idx) => (
                        <div key={idx} className={idx === 2 ? 'col-span-2 sm:col-span-1' : ''}>
                          <span className="font-label-caps text-label-caps text-outline">{s.label}</span>
                          <div className={`font-tabular-data text-tabular-data font-medium truncate ${s.color}`}>
                            {s.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Optional Image with Historic Graphic */}
                  {m.image && (
                    <>
                      <div className="relative overflow-hidden rounded-lg h-44 mb-space-sm group/img">
                        <div
                          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover/img:scale-105"
                          style={{ backgroundImage: `url('${m.image.bg}')` }}
                        ></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/40 to-transparent p-space-md flex flex-col justify-end">
                          <span className="font-label-caps text-label-caps text-secondary uppercase">
                            {m.image.sub}
                          </span>
                          <span className="font-headline-sm text-headline-sm text-on-surface">
                            {m.image.headline}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-body-sm font-body-sm text-outline px-1">
                        <span>{m.image.footerL}</span>
                        <span className="font-tabular-data text-secondary">{m.image.footerR}</span>
                      </div>
                    </>
                  )}

                  {/* Optional Custom Box */}
                  {m.customBox && (
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-lg">
                          {m.customBox.icon}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface">
                          {m.customBox.label}
                        </span>
                      </div>
                      <span className="font-tabular-data text-tabular-data text-tertiary font-semibold">
                        {m.customBox.value}
                      </span>
                    </div>
                  )}

                  {/* Stats Grid for Dream Team */}
                  {m.statsGrid && (
                    <div className="grid grid-cols-2 gap-space-sm">
                      {m.statsGrid.map((sg, idx) => (
                        <div key={idx} className="p-space-sm rounded-lg bg-surface-container-lowest">
                          <span className="font-label-caps text-label-caps text-outline">{sg.label}</span>
                          <div className={`font-tabular-data text-tabular-data font-semibold ${sg.color}`}>
                            {sg.val}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Duel Visual Bar for Messi vs Cristiano */}
                  {m.duel && (
                    <div className="p-space-md rounded-lg bg-surface-container-lowest flex flex-col gap-space-sm">
                      <div className="flex justify-between items-center text-label-caps font-label-caps text-outline">
                        <span>LIONEL MESSI (BARÇA)</span>
                        <span className="text-secondary font-tabular-data text-tabular-data">
                          HEAD-TO-HEAD CENTURY
                        </span>
                        <span>CRISTIANO RONALDO (MADRID)</span>
                      </div>
                      <div className="h-2 rounded-full bg-surface-container-high overflow-hidden flex">
                        <div className="w-[58%] bg-primary"></div>
                        <div className="w-[42%] bg-secondary"></div>
                      </div>
                      <div className="flex justify-between items-center text-tabular-data font-tabular-data text-body-sm">
                        <span className="text-primary font-bold">474 Goals (520 Apps)</span>
                        <span className="text-outline text-label-caps font-label-caps">ALL-TIME LALIGA</span>
                        <span className="text-secondary font-bold">311 Goals (292 Apps)</span>
                      </div>
                    </div>
                  )}

                  {/* CVC Modern Era Plan */}
                  {m.cvc && (
                    <div className="flex items-center gap-space-md p-space-sm rounded-lg bg-surface-container-lowest">
                      <div className="w-10 h-10 rounded-lg bg-tertiary-container/20 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-tertiary text-xl">sensors</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-body-sm text-body-sm text-on-surface font-semibold truncate">
                          CVC Boost LaLiga Plan
                        </span>
                        <span className="font-label-caps text-label-caps text-outline">
                          €1.9B Stadium Infrastructure &amp; Broadcast Telemetry Investment
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: All-Time Hall of Fame & Unbreakable Records (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* ALL-TIME TOP GOALSCORERS CARD */}
          <div className="flex flex-col rounded-xl bg-surface-container-low p-space-lg shadow-lg">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">sports_soccer</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  All-Time Goalscorers
                </h3>
              </div>
              <span className="font-label-caps text-label-caps text-secondary font-tabular-data">
                1929 - PRESENT
              </span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {/* Lionel Messi */}
              <div className="p-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-caps text-label-caps flex items-center justify-center font-bold">
                      1
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">
                        Lionel Messi
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        FC Barcelona (2004–2021)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-headline-sm text-headline-sm text-primary font-tabular-data leading-none">
                      474
                    </span>
                    <span className="font-label-caps text-label-caps text-outline">520 matches (0.91/g)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Cristiano Ronaldo */}
              <div className="p-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface font-label-caps text-label-caps flex items-center justify-center font-bold">
                      2
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">
                        Cristiano Ronaldo
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Real Madrid (2009–2018)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-tabular-data leading-none">
                      311
                    </span>
                    <span className="font-label-caps text-label-caps text-tertiary">292 matches (1.07/g)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '65.6%' }}></div>
                </div>
              </div>

              {/* Telmo Zarra */}
              <div className="p-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface font-label-caps text-label-caps flex items-center justify-center font-bold">
                      3
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">
                        Telmo Zarra
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Athletic Club (1940–1955)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-tabular-data leading-none">
                      251
                    </span>
                    <span className="font-label-caps text-label-caps text-outline">278 matches (0.90/g)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-surface-variant h-full rounded-full" style={{ width: '53%' }}></div>
                </div>
              </div>

              {/* Hugo Sánchez */}
              <div className="p-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface font-label-caps text-label-caps flex items-center justify-center font-bold">
                      4
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">
                        Hugo Sánchez
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Atlético, Real Madrid, Rayo
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-tabular-data leading-none">
                      234
                    </span>
                    <span className="font-label-caps text-label-caps text-outline">347 matches (0.67/g)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-surface-variant h-full rounded-full" style={{ width: '49.3%' }}></div>
                </div>
              </div>

              {/* Raúl González */}
              <div className="p-space-sm rounded-lg bg-surface-container-lowest hover:bg-surface-container transition-all flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-surface-container-high text-on-surface font-label-caps text-label-caps flex items-center justify-center font-bold">
                      5
                    </span>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">
                        Raúl González
                      </span>
                      <span className="font-label-caps text-label-caps text-outline">
                        Real Madrid (1994–2010)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-tabular-data leading-none">
                      228
                    </span>
                    <span className="font-label-caps text-label-caps text-outline">550 matches (0.41/g)</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-surface-variant h-full rounded-full" style={{ width: '48.1%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* MOST CHAMPIONSHIPS: PALMARÉS HONORS CARD */}
          <div className="flex flex-col rounded-xl bg-surface-container-low p-space-lg shadow-lg">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-xl">trophy</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Trophy Honors
                </h3>
              </div>
              <span className="font-label-caps text-label-caps text-outline uppercase">
                All-Time Palmarés
              </span>
            </div>

            {/* Palmarés Distribution Visualization */}
            <div className="p-space-md rounded-lg bg-surface-container-lowest mb-space-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-label-caps text-label-caps text-on-surface uppercase">
                  League Title Distribution
                </span>
                <span className="font-tabular-data text-tabular-data text-secondary">
                  96 Editions Total
                </span>
              </div>
              <div className="h-3 rounded-full bg-surface-container-high overflow-hidden flex gap-0.5">
                <div className="bg-secondary h-full" style={{ width: '37.5%' }} title="Real Madrid: 36"></div>
                <div className="bg-primary-container h-full" style={{ width: '28.1%' }} title="FC Barcelona: 27"></div>
                <div className="bg-primary h-full" style={{ width: '11.4%' }} title="Atlético: 11"></div>
                <div className="bg-tertiary h-full" style={{ width: '8.3%' }} title="Athletic Club: 8"></div>
                <div className="bg-surface-bright h-full" style={{ width: '14.7%' }} title="Others: 14"></div>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-label-caps font-label-caps">
                <span className="flex items-center gap-1 text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span> Real Madrid (36)
                </span>
                <span className="flex items-center gap-1 text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-primary-container"></span> Barcelona (27)
                </span>
                <span className="flex items-center gap-1 text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Atlético (11)
                </span>
                <span className="flex items-center gap-1 text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span> Athletic (8)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-lg">shield</span>
                  <span className="font-body-md text-body-md text-on-surface">Valencia CF</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-tabular-data">
                  6 Titles
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-lg">shield</span>
                  <span className="font-body-md text-body-md text-on-surface">Real Sociedad</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-tabular-data">
                  2 Titles
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-lg">shield</span>
                  <span className="font-body-md text-body-md text-on-surface">Deportivo</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-tabular-data">
                  1 Title
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-lg">shield</span>
                  <span className="font-body-md text-body-md text-on-surface">Sevilla FC</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-tabular-data">
                  1 Title
                </span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-lowest flex items-center justify-between sm:col-span-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline text-lg">shield</span>
                  <span className="font-body-md text-body-md text-on-surface">Real Betis</span>
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface font-tabular-data">
                  1 Title (1934/35)
                </span>
              </div>
            </div>
          </div>

          {/* APPEARANCE RECORD HOLDERS & HISTORIC FEATS */}
          <div className="flex flex-col rounded-xl bg-surface-container-low p-space-lg shadow-lg">
            <div className="flex items-center justify-between mb-space-md">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-xl">military_tech</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Unbroken Benchmarks
                </h3>
              </div>
              <span className="font-label-caps text-label-caps text-tertiary uppercase">Record Book</span>
            </div>

            <div className="flex flex-col gap-space-sm">
              {/* Ironmen Appearances */}
              <div className="p-space-sm rounded-lg bg-surface-container-lowest">
                <span className="font-label-caps text-label-caps text-outline uppercase">
                  Most All-Time Appearances
                </span>
                <div className="grid grid-cols-2 gap-space-sm mt-1">
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md text-on-surface font-semibold">
                      Andoni Zubizarreta
                    </span>
                    <span className="font-label-caps text-label-caps text-outline">
                      Athletic, Barça, Valencia
                    </span>
                    <span className="font-headline-sm text-headline-sm text-secondary font-tabular-data mt-0.5">
                      622 matches
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-md text-body-md text-on-surface font-semibold">
                      Joaquín Sánchez
                    </span>
                    <span className="font-label-caps text-label-caps text-outline">
                      Betis, Valencia, Málaga
                    </span>
                    <span className="font-headline-sm text-headline-sm text-secondary font-tabular-data mt-0.5">
                      622 matches
                    </span>
                  </div>
                </div>
              </div>

              {/* Season Feats Telemetry */}
              <div className="grid grid-cols-2 gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col justify-between">
                  <div>
                    <span className="font-label-caps text-label-caps text-outline">Most Goals / Season</span>
                    <div className="font-headline-md text-headline-md text-primary font-tabular-data">121</div>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Real Madrid (2011/12)
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col justify-between">
                  <div>
                    <span className="font-label-caps text-label-caps text-outline">Highest Point Total</span>
                    <div className="font-headline-md text-headline-md text-secondary font-tabular-data">100</div>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Madrid '12 &amp; Barça '13
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col justify-between">
                  <div>
                    <span className="font-label-caps text-label-caps text-outline">Consecutive Wins</span>
                    <div className="font-headline-md text-headline-md text-tertiary font-tabular-data">16</div>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Barça '10/11 &amp; RMA '16
                  </span>
                </div>
                <div className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col justify-between">
                  <div>
                    <span className="font-label-caps text-label-caps text-outline">Unbeaten Streak</span>
                    <div className="font-headline-md text-headline-md text-on-surface font-tabular-data">43</div>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    FC Barcelona (2017–18)
                  </span>
                </div>
              </div>

              {/* Historic Highlight Card */}
              <div className="relative overflow-hidden rounded-lg h-28 group">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXQ87_yI1xjqmZRsMsVBuxp9fl2RvHJLLhIJjFsGx4AehkcjmZrp_YNDU4RBPJmQ79y54K8-74w7aOpTmPPquHCBSp1FZvtj7Ps4Vgp-hrW_DJkzqfrK7F2vDk22DXyou3jAbv_mTC8wO_ME7atttLenLCSW25f4k1GdwDdyKWiRLidS2A5rCthIvX4I5yvf7ctY1pPlmuEZwoJwrhNS8_tANze-ZxtARaMBrZLQ4')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-surface-container-lowest/85 backdrop-blur-sm p-space-sm flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-caps text-label-caps text-secondary uppercase">
                      All-Time Pichichi Record
                    </span>
                    <span className="font-body-md text-body-md text-on-surface font-semibold">
                      50 Goals in a Single Season
                    </span>
                    <span className="font-body-sm text-body-sm text-outline">
                      Lionel Messi • 2011/12 Campaign
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">military_tech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
