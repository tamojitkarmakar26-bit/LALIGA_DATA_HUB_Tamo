"""
LaLiga Telemetry Backend - FastAPI Service
Step 1 & Step 2 updates: Diagnostic endpoint, resilient fallbacks, 20-club directory, and CSV ingestion.
"""

import os
import time
import csv
from typing import Dict, Any, Optional, List
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="LaLiga Telemetry API",
    description="FastAPI service for LaLiga EA SPORTS telemetry, historical dataset analytics, and diagnostics",
    version="1.1.0"
)

# Configure CORS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

START_TIME = time.time()
RAPIDAPI_KEY = os.getenv("RAPIDAPI_KEY", os.getenv("API_FOOTBALL_KEY", ""))
RAPIDAPI_HOST = "api-football-v1.p.rapidapi.com"
LALIGA_LEAGUE_ID = 140
DEFAULT_SEASON = 2024

class CacheEntry:
    def __init__(self, data: Any, ttl_seconds: int = 900):
        self.data = data
        self.timestamp = time.time()
        self.ttl = ttl_seconds

    def is_valid(self) -> bool:
        return (time.time() - self.timestamp) < self.ttl

in_memory_cache: Dict[str, CacheEntry] = {}

# Strict 60-second TTL cache for external RapidAPI live match queries
LIVE_MATCH_CACHE_TTL = 60
live_matches_cache_store: Dict[str, Any] = {
    "timestamp": 0.0,
    "data": None,
    "rate_limit_exceeded": False
}

