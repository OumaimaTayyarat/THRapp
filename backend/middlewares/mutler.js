import multer from "multer"; // Corrige le nom en "multer"

const storage = multer.memoryStorage(); // Définit l'option de stockage en mémoire

// Configuration du middleware pour gérer un fichier unique nommé "file"
export const singleUpload = multer({ storage }).single("file");
export const multipleUpload = multer({ storage }).fields([
    { name: 'resume', maxCount: 1 },
    { name: 'profilPhoto', maxCount: 1 }
]);

