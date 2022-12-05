const asyncHandler=require("../middleware/async")
const ErrorResponse = require("../utils/errorResponse");
const path=require("path")
const db=require("../models/index")
const Bootcamp=db.bootcamps
// const Op=db.Sequelize.Op



//@desc     get all bootcamps
//@route    GET /api/v1/bootcamps
//@access   Public
exports.getBootcamps = asyncHandler(async (req, res, next) => {
 res.status(200).json(res.advancedResults);
  });

//@desc     get Single bootcamp
//@route    GET /api/v1/bootcamps/:id
//@access   Public
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  if(!req.params.id){
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }
  const bootcamp=await Bootcamp.findAll({where:{_id:req.params.id}})

  if (!bootcamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    error:false,
    success:true,
    data:bootcamp 
  })
});  

//@desc     Create a bootcamp
//@route    POST /api/v1/bootcamps/
//@access   Private
exports.createBootcamp = asyncHandler(async (req, res, next) => {

  const bootcamp=await Bootcamp.create(req.body)

  res.status(201).send({
    error:false,
    success:true,
    data:bootcamp 
  })
 
}); 
  
//@desc     Update bootcamp
//@route    PUT /api/v1/bootcamps/:id
//@access   Private
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  if(!req.params.id){
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }

  const bootcamp=await Bootcamp.update(req.body,{
    where:{_id:req.params.id}
  })

  res.status(200).send({
    error:false,
    success:true,
    msg:'contents updated',
    data:bootcamp
  })
});

//@desc     Delete a bootcamp
//@route    DELETE /api/v1/bootcamps/:id
//@access   Private
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  if(!req.params.id){
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }

  await Bootcamp.destroy({where:{_id:req.params.id}})


  res.status(200).json({
    error:false,
    success:true,
    data:[]
  })
});

//@desc     upload a Photo for a Bootcamp
//@route    PUT /api/v1/bootcamps/:id/photo
//@access   Private
exports.bootcampPhotoUpload = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findAll({where:{_id:req.params.id}});

  if (!bootcamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }
  
  if (!req.files) {
    return next(new ErrorResponse(`Please Upload A file`, 400));
  }

  const file = req.files.file;

  console.log(file.name)

  // Make Sure the Image is Photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please Upload a image file`, 400));
  }

  // check filesize
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please Upload a Image less than ${process.env.MAX_FILE_UPLOADS}`,
        400
      )
    );
  }

  // create custom filename
  file.name = `photo_${req.params.id}${path.parse(file.name).ext}`;


  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse(`Problem With file upload`, 500));
    }

    await Bootcamp.update({photo:file.name},{where:{_id:req.params.id}});

    res.status(200).json({
      sucess: true,
      data: file.name,
    });
  });
});