angular
    .module('LoLCompApp')
    .factory('ModalService', function() {

        var fac = {};

        // Status of modals
        fac.modals = {};

        // openModal: Sets flag of modal to true, updates listeners
        fac.openModal = function(modal){
            fac.modals[modal] = true;
            fac.update();
        };

        // closeModal: Sets flag of modal to false, updates listeners
        fac.closeModal = function(modal){
            fac.modals[modal] = false;
            fac.update();
        };

        fac.closeAll = function(){
            fac.modals = {};
            fac.update();
        };

        // Listeners: callback functions that will be hit on update
        var listeners = [];

        // listen: add callback to listeners
        fac.listen = function(callback){
            listeners.push(callback);
        };

        // update: Hit all listening callback functions
        fac.update = function(){
            for (var i in listeners){
                listeners[i]();
            }
        };

        return fac;
    });