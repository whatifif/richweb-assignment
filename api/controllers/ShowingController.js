/**
 * ShowingController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	"new" : function(req, res) {
		res.view();
	},
	
	create : function(req, res, next){
		Showing.create(req.params.all(), function showingCreated(err, showing){
			if(err){
				console.log(err);
				return res.redirect("/showing/new");
			}
			res.redirect("/showing/");
		});	
	},
	
	index : function (req, res, next) {
		Showing.find(function allShows(err, showings){
			if (err) {
				console.log(err);
			}
			res.view({
				showings : showings
			});
		});
	},

	watch : function(req,res,next){	
		Showing.findOne(req.param("id"),function found(err, showing){
			if (err) {
				console.log(err);
			}

			if(!showing){
				return res.redirect("/showing/");			
			}
			res.view({
				showing : showing
			});
		});
	}
}
