const titleInput = document.getElementById('titleInput');
const urlInput = document.getElementById('urlInput');
const addBtn = document.getElementById('addBtn');
const cancelBtn = document.getElementById('cancelBtn');
const searchInput = document.getElementById('searchInput');
const totalBookmarks = document.getElementById('totalBookmarks');
const bookmarkList = document.getElementById('bookmarkList');
const themeBtn = document.getElementById('themeBtn');

let bookmarks = [];
let nextId = 1;
let editingId = null;
let darkMode = false;


const resetForm = () => {
  titleInput.value = '';
  urlInput.value = '';
  editingId = null;
  addBtn.innerText = 'Add Bookmark';
  cancelBtn.classList.add('hidden');
};

const render = () => {
  bookmarkList.innerHTML = '';

  const searchText = searchInput.value.toLowerCase().trim();

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    return (
      bookmark.title.toLowerCase().includes(searchText) ||
      bookmark.url.toLowerCase().includes(searchText)
    );
  });

  totalBookmarks.innerText = `Available bookmarks: ${bookmarks.length}`;

  if (filteredBookmarks.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty-message';
    li.innerText = 'No bookmarks found.';
    bookmarkList.appendChild(li);
    return;
  }

  for (let i = 0; i < filteredBookmarks.length; i++) {
    const currentBookmark = filteredBookmarks[i];

    const li = document.createElement('li');
    li.className = 'bookmark-item';

    const title = document.createElement('p');
    title.className = 'bookmark-title';
    title.innerText = currentBookmark.title;

    const link = document.createElement('a');
    link.className = 'bookmark-url';
    link.innerText = currentBookmark.url;
    link.href = currentBookmark.url;
    link.target = '_blank';

    const buttonRow = document.createElement('div');
    buttonRow.className = 'button-row';

    const editBtn = document.createElement('button');
    editBtn.innerText = 'Edit';
    editBtn.className = 'edit-btn';

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete-btn';

    editBtn.addEventListener('click', () => {
      titleInput.value = currentBookmark.title;
      urlInput.value = currentBookmark.url;
      editingId = currentBookmark.id;
      addBtn.innerText = 'Update Bookmark';
      cancelBtn.classList.remove('hidden');
    });

    deleteBtn.addEventListener('click', () => {
      const bookmarkIdToDelete = currentBookmark.id;

      bookmarks = bookmarks.filter((bookmark) => {
        return bookmark.id !== bookmarkIdToDelete;
      });

      if (editingId === bookmarkIdToDelete) {
        resetForm();
      }

      render();
    });

    buttonRow.appendChild(editBtn);
    buttonRow.appendChild(deleteBtn);

    li.appendChild(title);
    li.appendChild(link);
    li.appendChild(buttonRow);

    bookmarkList.appendChild(li);
  }
};

addBtn.addEventListener('click', () => {
  const titleText = titleInput.value.trim();
  const urlText = urlInput.value.trim();

  if (titleText === '' || urlText === '') {
    return;
  }

  if (editingId === null) {
    const newBookmark = {
      id: nextId,
      title: titleText,
      url: urlText
    };

    bookmarks.push(newBookmark);
    nextId++;
  } else {
    for (let i = 0; i < bookmarks.length; i++) {
      if (bookmarks[i].id === editingId) {
        bookmarks[i].title = titleText;
        bookmarks[i].url = urlText;
      }
    }
  }

  resetForm();
  render();
});

cancelBtn.addEventListener('click', () => {
  resetForm();
});

searchInput.addEventListener('input', () => {
  render();
});

themeBtn.addEventListener('click', () => {
  darkMode = !darkMode;

  if (darkMode) {
    document.body.classList.add('dark');
    themeBtn.innerText = 'Light Mode';
  } else {
    document.body.classList.remove('dark');
    themeBtn.innerText = 'Dark Mode';
  }
});

render();