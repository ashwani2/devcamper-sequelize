const bcrypt=require("bcryptjs")

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name:{
        type:Sequelize.STRING,
        required:true,
        validate:{
            len: {
                args: [2, 20],
                msg: 'The name must contain between 2 and 20 characters.' // Error message I want to display
            }
        }
      },
      email:{
        type:Sequelize.STRING,
        validate:{
            isEmail: { msg: "Must be a valid email address"}
        }
      },
      role:{
        type:Sequelize.ENUM,
        values:["user", "publisher","admin"],
        defaultValue:"user"
      },
      password:{
        type:Sequelize.STRING,
        required:true,
        validate:{
            notEmpty: { msg: "Password should not be empty"},
            min:6
        },
      },
      resetPasswordToken:Sequelize.STRING,
      resetPasswordExpire:Sequelize.DATE,

    },
    {
      hooks: {
        beforeBulkCreate: (users) => {
            users.forEach(async(user) => {
                user.dataValues.password = bcrypt.hashSync(user.password, 10);
            });
        }
      }
    });
  
    User.beforeSave(async (user, options) => {
        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(user.password,salt)
        user.password=password
      });

    User.prototype.testMethod = function () {
        console.log("This is an instance method log");
      };
        

    return User;
  };