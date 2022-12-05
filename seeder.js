
require('dotenv').config({
  path: "./config/config.env",
});
const fs=require('fs')
require('colors')


const db=require("./models/index")

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const bootcamps=JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`),'utf-8')
const courses=JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`),'utf-8')
const users=JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`),'utf-8')
const reviews=JSON.parse(fs.readFileSync(`${__dirname}/_data/reviews.json`),'utf-8')
const Bootcamp=db.bootcamps
const User=db.users
const Course=db.courses
const Review=db.reviews


const importData=async()=>{

  try {
      await Bootcamp.bulkCreate(bootcamps)
      await User.bulkCreate(users)
      await Course.bulkCreate(courses)
      await Review.bulkCreate(reviews)
      
      console.log("Data Imported".green.inverse)
      process.exit()
  } catch (error) {
      console.log(error)
  }
}

const deleteData=async()=>{

  try {
      
      await Course.destroy({truncate: true})
      await Review.destroy({truncate: true})
      await Bootcamp.destroy({truncate: true})
      await User.destroy({truncate: true})
      
      
      console.log("Data Deleted".red.inverse)
      process.exit()
  } catch (error) {
      console.log(error)
  }
}

if(process.argv[2]==='-i'){
  importData()
}
if(process.argv[2]==='-d'){
  deleteData()
}