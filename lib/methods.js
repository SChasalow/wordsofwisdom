Meteor.methods({

      removeIPs: function() {

        return Servers.remove({});

      }

    })