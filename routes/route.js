const express = require("express");
const router = express.Router();
const { formData } = require('../controllers/formData')

router.post("/:formId/filteredResponses", formData);

module.exports = router;
