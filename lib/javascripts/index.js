var apiURL = 'https://quantified-self-0.herokuapp.com/api/v1'
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

  for(var i=0; i<meal_data.length; i++){
      $("#diary").append(`<h3>${meal_data[i].name}</h3> <table><tr><th>Name</th><th>Calories</th> </tr></table>` )
  }
}

getFoods();
getMeals();
