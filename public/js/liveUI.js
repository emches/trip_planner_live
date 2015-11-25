
$(document).ready(function() {

//ADD

//add hotels to itinerary with "+" button (one allowed)

function itineraryItem (name){
    this.title = name;
    this.snippet = '<div class="itinerary-item"><span class="title">'+ this.title + '</span><button class="btn btn-xs btn-danger remove btn-circle">x</button></div>';
}

$("button.add-btn").on("click", function(){
    var listGroup
    var isHotel = false;
    if (  $(this).prev('select').hasClass('hotelSelector') ) {
        listGroup = $('.hotel-group');
        isHotel = true;
    } else if ( $(this).prev('select').hasClass('restaurantSelector')){
        listGroup = $('.restaurant-group');
    } else {
         listGroup = $('.activity-group');
    }

    var name = $(this).prev().children('option:selected').text()
    var item = new itineraryItem(name)
    var existingItems = listGroup.children('.itinerary-item:contains(' + name + ')')
    console.log("existingItems", existingItems);

    if (isHotel && $('.hotel-group').children().length > 0 ){
            $('.hotel-group').children().replaceWith(item.snippet);
    }  else {
            if (existingItems.length ===0) {listGroup.append(item.snippet)
            }
    }
})



//add restaurante to itinerary with "+" button (mult allowed)

//add Things To Do to itinerary with "+" button (mult allowed)

// add Days by clicking "+"

// adjust map on Add

// drop marker on Add


//REMOVE
//remove hotels from itinerary with "X" button

//remove restaurant from itinerary with "X" button


//remove things to do from itinerary with "X" button

// remove days by clicking "X"

// remove marker on Remove

// TOGGLES

// Clicking Day switches view to selected Day

// Days turns white on mouseover

});