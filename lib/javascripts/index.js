// var apiURL = 'https://quantified-self-0.herokuapp.com/api/v1'
var foodRequest = new XMLHttpRequest();
var mealRequest = new XMLHttpRequest();

// Food Search Event Listener
$('#food-search-box').keyup(function(data){
  let search = $('#food-search-box')
  let query = search.val().toUpperCase();
  let foods = $('#food-table')
  let rows = foods.children('tr')

  for (let i = 0; i < rows.length; i++) {
    let foodEntry = rows[i].getElementsByTagName("td")[0];
    if (foodEntry) {
      let food = foodEntry.innerText;
      if (food.toUpperCase().indexOf(query) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
});

function getFoods(){
  foodRequest.open('GET', apiURL + "/foods")
  foodRequest.onload = function() {
    var foods = JSON.parse(foodRequest.responseText)

    formatFoods(foods)
  };
  foodRequest.send();

}

function formatFoods(food_data){
  $("#food-table").empty();
  $("#food-table").append(`<tr><th>Name</th><th>Calories</th></tr>`)
  for(var i=0; i<food_data.length; i++){
    let foodID = food_data[i].id
    let deleteButton = `<button class="food-delete-button" id="food-${foodID}">Delete</button>`
      $("#food-table").append(`<tr><td>${food_data[i].name} </td> <td>${food_data[i].calories} </td><td>${deleteButton}</td></tr>`)
  }
  let buttons = document.getElementsByClassName('food-delete-button');
  for(i = 0; i < buttons.length; i++){
    let foodID1 = parseInt(foodID1 = buttons[i].id.match(/\d+/)[0])
    buttons[i].addEventListener("click", function(){ deleteFood(foodID1) });
  }
}

function getMeals(){
  mealRequest.open('GET', apiURL + "/meals")
  mealRequest.onload = function() {
    var meals = JSON.parse(mealRequest.responseText)

    formatMeals(meals)
  };
  mealRequest.send();
}

function formatMeals(meal_data){
  $("#diary").empty();
  for(var i=0; i<meal_data.length; i++){
      $("#diary").append(`<h3>${meal_data[i].name}</h3> <table id="${meal_data[i].name}"><tr><th>Name</th><th>Calories</th> </tr></table>` )
      for (var j = 0; j< meal_data[i].foods.length; j++){
        $(`#${meal_data[i].name}`).append(`<tr><td>${meal_data[i].foods[j].name} </td> <td>${meal_data[i].foods[j].calories} </td></tr>`)
      }
  }
}

function deleteFood(foodID){
  fetch(`${apiURL}/foods/${foodID}`, {
    method: 'DELETE',
    headers:{'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
  })
  .then((response) => {
    if(response.ok){
      getFoods();
      getMeals();
    }
    else{

    }
  })
}

// function getFoodMeals(mealID){
//   var foodMealRequest = new XMLHttpRequest();
//   foodMealRequest.open('GET', apiURL + "/meals/"+ mealID+"/foods")
//   foodMealRequest.onload = function() {
//
//     var meal = JSON.parse(foodMealRequest.responseText)
//     formatFoodMealTable(meal)
//   };
//   foodMealRequest.send();
// }

getFoods();
getMeals();
