const express = require("express");
const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  bootcampPhotoUpload,
} = require("../controllers/bootcamp.controller");

const courseRouter = require("./course");
const reviewRouter = require("./review");

const advancedResults = require("../middleware/advancedResults");
const db = require("../models/index");
const Bootcamp = db.bootcamps;

const router = express.Router();

router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router
  .route("/")
  .get(advancedResults(Bootcamp), getBootcamps)
  .post(createBootcamp);

router.route("/:id/photo").put(bootcampPhotoUpload);

router
  .route("/:id")
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
