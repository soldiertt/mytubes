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
        required: 'User is required',
        ref: 'User'
    },
    tags: {
        type: [String],
        validate: [function(tags){
            return (tags.length !== 0);
        }, 'Please add at least one tag.']
    },
    created: {
        type: Date,
        default: Date.now
    }
});


VideoSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

VideoSchema.index({ ref: 1, user: 1 }, { unique: true });

mongoose.model('Video', VideoSchema);
