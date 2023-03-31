import Filters from "./filters.js";
import Post from "./post.js";

const allPostsList=new Array();
const gridContainer = document.querySelector('.grid-container');

export const posts = async function getPosts() {
  const api = `https://jsonplaceholder.typicode.com/posts`;
  const response = await fetch(api);
  const jsonRes = await response.json();
  if (jsonRes != null) {
    // 2. Filter the returned posts, keep only the ones with titles that have more than 3 words in them.
    filterPosts(jsonRes, Filters.TITLE_MORE_THAN_THREE_CHARS);
    const postsElement = document.querySelector('#posts');
    displayPosts(allPostsList);
    postsElement.appendChild(gridContainer);
    addFilterByUserIdClickListener();
  } else {
    window.alert(jsonRes);
  }
};

function displayPosts(posts) {
  posts.forEach(post => {
    const postElement = createPostElement(post);
    addPostClickListener(postElement);
    gridContainer.appendChild(postElement);
  });
}

function addFilterByUserIdClickListener(){
  const filterButton = document.querySelector('.btn-filter-by-user-id');
  filterButton.removeAttribute('disabled');
  filterButton.addEventListener('click', () => {
    filterPosts(allPostsList,Filters.USER_ID_FOUR);
  });
}
  // Creates a post element with a title and body
  function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.classList.add('grid-item')
    postElement.innerHTML = `
      <div class="post-item">
        <h3 class="post-title">${post.title}</h3>
        <span class="body-container-text">${post.body}</span>
      </div>
    `;
    return postElement;
  }
  
function addPostClickListener(postElement) {
  postElement.addEventListener('click', () => {
    togglePostBodyVisibility(postElement);
  });
}
function togglePostBodyVisibility(postElement) {
  const bodyContainer = postElement.querySelector('.body-container-text');
  if (bodyContainer.style.display === 'none') {
    bodyContainer.style.display = 'block';
  } else {
    bodyContainer.style.display = 'none';
  }
}

export function filterPosts(posts, filter) {
  switch (filter) {
    case Filters.TITLE_MORE_THAN_THREE_CHARS: {
      filterByThreeChars(posts);
      break;
    }
    case Filters.USER_ID_FOUR: {
      // Add a button that filters calls getPosts(), and returns only the posts of user id no. 4
      filterByUserIdFour();
      break;
    }
  }
}

export function filterByThreeChars(posts) {
  posts.forEach((post) => {
    if (getWordCount(post.title) > 3) {
      var usersPostList= new Array();
      const newPost = new Post(post.userId, post.postId, post.title, post.body);

      usersPostList.push(newPost);
      allPostsList.push(newPost);
    
    }
  });
}

export function filterByUserIdFour() {
  const filteredPosts = allPostsList.filter(post => post.userId === 4);
  gridContainer.innerHTML = ''; // Clear the existing grid
  filteredPosts.forEach(post => {
    const postElement = createPostElement(post);
    addPostClickListener(postElement);
    gridContainer.appendChild(postElement);
  });
}

function getWordCount(str) {
  return str.split(" ").filter(function (n) {
    return n != "";
  }).length;
}
