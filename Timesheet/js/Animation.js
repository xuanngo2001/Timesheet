/**
 * @version = $AUTO_VERSION
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