const itemFrom = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function addItem(e) {
  e.preventDefault();

  //checking for empty value
  const newItem = itemInput.value;
  if (newItem === "") {
    alert("PLEASE ADD ANY ITEM");
    return;
  }
  //checking for repeat value
  const listitems = document.querySelectorAll("unit");
  for (item of listitems) {
    if (item.textContent === newItem) {
      alert("Already Present");
      return;
    }
  }

  //adding to UI
  const newLI = document.createElement("li");
  newLI.innerHTML = `<unit>${newItem}</unit>
                    <button class="remove-item btn-link text-red">
                    <i class="fa-solid fa-xmark"></i></button>`;
  itemList.append(newLI);
}

itemFrom.addEventListener("submit", addItem);
