Session.set("showNum",5);

Template.quotelist.helpers({
  quotes: function () {
    var now = new Date().getTime();
    var yesterday = new Date(now - 1000*10);  // *60*24
	  return Quotes.find({createdAt:{$gt:yesterday}},
                       {limit:Session.get("showNum"),
                        sort:{createdAt:-1}}
                      ); // we are finding all of the quotes on the server to show on the client
  },
  showNum: function(){
    return Session.get("showNum");
  },
  ranOut: function(){
    return (Quotes.find({}).count()>Session.get("showNum"))

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
      Quotes.update(this._id,{$set:{savers:newSavers}});
    }
     else {
      this.savers.push(Meteor.userId()); // add your self to the savers
      Quotes.update(this._id,{$set:{savers:this.savers}}); // update the current quote by adding 1 to its likes field
    }
  },

'click button.flag': function(event)
    {
      if(_.contains(this.flaggers,Meteor.userId())){}
     else {
      if (confirm("Are you sure you want to flag this quote as inappropriate? It cannot be undone!")){
      this.flaggers.push(Meteor.userId()); // add your self to the flaggers
     Quotes.update(this._id,{$inc:{flags: 1},$set:{flaggers:this.flaggers}}); // update the current quote by adding 1 to its flaggers field
     if((this.flags+1)>Math.floor(Math.cbrt(Meteor.users.find().count()))){Quotes.remove(this._id);}
    }
  }
},


  'click button.delete': function(event){
          if (confirm("Are you sure you want to delete this quote? It cannot be undone!")){
    Quotes.remove(this._id);
  }
  },


  'click button#showMore': function(event){
    Session.set("showNum",2 + Session.get("showNum"))
  }



});

Template.quoteLine.helpers({

  isOwner: function(){
    return (this.user == Meteor.userId());
  },
  saved: function(){
    return (_.contains(this.savers,Meteor.userId()));
  },
  flagged: function(){
    return (_.contains(this.flaggers,Meteor.userId()));
  },

  creationTime: function(){
    var d = this.createdAt;
    var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Nov.", "Dec."];
    return months[d.getMonth()] + " " + d.getDate()+ ", " + (d.getYear()+1900)
  },

  likeColor: function(){
    var likes = _.contains(this.likers,Meteor.userId());
    console.log(likes);
    if(likes){return "btn-success";} else {return "btn-warning";}
  },

  flagColor: function(){

    var flags = _.contains(this.flaggers,Meteor.userId());
    console.log(flags);
    if(flags){return "btn-danger";} else {return "btn-default";}
  },
  saveColor: function(){
    var saves = _.contains(this.savers,Meteor.userId());
    console.log(saves);
    if(saves){return "btn-info";} else {return "btn-primary";}
  }

});
