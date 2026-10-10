import React, { useState } from 'react';

export const JerseyArchive: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedClub, setSelectedClub] = useState<string>('all');

  const kitVaultItems = [
    {
      id: 1,
      club: 'vcf',
      era: '90',
      season: '1999 / 2000',
      type: 'Away Kit',
      maker: 'Luanvi',
      badge: 'UCL Finalist',
      badgeClass: 'bg-secondary-container/20 text-secondary',
      tagClub: 'Valencia Club de Fútbol',
      title: 'The Terra Mítica Metallic Silver',
      desc: "Immortalized by Claudio López and Gaizka Mendieta during Héctor Cúper's ruthless European counter-attacking masterclass campaign.",
      sponsor: 'Terra Mítica',
      fabric: 'Silversheen Synthetic Poly',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKun1F39vWkFnso-df53xP6rJKnC0J0pArv-gDcDvgr8HpRvWmyWXHbtcYZWzr5-gbvBBWxC59iG8IVL6b2z0m4gTmljrE6KIFjZqNaXx4V9_5zMDav-u1y5qjRKpSX18I4lQRNX5uR0JEq-Snntah-hmB9POB9sG6Yd_7zdkc7mB-jt7WgPk91d6zCgauyTlO7r5v_W_WFJXD4tiIaPpqyNMrB90gsMkuLiefGPE',
      alt: 'Official 1999-2000 Valencia CF Away football jersey mockup',
    },
    {
      id: 2,
      club: 'atm',
      era: '90',
      season: '1995 / 1996',
      type: 'Home Kit',
      maker: 'Puma',
      badge: 'Liga + Copa Double',
      badgeClass: 'bg-primary-container/20 text-primary',
      tagClub: 'Club Atlético de Madrid',
      title: 'Marbella Double Crown Classic',
      desc: "Radomir Antić's squad led by captain Diego Simeone and Kiko Narváez secured the historic league and cup double in this broad-collared standard.",
      sponsor: 'Marbella',
      fabric: 'Heavyweight Jacquard Stripe',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtmKCmKc7TLF1RXwWFMbywRIglYGj6gjkhBuUvHl1fhlT0Ws0rlLAECN4qls2L75UU4VVsL3YJh83MZY34p3v83IsU9nK9UOenrUZA6V6zUf6irr-2pgHHChKjmQE_ZfkrlyudIzuCJC0oUxaMjpME3bVTRYmKBA0fwHz8PAi8Fx1Ig9j2jbXZJn59BUMAuxagLgeXn6fxsY107IW4UmHFiL0u5yzZRXIrzyvhvjM',
      alt: 'Official Atletico de Madrid 1995-1996 Double Championship jersey',
    },
    {
      id: 3,
      club: 'ath',
      era: '70-80',
      season: '1983 / 1984',
      type: 'Home Kit',
      maker: 'Adidas',
      badge: 'Domestic Double',
      badgeClass: 'bg-tertiary-container/20 text-tertiary',
      tagClub: 'Athletic Club',
      title: 'The Basque Fortress Double',
      desc: "Javier Clemente’s legendary side captured the 1983–84 LaLiga and Copa del Rey double without sporting a commercial sponsor on their iconic red-and-white wool-blend blend.",
      sponsor: 'None (Pure Tradition)',
      fabric: 'Dense Knit Cotton-Poly 60/40',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUtb2MEf-46zDRyuNQ_6x2_xhGNURU7A6_0M7E44om9OqLTUSI4qMq5mcmnE20NEa-omAIdKfqk3ylwPUpVycMft_S7aAvxW6FVLqTSR8wzUbEv4Jno8yKa6q1cL16cETxqrKDTTljxBflynJKTDomFCk0HKqgRs8ploz0VWXtaCkiUE0RMyUoKgcmxwmTUY4qmA8ZT7650ZD7Xhw7Fsw0rePJz-vJpWUx3ruDTmU',
      alt: 'Vintage 1983-1984 Athletic Club Bilbao home jersey display',
    },
    {
      id: 4,
      club: 'sfc',
      era: '00',
      season: '2005 / 2006',
      type: 'Special European Edition',
      maker: 'Joma',
      badge: 'Eindhoven 4-0',
      badgeClass: 'bg-secondary-container/20 text-secondary',
      tagClub: 'Sevilla Fútbol Club',
      title: 'First European Glory Armor',
      desc: 'The birth of Sevilla’s continental dominance. Worn in the 4-0 annihilation of Middlesbrough in Eindhoven, starring Enzo Maresca and Juande Ramos.',
      sponsor: 'Centenario 1905–2005',
      fabric: 'Joma Micro-Mesh Breathable',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUh2rnexaovRZnqWc_bZzjAnpkDFcQMFox8MbJAUrLaWb5r0B5MifXSUbmN-zGwjk7A-d_Y3YBQBdadosGgOdfxbDu0EWgPIrZPxOM1HIQQ39BdPK995XRPWiBaN-qaTLKLWTEi4ZMH7PjVbpFU2EuD5nNVWWYqrtUF3-dZ2CUCPIkIWrQXQtqLDFonCSRegDfIxtkTsRIwP3-6_IjlI09VuSOhkk3FnRweXAWW7c',
      alt: 'Official 2005-2006 Sevilla FC European kit mockup',
    },
    {
      id: 5,
      club: 'rbb',
      era: '90',
      season: '1995 / 1997',
      type: 'Home Cult Kit',
      maker: 'Kappa',
      badge: 'Finidi & Denílson',
      badgeClass: 'bg-tertiary-container/20 text-tertiary',
      tagClub: 'Real Betis Balompié',
      title: 'The Kappa Omini Emerald Strip',
      desc: 'One of the defining silhouettes of nineties European culture: famous for Finidi George celebrating goals wearing a sombrero while donned in this emerald stripe pattern.',
      sponsor: "Expo '92 / Clean Front",
      fabric: 'Kappa Kombat Precursor Ribbed',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC97dpVf9uR3lqfZ9DwDkr6CZNcjjSDcA4fes4Ab0mEFx9tDA1ymzeDArMdmPY8l5ix1wzwVSg-l48_kK_1KKXbUF4oAfA9L0ckwKt-9ucKuuRmT7713cFfJ4MWp5iOaAJe4tivdINt-IBr-8Hg9pYuZSsNN1DM6NEQPhGHzrIRs6FZNFVX8uNCRKo_Ixd-JY-JsS46sM1NNdgf3B0PwFv-iKTUxowx9KvKteoPY8A',
      alt: 'Cult classic 1995-1997 Real Betis Balompie home jersey mockup',
    },
    {
      id: 6,
      club: 'rso',
      era: '00',
      season: '2002 / 2003',
      type: 'Home Kit',
      maker: 'Astore',
      badge: 'Liga Runner-Up (76 Pts)',
      badgeClass: 'bg-secondary/15 text-secondary',
      tagClub: 'Real Sociedad de Fútbol',
      title: 'The Nihat & Kovačević Epic',
      desc: "Raynald Denoueix's fearless Txuri-Urdin side took the title fight against Real Madrid down to the penultimate jornada behind Nihat Kahveci and Darko Kovačević’s combined 43 goals.",
      sponsor: 'Kraft',
      fabric: 'Astore Hydro-Tech Polyester',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwsv5Bkmq4LrPnIs69UDBVoqKc95P0E4T_CXXX_lWaYccJVOeiNV8okowdMyi4jyWhB96RSh4ng5nP-6o-mj1NP8Km21JwEofE3FW2Cb41fzE4p53_qWK0ArfBxFFcVtsKK6CIxA0NwbjDWs2mPB_R3uN-mhGSPZ89jkOHpRGd9Gg8qdHXALjHzigSijoC3DbxSOjCO7veECAPfz_cm15ANedzDOfpJF7AkNH58dQ',
      alt: 'Official 2002-2003 Real Sociedad football jersey mockup',
    },
  ];

  const filteredKits = kitVaultItems.filter((kit) => {
    const eraMatch = selectedEra === 'all' || kit.era === selectedEra;
    const clubMatch = selectedClub === 'all' || kit.club === selectedClub;
    return eraMatch && clubMatch;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Archival Navigation & Header Bar */}
      <div className="flex flex-col gap-space-lg mb-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-caps text-label-caps uppercase tracking-wider text-secondary">
                Historical Curatorial Division
              </span>
              <span className="text-on-surface-variant font-tabular-data text-body-sm">/ Cód. 1929-2024</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight uppercase">
              LaLiga Official Kit Archive
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Museum-grade digital vault cataloging iconic tactile craftsmanship, textile heritage, and immortal championship armors across Spanish football history.
            </p>
          </div>

          {/* Quick Metrics Counter & Club Filter */}
          <div className="flex items-center gap-space-md flex-wrap">
            <div className="flex items-center gap-3 px-space-md py-2 rounded-lg bg-surface-container-low shadow-sm">
              <span className="material-symbols-outlined text-primary text-xl">verified</span>
              <div className="flex flex-col">
                <span className="font-tabular-data text-body-sm font-semibold text-on-surface">348 Kits</span>
                <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Digitized</span>
              </div>
            </div>
            <div className="relative">
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="appearance-none bg-surface-container-low text-on-surface font-body-sm text-body-sm pl-4 pr-10 py-2.5 rounded-lg focus:outline-none cursor-pointer shadow-sm transition-all hover:bg-surface-container"
              >
                <option value="all">All Primera División Clubs (20)</option>
                <option value="rm">Real Madrid CF</option>
                <option value="fcb">FC Barcelona</option>
                <option value="atm">Atlético de Madrid</option>
                <option value="vcf">Valencia CF</option>
                <option value="sfc">Sevilla FC</option>
                <option value="ath">Athletic Club</option>
                <option value="rbb">Real Betis</option>
                <option value="rso">Real Sociedad</option>
              </select>
              <span className="material-symbols-outlined pointer-events-none absolute right-3 top-2.5 text-on-surface-variant text-lg">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Era Selector Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'all', label: 'All Eras' },
            { id: '70-80', label: '1970s–1980s Vintage' },
            { id: '90', label: '1990s Cult Classics' },
            { id: '00', label: '2000s Galácticos Era' },
            { id: '10', label: '2010s Golden Era' },
            { id: '24', label: '2024/25 Modern Kits' },
          ].map((era) => (
            <button
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className={`px-4 py-2 rounded-full font-label-badge text-label-badge transition-all shrink-0 cursor-pointer ${
                selectedEra === era.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              {era.label}
            </button>
          ))}
        </div>
      </div>

      {/* Comparative Spotlight Section: Clásico Masterpieces Face-Off */}
      <section className="flex flex-col gap-space-md mb-space-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-xl">compare_arrows</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">Iconic Clásico Kits Face-Off</span>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase px-2.5 py-1 rounded bg-surface-container-low">
            Curator Spotlight
          </span>
        </div>

        {/* Comparative Dual Stage Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
          {/* Card 1: Real Madrid 2001/02 Centenary Kit */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low shadow-xl p-space-lg flex flex-col justify-between group">
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none"></div>
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-label-caps text-label-caps uppercase tracking-wider">
                Centenario 1902–2002
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-tabular-data text-body-sm">
                01/02 Home
              </span>
            </div>
            {/* Centerpiece Kit Visual Display */}
            <div className="relative w-full h-80 my-4 flex items-center justify-center overflow-hidden rounded-lg bg-surface-container-lowest">
              <img
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                alt="Real Madrid 2001-2002 Centenary Kit"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtKUdkaB2A2rAjU_jgB7A2uGz2BmzklzrH5w0HP_Z7jBGWLB48b04MLCspR6ttsv_Clybl9SHSVkwL22y6eKnQipTk6MtQGfXOPg-UFXE4UAwN86NcFDmhTE_YeFzeKlGWRFPbAQWNgsRF3uy09gPFrasDpnq5sjwljrYimgij6UJx4uCM7uJpVI2yvISSjI4QR8TYJT0iJ6hzJwo-RiS__pJF_q1wS1e9NUQ3xXI"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container/90 text-on-surface backdrop-blur-md">
                <span className="material-symbols-outlined text-secondary text-sm">workspace_premium</span>
                <span className="font-label-caps text-label-caps uppercase">UCL + Supercopa</span>
              </div>
            </div>
            {/* Kit Metadata */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Real Madrid Club de Fútbol
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">Centenary Clean Edition</h3>
                </div>
                <div className="text-right">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Manufacturer</span>
                  <p className="font-headline-sm text-headline-sm text-secondary">Adidas</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-surface-container">
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Sponsor</span>
                  <span className="font-tabular-data text-body-sm font-semibold text-on-surface">None (Pure Front)</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Key Icons</span>
                  <span className="font-tabular-data text-body-sm font-semibold text-on-surface">Raúl, Zidane, Figo</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Fabrication</span>
                  <span className="font-tabular-data text-body-sm font-semibold text-on-surface">ClimaLite Mesh</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-high/60 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary text-lg mt-0.5 shrink-0">history_edu</span>
                <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                  Worn during Zinedine Zidane's immortal Hampden Park volley against Bayer Leverkusen. Distinct for omitting corporate front sponsors to honor the club's 100-year founding heritage.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: FC Barcelona 2008/09 Treble Kit */}
          <div className="relative overflow-hidden rounded-xl bg-surface-container-low shadow-xl p-space-lg flex flex-col justify-between group">
            <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-caps text-label-caps uppercase tracking-wider">
                Sextuple Era
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-tabular-data text-body-sm">
                08/09 Home
              </span>
            </div>
            {/* Centerpiece Kit Visual Display */}
            <div className="relative w-full h-80 my-4 flex items-center justify-center overflow-hidden rounded-lg bg-surface-container-lowest">
              <img
                className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                alt="FC Barcelona 2008-2009 Half-and-Half Treble Kit"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwtNj5aw8ZFTzQebscYQW46CcB-I5IbzEyG0YKn-Z84-f-d3bQW43gnSLsCe5d_l6MA6FQjJ6idtZvsVLbuINVhwiRqH_PtNkEf1_hoBGzRRgSPf4NyggubKki8T6_E03SmppfVbcjCnWRFJUQ_y6SH02pjfmNYHptXvJOQQ2WtpCPSre1ql-lFwItbw5QDgRwaoEDK_jSI8L59SDPwY7ZYU77F0kqk0U8H6DzMUY"
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container/90 text-on-surface backdrop-blur-md">
                <span className="material-symbols-outlined text-tertiary text-sm">emoji_events</span>
                <span className="font-label-caps text-label-caps uppercase">Historic Treble Armor</span>
              </div>
            </div>
            {/* Kit Metadata */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    Futbol Club Barcelona
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">50/50 Blaugrana Division</h3>
                </div>
                <div className="text-right">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Manufacturer</span>
                  <p className="font-headline-sm text-headline-sm text-primary">Nike</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-lg bg-surface-container">
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Sponsor</span>
                  <span className="font-tabular-data text-body-sm font-semibold text-on-surface">UNICEF (Philanthropic)</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Key Icons</span>
                  <span className="font-tabular-data text-body-sm font-semibold text-on-surface">Messi, Xavi, Iniesta</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Fabrication</span>
                  <span className="font-tabular-data text-body-sm font-semibold text-on-surface">Nike Dri-FIT Sphere</span>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-high/60 flex items-start gap-2.5">
                <span className="material-symbols-outlined text-tertiary text-lg mt-0.5 shrink-0">auto_awesome</span>
                <p className="font-body-sm text-body-sm text-on-surface leading-snug">
                  Guardiola’s debut managerial masterpiece season: 2-6 Clásico triumph at the Bernabéu and Copa-Liga-UCL clean sweep. The daring two-block halved graphic broke a decade of vertical pinstripes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fabric Engineering & Textile Innovation Metric Bar */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-space-md mb-space-xl">
        <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-container text-secondary shrink-0">
            <span className="material-symbols-outlined text-2xl">texture</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Historical Weaves</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">100% Heavy Cotton</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Standard until 1982 World Cup</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-container text-primary shrink-0">
            <span className="material-symbols-outlined text-2xl">science</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Polyester Emergence</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">Sublimation Era</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Geometric 90s visual explosion</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-container text-tertiary shrink-0">
            <span className="material-symbols-outlined text-2xl">water_drop</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Microfiber Era</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">Thermal Bonded</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Seamless laser ventilation 2012+</span>
          </div>
        </div>

        <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex items-center gap-3">
          <div className="p-2 rounded-lg bg-surface-container text-secondary-container shrink-0">
            <span className="material-symbols-outlined text-2xl">recycling</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">Circular Cycle</span>
            <span className="font-headline-sm text-headline-sm text-on-surface">Ocean Recycled Yarns</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Mandated across 82% 2024 jerseys</span>
          </div>
        </div>
      </section>

      {/* Interactive Kit Gallery Grid */}
      <section className="flex flex-col gap-space-lg mb-space-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Curated Archive Vault</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Masterpieces of identity, iconic crest placements, and cult sponsor eras.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded bg-surface-container-high text-on-surface shadow-sm cursor-pointer" type="button">
              <span className="material-symbols-outlined text-lg">grid_view</span>
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm shadow-sm hover:bg-surface-container transition-colors cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-sm">sort</span>
              <span>Chronological</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-space-lg" id="kitsContainer">
          {filteredKits.map((kit) => (
            <div
              key={kit.id}
              className="kit-card flex flex-col justify-between rounded-xl bg-surface-container-low p-space-md shadow-md transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container text-secondary font-label-caps text-label-caps uppercase">
                    {kit.season}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-tabular-data text-body-sm">
                    {kit.type}
                  </span>
                </div>
                <div className="relative w-full h-64 rounded-lg bg-surface-container-lowest overflow-hidden flex items-center justify-center mb-space-md">
                  <img
                    className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                    alt={kit.alt}
                    src={kit.img}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-high/80 text-on-surface font-label-caps text-label-caps uppercase backdrop-blur-sm">
                    {kit.maker}
                  </div>
                  <span className={`px-2 py-0.5 rounded font-tabular-data text-body-sm font-semibold absolute bottom-2 right-2 ${kit.badgeClass}`}>
                    {kit.badge}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
                    {kit.tagClub}
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">{kit.title}</h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                    {kit.desc}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-3 flex flex-col gap-2 bg-surface-container/50 -mx-space-md -mb-space-md p-space-md rounded-b-xl">
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-caps text-label-caps uppercase">Chest Sponsor:</span>
                  <span className="font-tabular-data text-body-sm font-semibold text-on-surface">
                    {kit.sponsor}
                  </span>
                </div>
                <div className="flex items-center justify-between text-on-surface-variant">
                  <span className="font-label-caps text-label-caps uppercase">Fabric System:</span>
                  <span className="font-tabular-data text-body-sm text-on-surface">
                    {kit.fabric}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Kit Anatomy Deep-Dive Section */}
      <section className="rounded-xl bg-surface-container-low p-space-lg shadow-xl mb-space-xl flex flex-col lg:flex-row gap-space-lg items-center">
        <div className="w-full lg:w-5/12 flex flex-col gap-space-sm">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-surface-container text-tertiary font-label-caps text-label-caps uppercase">
              Archival Inspection
            </span>
            <span className="text-on-surface-variant font-label-caps text-label-caps uppercase">
              3D Micro-Scan
            </span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface">Textile Forensic Breakdown</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Every jersey preserved in the LaLiga Archive undergoes microscopic spectrophotometer scans to record authentic yarn thread count, weave density, and heat-pressed vinyl longevity.
          </p>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-xl">palette</span>
                <span className="font-body-sm text-body-sm text-on-surface">Pantone Match Precision</span>
              </div>
              <span className="font-tabular-data text-body-sm font-semibold text-tertiary">99.8% Match</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-xl">shield_moon</span>
                <span className="font-body-sm text-body-sm text-on-surface">UV Degradation Protection</span>
              </div>
              <span className="font-tabular-data text-body-sm font-semibold text-on-surface">Argon Sealed Glass</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-surface-container">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-tertiary text-xl">fingerprint</span>
                <span className="font-body-sm text-body-sm text-on-surface">Match-Worn Authenticity Chip</span>
              </div>
              <span className="font-tabular-data text-body-sm font-semibold text-secondary">NFC Verified</span>
            </div>
          </div>
        </div>

        {/* Visual Interactive Textile Graphic */}
        <div className="w-full lg:w-7/12 rounded-xl bg-surface-container-lowest p-space-md flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center text-on-surface-variant font-tabular-data text-body-sm mb-2 opacity-75">
            <span>SCAN: LALIGA_FABRIC_REF_892</span>
            <span>LAT: 40.4530° N / LON: 3.6883° W</span>
          </div>
          <div className="relative w-full h-72 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover rounded-lg"
              alt="Macro close-up photography of authentic vintage football shirt jacquard fabric texture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS1S4m3HZgdhet9NxVSbiFrCaLqHUirVL72FLPc-y0u3P3wywVXJ5x4Ka_Q1Z1A0nVvmV1WhOgPDOArHsrUZkFsi1_-ZveUoa__Fkv15ctiKZb9Hk_pY7D3TNamVZCb2EK7KaRVVmdENFCeQpNAbiYS1k8gP8kGdI7Q3OUm1nOjDRSViz4s4ZPg7Xz7_G5nwqxYmKmH-zfc9j8K5E1n0LpxPzXEOiIjfeA17Rc3as"
            />
            {/* Hotspot pins on fabric */}
            <div className="absolute top-1/4 left-1/3 flex items-center gap-2 group cursor-pointer">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-primary text-[10px] text-on-primary font-bold items-center justify-center">
                  1
                </span>
              </span>
              <div className="hidden group-hover:flex px-2 py-1 rounded bg-surface-container-high/90 text-on-surface font-body-sm text-body-sm backdrop-blur-md shadow-lg">
                Sublimated Club Watermark (0.04mm)
              </div>
            </div>
            <div className="absolute bottom-1/3 right-1/4 flex items-center gap-2 group cursor-pointer">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary text-[10px] text-on-secondary font-bold items-center justify-center">
                  2
                </span>
              </span>
              <div className="hidden group-hover:flex px-2 py-1 rounded bg-surface-container-high/90 text-on-surface font-body-sm text-body-sm backdrop-blur-md shadow-lg">
                Silicone Heat-Transfer Official LFP Arm Patch
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
            <span>Sample: 1999/00 Double-ply ventilated weave</span>
            <span className="text-tertiary flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Passed Fiber Integrity Test
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
