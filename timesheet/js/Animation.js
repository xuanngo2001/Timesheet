/**
 * @version = $AUTO_VERSION
 */

function Animation()
{}

Animation.scrollTo = function (hash)
{
    $('html, body').animate({
        'scrollTop':   $(hash).offset().top
      }, 500);	
}