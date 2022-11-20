$(document).ready(function() {
	$('.minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		app.start();
		return false;
	});
	$('.plus').click(function () {
		var $input = $(this).parent().find('input');
		var newVal = parseInt($input.val()) + 1;
		if(newVal < 6 ){
			$input.val(newVal);
			$input.change();
			app.start();
			return false;
		}
	});
});