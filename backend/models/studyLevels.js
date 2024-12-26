
const studyLevels = [
    "Primary",
    "Secondary",
    "High School",
    "University",
    "Other"
];


function getStudyLevels() {
    return studyLevels;
}


function isValidStudyLevel(level) {
    return studyLevels.includes(level);
}


function addStudyLevel(newLevel) {
    if (!studyLevels.includes(newLevel)) {
        studyLevels.push(newLevel);
        return true;
    }
    return false;
}


module.exports = {
    getStudyLevels,
    isValidStudyLevel,
    addStudyLevel
};
