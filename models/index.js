const sequelize = require('../config/database');
const UserModel = require('./user');
const PostModel = require('./post');

const User = UserModel(sequelize);
const Post = PostModel(sequelize);

User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId' });

sequelize.sync();

module.exports = { User, Post };
