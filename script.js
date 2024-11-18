document.getElementById('health-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const disease = document.getElementById('disease').value;

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, disease })
    });

    const result = await response.json();
    const recipeResult = document.getElementById('recipe-result');
    if (result.success) {
        recipeResult.innerHTML = `<h2>Recommended Recipes:</h2><ul>${result.recipes.map(recipe => `<li>${recipe}</li>`).join('')}</ul>`;
    } else {
        recipeResult.textContent = result.message || "Error fetching recipes.";
    }
});
