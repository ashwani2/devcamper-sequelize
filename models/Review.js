module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define("reviews", {
    _id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
      validate:{
          len:[10,100]
      }
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true
    },
   rating: {
    type: Sequelize.INTEGER,
    required: true,
    validate:{
        min: 1,
        max: 10,
    }
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

  return Review;
};