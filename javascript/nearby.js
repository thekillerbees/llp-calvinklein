var custom = {};

custom.templates = {
    main_loc_templ: {
        'checks' : [
            ['main_loc', 'eq' , '1' ]
        ]
    },

   other_loc_templ: {
        'checks' : [
            ['main_loc', 'eq' , '' ]
        ]
    }

};

var custom_ob = {};

custom_ob = {
    updateRecords : function(recs){

        if(recs.length && recs.length > 0){
            //var html = $('store_detail').innerHTML;
            //html = html.interpolate(recs[0]);
            //$('store_detail_display').innerHTML = html;
        }
        recs.each(function(e){
				if(e.NAME){
					//e.CITY2 = e.CITY.toLowerCase();	
					e.CITY2 = e.CITY.toLowerCase().replace(/\s+/g, '-');
					e.STATE2 = e.STATE.toLowerCase();
					e.NAME2 = e.NAME.toLowerCase();		

				}
			}.bind(this));		


        return recs;
    }
};
