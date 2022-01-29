const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

// USER POST ASSOCIATIONS
// create associations
// indicates a user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// indicates a post can only be owned by one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// indicates a user can vote on many posts "many to many association"
User.belongsToMany(Post,{
    through: Vote,
    as: 'voted_posts',

    foreignKey: 'user_id',
   // onDelete: 'SET NULL'
});

// indicates that a post can be voted on by many users many to many association this association wil allow us to see which post a queried user has voted on
Post.belongsToMany(User, {
    through: Vote,
    as:'voted_posts',
    foreignKey: 'post_id',
   // onDelete:'SET NULL'
});

// VOTE ASSOCIATIONS
// connects vote and user directly
Vote.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// connects vote directly to post
Vote.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

// states that a user can have many votes
User.hasMany(Vote, {
  foreignKey: 'user_id'
});

// states that a post can have manyt votes
Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

// COMMENT ASSOCIATIONS
// connects Comment and User directly
Comment.belongsTo(User,{
    foreignKey:'user_id',
    onDelete: 'SET NULL'
});

// connects comment and post directly
Comment.belongsTo(Post,{
    foreignKey: 'post_id',
    onDelete: 'SET NULL'  
   
});

// indicates a user can have many comments
User.hasMany(Comment,{
    foreignKey:'user_id',
    onDelete: 'SET NULL'
});

// indicates a post can have many comments
Post.hasMany(Comment,{
    foreignKey:'post_id',
});

module.exports = { User, Post, Vote,Comment };