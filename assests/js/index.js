
async function loadMeals() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  const meals = data.meals.slice(0, 20); 

  const main = document.querySelector('.main');
  main.innerHTML = '';

  meals.forEach(meal => {
   main.innerHTML += `
  <div class="meal-card position-relative overflow-hidden" data-id="${meal.idMeal}" style="width: 18rem; cursor: pointer;">
    <img src="${meal.strMealThumb}" class="w-100 h-100 object-fit-cover" alt="${meal.strMeal}">
    <div class="overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center">
      <h5 class="text-dark fw-bold text-center">${meal.strMeal}</h5>
    </div>
  </div>
`;

  });
}

window.onload = loadMeals;
document.querySelector('.fa-bars').addEventListener('click', () => {
  document.getElementById('sideMenu').classList.add('open');
});

document.getElementById('closeMenu').addEventListener('click', () => {
  document.getElementById('sideMenu').classList.remove('open');
});


// Select all meal cards and add click event
document.addEventListener('click', async (e) => {
  const card = e.target.closest('.meal-card');
  if (!card) return;

  const mealId = card.dataset.id;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await res.json();
  const meal = data.meals[0];

  // Extract Ingredients & Measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  // Insert meal details into .main
  document.querySelector('.main').innerHTML = `
<div class="container meal-details d-flex flex-row flex-wrap align-items-start py-4 px-3 gap-4 text-white">
      <div class="meal-img w-25 w-md-50">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid rounded-3 shadow" />
      </div>
        <div class="meal-info col-12 col-md-8">
        <h2 class="mb-3">${meal.strMeal}</h2>

        <h4>Instructions</h4>
        <p>${meal.strInstructions}</p>

        <h6 class="h3"><strong>Area:</strong> ${meal.strArea}</h6>
        <h6 class ="h3"><strong>Category:</strong> ${meal.strCategory}</h6>

        <h5 class="mt-3">Recipes:</h5>
        <ul>
          ${ingredients.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <h5>Tags:</h5>
        <p>${meal.strTags ? meal.strTags.split(',').join(', ') : 'No tags'}</p>

        <a class="btn btn-danger mt-2" href="${meal.strYoutube}" target="_blank">
          YouTube 
        </a>

          <a class="btn btn-success mt-2" href="${meal.source}" target="_blank">
          Source 
        </a>
        
     
      </div>
    </div>
  `;
});


