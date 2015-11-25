
$(document).ready(function() {
    markers = [];
    locations = [];
    var map = initialize_gmaps();

    var getPlaceObject = function (typeOfPlace, nameOfPlace) {
        console.log(typeOfPlace, nameOfPlace);

        var placeCollection = window['all_' + typeOfPlace];

        return placeCollection.filter(function (place) {
            return place.name === nameOfPlace;
        })[0];

    };



//ADD

//add hotels to itinerary with "+" button (one allowed)

    function itineraryItem (name){
        this.title = name;
        this.snippet = '<div class="itinerary-item"><span class="title">'+ this.title + '</span><button class="btn btn-xs btn-danger remove remove-itin btn-circle">x</button></div>';
    };

    $("button.add-btn").on("click", function(){
        var listGroup
        var isHotel = false;
        if (  $(this).prev('select').hasClass('hotelSelector') ) {
            listGroup = $('#hotels-group');
            isHotel = true;
        } else if ( $(this).prev('select').hasClass('restaurantSelector')){
            listGroup = $('#restaurants-group');
        } else {
             listGroup = $('#activities-group');
        }

        var name = $(this).prev().children('option:selected').text()
        var item = new itineraryItem(name)
        var existingItems = listGroup.children('.itinerary-item:contains(' + name + ')')
        console.log("existingItems", existingItems);
        var sectionName = listGroup.attr("id").split("-")[0];
        var placeObj = getPlaceObject(sectionName, name);


        drawLocation(map, placeObj.place[0].location);
        locations.push(placeObj.place[0].location);
        if (isHotel && $('#hotels-group').children().length > 0 ){
            $('#hotels-group').children().replaceWith(item.snippet);
        } else {
            if (existingItems.length ===0) {
                listGroup.append(item.snippet).data("marker", newMarker);
            }
        }


    });
// add Days by clicking "+"

    $(".add-day-btn").on("click", function() {
        var dayCount = $(".day-buttons").children().length;
        $('<button class="btn btn-circle day-btn">'+dayCount+'</button>').insertBefore(".add-day-btn");
    });







// adjust map on Add

// drop marker on Add

//REMOVE


    $('.list-group').on("click", "button", function() {
        var name = $(this).siblings("span").text();
        var sectionName = $(this).parent().parent().attr("id").split("-")[0];
        var location = getPlaceObject(sectionName, name).place[0].location;
        
        markers[locations.indexOf(location)].setMap(null);
        locations[locations.indexOf(location)] = 0;
        $(this).parent().remove();
    })

    $('.day-remove').on("click", function() {
        var $this = $(this);       
        var $day = $this.siblings().text().split(" ")[1];
        console.log("hello", $day)
        $(".day-btn").filter(function(index) {return $(this).text() === $day}).remove();
        $(".day-btn").filter(function(index) {
            return $(this).text() > $day})
        .map(function(index) {
            $(this).text((parseInt($(this).text()) - 1).toString())
            return $(this)
        })
    })

// remove days by clicking "X"


// remove marker on Remove

// TOGGLES

// Clicking Day switches view to selected Day

// Days turns white on mouseover

});