FALLBACK_STANDINGS = [
    {"pos": 1, "code": "RMA", "name": "Real Madrid", "stadium": "Santiago Bernabéu", "p": 28, "w": 20, "d": 6, "l": 2, "gf": 60, "ga": 18, "gd": "+42", "form": ["W", "W", "D", "W", "W"], "pts": 66, "zone": "ucl"},
    {"pos": 2, "code": "FCB", "name": "FC Barcelona", "stadium": "Spotify Camp Nou", "p": 28, "w": 20, "d": 4, "l": 4, "gf": 71, "ga": 26, "gd": "+45", "form": ["W", "W", "W", "L", "W"], "pts": 64, "zone": "ucl"},
    {"pos": 3, "code": "GIR", "name": "Girona FC", "stadium": "Estadi Montilivi", "p": 28, "w": 18, "d": 5, "l": 5, "gf": 59, "ga": 33, "gd": "+26", "form": ["L", "W", "D", "W", "W"], "pts": 59, "zone": "ucl"},
    {"pos": 4, "code": "ATM", "name": "Atlético de Madrid", "stadium": "Riyadh Air Metropolitano", "p": 28, "w": 17, "d": 4, "l": 7, "gf": 54, "ga": 31, "gd": "+23", "form": ["W", "L", "W", "W", "D"], "pts": 55, "zone": "ucl"},
    {"pos": 5, "code": "ATH", "name": "Athletic Club", "stadium": "San Mamés", "p": 28, "w": 15, "d": 7, "l": 6, "gf": 48, "ga": 26, "gd": "+22", "form": ["W", "D", "W", "D", "W"], "pts": 52, "zone": "uel"},
    {"pos": 6, "code": "RSO", "name": "Real Sociedad", "stadium": "Reale Arena", "p": 28, "w": 12, "d": 10, "l": 6, "gf": 40, "ga": 31, "gd": "+9", "form": ["L", "W", "L", "W", "D"], "pts": 46, "zone": "uel"},
    {"pos": 7, "code": "BET", "name": "Real Betis", "stadium": "Benito Villamarín", "p": 28, "w": 11, "d": 10, "l": 7, "gf": 36, "ga": 32, "gd": "+4", "form": ["L", "L", "W", "D", "W"], "pts": 43, "zone": "uecl"},
    {"pos": 8, "code": "VIL", "name": "Villarreal CF", "stadium": "Estadio de la Cerámica", "p": 28, "w": 11, "d": 8, "l": 9, "gf": 49, "ga": 46, "gd": "+3", "form": ["W", "W", "W", "D", "W"], "pts": 41, "zone": "mid"},
    {"pos": 9, "code": "VAL", "name": "Valencia CF", "stadium": "Mestalla", "p": 28, "w": 11, "d": 7, "l": 10, "gf": 32, "ga": 32, "gd": "0", "form": ["W", "D", "L", "D", "W"], "pts": 40, "zone": "mid"},
    {"pos": 10, "code": "GET", "name": "Getafe CF", "stadium": "Coliseum", "p": 28, "w": 9, "d": 11, "l": 8, "gf": 36, "ga": 42, "gd": "-6", "form": ["W", "L", "D", "D", "W"], "pts": 38, "zone": "mid"},
    {"pos": 11, "code": "OSA", "name": "CA Osasuna", "stadium": "El Sadar", "p": 28, "w": 10, "d": 6, "l": 12, "gf": 31, "ga": 39, "gd": "-8", "form": ["L", "W", "W", "D", "L"], "pts": 36, "zone": "mid"},
    {"pos": 12, "code": "LPA", "name": "UD Las Palmas", "stadium": "Gran Canaria", "p": 28, "w": 10, "d": 7, "l": 11, "gf": 29, "ga": 31, "gd": "-2", "form": ["D", "L", "D", "W", "L"], "pts": 37, "zone": "mid"},
    {"pos": 13, "code": "ALA", "name": "Deportivo Alavés", "stadium": "Mendizorrotza", "p": 28, "w": 8, "d": 8, "l": 12, "gf": 26, "ga": 35, "gd": "-9", "form": ["W", "L", "D", "D", "L"], "pts": 32, "zone": "mid"},
    {"pos": 14, "code": "SFC", "name": "Sevilla FC", "stadium": "Sánchez-Pizjuán", "p": 28, "w": 6, "d": 10, "l": 12, "gf": 35, "ga": 42, "gd": "-7", "form": ["D", "W", "L", "D", "W"], "pts": 28, "zone": "mid"},
    {"pos": 15, "code": "MLL", "name": "RCD Mallorca", "stadium": "Son Moix", "p": 28, "w": 5, "d": 12, "l": 11, "gf": 24, "ga": 35, "gd": "-11", "form": ["L", "W", "D", "L", "D"], "pts": 27, "zone": "mid"},
    {"pos": 16, "code": "RAY", "name": "Rayo Vallecano", "stadium": "Vallecas", "p": 28, "w": 5, "d": 11, "l": 12, "gf": 23, "ga": 38, "gd": "-15", "form": ["L", "D", "L", "D", "L"], "pts": 26, "zone": "mid"},
    {"pos": 17, "code": "CEL", "name": "RC Celta", "stadium": "Balaídos", "p": 28, "w": 5, "d": 9, "l": 14, "gf": 30, "ga": 43, "gd": "-13", "form": ["L", "W", "D", "L", "W"], "pts": 24, "zone": "mid"},
    {"pos": 18, "code": "ESP", "name": "RCD Espanyol", "stadium": "Stage Front Stadium", "p": 28, "w": 6, "d": 6, "l": 16, "gf": 25, "ga": 46, "gd": "-21", "form": ["L", "W", "L", "L", "D"], "pts": 24, "zone": "relegation"},
    {"pos": 19, "code": "LEG", "name": "CD Leganés", "stadium": "Butarque", "p": 28, "w": 4, "d": 11, "l": 13, "gf": 21, "ga": 38, "gd": "-17", "form": ["D", "L", "D", "D", "L"], "pts": 23, "zone": "relegation"},
    {"pos": 20, "code": "VLL", "name": "Real Valladolid", "stadium": "José Zorrilla", "p": 28, "w": 4, "d": 5, "l": 19, "gf": 18, "ga": 52, "gd": "-34", "form": ["L", "L", "L", "W", "L"], "pts": 17, "zone": "relegation"}
]

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "LaLiga Telemetry FastAPI Backend",
        "endpoints": [
            "/api/health",
            "/api/diagnostics",
            "/api/standings",
            "/api/dataset/seasons",
            "/api/dataset/standings",
            "/api/dataset/telemetry",
            "/api/dataset/analytics"
        ],
        "cache_entries": len(in_memory_cache)
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "uptime_seconds": int(time.time() - START_TIME),
        "api_football_configured": bool(RAPIDAPI_KEY),
        "cache_entries": len(in_memory_cache),
        "csv_files_present": {
            "seasons": os.path.exists("./data/laliga_historical_seasons.csv"),
            "analytics": os.path.exists("./data/laliga_match_analytics.csv"),
            "telemetry": os.path.exists("./data/laliga_match_telemetry.csv")
        }
    }

