Template.search.helpers({
   quotes: function () {
   	var sessionKey = Session.get("keyword");
    var sessionCategoryKey=Session.get("categoryKeyword");
if(sessionCategoryKey=="all"){return Quotes.find({tags:sessionKey}).fetch();}
   else if(sessionKey==""&&sessionCategoryKey!="all"){return Quotes.find({category:sessionCategoryKey}).fetch();}
   else{return Quotes.find({tags:sessionKey,category:sessionCategoryKey}).fetch();}
  }
});

Template.search.events({

  'click #searchButton': function (event) {
 		 var keyword = $("#searchWorking").val().toLowerCase();
     var inprep = document.getElementById("categories")
     var inCategory = inprep.options[inprep.selectedIndex].value;
 		if (keyword.length == 0 && inCategory=="all"){$("#validation").html("Please enter a tag or select a category");}
    else{$("#validation").html("");}
    Session.set("keyword",keyword);
    Session.set("categoryKeyword",inCategory);
  },

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
  }

});

Template.search.rendered = function(){
  var k="";
  var c="";
  Session.set("keyword",k);
  Session.set("categoryKeyword",c);
};
