const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
     moduleId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "modules",
            required: true,
        },
    chapterName: {
        type: String,
        required: [true, "Chapter name is required"],
    },
   
});

module.exports = mongoose.model("Chapter", chapterSchema);
