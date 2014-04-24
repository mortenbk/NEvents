angular.module("app").directive("manageCalendar", function($compile, neEvent) {


    var cal = function (scope, element, attrs) {
        $(element).fullCalendar({
            events: "api/event",
            //weekends: false,
            weekNumbers: true,
            timeFormat: "H(:mm)",
            monthNames: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli",
                "August", "September", "Oktober", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Okt", "Nov", "Dec"],
            dayNames: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
            dayNamesShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
            dayClick: function (date, allDay, jsEvent, view) {

                if (allDay) {
                } else {
                }

                if (!($(this).hasClass("fc-past"))) {
                    //Remove selected class on all
                    $(".fc-widget-content").removeClass("daySelected");
                    $("#newEventLink").remove();
                    //add selected class to current selection

                    $(this).addClass("daySelected").append($compile("<a id='newEventLink' ng-click='newEvent()'>New Event</a>")(scope));
                    scope.date = date;
                }
            }
        });
    };


    return {
        restrict: "C",
        link: cal
    }



});