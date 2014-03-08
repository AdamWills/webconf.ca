$(document).foundation();

$(document).ready(function() {

    var provinces = [];
	$(".conferences > li").each(function() {
	    var province = $(this).data("province");
        if ($.inArray(province,provinces) < 0) provinces.push(province);
	});
	provinces.sort();

	$.each(provinces, function(key, value) {
		$('#provinceFilter').append('<option value="' + value + '">' + value + '</option>');	
	});
});

$('#provinceFilter').change(function() {
	var prov = $(this).val();
	if(prov != '0') {
		$('.conferences li').not('[data-province="'+ prov +'"]').hide();
		$('.conferences li[data-province="'+ prov +'"]').show();
	}
	else {
		$('.conferences li').show();
	}
});

// track outbound links
// via http://www.blastam.com/blog/index.php/2013/09/howto-track-downloads-links-universalanalytics/
var baseHref = '';
if (jQuery('base').attr('href') != undefined) baseHref = jQuery('base').attr('href');
var hrefRedirect = '';

jQuery('body').on('click', 'a', function(event) {
    var el = jQuery(this);
    var track = true;
    var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') : '';
    var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
    if (!href.match(/^javascript:/i)) {
        var elEv = []; elEv.value=0, elEv.non_i=false;
        if (href.match(/^mailto\:/i)) {
            elEv.category = 'email';
            elEv.action = 'click';
            elEv.label = href.replace(/^mailto\:/i, '');
            elEv.loc = href;
        }
        else if (href.match(/^https?\:/i) && !isThisDomain) {
            elEv.category = 'external';
            elEv.action = 'click';
            elEv.label = href.replace(/^https?\:\/\//i, '');
            elEv.non_i = true;
            elEv.loc = href;
        }
        else track = false;

        if (track) {
            var ret = true;

            if((elEv.category == 'external') && (el.attr('target') == undefined || el.attr('target').toLowerCase() != '_blank') ) {
                hrefRedirect = elEv.loc;

                ga('send','event', elEv.category.toLowerCase(),elEv.action.toLowerCase(),elEv.label.toLowerCase(),elEv.value,{
                    'nonInteraction': elEv.non_i ,
                    'hitCallback':gaHitCallbackHandler
                });

                ret = false;
            }
            else {
                ga('send','event', elEv.category.toLowerCase(),elEv.action.toLowerCase(),elEv.label.toLowerCase(),elEv.value,{
                    'nonInteraction': elEv.non_i
                });
            }

            return ret;
        }
    }
});

gaHitCallbackHandler = function() {
    window.location.href = hrefRedirect;
}