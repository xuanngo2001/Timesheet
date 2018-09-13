/**
 * Mathematical functions
 * @version = $AUTO_VERSION
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
