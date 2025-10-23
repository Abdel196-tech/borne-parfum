import pandas as pd

# Exemple : chargement du dataset
df = pd.read_excel("resultats_parfums_clean_filled - Copie.xlsx")



# Fonction de recherche
def search_perfume(name):
    name_lower = name.lower().strip()
    results = df[df["Similar Perfumes"].str.lower().str.contains(name_lower, na=False)]
    if results.empty:
        return "Aucun parfum trouvé."
    else:
        return results[["Brand", "Perfume"]]

# Exemple d’utilisation
print(search_perfume("Parfums de Marly Althair"))


#si le client tape un parfum qu'on a il doit apparaitre en premier sauf si on estime montrer le parfum avec le plus de marge 
# Pas disponible , OUt of stock 