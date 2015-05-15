var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    preSave = function(next) {
        var tags = this.tags;
        // Remove empty strings
        tags = tags.filter(Boolean);
        // Remove duplicates
        tags = tags.filter(function(item, pos) {
            return tags.indexOf(item) === pos;
        });
        this.tags = tags;
        next();
    };

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

//VideoSchema.pre('save', preSave);

VideoSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

VideoSchema.index({ ref: 1, user: 1 }, { unique: true });

mongoose.model('Video', VideoSchema);
