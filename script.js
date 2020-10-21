const search = document.querySelector('#search'),
    submit=document.querySelector('#submit'),
    random=document.querySelector('#random'),
    mealsEl=document.querySelector('#meal'),
    resultHeading=document.querySelector('#result-heading');
    singleMealEl=document.querySelector('#single-meal');

//search meal and fetch from api
function searchMeal(e){
    e.preventDefault();

    //clear single meal
    singleMealEl.innerHTML='';

    //Get search term
    const term =search.value;
    
    //Check for empty
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
    
            if (data.meals === null) {
              resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
            } else {
              mealsEl.innerText = data.meals
                .map(
                  meal => `
                <div class="meal">
                  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                  <div class="meal-info" data-mealID="${meal.idMeal}">
                    <h3>${meal.strMeal}</h3>
                  </div>
                </div>
              `
                )
                .join('');
            }
          });
        // Clear search text
        search.value = '';
      } else {
        alert('Please enter a search term');
      }
    }
    





//Event listeners
submit.addEventListener('submit',searchMeal);