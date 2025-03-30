document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("recipe-form");
    const container = document.getElementById("recipes-container");
    const filterDropdown = document.getElementById("filter");

    function loadRecipes(filter = "All") {
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        container.innerHTML = ""; // Clear previous recipes

        let filteredRecipes = recipes.filter(recipe => filter === "All" || recipe.category === filter);

        if (filteredRecipes.length === 0) {
            container.innerHTML = "<p>No recipes found.</p>";
            return;
        }

        filteredRecipes.forEach(recipe => {
            const recipeCard = document.createElement("article");
            recipeCard.innerHTML = `
                <h2>${recipe.name}</h2>
                <p><strong>Category:</strong> ${recipe.category}</p>
                <table border="1">
                    <tr><td>${recipe.ingredients.replace(/\n/g, "<br>")}</td></tr>
                </table>
                <p>${recipe.preparation}</p>
                <button class="delete-btn" data-name="${recipe.name}">🗑 Delete</button>
            `;
            container.appendChild(recipeCard);
        });

        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", deleteRecipe);
        });
    }

    function saveRecipe(event) {
        event.preventDefault();

        const name = document.getElementById("recipe-name").value;
        const ingredients = document.getElementById("ingredients").value;
        const category = document.getElementById("category").value;
        const preparation = document.getElementById("preparation").value;

        if (!name || !ingredients || !preparation) {
            alert("Please fill in all required fields.");
            return;
        }

        const recipe = { name, ingredients, category, preparation };
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
        recipes.push(recipe);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        alert("Recipe added successfully!");
        form.reset();
    }

    function deleteRecipe(event) {
        const recipeName = event.target.getAttribute("data-name");
        let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

        recipes = recipes.filter(recipe => recipe.name !== recipeName);
        localStorage.setItem("recipes", JSON.stringify(recipes));

        loadRecipes(filterDropdown.value);
    }

    if (form) {
        form.addEventListener("submit", saveRecipe);
    }
    if (filterDropdown) {
        filterDropdown.addEventListener("change", () => {
            loadRecipes(filterDropdown.value);
        });

        loadRecipes(); 
    }
});
