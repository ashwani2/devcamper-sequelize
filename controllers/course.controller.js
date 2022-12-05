const asyncHandler=require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse");
const db=require("../models/index")
const Course=db.courses
// const Op=db.Sequelize.Op



//@desc     get all Courses
//@route    GET /api/v1/courses
//@access   Public
exports.getCourses = asyncHandler(async (req, res, next) => {
    if (req.params.bootcampId) {
        const courses = await Course.findAll({where:{ bootcampId: req.params.bootcampId }});
        return res.status(200).json({
          success: true,
          count: courses.length,
          data: courses,
        });
      } else {
        res.status(200).json(res.advancedResults);
      }
  });

//@desc     get all Courses
//@route    GET /api/v1/courses
//@access   Public
exports.getCourse = asyncHandler(async (req, res, next) => {
    if(!req.params.id){
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }
    const course=await Course.findAll({where:{_id:req.params.id}})
  
    if (!course) {
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }
  
    res.status(200).json({
      error:false,
      success:true,
      data:course 
    })
  });  

//@desc     Create a Course
//@route    POST /api/v1/courses/
//@access   Private
exports.createCourse = asyncHandler(async (req, res, next) => {

    const course=await Course.create(req.body)
  
    res.status(201).send({
      error:false,
      success:true,
      data:course
    })
   
  });   

//@desc     Update Course
//@route    PUT /api/v1/courses/:id
//@access   Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
    if(!req.params.id){
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }
  
    const course=await Course.update(req.body,{
      where:{_id:req.params.id}
    })
  
    res.status(200).send({
      error:false,
      success:true,
      msg:'contents updated',
      data:course
    })
  });
  
  //@desc     Delete a Course
  //@route    DELETE /api/v1/courses/:id
  //@access   Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
    if(!req.params.id){
      return next(
        new ErrorResponse(`Course not found with id of ${req.params.id}`, 404)
      );
    }
  
    await Course.destroy({where:{_id:req.params.id}})
  
  
    res.status(200).json({
      error:false,
      success:true,
      data:[]
    })
  });  