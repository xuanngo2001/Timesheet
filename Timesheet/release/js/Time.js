/**
 * @version = 2014-09-15_09.47.40
 * @author  = Xuan Ngo
 */

function Time()
{
}

/**
 * Return the number of minutes from time string HH:MM.
 * @param time HH:MM
 * @returns time in minutes
 */
Time.prototype.getMinutes = function (time)
{
	var time_splitted = time.split(":");
	var hours = parseInt(time_splitted[0]);
	var minutes = parseInt(time_splitted[1]);
	
	return (hours*60)+minutes;
};