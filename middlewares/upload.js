const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// upload.fieds([{name: "cover", maxCount: 1}]) // якщо файли в кількох полях передаємо масив обєктів, де в кожному є поле cover  і кількість
// upload.array("cover", 8) // якщо приходить кілька файлів  "cover" - назва поля 8- кільуість файлів
const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