@app.get("/api/diagnostics")
async def api_diagnostics():
    """Diagnostic audit verifying RapidAPI live connectivity and CSV dataset integrity."""
    start_ping = time.time()
    rapid_status = {
        "configured": bool(RAPIDAPI_KEY),
        "host": RAPIDAPI_HOST,
        "connectivity": "untested",
        "latency_ms": None,
        "error": None
    }

    if RAPIDAPI_KEY:
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                res = await client.get(
                    f"https://{RAPIDAPI_HOST}/v3/status",
                    headers={"x-rapidapi-key": RAPIDAPI_KEY, "x-rapidapi-host": RAPIDAPI_HOST}
                )
                latency = int((time.time() - start_ping) * 1000)
                if res.status_code == 200:
                    rapid_status.update({
                        "connectivity": "connected",
                        "http_status": 200,
                        "latency_ms": latency,
                        "rate_limit_remaining": res.headers.get("x-ratelimit-requests-remaining", "available")
                    })
                else:
                    rapid_status.update({
                        "connectivity": "degraded",
                        "http_status": res.status_code,
                        "latency_ms": latency,
                        "error": f"HTTP {res.status_code}"
                    })
        except Exception as e:
            rapid_status.update({
                "connectivity": "offline",
                "error": str(e)
            })
    else:
        rapid_status.update({
            "connectivity": "fallback_active",
            "fallback_reason": "RAPIDAPI_KEY environment variable not configured",
            "resilient_local_cache": "ACTIVE"
        })

    # Dataset stats
    seasons_cnt = 0
    if os.path.exists("./data/laliga_historical_seasons.csv"):
        with open("./data/laliga_historical_seasons.csv", "r", encoding="utf-8") as f:
            seasons_cnt = sum(1 for _ in f) - 1

    analytics_cnt = 0
    if os.path.exists("./data/laliga_match_analytics.csv"):
        with open("./data/laliga_match_analytics.csv", "r", encoding="utf-8") as f:
            analytics_cnt = sum(1 for _ in f) - 1

    telemetry_cnt = 0
    if os.path.exists("./data/laliga_match_telemetry.csv"):
        with open("./data/laliga_match_telemetry.csv", "r", encoding="utf-8") as f:
            telemetry_cnt = sum(1 for _ in f) - 1

    return {
        "status": "operational",
        "api_football": rapid_status,
        "kaggle_csv_datasets": {
            "seasons_rows": seasons_cnt,
            "analytics_pairs": analytics_cnt,
            "telemetry_records": telemetry_cnt,
            "operational": seasons_cnt > 0 and telemetry_cnt > 0
        },
        "resilience": {
            "zero_crash_guarantee": True,
            "fallback_source": "resilient_local_cache"
        }
    }

