/**
 * MathFuncematical functions
 * @version = 2014-09-15_15.14.55
 * @author  = Xuan Ngo
 */

function MathFunc()
{}

MathFunc.floor = function (value, slice)
{
	return Math.floor(value/slice)*slice;
};

MathFunc.ceil = function (value, slice)
{
	return Math.ceil(value/slice)*slice;
};
