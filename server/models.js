var mongoose = require('mongoose');

let models = {};

main().catch(err => console.log(err));
async function main() {
  console.log('Connecting to MongoDB');
  await mongoose.connect(`mongodb+srv://xyou:${process.env.MONGO_PW}@team12.tyshshi.mongodb.net/PathPals`);
  console.log('Success!')

  const PathSchema = new mongoose.Schema({
    username: String,
    path_name: String,
    description: String,
    places: [String], // an array of place ids
    date_created: { type: Date, default: Date.now },
    num_views: { type: Number, default: 0 },
    num_likes: { type: Number, default: 0 },
    likes: { type: [String], default: [] }, // an array of usernames that liked this path
    shared: { type: [String], default: [] } // an array of usernames that are allowed to edit this path
  });

  const CommentSchema = new mongoose.Schema({
    username: String,
    comment: String,
    date_created: { type: Date, default: Date.now },
    path: { type: mongoose.Schema.Types.ObjectId, ref: 'Path' }
  });

  const PlaceSchema = new mongoose.Schema({
    place_id: String,
    place_name: String,
    formatted_address: String,
    photos: [Object] // an array of photo objects
  });

  const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    bio: { type: String, default: 'This person does not have a bio yet...' },
  })

  models.Path = mongoose.model('Path', PathSchema);
  models.Comment = mongoose.model('Comment', CommentSchema);
  models.Place = mongoose.model('Place', PlaceSchema);
  models.User = mongoose.model('User', UserSchema);

  console.log('mongoose models created');
}

module.exports = models;