/**
 * @version = 2014-09-15_14.48.37
 * @author  = Xuan Ngo
 */

function Animation()
{}

Animation.scrollTo = function (hash)
{
    $('html, body').animate({
        'scrollTop':   $(hash).offset().top
      }, 500);	
}