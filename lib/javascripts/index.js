// var apiURL = 'https://quantified-self-0.herokuapp.com/api/v1'
var apiURL = 'https://fast-meadow-36413.herokuapp.com/api/v1'
var foodRequest = new XMLHttpRequest();
var mealRequest = new XMLHttpRequest();


function getFoods(){
  foodRequest.open('GET', apiURL + "/foods")
  foodRequest.onload = function() {
    var foods = JSON.parse(foodRequest.responseText)

    formatFoods(foods)
  };
  foodRequest.send();

}

function formatFoods(food_data){
  $("#food-table").append(`<tr><th>Name</th><th>Calories</th></tr>`)
  for(var i=0; i<food_data.length; i++){
      $("#food-table").append(`<tr><td>${food_data[i].name} </td> <td>${food_data[i].calories} </td></tr>`)
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
  var totalCalories = 0;
  for(var i=0; i<meal_data.length; i++){
    var mealTotalCalories = 0;
      $("#diary").append(`<h3>${meal_data[i].name}</h3> <table id="${meal_data[i].name}"><tr><th>Name</th><th>Calories</th> </tr></table>` )
      for (var j = 0; j< meal_data[i].foods.length; j++){
        totalCalories += meal_data[i].foods[j].calories
        mealTotalCalories += meal_data[i].foods[j].calories
        $(`#${meal_data[i].name}`).append(`<tr><td>${meal_data[i].foods[j].name} </td> <td>${meal_data[i].foods[j].calories} </td></tr>`)
      }
      $(`#${meal_data[i].name}`).append(`<tr><td>Total Calories</td><td>${mealTotalCalories}</td></tr>`)
      $(`#${meal_data[i].name}`).append(`<tr><td>Remaining Calories</td><td>${500 - mealTotalCalories}</td></tr>`)
  }
    $(`#diary`).append(`<h3>Totals</h3><table id='goals'></table>`)
    $('#goals').append(`<tr><td>Goal Calories</td><td>2000</td></tr>`)
    $('#goals').append(`<tr><td>Calories Consumed</td><td>${totalCalories}</td></tr>`)
    $('#goals').append(`<tr><td>Remaining Calories</td><td>${2000 - totalCalories}</td></tr>`)
}


getFoods();
getMeals();
