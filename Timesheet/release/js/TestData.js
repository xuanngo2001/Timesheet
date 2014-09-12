/**
 * @version = 2014-09-12_16.57.16
 * @author  = Xuan Ngo
 */

function TestData()
{
}

TestData.prototype.getData = function ()
{
	var data = [
            	// Description, column #, start time, duration
	            ["Test not within time slice", "1", "19:05", "51"],
	            ["English Beg", "1", "20:00", "60"],
	            
                ["Spanish Intro", "2", "19:00", "60"],
                ["English Intro", "2", "16:45", "60"],
                ["Spanish Inter", "2", "20:15", "60"],
                
                
                ["English Beg", "3", "19:00", "60"],
                ["Speaking practice", "3", "21:00", "60"],
                
                ["English Inter", "8", "19:00", "60"],
                ["Test Mix Col. Ordering", "3", "20:00", "60"],
                
                ["Spanish Inter", "5", "18:00", "60"],
                ["English Intro", "5", "19:00", "60"],
                ["Spanish Beg", "5", "20:00", "60"],
                ["English Beg", "5", "21:00", "60"],
                
                ["Vegetarian", "6", "17:00", "120"],
                
                
                ["Spanish Beg", "7", "17:00", "60"],
                ["English Beg", "7", "18:00", "60"],
                ["English Plus", "7", "19:00", "60"],
                ["English Inter", "7", "20:00", "60"],
                ["Speaking practice", "7", "21:00", "60"]
            ]; // IE will display warning if you put comma at the last set of arrays.

	var events = new Array();
	for(i=0; i<data.length; i++)
	{
		var idx = 0;
		var event = new Event(data[i][idx++], data[i][idx++], data[i][idx++], data[i][idx++]); // Description, column #, start time, duration
		events.push(event);
	}	
	
	return events;
};