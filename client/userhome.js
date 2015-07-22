Template.userhome.helpers({
	savedQuotes: function(){
		return Quotes.find({savers:Meteor.userId()});
	},
	score: function(){
		var theFourCategories=[Quotes.find({savers:Meteor.userId(),category:"wisdom"}).count(),Quotes.find({savers:Meteor.userId(),category:"jokes"}).count(),Quotes.find({savers:Meteor.userId(),category:"phrases"}).count(),Quotes.find({savers:Meteor.userId(),category:"misc."}).count()];
		var theScore=Math.max.apply(Math,theFourCategories);
		var whichCategory="";
		for (var i = 0; i < theFourCategories.length; i++) {
			theFourCategories[i]=theFourCategories[i]-theScore;
		}
		if(theFourCategories[0]==0){whichCategory="Wise"}
		else if(theFourCategories[1]==0){whichCategory="Jokester"}
		else if(theFourCategories[2]==0){whichCategory="Poet"}
		else{whichCategory="Randy Crandy"}

		return whichCategory;
	}

});


Template.userhome.events({
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
})
