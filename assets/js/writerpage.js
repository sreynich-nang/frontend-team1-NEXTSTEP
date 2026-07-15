document.addEventListener("DOMContentLoaded", function() {
    
    const addYearButton = document.getElementById("add-year");
    const yearContainer = document.getElementById("year-container");
    const yearTemplate = document.getElementById("year-template");

    if (addYearButton && yearContainer && yearTemplate) {
        
        let yearCount = 0;

        // function to create and add a new year card
        function createYear() {
            yearCount = yearCount + 1;

            // clone year card template
            const templateContent = yearTemplate.content;
            const yearClone = templateContent.cloneNode(true);

            const yearDiv = yearClone.querySelector(".year");

            const titleText = yearDiv.querySelector(".year-title");
            titleText.textContent = "Year " + yearCount;

            yearDiv.style.position = "relative";

            // add delete button inside the card
            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.className = "btn btn-outline-danger btn-sm";
            deleteButton.style.position = "absolute";
            deleteButton.style.top = "15px";
            deleteButton.style.right = "15px";
            deleteButton.innerHTML = '<i class="bi bi-trash"></i> Delete';

            deleteButton.addEventListener("click", function() {
                yearDiv.remove();
                reindexYears();
            });

            yearDiv.appendChild(deleteButton);
            yearContainer.appendChild(yearDiv);
        }

        // re-number remaining years sequentially
        function reindexYears() {
            const allTitles = yearContainer.querySelectorAll(".year-title");
            yearCount = allTitles.length;
            
            for (let i = 0; i < allTitles.length; i++) {
                allTitles[i].textContent = "Year " + (i + 1);
            }
        }

        createYear();

        // add new year card when button is clicked
        addYearButton.addEventListener("click", function() {
            createYear();
        });
    }
});
