module.exports = function(Champ) {
    var api = {
        getAllChampData: getAllChampData,
        createChamp: createChamp,
        getLatestChampData: getLatestChampData
    };

    function getAllChampData(version, cb) {
        Champ.findOne({version: version}, function (err, champ) {
            cb(champ);
        });
    }

    function getLatestChampData(cb){
        Champ.findOne().sort({version: -1}).exec(function(err, champ) {
            cb(champ);
        });
    }

    function createChamp(champ, cb) {
        Champ.create(champ, function(error, newChamp){
            cb(newChamp);
        });
    }

    return api;
};