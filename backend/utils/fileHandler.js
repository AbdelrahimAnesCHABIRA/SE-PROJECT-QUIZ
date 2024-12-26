const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

const extractTextFromFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.pdf') {
    const data = fs.readFileSync(filePath);
    const text = await pdfParse(data);
    return text.text;
  } else if (ext === '.docx') {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  } else if (ext === '.txt') {
    return fs.readFileSync(filePath, 'utf8');
  }

  throw new Error('Unsupported file format');
};

const validateFileType = (filename) => {
  const validExtensions = ['.pdf', '.txt', '.docx'];
  return validExtensions.includes(path.extname(filename).toLowerCase());
};

const ensureDirectoryExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
};

module.exports = {
  extractTextFromFile,
  validateFileType,
  ensureDirectoryExists
};