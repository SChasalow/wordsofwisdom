Session.set("showNum",5);

Template.quotelist.helpers({
  quotes: function () {
	  return Quotes.find({},
                       {limit:Session.get("showNum"),
                        sort:{createdAt:-1}}
                      ); // we are finding all of the quotes on the server to show on the client
  },
  showNum: function(){
    return Session.get("showNum");
  }
});

Template.quotelist.events({

  'click button.like': function (event) {
    if(_.contains(this.likers,Meteor.userId()))
      {var newLikers = _.without(this.likers,Meteor.userId());

      Quotes.update(this._id,{$inc:{likes: -1},$set:{likers:newLikers}});
    }
     else {
      this.likers.push(Meteor.userId()); // add your self to the likers

	   Quotes.update(this._id,{$inc:{likes: 1},$set:{likers:this.likers}}); // update the current quote by adding 1 to its likes field
    }
  },

    'click button.save': function (event) {
      if(_.contains(this.savers,Meteor.userId()))
        {var newSavers = _.without(this.savers,Meteor.userId());
        var newSavedQuotes = _.without(Meteor.user().profile.SavedQuotes,this._id);
        Meteor.users.update(Meteor.userId(),{$set:{"profile.SavedQuotes":newSavedQuotes}})
        Quotes.update(this._id,{$set:{savers:newSavers}});
      }
       else {
        this.savers.push(Meteor.userId()); // add your self to the savers
        var a=Meteor.user().profile.SavedQuotes;
        a[a.length]=this._id;
        Meteor.users.update(Meteor.userId(),{$set:{"profile.SavedQuotes":a}})
  	    Quotes.update(this._id,{$set:{savers:this.savers}}); // update the current quote by adding 1 to its likes field
      }
    },

  'click button.delete': function(event){
    Quotes.remove(this._id);
  },


  'click button#showMore': function(event){
    Session.set("showNum",2 + Session.get("showNum"))
  }



});
Template.quotelist.helpers({
  ranOut: function(){
    return (Quotes.find({}).count()>Session.get("showNum"))

  }
});
Template.quoteLine.helpers({

  isOwner: function(){
    return (this.user == Meteor.userId()) || (Meteor.userId()=="79ECyD4M2ek4Ffwtj");
  },
  saved: function(){
    return (_.contains(this.savers,Meteor.userId()));
  },

  creationTime: function(){
    var d = this.createdAt;
    var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Nov.", "Dec."];
    return months[d.getMonth()] + d.getDate()+ ", " + (d.getYear()+1900)
  },

  likeColor: function(){
    var likes = _.contains(this.likers,Meteor.userId());
    console.log(likes);
    if(likes){return "btn-success";} else {return "btn-warning"}
  },
  saveColor: function(){
    var saves = _.contains(this.savers,Meteor.userId());
    console.log(saves);
    if(saves){return "btn-info";} else {return "btn-primary"}
  }

});
