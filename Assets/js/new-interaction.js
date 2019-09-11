
    
    $('body').on("click", "#kpiClose", function(){
      $(this).closest('.wrapper').remove();});
        $('.kpicontent').resizable().draggable({containment:".wrapper"}).sortable({connectWith: ".connectedSortable"});
                
        $('#kpisort1').sortable({connectWith: ".connectedSortable"});
        $('#kpisort2').sortable({connectWith: ".connectedSortable"});
        $("#kpisort1, #kpisort2").disableSelection();
    
    
    var originalHeight = parseInt($(".wrapper").height(),10);
                $('body').on("mouseover", ".wrapper", function(){
                    $('.wrapper').resizable({
                        minWidth: originalHeight,
                        minHeight: originalHeight-20,
                    });
                });
    
    var ui = $(".kpicontent").closest(".ui-dialog");
                  ui.resizable("option", "containment", '.wrapper');
    
    
        ////////////////////// Appending another section /////////////////////////////      
                
                $('body').on("click", ".addnewcontainer", function(){
                     
                   $('.kpibody').append(`<div class="kpicontent connectedSortable" style="border: 1px dotted skyblue;width:2px;margin:0 5px; 
    min-height: 100px;"></div>`);
                     $('.kpicontent').draggable({containment:".wrapper"})
                         .resizable({
                            maxWidth: $('.wrapper').width(),
                            minWidth:32,
                            maxHeight: $('.wrapper').height(),
                            minHeight: 20,
                            handles: 'n, e, s, w, se, ne, sw, nw'
                             }).sortable({connectWith: ".connectedSortable"});
                });
    
 //////////////////////////// Appending Indicators to the KPI ///////////////////////                
                $('body').on("click", ".indicator", function(){
                    $('.kpibody').append(`<li class="fas fa-arrow-alt-circle-up draggable"></li>`);
                    $('.kpibody li').draggable({  containment: ".wrapper",revert: "invalid", helper:"clone"});
                    
                });
                
 //////////////////////////// Appending Text to the KPI ///////////////////////                
                $('body').on("click", ".text", function(){
                   $('.kpibody').append(`<li class="draggable kpiparagrapgh"><p style="font-size:10pt">This is a placeholder text.</p></li><br>`);
                    
                var initDiagonal;
                var initFontSize;

                function getContentDiagonal() {
                    var contentWidth = $(".kpiparagrapgh").width();
                    var contentHeight = $(".kpiparagrapgh").height();
                    return contentWidth * contentWidth + contentHeight * contentHeight;
                }
                    
                    $('.kpibody .kpiparagrapgh').draggable({ containment: ".wrapper", revert: "invalid", helper:"clone" }).resizable({
                        maxHeight: $('.wrapper').height(),
                        alsoResize: $('.kpiparagrapgh p'),
                        create: function(event, ui) {
                            initDiagonal = getContentDiagonal();
                            initFontSize = parseInt($(".kpiparagrapgh p").css("font-size"));
                        },
                        resize: function(e, ui) {
                            var newDiagonal = getContentDiagonal();
                            var ratio = newDiagonal / initDiagonal;

                            $(this).find("p").css("font-size", initFontSize + ratio * 3);
                        }
                    });
                });
                 
  //////////////////////////// Appending charts to the KPI ///////////////////////               
                 $('.chart').click(function(){
                    $('.kpibody').append(`<div class="chart-container draggable" style="position: relative; height:fit-content;width:100px">
                     <canvas id="myChart1"></canvas>
                </div>`);
                    $('.chart-container').resizable({
                    maxWidth: $('.wrapper').width(),
                    minWidth:32,
                    maxHeight: $('.wrapper').height(),
                    minHeight: 20,
                    handles: 'n, e, s, w, se, ne, sw, nw'
                }).draggable({  containment: ".wrapper", revert: "invalid" , helper:"clone" });
                });
                /*$('.chart-container').resizable({handles: 'n, e, s, w, se, ne, sw, nw'}).draggable(); */    
    



$('.kpicontent').droppable({
                    accept: ".draggable",
                    drop: dropAnimate
                });
                function dropAnimate(event,ui){
                    var kpiHeight = parseInt($(this).height(),10);
                    var kpiWidth = parseInt($(this).width(),10);
                    ui.draggable.appendTo($(this));
                    //ui.draggable.detach().appendTo($(this));
                    ui.draggable.draggable({
                        containment: this
                    })
                        .resizable({
                        maxWidth: kpiWidth,
                        maxHeight: kpiHeight-20
                    });
                }























