async function loadMeals(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  const meals = data.meals;

  const main = document.querySelector('.main');
  main.innerHTML = '';

  meals.forEach(meal => {
    main.innerHTML += `
      <div class="meal-card position-relative" data-id="${meal.idMeal}" style="cursor: pointer;">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <div class="overlay">
          <h5 class="text-dark fw-bold text-center">${meal.strMeal}</h5>
        </div>
      </div>
    `;
  });
}

document.addEventListener('click', async (e) => {
  const card = e.target.closest('.meal-card');
  if (!card) return;

  const mealId = card.dataset.id;
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await res.json();
  const meal = data.meals[0];

  // Redirect to meal detail page
  window.location.href = `meal-details.html?id=${mealId}`;
});

// Load meals based on category from URL parameter
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category') || 'Beef'; // Default to 'Beef'
loadMeals(category);

document.querySelector('.fa-bars').addEventListener('click', () => {
  document.getElementById('sideMenu').classList.add('open');
});

document.getElementById('closeMenu').addEventListener('click', () => {
  document.getElementById('sideMenu').classList.remove('open');
});
