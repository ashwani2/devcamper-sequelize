const slugify = require("slugify");
module.exports = (sequelize, Sequelize) => {
  const Bootcamp = sequelize.define("bootcamps", {
    _id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: [10, 50],
      },
       set(value) {
        let data= slugify(value,{lower:true})
        this.setDataValue("slug", data);
        this.setDataValue("name",value)
      },
      
    },
    slug: {
      type: Sequelize.STRING    
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    website: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        is: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      },
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        isEmail: { msg: "Must be a valid email address"}
      },
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    careers: {
      type: Sequelize.ENUM,
      values: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    averageRating: {
      type: Sequelize.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 10,
      },
    },
    averageCost: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    photo: Sequelize.STRING,
    housing: Sequelize.BOOLEAN,
    jobAssistance: Sequelize.BOOLEAN,
    jobGuarantee: Sequelize.BOOLEAN,
    acceptGi: Sequelize.BOOLEAN,
  });

  return Bootcamp;
};
