from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from RecommanderByNotes import recommend

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:59996"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserPreferences(BaseModel):
    notes: list[str]  # maintenant une liste simple

@app.get("/")
def read_root():
    return {"message": "API recommandation de parfums active."}

@app.post("/recommend")
def get_recommendations(preferences: UserPreferences):
    print("✅ Notes reçues :", preferences.notes)
    try:
        recommendations = recommend(preferences.notes)
        print("✅ Recommandations générées")
        return {"recommendations": recommendations}
    except Exception as e:
        print("❌ Erreur dans recommend :", e)
        return {"error": str(e)}, 500
