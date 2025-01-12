// Fetch all items and display them
const fetchItems = () => {
    fetch('/api/items')
      .then((response) => response.json())
      .then((data) => {
        const itemList = document.getElementById('item-list');
        itemList.innerHTML = '';
        data.forEach((item) => {
          const itemDiv = document.createElement('div');
          itemDiv.classList.add('item');
          itemDiv.innerHTML = `
            <span>${item.name}: ${item.description}</span>
            <button onclick="deleteItem(${item.id})">Delete</button>
          `;
          itemList.appendChild(itemDiv);
        });
      });
  };
  
  // Add new item
  const addItem = (event) => {
    event.preventDefault();
    const name = document.getElementById('item-name').value;
    const description = document.getElementById('item-description').value;
  
    fetch('/api/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then(() => {
        document.getElementById('item-name').value = '';
        document.getElementById('item-description').value = '';
        fetchItems();
      });
  };
  
  // Delete an item
  const deleteItem = (id) => {
    fetch(`/api/items/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchItems());
  };
  
  // Set up event listeners
  document.getElementById('item-form').addEventListener('submit', addItem);
  
  // Fetch items on page load
  window.onload = fetchItems;
  