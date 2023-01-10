function createGridItem(content) {
	// Create a new div element for the grid item
	var gridItem = document.createElement("div");
	gridItem.classList.add("grid-item");
	// Set the content of the grid item
	gridItem.innerHTML = content;

	// Add the grid item to the grid container
	var gridContainer = document.querySelector(".grid-container");
	gridContainer.appendChild(gridItem);
}
