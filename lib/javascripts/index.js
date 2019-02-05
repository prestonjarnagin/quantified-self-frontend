// var apiURL = 'https://quantified-self-0.herokuapp.com/api/v1'
var apiURL = 'http://localhost:3000/api/v1'

var foodRequest = new XMLHttpRequest();
var mealRequest = new XMLHttpRequest();
var newFoodRequest = new XMLHttpRequest();


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
  $('#diary').empty();
  var totalCalories = 0;
  for(var i=0; i<meal_data.length; i++){
    var mealTotalCalories = 0;
      $("#diary").append(`<h3>${meal_data[i].name}</h3> <table id="${meal_data[i].name}"><tr><th>Name</th><th>Calories</th> </tr></table>` )
      for (var j = 0; j< meal_data[i].foods.length; j++){
        totalCalories += parseInt(meal_data[i].foods[j].calories)
        mealTotalCalories += parseInt(meal_data[i].foods[j].calories)
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

function makeFood() {
  var foodName = $("#new-food-name").val()
  var foodCals = $("#new-food-calories").val()
  var body = {"name": foodName, "calories": foodCals}

  newFoodRequest.open('POST', apiURL + `/foods`, true)

  newFoodRequest.onload = function() {

    getMeals()
  };
  newFoodRequest.send("Hello");

  // fetch(`${apiURL}/foods`, {
  //   method: "POST",
  //   body: JSON.stringify(body),
  //   headers:{"Content-Type": "application/json",
  //            "Accept": "application/json"
  //          }
  // })
  // .then((response) => {
  //   getMeals()
  // })
}

$("#submit-new-foods").click(function (){
  makeFood()
})

getFoods();
getMeals();
