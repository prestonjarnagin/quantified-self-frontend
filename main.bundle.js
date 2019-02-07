/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	var apiURL = 'https://quantified-self-0.herokuapp.com/api/v1';
	var date = new Date();

	// var apiURL = 'http://localhost:3000/api/v1'

	var foodRequest = new XMLHttpRequest();
	var mealRequest = new XMLHttpRequest();
	var newFoodRequest = new XMLHttpRequest();
	var mealIdsRequest = new XMLHttpRequest();

	// Food Search Event Listener
	$('#food-search-box').keyup(function (data) {
	  var search = $('#food-search-box');
	  var query = search.val().toUpperCase();
	  var foods = $('#food-table');
	  var rows = foods.children('tr');

	  for (var i = 0; i < rows.length; i++) {
	    var foodEntry = rows[i].getElementsByTagName("td")[0];
	    if (foodEntry) {
	      var food = foodEntry.innerText;
	      if (food.toUpperCase().indexOf(query) > -1) {
	        rows[i].style.display = "";
	      } else {
	        rows[i].style.display = "none";
	      }
	    }
	  }
	});

	function getFoods() {
	  foodRequest.open('GET', apiURL + "/foods");
	  foodRequest.onload = function () {
	    var foods = JSON.parse(foodRequest.responseText);

	    formatFoods(foods);
	  };
	  foodRequest.send();
	}

	function formatFoods(food_data) {
	  $("#food-table").empty();
	  $("#food-table").append('<tr><th>Name</th><th>Calories</th></tr>');
	  for (var i = 0; i < food_data.length; i++) {
	    var foodID = food_data[i].id;
	    var deleteButton = '<button class="food-delete-button" id="food-' + foodID + '">Delete</button>';
	    $("#food-table").append('<tr><td>' + food_data[i].name + ' </td> <td>' + food_data[i].calories + ' </td><td>' + deleteButton + '</td></tr>');
	  }

	  makeFoodDeleteButtons();

	  $("#add-foods-table").empty();
	  $("#add-foods-table").append('<tr><th>Name</th><th>Calories</th></tr>');
	  for (var i = 0; i < food_data.length; i++) {
	    var _foodID = food_data[i].id;
	    $("#add-foods-table").append('<input class="food-checkbox" id="' + food_data[i].id + '-checkbox" type="checkbox"><tr><td>' + food_data[i].name + ' </td> <td>' + food_data[i].calories + ' </td></tr><br>');
	  }
	  hideDiary();
	}

	function makeFoodDeleteButtons() {
	  var buttons = document.getElementsByClassName('food-delete-button');

	  var _loop = function _loop() {
	    var foodID1 = parseInt(foodID1 = buttons[i].id.match(/\d+/)[0]);
	    buttons[i].addEventListener("click", function () {
	      deleteFood(foodID1);
	    });
	  };

	  for (var i = 0; i < buttons.length; i++) {
	    _loop();
	  }
	}

	function hideDiary() {
	  document.getElementById('foods-page').style.display = "block";
	  document.getElementById('diary').style.display = "none";
	  document.getElementById('date-form').style.display = "none";
	  document.getElementById('add-foods-table').style.display = "none";
	  document.getElementById('add-foods-buttons').style.display = "none";
	}

	function getMeals(calendar) {
	  mealRequest.open('GET', apiURL + "/meals");
	  mealRequest.onload = function () {
	    var meals = JSON.parse(mealRequest.responseText);

	    formatMeals(meals);
	  };
	  mealRequest.send();

	  getMealIds(calendar);
	}

	function getMealIds(calendar) {
	  mealIdsRequest.open('GET', apiURL + "/meals_ids");
	  mealIdsRequest.onload = function () {
	    var meal_ids = JSON.parse(mealIdsRequest.responseText);

	    formatMealButtons(meal_ids, calendar);
	  };
	  mealIdsRequest.send();
	}

	function formatMealButtons(meal_ids, calendar) {
	  if (!calendar) {
	    document.getElementById('date-form').style.display = "block";
	    document.getElementById('add-foods-table').style.display = "none";
	    document.getElementById('add-foods-buttons').style.display = "none";
	  } else {
	    document.getElementById('date-form').style.display = "none";
	    document.getElementById('add-foods-table').style.display = "block";
	    document.getElementById('add-foods-buttons').style.display = "block";
	  }
	  document.getElementById('diary').style.display = "block";
	  document.getElementById('foods-page').style.display = "none";

	  $("#add-foods-buttons").empty();

	  meal_ids.forEach(function (meal) {
	    $("#add-foods-buttons").append('<button id="' + meal.id + '-button" class="meal-button"> ' + meal.name + ' </button>');
	    document.getElementById(meal.id + '-button').addEventListener("click", function () {
	      makeFoodMeal(meal.id);
	    }, true);
	  });
	}

	function formatMeals(meal_data) {
	  $('#diary').empty();
	  var totalCalories = 0;

	  for (var i = 0; i < meal_data.length; i++) {
	    var mealTotalCalories = 0;
	    $("#diary").append('<div class="meal"><h3>' + meal_data[i].name + '</h3> <table id="' + meal_data[i].name + '" class="meal-table table" ><thead class="thead-dark"><tr><th scope="col">Name</th><th scope="col">Calories</th><th scope="col"> Delete</th> </tr></thead></table></div>');
	    for (var j = 0; j < meal_data[i].foods.length; j++) {
	      var unix = Date.parse(meal_data[i].foods[j].meal_food_updated_at);
	      var mealDate = new Date(unix);
	      if (checkDate(mealDate)) {
	        buildMeal(meal_data, i, j, totalCalories, mealTotalCalories);
	      }
	    }
	    $('#' + meal_data[i].name).append('<tr><td>Total Calories</td><td>' + mealTotalCalories + '</td></tr>');
	    $('#' + meal_data[i].name).append('<tr><td>Remaining Calories</td><td>' + (500 - mealTotalCalories) + '</td></tr>');
	  }
	  appendCalories(totalCalories);
	}

	function buildMeal(meal_data, i, j, totalCalories, mealTotalCalories) {
	  var foodCalories = meal_data[i].foods[j].calories;
	  totalCalories += parseInt(foodCalories);
	  mealTotalCalories += parseInt(foodCalories);
	  $('#' + meal_data[i].name).append('<tr><td>' + meal_data[i].foods[j].name + ' </td> <td>' + foodCalories + ' </td><td><button id="remove-food-' + meal_data[i].foods[j].id + '-meal-' + meal_data[i].id + '-button" class="remove-food-meal-button">X</button></td></tr>');

	  var foodId = meal_data[i].foods[j].id;
	  var mealId = meal_data[i].id;

	  document.getElementById('remove-food-' + meal_data[i].foods[j].id + '-meal-' + meal_data[i].id + '-button').addEventListener("click", function () {
	    deleteFoodMeal(foodId, mealId);
	  }, true);
	}

	function checkDate(mealDate) {
	  if (date.getFullYear() == mealDate.getFullYear() && date.getMonth() == mealDate.getMonth() && date.getDate() == mealDate.getDate()) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function appendCalories(totalCalories) {
	  $('#diary').append('<div id="totals"></div>');
	  $('#totals').append('<h3>Totals</h3><table id=\'goals\'></table>');
	  $('#goals').append('<thead class="thead-dark"><tr><td scope="col">Goal Calories</td><td>2000</td></tr></thead>');
	  $('#goals').append('<tr><td>Calories Consumed</td><td>' + totalCalories + '</td></tr>');
	  $('#goals').append('<tr><td>Remaining Calories</td><td>' + (2000 - totalCalories) + '</td></tr>');
	}

	function deleteFood(foodID) {
	  fetch(apiURL + '/foods/' + foodID, {
	    method: 'DELETE',
	    headers: { 'Content-Type': 'application/json',
	      'Accept': 'application/json'
	    }
	  }).then(function (response) {
	    if (response.ok) {
	      getFoods();
	    } else {}
	  });
	}

	function makeFood() {
	  var foodName = $("#new-food-name").val();
	  var foodCals = $("#new-food-calories").val();
	  var body = { name: foodName, calories: foodCals };

	  $.ajax({
	    type: "POST",
	    url: apiURL + "/foods",
	    data: body,
	    dataType: "json",
	    success: getFoods()
	  });
	}

	function makeFoodMeal(meal_id) {
	  var allFoods = document.getElementsByClassName("food-checkbox");

	  for (var i = 0; i < allFoods.length; i++) {
	    if (allFoods[i].checked) {
	      var foodId = allFoods[i].id.split("-")[0];

	      $.ajax({
	        type: "POST",
	        url: apiURL + ('/meals/' + meal_id + '/foods/' + foodId),
	        dataType: "json"
	      });
	    }
	  }
	  getMeals();
	}

	$("#submit-new-foods").click(function () {
	  makeFood();
	});

	function deleteFoodMeal(food_id, meal_id) {
	  $.ajax({
	    type: "DELETE",
	    url: apiURL + ('/meals/' + meal_id + '/foods/' + food_id),
	    dataType: "json"
	  });
	}

	function changeDate() {
	  var newDate = document.getElementById("diary-date").value + "MST";
	  if (newDate != "MST") {
	    date = new Date(newDate);
	  }

	  getMeals(false);
	}

	document.getElementById('change-date-button').addEventListener("click", changeDate, true);
	document.getElementById('diary-page-button').addEventListener("click", getMeals, true);
	document.getElementById('foods-page-button').addEventListener("click", getFoods, true);
	document.getElementById('calendar-page-button').addEventListener("click", function () {
	  getMeals(false);
	}, true);

	getFoods();

/***/ })
/******/ ]);