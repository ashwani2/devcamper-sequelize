const express = require("express");
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course.controller");


const db = require("../models/index");
const Course = db.courses;
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });


router.route("/").get(advancedResults(Course), getCourses).post(createCourse);

router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);

module.exports = router;
