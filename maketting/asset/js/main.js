$(document).ready(function() {
    $('.listItem .question').click(function() {
        $('.listItem .question').removeClass('curr');
        $(this).addClass('curr');

        $('body, html').animate({ scrollTop: $(this).offset().top - 80 }, 300);
    });
});