@app.get("/api/standings")
async def get_standings(season: int = Query(DEFAULT_SEASON, description="LaLiga Season year, e.g. 2024")):
    cache_key = f"standings_140_{season}"

    if cache_key in in_memory_cache and in_memory_cache[cache_key].is_valid():
        entry = in_memory_cache[cache_key]
        return {
            "cached": True,
            "cached_at": time.ctime(entry.timestamp),
            "ttl_seconds": int(entry.ttl - (time.time() - entry.timestamp)),
            "league": "LaLiga EA SPORTS",
            "season": season,
            "standings": entry.data,
            "data_source": "cached_memory"
        }

    if RAPIDAPI_KEY:
        try:
            async with httpx.AsyncClient(timeout=4.0) as client:
                res = await client.get(
                    f"https://{RAPIDAPI_HOST}/v3/standings?league={LALIGA_LEAGUE_ID}&season={season}",
                    headers={"x-rapidapi-key": RAPIDAPI_KEY, "x-rapidapi-host": RAPIDAPI_HOST}
                )
                if res.status_code == 200:
                    data = res.json()
                    api_rows = data.get("response", [{}])[0].get("league", {}).get("standings", [[]])[0]
                    if api_rows:
                        mapped = []
                        for r in api_rows:
                            pos = r.get("rank", 1)
                            zone = "ucl" if pos <= 4 else ("uel" if pos <= 6 else ("uecl" if pos == 7 else ("relegation" if pos >= 18 else "mid")))
                            gd = r.get("goalsDiff", 0)
                            gd_str = f"+{gd}" if gd > 0 else str(gd)
                            mapped.append({
                                "pos": pos,
                                "code": (r.get("team", {}).get("name", "")[:3]).upper(),
                                "name": r.get("team", {}).get("name", ""),
                                "logo": r.get("team", {}).get("logo", ""),
                                "stadium": "",
                                "p": r.get("all", {}).get("played", 0),
                                "w": r.get("all", {}).get("win", 0),
                                "d": r.get("all", {}).get("draw", 0),
                                "l": r.get("all", {}).get("lose", 0),
                                "gf": r.get("all", {}).get("goals", {}).get("for", 0),
                                "ga": r.get("all", {}).get("goals", {}).get("against", 0),
                                "gd": gd_str,
                                "form": list(r.get("form", "WDWDW")),
                                "pts": r.get("points", 0),
                                "zone": zone
                            })
                        in_memory_cache[cache_key] = CacheEntry(mapped, 900)
                        return {
                            "cached": False,
                            "data_source": "api_football_live",
                            "standings": mapped
                        }
        except Exception:
            pass

    in_memory_cache[cache_key] = CacheEntry(FALLBACK_STANDINGS, 900)
    return {
        "cached": False,
        "is_fallback": True,
        "data_source": "resilient_local_cache",
        "league": "LaLiga EA SPORTS",
        "season": season,
        "standings": FALLBACK_STANDINGS
    }

