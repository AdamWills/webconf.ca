$(document).foundation();

$(document).ready(function() {
	console.log("fireing");
	var provinces = [];
	$(".conferences li").each(function() {
	    var province = $(this).data("province");
	    if ($.inArray(province,provinces) < 0) provinces.push(province);
	});

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