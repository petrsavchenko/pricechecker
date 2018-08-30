const mongoose   = require('mongoose');
require('mongoose-type-url');

var Schema = mongoose.Schema;

var CrawlerSchema = new Schema({
    creator: { type: Schema.ObjectId, ref: 'User', required: true },
    createdDate: { type: Date, required: true, default: Date.now },
    url: { type: mongoose.SchemaTypes.Url, unique: true, required: true	},
    desiredPrice: {type: Number, min: 0, required: true},
    status: {type: String, required: true, enum: ['Processing', 'Paused', "Achieved"], default: 'Processing'},
});

// Export model.
module.exports = mongoose.model('Crowler', CrawlerSchema);
