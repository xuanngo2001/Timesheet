/**
 * @version = 2014-09-15_10.09.43
 * @author  = Xuan Ngo
 */

function Event(description, column, start, duration)
{
	this.description = description;
	this.column = column;
	this.start = start;
	this.duration = duration;
}

/**
 * Return the number of minutes of time string HH:MM from 00:00:00.
 * @param time HH:MM
 * @returns time in minutes
 */
Event.prototype.getMinutes = function (time)
{
	var time_splitted = time.split(":");
	var hours = parseInt(time_splitted[0]);
	var minutes = parseInt(time_splitted[1]);
	
	return (hours*60)+minutes;
};