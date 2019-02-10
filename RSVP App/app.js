
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('registrar');
  const input = form.querySelector('input');

  const ul = document.getElementById('invitedList');
  const mainDiv = document.querySelector('.main');

  const div = document.createElement('div');
  const filterLabel = document.createElement('label');
  const filterCheckbox = document.createElement('input');

  filterLabel.textContent = "Filter those who haven't responded";
  filterCheckbox.type = 'checkbox';
  div.appendChild(filterLabel);
  div.appendChild(filterCheckbox);
  mainDiv.insertBefore(div, ul);

  filterCheckbox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if (isChecked) {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];
      if (li.className === 'responded') {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  } else {
    for (let i = 0; i < lis.length; i++) {
      let li = lis[i];
      li.style.display = '';
    }
  }
  });

  function createLI(text) {
    function createElement(elementName, property, value) {
      const element = document.createElement(elementName); //create new input element for list item
      element[property] = value; //set new list item text to form input
      return element;
    }

    function appendToLI(elementName, property, value) {
      const element = createElement(elementName, property, value);
      li.appendChild(element);
      return element;
    }
    const li = document.createElement('li');
    appendToLI('span', 'textContent', text);
    appendToLI('label', 'textContent', 'confirmed') //create a label element for new list item
      .appendChild(createElement('input', 'type', 'checkbox')); //create new input element for list item
    appendToLI('button', 'textContent', 'edit'); //create new input element for list item
    appendToLI('button', 'textContent', 'remove'); //create new input element for list item
    return li;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault(); //prevent automatic refresh of page
    const text = input.value; //set 'text' to the input value
    input.value = ''; //erase text field after submit
    const li = createLI(text);
    ul.appendChild(li); //append list items to parent ul
  });

  ul.addEventListener('change', (e) => {
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;

    if (checked) {
      listItem.className = 'responded';
    } else {
      listItem.className = '';
    }
  });

  ul.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON'){
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const action = button.textContent;
    const nameActions = {
      remove: () => {
        ul.removeChild(li);
      },
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save'
      },
      save: () => {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'edit';
      }
    }
    //select and run action object in button's name
    nameActions[action]();
  }
  });
});
