 if (Meteor.isClient) {
        Messages = new Meteor.Collection('messages');
        
        Deps.autorun(function() {
          Meteor.subscribe('messages', { 
                onReady : function() {
                    Session.set("active", true); // pour dire que c'est synchronisé (donc on peut commencer à rafraichir le template)
                }
          });
        });

      Template.hello.events({
         'submit form': function(event) {
            event.preventDefault();
            var post = {
                pseudo : $(event.target).find('[name=pseudo]').val(),
                message : $(event.target).find('[name=message]').val()
            }
            if ( (post.message != "") && (post.pseudo != "") ) {
                Meteor.call("ajouteMessage", post);
            }
        }
      });

       Template.hello.helpers({       
           derniersMessages : function() {
                 if (Session.get("active")) {
                     return Messages.find({}, {sort : {time : -1}, limit : 500});
                 } else {
                     return [];
                 }
            }
       });
    }
