$(document).ready(function () {
    // Initially position elements off-screen to the left and hide them
    $('.fade-in').css({
        'display': 'inherit',
        'opacity': 0,
        'position': 'relative',
        'left': '100px'
    });

    // Apply fade-in and slide-in animation to each section
    $('.fade-in').each(function (index) {
        $(this).delay(index * 120).animate({
            'opacity': 1,
            'left': '0',
        }, 500);
    });
});
