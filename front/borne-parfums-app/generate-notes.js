// generate-notes.js
const fs = require('fs');
const path = require('path');

const notesDir = './src/assets/Notes'; // dossier contenant tes images
const outputFile = './src/app/availableNotes.ts';

// Lis tous les fichiers du dossier
const files = fs.readdirSync(notesDir);

// Crée le tableau d'objets
const Notes = files.map(file => {
  const key = path.basename(file, path.extname(file));
  return `{ key: '${key}', img: 'assets/Notes/${file}' }`;
});

// Écrit le fichier TypeScript automatiquement
const content = `export const availableNotes = [
  ${Notes.join(',\n  ')}
];\n`;

fs.writeFileSync(outputFile, content);
console.log('✅ Fichier availableNotes.ts généré avec succès.');
