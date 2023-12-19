var app = angular.module('GalleryApp', ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider) { 
  //create our different views as objects
  var mainState ={
    name: 'main', //name of the object
    url: '', //url to point to, or that causes this view to be triggered
    component: 'home', //component that works with the data, loads the template
    resolve: { //data to bind to our component
      data: function(Resource) {
        return Resource.getRecipes() //make an async call to get our site data from data.json
      }
    }
  },
    recipeState = {
    name: 'main.recipe', //create the right hand info panel as an object/child of the main view
    url: '/{siteID}', //point to this url when this view is triggered
    component: 'infoPanel',
      resolve: {
        recipe: function(data, $stateParams) {
          return data.find(function(recipe) { 
            return recipe.nameofrecipe.toLowerCase()===$stateParams.siteID.toLowerCase(); //pull only the site data for the site clicked on
          });
        }
      }
  }
  //call the states
  $stateProvider.state(mainState); 
  $stateProvider.state(recipeState);
})

app.factory('Resource', function ($http) {
  var service = {
    getRecipes: function() {
      return GetSheetDone.labeledCols('2PACX-1vRiS3jHboXpxEHwjucEM8_uIiHQZtDcixj3SfFSnDh0lRspqUp8wSNhDL2gv7IGv0k4_lpjhz4CV2uH', 1).then(function(resp) {
        return resp.data; //https://docs.google.com/spreadsheets/d/e//pub?output=csv
      });
    }
  }
  return service;
})

app.component('home', {
  bindings: { data: '<'}, //make the data we loaded into the view from the factory available to this component
  templateUrl: 'views/home.html', //this is the html that we will plug our data into
  controller: function () {
    console.log(this)
    this.data.forEach(function(d,i){
      if (d.url == "") {d.url = "data/img/default.jpg"}
        //change all this in the data
        var bg = (d.speciality == "yes" || d.speciality == "Yes") ? "#ccac00" : "#445768" 
        d.bg = bg
        d.speciality = (d.speciality == "yes" || d.speciality == "Yes") ? true : false
        if (d["vegetarian"].toLowerCase() == "yes") {d.veg = true} else if (d["vegetarian"].toLowerCase() == "no" || d.veg == "") {d.veg = false}
        if (d["vegan"].toLowerCase() == "yes") {d.vegan = true} else if (d["vegan"].toLowerCase() == "no"|| d.vegan == "") {d.vegan = false}
        if (d["glutenfree"].toLowerCase() == "yes") {d.GF = true} else if (d["glutenfree"].toLowerCase() == "no"|| d.gf == "") {d.GF = false}
        d.textSearch = d.text
      if (d.text) {d.text = d.text.split(/\r\n|\r|\n/g);} else {d.text = [" ","Recipe coming soon!"]}
      d.author = d.source.length > 0 ? d.source : "Not Available..."
      d.title = ucFirstAllWords(d.nameofrecipe)
      d.season = ucFirstAllWords(d.season)
      d.meal = d["typeofmeal"]
    
    })

    function ucFirstAllWords( str )
    {
        var pieces = str.split(" ");
        for ( var i = 0; i < pieces.length; i++ )
          {
              var j = pieces[i].charAt(0).toUpperCase();
              pieces[i] = j + pieces[i].substr(1);
          }
        return pieces.join(" ");
    }

    this.checkModel = {
      veg: false,
      vegan: false,
      gf: false
    };

    $('#seasonUL li a').on('click', function(){
      var x = $(this).html()
      $('#season').html(x+" <span class='caret'></span>");
    });
    $('#mealUL li a').on('click', function(){
      var x = $(this).html()
      $('#meal').html(x+" <span class='caret'></span>");
    }); //#ffd700
    
    this.w = window.innerWidth < 500 ? "100%" : "50%"

    var checkGlobal=this.checkModel
    this.filterStuff=function(recipe){
      //console.log(recipe, checkGlobal)
     if (checkGlobal.veg == false && checkGlobal.vegan == false && checkGlobal.gf == false){return recipe}
      else if (checkGlobal.veg == true && checkGlobal.vegan == false && checkGlobal.gf == false){return recipe.veg}
      else if (checkGlobal.veg == false && checkGlobal.vegan == true && checkGlobal.gf == false){return recipe.vegan}
      else if (checkGlobal.veg == true && checkGlobal.vegan == true && checkGlobal.gf == false){return recipe.veg && recipe.vegan}
        else if (checkGlobal.veg == false && checkGlobal.vegan == false && checkGlobal.gf == true){return recipe.GF}
      else if (checkGlobal.veg == true && checkGlobal.vegan == false && checkGlobal.gf == true){return recipe.veg && recipe.GF}
        else if (checkGlobal.veg == false && checkGlobal.vegan == true && checkGlobal.gf == true){return recipe.vegan && recipe.GF}
      else if (checkGlobal.veg == true && checkGlobal.vegan == true && checkGlobal.gf == true){return  recipe.veg && recipe.vegan && recipe.GF}
      //return recipe.title.includes("Quick")
    }
    this.button = "Filter by season";
    this.actions = [
      "Fall", "Winter", "Spring", "Summer"
    ];
    this.change = function(name){
      this.button = name;
    }

    this.checkResults = [];
    this.changer = function(clicked){
      console.log(this)
      var dump = this.checkModel[clicked]
      this.checkModel[clicked] = dump
    }

/*    this.$watchCollection("checkModel",function () {
      this.checkResults = [];

      angular.forEach(this.checkModel, function (value, key) {
        if (value) {
          console.log(value)
          this.checkResults.push(key);
        }
      });
    })*/
  }
});


app.component('infoPanel', {
  templateUrl: 'views/recipe.html',
  bindings: { recipe: '<' },      
  controller: function () {
    console.log(this)
    $(".main").hide()
    $("nav").hide()
    //banner click to return to
  }
})

