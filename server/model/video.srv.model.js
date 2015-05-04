var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = new Schema({
    ref: {
        type: String,
        required: 'Reference is required',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    tags: {
        type: [String]
    }
});

VideoSchema.set('toJSON', {
    getters: true,
    virtuals: true
});
mongoose.model('Video', VideoSchema);
