const path = require("path");
const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}.${path.extname(file.originalname)}`
    );
  },
});

function checkFileTypes(file, cb) {
  const filetypes = /jpeg|png|jpg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Only image are allowed");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;
