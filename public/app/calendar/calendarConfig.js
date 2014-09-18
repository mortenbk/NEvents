angular.module("app").service("calendarConfig", function () {

    return {
        config: function(scope){
            return {
            //weekends: false,
            weekNumbers: true,
            monthNames: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli",
                "August", "September", "Oktober", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Okt", "Nov", "Dec"],
            dayNames: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
            dayNamesShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
            editable: true,
            ignoreTimezone: false,
            dayClick: function (date, allDay, jsEvent, view) {

                if (allDay) {
                } else {
                }

                if (!($(this).hasClass("fc-past"))) {
                    /*$("#newEventLink").remove();*/
                    //Remove selected class on all
                    $(".fc-widget-content").removeClass("daySelected");
                    //add selected class to current selection
                    $(this).addClass("daySelected")/*.append($compile("<a id='newEventLink' ng-click='newEvent()'>New Event</a>")($scope))*/;


                }
            },
            dayRender: function (day, element) {
                element.bind('dblclick', function () {
                    if (($(element).hasClass("daySelected"))) {
                        scope.newEvent(day);
                    }

                });
            },
            eventClick: function (event, allDay, jsEvent, view) {
            },
            eventRender: function (event, element) {
                element.bind('dblclick', function () {
                    scope.editEvent(event);

                });
            },
            eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc) {

            if (!confirm("Are you sure about this change?")) {
                revertFunc();
            } else {
                if (event.location) {
                    event.location = event.location._id;
                }
                delete event.source;
                event.$update({_id: event._id});
                console.log("Sending : " + angular.toJson(event, true));
            }
        }
        }
        }
    }
});