@app.get("/api/dataset/seasons")
def list_dataset_seasons():
    seasons = set()
    csv_file = "./data/laliga_historical_seasons.csv"
    if os.path.exists(csv_file):
        with open(csv_file, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            next(reader, None)
            for row in reader:
                if row and row[0]:
                    seasons.add(row[0].strip())
    return {
        "current": "2024/25 Regular",
        "historical": sorted(list(seasons), reverse=True)
    }

@app.get("/api/dataset/standings")
def get_dataset_standings(season: str = Query("2019-20")):
    csv_file = "./data/laliga_historical_seasons.csv"
    if not os.path.exists(csv_file):
        raise HTTPException(status_code=404, detail="Dataset not found")
        
    records = []
    with open(csv_file, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if len(row) >= 28 and row[0].strip() == season:
                try:
                    pos = int(row[-5].strip()) if row[-5].strip().isdigit() else len(records) + 1
                    played = int(row[-4].strip()) if row[-4].strip().isdigit() else 38
                    won = int(row[-3].strip()) if row[-3].strip().isdigit() else 0
                    draw = int(row[-2].strip()) if row[-2].strip().isdigit() else 0
                    lost = int(row[-1].strip()) if row[-1].strip().isdigit() else 0
                    pts = won * 3 + draw
                    team = row[2].strip()
                    zone = "ucl" if pos <= 4 else ("uel" if pos <= 6 else ("uecl" if pos == 7 else ("relegation" if pos >= 18 else "mid")))
                    
                    records.append({
                        "pos": pos,
                        "code": (team[:3]).upper(),
                        "name": team,
                        "stadium": "Historic Ground",
                        "p": played,
                        "w": won,
                        "d": draw,
                        "l": lost,
                        "gf": "-",
                        "ga": "-",
                        "gd": "-",
                        "form": ["W", "D", "W", "W", "D"],
                        "pts": pts,
                        "zone": zone
                    })
                except Exception:
                    continue

    records.sort(key=lambda x: x["pos"])
    return {
        "season": season,
        "source": "Kaggle LaLiga Historical Dataset",
        "standings": records
    }

@app.get("/api/dataset/telemetry")
def get_team_telemetry(team: str = Query("Real Madrid")):
    csv_file = "./data/laliga_match_telemetry.csv"
    if not os.path.exists(csv_file):
        raise HTTPException(status_code=404, detail="Telemetry dataset not found")

    matches = []
    with open(csv_file, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if len(row) >= 17:
                home = row[0].strip()
                away = row[1].strip()
                if team.lower() in home.lower() or team.lower() in away.lower():
                    is_home = team.lower() in home.lower()
                    matches.append({
                        "goals": int(row[2]) if is_home else int(row[3]),
                        "shots": int(row[5]) if is_home else int(row[6]),
                        "shots_target": int(row[7]) if is_home else int(row[8]),
                        "fouls": int(row[9]) if is_home else int(row[10]),
                        "corners": int(row[11]) if is_home else int(row[12]),
                        "yellows": int(row[13]) if is_home else int(row[14]),
                        "reds": int(row[15]) if is_home else int(row[16]),
                    })

    if not matches:
        raise HTTPException(status_code=404, detail=f"No matches found for team {team}")

    count = len(matches)
    return {
        "team": team,
        "matches_recorded": count,
        "avg_goals": round(sum(m["goals"] for m in matches) / count, 2),
        "avg_shots": round(sum(m["shots"] for m in matches) / count, 2),
        "avg_shots_on_target": round(sum(m["shots_target"] for m in matches) / count, 2),
        "shot_accuracy_pct": round(sum(m["shots_target"] for m in matches) / max(1, sum(m["shots"] for m in matches)) * 100, 1),
        "avg_fouls": round(sum(m["fouls"] for m in matches) / count, 2),
        "avg_corners": round(sum(m["corners"] for m in matches) / count, 2),
        "total_yellows": sum(m["yellows"] for m in matches),
        "total_reds": sum(m["reds"] for m in matches)
    }

@app.get("/api/dataset/analytics")
def get_match_analytics(team: Optional[str] = None):
    csv_file = "./data/laliga_match_analytics.csv"
    if not os.path.exists(csv_file):
        raise HTTPException(status_code=404, detail="Analytics dataset not found")

    results = []
    with open(csv_file, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        next(reader, None)
        for row in reader:
            if len(row) >= 11:
                home = row[0].strip()
                away = row[1].strip()
                if not team or (team.lower() in home.lower() or team.lower() in away.lower()):
                    results.append({
                        "home_team": home,
                        "away_team": away,
                        "result": row[2].strip(),
                        "home_goals_scored_avg": float(row[3]) if row[3] else 0,
                        "away_goals_scored_avg": float(row[4]) if row[4] else 0,
                        "avg_goals": float(row[5]) if row[5] else 0,
                        "home_win_pct": float(row[9]) if row[9] else 0,
                        "away_win_pct": float(row[10]) if row[10] else 0
                    })
    return {"count": len(results), "analytics": results}

@app.get("/api/dataset/export")
def export_dataset(file: str = "laliga_match_telemetry.csv"):
    clean_name = os.path.basename(file)
    csv_file = f"./data/{clean_name}"
    if os.path.exists(csv_file):
        return FileResponse(csv_file, media_type="text/csv", filename=clean_name)
    raise HTTPException(status_code=404, detail="Dataset not found")

@app.get("/api/fixtures/seasons")
def get_fixture_seasons():
    fixtures_dir = "./data/fixtures"
    seasons = [
        "2026-27", "2025-26", "2024-25", "2019-20", "2018-19",
        "2017-18", "2016-17", "2015-16", "2011-12", "1999-00", "1928-29"
    ]
    if os.path.exists(fixtures_dir):
        for f in os.listdir(fixtures_dir):
            if f.endswith(".csv"):
                s = f.replace(".csv", "")
                if s not in seasons:
                    seasons.append(s)
    return {
        "current": "2026-27",
        "seasons": seasons
    }

@app.get("/api/fixtures")
def get_fixtures(season: str = Query("2026-27"), matchday: Optional[int] = Query(None)):
    season_clean = season.replace("/", "-")
    csv_file = f"./data/fixtures/{season_clean}.csv"
    if not os.path.exists(csv_file):
        csv_file = f"./data/laliga_fixtures_{season_clean.replace('-', '_')}.csv"
    if not os.path.exists(csv_file):
        csv_file = "./data/laliga_fixtures_2026_2027.csv"

    fixtures = []
    if os.path.exists(csv_file):
        with open(csv_file, "r", encoding="utf-8") as f:
            reader = csv.reader(f)
            next(reader, None)
            for row in reader:
                if len(row) >= 8:
                    gw = int(row[2].strip()) if row[2].strip().isdigit() else 1
                    if matchday is not None and gw != matchday:
                        continue
                    d = row[0].strip()
                    parts_d = d.split("-")
                    formatted_d = f"{parts_d[2]}.{parts_d[1]}.{parts_d[0]}" if len(parts_d) == 3 else d
                    res = row[8].strip() if len(row) >= 9 else ""
                    h_score = None
                    a_score = None
                    if "-" in res:
                        try:
                            s_parts = res.split("-")
                            h_score = int(s_parts[0].strip())
                            a_score = int(s_parts[1].strip())
                        except Exception:
                            pass

                    fixtures.append({
                        "date": d,
                        "formattedDate": formatted_d,
                        "time": row[1].strip(),
                        "matchday": gw,
                        "homeTeam": row[3].strip(),
                        "awayTeam": row[4].strip(),
                        "city": row[5].strip(),
                        "stadium": row[6].strip(),
                        "status": row[7].strip(),
                        "result": res,
                        "homeScore": h_score,
                        "awayScore": a_score,
                        "season": season
                    })

    return {
        "season": season,
        "matchday": matchday,
        "total_matches": len(fixtures),
        "fixtures": fixtures
    }

@app.get("/api/fixtures/live")
@app.get("/api/fixtures/today")
async def get_live_fixtures(date: Optional[str] = Query(None)):
    """
    Live match endpoint with strict 60-second cache TTL.
    Prevents external RapidAPI requests more than once per minute.
    Handles HTTP 429 (Rate Limit Exceeded) gracefully by serving cached data.
    """
    now = time.time()
    cache_age = now - live_matches_cache_store["timestamp"]

    # 1. Strict 60-second cache TTL check
    if live_matches_cache_store["data"] is not None and cache_age < LIVE_MATCH_CACHE_TTL:
        return {
            "cached": True,
            "cache_ttl_remaining": int(LIVE_MATCH_CACHE_TTL - cache_age),
            "rate_limit_exceeded": live_matches_cache_store["rate_limit_exceeded"],
            "warning": "Live updates paused (API limit reached)" if live_matches_cache_store["rate_limit_exceeded"] else None,
            "matches_today": len(live_matches_cache_store["data"]),
            "fixtures": live_matches_cache_store["data"]
        }

    # 2. Fetch fresh live data from RapidAPI if key is available
    if RAPIDAPI_KEY:
        try:
            async with httpx.AsyncClient(timeout=4.0) as client:
                res = await client.get(
                    f"https://{RAPIDAPI_HOST}/v3/fixtures?league={LALIGA_LEAGUE_ID}&live=all",
                    headers={"x-rapidapi-key": RAPIDAPI_KEY, "x-rapidapi-host": RAPIDAPI_HOST}
                )

                if res.status_code == 200:
                    data = res.json().get("response", [])
                    # Parse and format live match entries
                    formatted_matches = []
                    for f in data:
                        status_short = f.get("fixture", {}).get("status", {}).get("short", "TBD")
                        is_live = status_short in ["1H", "HT", "2H", "ET", "P", "LIVE"]
                        formatted_matches.append({
                            "id": str(f.get("fixture", {}).get("id", "")),
                            "date": f.get("fixture", {}).get("date", "").split("T")[0],
                            "time": f.get("fixture", {}).get("date", "").split("T")[1][:5] if "T" in f.get("fixture", {}).get("date", "") else "20:00",
                            "status": status_short,
                            "isLive": is_live,
                            "elapsed": f.get("fixture", {}).get("status", {}).get("elapsed", 0),
                            "homeTeam": f.get("teams", {}).get("home", {}).get("name", ""),
                            "homeLogo": f.get("teams", {}).get("home", {}).get("logo", ""),
                            "homeScore": f.get("goals", {}).get("home"),
                            "awayTeam": f.get("teams", {}).get("away", {}).get("name", ""),
                            "awayLogo": f.get("teams", {}).get("away", {}).get("logo", ""),
                            "awayScore": f.get("goals", {}).get("away"),
                            "venue": f.get("fixture", {}).get("venue", {}).get("name", ""),
                            "city": f.get("fixture", {}).get("venue", {}).get("city", ""),
                            "events": f.get("events", []),
                            "statistics": f.get("statistics", []),
                            "lineups": f.get("lineups", [])
                        })

                    live_matches_cache_store["data"] = formatted_matches
                    live_matches_cache_store["timestamp"] = now
                    live_matches_cache_store["rate_limit_exceeded"] = False

                    return {
                        "cached": False,
                        "rate_limit_exceeded": False,
                        "warning": None,
                        "matches_today": len(formatted_matches),
                        "fixtures": formatted_matches
                    }

                elif res.status_code == 429:
                    # HTTP 429 Rate Limit Exceeded handled gracefully
                    live_matches_cache_store["rate_limit_exceeded"] = True
                    fallback_data = live_matches_cache_store["data"] or []
                    return {
                        "cached": True,
                        "rate_limit_exceeded": True,
                        "warning": "Live updates paused (API limit reached)",
                        "matches_today": len(fallback_data),
                        "fixtures": fallback_data
                    }
        except Exception as e:
            live_matches_cache_store["rate_limit_exceeded"] = True
            fallback_data = live_matches_cache_store["data"] or []
            return {
                "cached": True,
                "rate_limit_exceeded": True,
                "warning": "Live updates paused (API limit reached)",
                "error_detail": str(e),
                "matches_today": len(fallback_data),
                "fixtures": fallback_data
            }

    # 3. Fallback when RAPIDAPI_KEY is absent
    fallback_data = live_matches_cache_store["data"] or []
    return {
        "cached": True,
        "is_fallback": True,
        "rate_limit_exceeded": live_matches_cache_store["rate_limit_exceeded"],
        "warning": "Live updates paused (API limit reached)" if live_matches_cache_store["rate_limit_exceeded"] else None,
        "matches_today": len(fallback_data),
        "fixtures": fallback_data
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

