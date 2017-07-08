 

/* Main page effects */

// Top menu effects 
$(function() {
  
  // Init ScrollMagic Controller
  var scrollMagicController = new ScrollMagic();
  
  // Create Animation for 0.5s
  var tween = TweenMax.to('#animate', 0.5, {
    backgroundColor: 'rgb(255, 39, 46)',
    scale: 5
  });
  
  // Create the Scene and trigger when visible
  var scene = new ScrollScene({
    triggerElement: '#scene',
    offset: 150 /* offset the trigger 150px below #scene's top */
  })
  .setTween(tween)
  .addTo(scrollMagicController);
  
  // Add debug indicators fixed on right side
   scene.addIndicators();
  
});


// $(function () {

//     var header = $('header');
//     var wrap = $('.wrap');

//     $( "p:last" ).text( "html scrollTop:" + $("html").scrollTop() );
//     alert( "Высота документа = " + $("html").height() );
//     alert( "Размер окна: \n" + $(window).width() + "\n" + $(window).height() )

//     window.scroll(function () {
//         header.addClass( '.scrolled' );
//     });
// });

$(function(){

    $('figure').hover(

        function() {

            $( this ).addClass( 'zoom-effect' );
            $( this ).find( '.figurecircle' ).addClass( 'scale-effect' );

        }, function() {

            $( this ).removeClass( 'zoom-effect' );
            $( this ).find( '.figurecircle' ).removeClass( 'scale-effect' );
        });

	return false;
});

// FOTOBLOCKs owl carousels

$(function(){

    var fotoblocks = ['#carousel-monte', '#fotoblock-2', '#fotoblock-3', '#fotoblock-4', '#fotoblock-5', '#fotoblock-6', '#fotoblock-7', '#fotoblock-8', '#fotoblock-9', '#fotoblock-10', '#fotoblock-11', '#fotoblock-12', '#fotoblock-13', '#fotoblock-14', '#fotoblock-15', '#fotoblock-16', '#fotoblock-17', '#fotoblock-18', '#fotoblock-19', '#fotoblock-20'];

    $.each(fotoblocks, function(index, value){
        $(value).owlCarousel({
            items : 6,
            itemsDesktop : [1800,5],
            itemsDesktopSmall : [1730,4],
            itemsTablet: [1350,3],
            itemsMobile : [900,1],
            autoPlay : false,
            pagination : false
        });
    });

    // Custom Navigation Events
    $(".next").click(function(){
    owl.trigger('owl.next');
    })
    $(".prev").click(function(){
    owl.trigger('owl.prev');
    })
    $(".play").click(function(){
    owl.trigger('owl.play',2500); //owl.play event accept autoPlay speed as second parameter
    })
    $(".stop").click(function(){
    owl.trigger('owl.stop');
    })

});

// Cookies for page-preload module

 $(document).ready(function() {

    var cookie_date = new Date;
    var doc_adress = (window.location.href).substr((window.location.protocol.length + 2));

    function get_cookie ( cookie_name )
        {
            var results = document.cookie.match ( '(^|;)?' + cookie_name + '=([^;]*)(;|$)' );

            if ( results )
                return ( unescape ( results[2] ) );
            else
                return null;
        }

    function set_cookie ( name, value, cookie_date, path, domain, secure )
        {
            var cookie_string = name + "=" + escape ( value );

            if ( cookie_date )
            {
                cookie_string += "; expires=" + cookie_date.toGMTString();
            }

            if ( path )
                    cookie_string += "; path=" + escape ( path );

            if ( domain )
                    cookie_string += "; domain=" + escape ( domain );

            if ( secure )
                    cookie_string += "; secure";

            document.cookie = cookie_string;
        }

    if (  !get_cookie ( doc_adress ) )
        {
            console.log("Entered Depreload Script");
            setTimeout(function(){
                $("#depreload .wrapper").animate({ opacity: 1 });
            }, 400);

            setTimeout(function(){
                $("#depreload .perc").animate({ opacity: 1 });
            }, 800);

            var canvas  = $("#depreload .line")[0],
                context = canvas.getContext("2d");

            context.beginPath();
            context.arc(280, 280, 260, Math.PI * 1.5, Math.PI * 1.6);
            context.strokeStyle = '#fff';
            context.lineWidth = 5;
            context.stroke();

            var loader = $("body").DEPreLoad({
                OnStep: function(percent) {

                    $("#depreload .line").animate({ opacity: 1 });
                    $("#depreload .perc").text(percent + " %");

                    if (percent > 5) {
                        context.clearRect(0, 0, canvas.width, canvas.height);
                        context.beginPath();
                        context.arc(280, 280, 260, Math.PI * 1.5, Math.PI * (1.5 + percent / 50), false);
                        context.stroke();
                    }
                },
                OnComplete: function() {
                    console.log('Images are loaded!');

                    $("#depreload .perc").text("MONTE");
                    $("#depreload .loading").animate({ opacity: 0 },800);
                    setTimeout(function(){
                        $("#depreload" ).addClass( 'zoom-out-effect' );
                    }, 1100);
                    setTimeout(function(){
                        $("#depreload" ).remove();
                    }, 1700);

                    cookie_date.setTime ( cookie_date.getTime() + 60*60*24*1000 );
                    set_cookie (doc_adress, "preloaded-page", cookie_date);
                }
            });
        }
        else {
            $("#depreload" ).remove();
            console.log( doc_adress + " - " + get_cookie(doc_adress) );
        }
});



