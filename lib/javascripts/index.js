var apiURL = 'https://quantified-self-0.herokuapp.com/api/v1'
var request = new XMLHttpRequest();

function getFoods(){
  request.open('GET', apiURL + "/foods")
  request.onload = function() {
    var foods = JSON.parse(request.responseText)

    formatFoods(foods)
  };
  request.send();

}
getFoods();

function formatFoods(food_data){
  $("#food-table").append(`<tr><th>Name</th><th>Calories</th></tr>`)
  for(var i=0; i<food_data.length; i++){
      $("#food-table").append(`<tr><td>${food_data[i].name} </td> <td>${food_data[i].calories} </td></tr>`)
  }

}
