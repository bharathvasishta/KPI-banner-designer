$(function() {
    ////////////////// Deleting KPI //////////////////////////////////

    $('body').on("click", "#kpiClose", function() {
        $(this).closest('.wrapper').remove();
    });
    $('.kpicontent').resizable().draggable({
        containment: ".wrapper"
    }).sortable({
        connectWith: ".connectedSortable"
    });

    /////////////////////// Clone previous KPI ///////////////////
    /* $('body').on("click", ".cloneKpi", function(){
         $('.kpicontent:last-child').clone().appendTo('.kpibody').children().draggable().resizable();
         //var clone = $('.kpicontent:last-child').children().clone(); $(clone).appendTo('.kpibody').draggable().resizable();
     });*/

    /////////////////////// Resizable KPI ////////////////////

    var originalHeight = parseInt($(".wrapper").height(), 10);
    $('body').on("mouseover", ".wrapper", function() {
        $('.wrapper').resizable({
            minWidth: originalHeight,
            minHeight: originalHeight - 20,
            // maxWidth:500,
            //handles: 'n, e, s, w, se, ne, sw, nw'
        });
    });

    //////////////////////////// Appending Divider to the KPI ///////////////////////                
    $('body').on("click", ".divider", function() {
        $('.kpibody').append(`<div style="" class="kpidivide"></div>`);
        $('.kpidivide').draggable({
            containment: ".wrapper"
        }).resizable({
            maxHeight: $('.wrapper').height(),
            maxWidth: $('.wrapper').width(),
            handles: 'n, e, s, w, se, ne, sw, nw',
        });

    });

    //////////////////////////// Appending Indicators to the KPI ///////////////////////                
    $('body').on("click", ".indicator", function() {
        $('.kpibody').append(`<i class="fas fa-arrow-alt-circle-up draggable"></i>`);
        $('.kpibody i').draggable({
            containment: ".wrapper"
        });

    });

    //////////////////////////// Appending Text to the KPI ///////////////////////                
    $('body').on("click", ".text", function() {
        $('.kpibody').append(`<div class="draggable kpiparagraph"><p style="font-size:10pt">This is a placeholder text.</p></div><br>`);



        function getContentDiagonal(ui) {
//            var initDiagonal;
//            var initFontSize;
            /*$('.kpiparagraph').on('mouseenter', function(){
                var contentWidth = $(this).width();
                var contentHeight = $(this).height();
                var ContentDiagonal = contentWidth * contentWidth + contentHeight * contentHeight;
            });*/
//            var contentWidth = $('.kpiparagraph').width();
//            var contentHeight = $('.kpiparagraph').height();
//            return contentWidth * contentWidth + contentHeight * contentHeight;
            
            if(Object.keys(ui).length > 0){
                var contentWidth = $(ui.element).width();
                var contentHeight = $(ui.element).height();
                return contentWidth * contentWidth + contentHeight * contentHeight;
            }
            else{
                var contentWidth = $('.kpiparagraph').width();
                var contentHeight = $('.kpiparagraph').height();
                return contentWidth * contentWidth + contentHeight * contentHeight;
            }
            

        }

        $('.kpiparagraph').draggable({
            helper: "original",
            containment: ".wrapper",
            appendTo: ".droppable"
        });
        $('.kpiparagraph').resizable({

            //                            animate: true,
            maxHeight: $('.wrapper').height(),
            maxWidth: $('.wrapper').width(),
            alsoResize: $(this).find("p"),
            handles: 'n, e, s, w, se, ne, sw, nw',
            create: function(event, ui) {
                initDiagonal = getContentDiagonal(ui);
                initFontSize = parseInt($(this).find("p").css("font-size"));
            },
            resize: function(e, ui) {
                var newDiagonal = getContentDiagonal(ui);
                var ratio = newDiagonal / initDiagonal;
                $(this).find("p").css("font-size", initFontSize + ratio * 2 + 'px');

            }
        });
    });



    //////////////////////////// Appending charts to the KPI ///////////////////////               
    $('.chart').click(function() {
        $('.kpibody').append(`<div class="chart-container draggable" style="position: relative; height:fit-content;width:100px">
                     <canvas id="myChart1" style-"width:inherit"></canvas>
                </div>`);
        $('.chart-container').resizable({
            maxWidth: $('.wrapper').width(),
            minWidth: 32,
            maxHeight: $('.wrapper').height(),
            minHeight: 20,
            handles: 'n, e, s, w, se, ne, sw, nw'
        }).draggable({
            containment: ".wrapper"
        });
    });

    ////////////////////// Appending another section /////////////////////////////      

    $('body').on("click", ".addnewcontainer", function() {

        $('.kpibody').append(`<div class="kpicontent connectedSortable" style="border: 1px dotted skyblue;width:2px;margin:0 5px; 
    min-height: 100px;"></div>`);
        $('.kpicontent').draggable({
                containment: ".wrapper"
            })
            .resizable({
                maxWidth: $('.wrapper').width(),
                minWidth: 32,
                maxHeight: $('.wrapper').height(),
                minHeight: 20,
                handles: 'n, e, s, w, se, ne, sw, nw'
            })
            .droppable({
                accept: ".draggable",
                drop: dropAnimate
            }).sortable();
    });


    ////////////// KPI Droppable /////////////////////

    //$('.draggable').css("left","0");
    $('.kpicontent').droppable({
        accept: ".draggable",
        drop: dropAnimate
        /*drop: function(event, ui) {
            $(this).append($("ui.draggable").clone());
            $(".draggable").addClass("item");
            $(".item").removeClass("ui-draggable draggable");
            $(".item").draggable({
                containment: this
            });
        }*/
        /*drop: function(ev, ui)
                    {

              var dropElem = ui.draggable.html();

                      clone = $(dropElem).clone(); // clone it and hold onto the jquery object
                      clone.id="newId";
                      clone.css("position", "absolute");
          clone.css("top", ui.absolutePosition.top);
                      clone.css("left", ui.absolutePosition.left);
              clone.draggable({ containment: 'parent' ,cursor: 'crosshair'});

                      $(this).append(clone);
                      alert("done dragging ");

               
                      $('#newId').css("visibility","hidden");



               }*/
    });

    function dropAnimate(event, ui) {
        // ui.draggable.removeProp("left");
        var kpiHeight = parseInt($(this).height(), 10);
        var kpiWidth = parseInt($(this).width(), 10);
        ui.draggable.appendTo($(this));
        ui.draggable.css({
            "position": "sticky",
            "margin-bottom": "-40px",
            "margin-right": "-10px"
        });
        //ui.draggable.detach().appendTo($(this));
        ui.draggable.draggable({
                containment: this,
            })
            .resizable({
                maxWidth: kpiWidth,
                maxHeight: kpiHeight - 20
            });

    }



    /* $('.kpicontent').hover(function(){
          var initDiagonal;
          var initFontSize;

      function getContentDiagonal() {
          var contentWidth = $('.kpiparagraph').width();
          var contentHeight = $('.kpiparagraph').height();
          return contentWidth * contentWidth + contentHeight * contentHeight;
      }
          
          $('.kpicontent').draggable({ containment: ".wrapper" }).resizable({
              
              maxHeight: $('.wrapper').height(),
              alsoResize: $(this).find('.kpiparagraph'),
              create: function(event, ui) {
                  
                  initDiagonal = getContentDiagonal();
                  initFontSize = parseInt($('.kpiparagraph').css("font-size"));
              },
              resize: function(e, ui) {
                  console.log(this);
                  var newDiagonal = getContentDiagonal();
                  var ratio = newDiagonal / initDiagonal;
                  $(this).find('.kpiparagrapgh').css("font-size", initFontSize + ratio * 3);
              }
      });
      
      });*/

    var ui = $(".kpicontent").closest(".ui-dialog");
    ui.resizable("option", "containment", '.wrapper');



    ////////////////////////// CHART ////////////////////////////

    var ctx2 = document.getElementById('myChart2').getContext('2d');
    myChart = new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['a', 'b', 'c', 'd', 'e', 'f'],
            datasets: [{
                label: '# of Votes',
                data: [2, 9, 13, 18, 11, 16],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    var ctx1 = document.getElementById('myChart1').getContext('2d');
    var myChart = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 8, 16, 6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });


    /*var app = angular.module('mykpi', []);
            app.controller('kpicontrol', function($scope){
                $scope.kpiTitle = "New KPI";
            });*/

});