const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// create associations
// indicates a user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// indicates a post can only be owned by one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// indicates a user can vote on many posts
User.belongsToMany(Post,{
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

// indicates that a post can be voted on by many users
Post.belongsToMany(User, {
    through: Vote,
    as:'voted_posts',
    foreignKey: 'post_id'
});

// connects vote and user directly
Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

// connects vote directly to post
Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

// states that a user can have many votes
User.hasMany(Vote, {
  foreignKey: 'user_id'
});

// states that a post can have manyt votes
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Vote };