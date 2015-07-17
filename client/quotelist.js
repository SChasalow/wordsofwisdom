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
  
  'click button.delete': function(event){
    Quotes.remove(this._id);
  },


  'click button#showMore': function(event){
    Session.set("showNum",2 + Session.get("showNum"))
  },
    'click button#showLess': function(event){
    Session.set("showNum",-2 + Session.get("showNum"))
  }



});

Template.quoteLine.helpers({

  isOwner: function(){
    return (this.user == Meteor.userId()) || (Meteor.userId()=="79ECyD4M2ek4Ffwtj");
    
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
  }


})
