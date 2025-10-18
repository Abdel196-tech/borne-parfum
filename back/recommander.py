import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Charger le fichier Excel
df = pd.read_excel("data/resultats_parfums_clean_filled - Copie.xlsx")
df["Brand"] = df["Brand"].str.replace('\u2011', '-')
# Poids pour les types de notes
weights_position = {
    "Top Notes": 0.33,
    "Middle Notes": 0.33,
    "Base Notes": 0.33
}

# Extraire toutes les notes uniques
all_notes = set()
for col in weights_position.keys():
    for row in df[col].dropna():
        notes = [note.strip().lower() for note in str(row).split(",")]
        all_notes.update(notes)

all_notes = list(all_notes)
note_to_idx = {note: i for i, note in enumerate(all_notes)}

def create_perfume_vector(row):
    vector = np.zeros(len(all_notes))
    for col, w in weights_position.items():
        notes = [n.strip().lower() for n in str(row[col]).split(",") if n]
        for note in notes:
            if note in note_to_idx:
                vector[note_to_idx[note]] += w
    return np.clip(vector, 0, 1)

perfume_matrix = np.array([create_perfume_vector(row) for _, row in df.iterrows()])

def create_client_vector(notes_list: list):
    vector = np.zeros(len(all_notes))
    for note in notes_list:
        note_lc = note.strip().lower()
        if note_lc in note_to_idx:
            vector[note_to_idx[note_lc]] = 1.0
    return vector.reshape(1, -1)

def recommend(notes_list: list, top_n=20):
    # 1️⃣ Similarité cosinus
    client_vector = create_client_vector(notes_list)
    similarity_scores = cosine_similarity(client_vector, perfume_matrix)[0]

    df_copy = df.copy()
    df_copy["similarity_score_advanced"] = similarity_scores

    # 2️⃣ Conversion sécurisée de Marge
    if "Marge" not in df_copy.columns:
        df_copy["Marge"] = 0.0
    else:
        df_copy["Marge"] = df_copy["Marge"].apply(
            lambda x: float(str(x).replace(",", ".")) 
            if x and str(x).replace(",", ".").replace(".", "").isdigit() 
            else 0.0
        )

    # 3️⃣ Nettoyage JSON-safe
    df_copy = df_copy.fillna(0.0).replace([np.inf, -np.inf], 0.0)

    # 4️⃣ Top N par similarité
    df_top = df_copy.sort_values(by="similarity_score_advanced", ascending=False).head(top_n)

    # 5️⃣ Calcul du rang basé sur la similarité
    df_top = calculate_similarity_rank(df_top)

    # 6️⃣ Tri final **pour l'affichage** par Marge décroissante
    df_top = df_top.sort_values(by="Marge", ascending=False)

    # 7️⃣ Nettoyage final JSON-safe
    df_top = df_top.fillna(0.0).replace([np.inf, -np.inf], 0.0)

    return df_top.to_dict(orient="records")


def calculate_similarity_rank(df):
    df_temp = df.sort_values(by="similarity_score_advanced", ascending=False).copy()
    df_temp["similarity_rounded"] = df_temp["similarity_score_advanced"].round(8)

    current_rank = 1
    unique_scores = sorted(df_temp["similarity_rounded"].unique(), reverse=True)
    for score in unique_scores:
        mask = df_temp["similarity_rounded"] == score
        count_with_this_score = mask.sum()
        df_temp.loc[mask, "Similarity_Rank"] = int(current_rank)
        current_rank += count_with_this_score

    df_temp["Similarity_Rank"] = df_temp["Similarity_Rank"].astype(int)
    return df_temp
