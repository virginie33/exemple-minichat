if (Meteor.isServer) {
    
    Messages = new Meteor.Collection('messages');
    
    Meteor.methods ({
        ajouteMessage : function (post) {
            var timestamp = Math.round(new Date().getTime() / 1000);
            Messages.insert({
                pseudo : post.pseudo,
                message : post.message,
                time : timestamp
            });
        }
    });

    Meteor.publish('messages', function(salon) {
       return Messages.find( {}, {sort : {time : -1}, limit : 500} );
    });

    Meteor.startup(function () {
      // code to run on server at startup
    });
}
