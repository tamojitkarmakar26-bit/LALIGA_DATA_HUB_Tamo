# Save other historical fixture seasons provided in user prompt
import os

fixtures_2025_26 = """date,time,matchday,home_team,away_team,city,stadium,status,result
2025-08-15,17:00,1,Girona,Rayo Vallecano,Girona,Estadio Municipal de Montilivi,Played,1-3
2025-08-15,19:30,1,Villarreal,Oviedo,Villarreal,Estadio de la Ceramica,Played,2-0
2025-08-16,17:30,1,Mallorca,Barcelona,Palma de Mallorca,Estadi Mallorca Son Moix,Played,0-3
2025-08-16,19:30,1,Valencia,Real Sociedad,Valencia,Estadio de Mestalla,Played,1-1
2025-08-16,19:30,1,Alaves,Levante,Vitoria-Gasteiz,Estadio Mendizorrotza,Played,2-1
2025-08-17,15:00,1,Celta Vigo,Getafe,Vigo,Estadio Abanca Balaídos,Played,0-2
2025-08-17,17:30,1,Athletic Club,Sevilla,Bilbao,San Mamés,Played,3-2
2025-08-17,19:30,1,Espanyol,Atletico Madrid,Cornella de Llobregat,RCDE Stadium,Played,2-1
2025-08-18,19:00,1,Elche,Real Betis,Elche,Estadio Manuel Martínez Valero,Played,1-1
2025-08-19,19:00,1,Real Madrid,Osasuna,Madrid,Estadio Santiago Bernabéu,Played,1-0
2025-08-22,19:30,2,Real Betis,Alaves,Sevilla,Estadio de La Cartuja,Played,1-0
2025-08-23,15:00,2,Mallorca,Celta Vigo,Palma de Mallorca,Estadi Mallorca Son Moix,Played,1-1
2025-08-23,17:30,2,Atletico Madrid,Elche,Madrid,Metropolitano Stadium,Played,1-1
2025-08-23,19:30,2,Levante,Barcelona,Valencia,Estadio Ciudad de Valencia,Played,2-3
2025-08-24,15:00,2,Osasuna,Valencia,Pamplona,Estadio El Sadar,Played,1-0
2025-08-24,17:30,2,Villarreal,Girona,Villarreal,Estadio de la Ceramica,Played,5-0
2025-08-24,17:30,2,Real Sociedad,Espanyol,San Sebastian,Reale Arena,Played,2-2
2025-08-24,19:30,2,Oviedo,Real Madrid,Oviedo,Estadio Nuevo Carlos Tartiere,Played,0-3
2025-08-25,17:30,2,Athletic Club,Rayo Vallecano,Bilbao,San Mamés,Played,1-0
2025-08-25,19:30,2,Sevilla,Getafe,Sevilla,Estadio Ramón Sánchez Pizjuán,Played,1-2
2025-08-29,17:30,3,Elche,Levante,Elche,Estadio Manuel Martínez Valero,Played,2-0
2025-08-29,19:30,3,Valencia,Getafe,Valencia,Estadio de Mestalla,Played,3-0
2025-08-30,15:00,3,Alaves,Atletico Madrid,Vitoria-Gasteiz,Estadio Mendizorrotza,Played,1-1
2025-08-30,17:00,3,Oviedo,Real Sociedad,Oviedo,Estadio Nuevo Carlos Tartiere,Played,1-0
2025-08-30,17:30,3,Girona,Sevilla,Girona,Estadio Municipal de Montilivi,Played,0-2
2025-08-30,19:30,3,Real Madrid,Mallorca,Madrid,Estadio Santiago Bernabéu,Played,2-1
2025-08-31,15:00,3,Celta Vigo,Villarreal,Vigo,Estadio Abanca Balaídos,Played,1-1
2025-08-31,17:00,3,Real Betis,Athletic Club,Sevilla,Estadio de La Cartuja,Played,1-2
2025-08-31,17:30,3,Espanyol,Osasuna,Cornella de Llobregat,RCDE Stadium,Played,1-0
2025-08-31,19:30,3,Rayo Vallecano,Barcelona,Madrid,Campo de Futbol de Vallecas,Played,1-1
2025-09-12,19:00,4,Sevilla,Elche,Sevilla,Estadio Ramón Sánchez Pizjuán,Played,2-2
2025-09-13,12:00,4,Getafe,Oviedo,Getafe,Coliseum,Played,2-0
2025-09-13,14:15,4,Real Sociedad,Real Madrid,San Sebastian,Reale Arena,Played,1-2
2025-09-13,16:30,4,Athletic Club,Alaves,Bilbao,San Mamés,Played,0-1
2025-09-13,19:00,4,Atletico Madrid,Villarreal,Madrid,Metropolitano Stadium,Played,2-0
2025-09-14,12:00,4,Celta Vigo,Girona,Vigo,Estadio Abanca Balaídos,Played,1-1
2025-09-14,14:15,4,Levante,Real Betis,Valencia,Estadio Ciudad de Valencia,Played,2-2
2025-09-14,16:30,4,Osasuna,Rayo Vallecano,Pamplona,Estadio El Sadar,Played,2-0
2025-09-14,19:00,4,Barcelona,Valencia,Barcelona,Estadi Johan Cruyff,Played,6-0
2025-09-15,19:00,4,Espanyol,Mallorca,Cornella de Llobregat,RCDE Stadium,Played,3-2
"""

with open("/data/fixtures/2025-26.csv", "w", encoding="utf-8") as f:
    f.write(fixtures_2025_26.strip())

print("2025-2026 fixtures written")
