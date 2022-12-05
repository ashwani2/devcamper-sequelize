module.exports = (sequelize, Sequelize) => {
    const Course = sequelize.define("courses", {
      _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title:{
        type: Sequelize.STRING,
        required:true,
        allowNull: false,
        validate: {
            len: {
            args: [2, 20],
            msg: 'The title must contain between 2 and 20 characters.' // Error message I want to display
            }
    }
      },
      description:{
        type: Sequelize.STRING,
        required:true,
        allowNull: false,
        validate: {
            len: {
            args: [2, 100],
            msg: 'The description must contain between 2 and 100 characters.' // Error message I want to display
            }
    }
      },
      weeks:{
        type: Sequelize.STRING,
        required:true,
        allowNull: false,
      },
      tuition:{
        type:Sequelize.FLOAT,
      },
      minimumSkill:{
        type:Sequelize.ENUM,
        required:true,
        values:['beginner', 'intermediate', 'advanced']
      },
      scholarshipAvailable: {
        type:Sequelize.BOOLEAN
      },
      // // For Reference of bootcampId is Foreign Key
      // bootcampId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //       model: 'bootcamps',
      //       key: '_id'
      //   }
      // },
      // // For Reference of userId is Foreign Key
      // userId: {
      //   type: Sequelize.INTEGER,
      //   references: {
      //       model: 'users',
      //       key: '_id'
      //   }
      // }
      
    });
  
    return Course;
  };