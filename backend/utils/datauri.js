import DataUriParser from "datauri/parser.js";
import path from "path";

const getDataUri = (file) => {
    // Check if the file is undefined or null before processing
    if (!file || !file.buffer) {
        throw new Error("No file provided or file is missing required properties.");
    }

    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString(); // Get file extension
    return parser.format(extName, file.buffer);
};

export default getDataUri;
