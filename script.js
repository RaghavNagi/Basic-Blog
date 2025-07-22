let blogs = JSON.parse(localStorage.getItem("blogs")) || [];

function renderBlogs(filteredBlogs) {
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";

  if (filteredBlogs.length === 0) {
    blogContainer.innerHTML = "<p>No blogs match your filters.</p>";
    return;
  }

  filteredBlogs.forEach(blog => {
    const div = document.createElement("div");
    div.className = "blog";
    div.innerHTML = `
      <h2>${blog.title}</h2>
      ${blog.image ? `<img src="${blog.image}" class="blog-img" alt="Blog Image" />` : ""}
      <p><strong>Description:</strong> ${blog.description}</p>
      <p><strong>Category:</strong> ${blog.category}</p>
      <p><strong>Date:</strong> ${blog.date}</p>
      <p><strong>Author:</strong> ${blog.author}</p>
    `;
    blogContainer.appendChild(div);
  });
}

function getUniqueValues(key) {
  return [...new Set(blogs.map(blog => blog[key]))];
}

function populateFilters() {
  const categorySelect = document.getElementById("categoryFilter");
  const authorSelect = document.getElementById("authorFilter");

  categorySelect.innerHTML = `<option value="">All Categories</option>`;
  authorSelect.innerHTML = `<option value="">All Authors</option>`;

  getUniqueValues("category").forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  getUniqueValues("author").forEach(auth => {
    const opt = document.createElement("option");
    opt.value = auth;
    opt.textContent = auth;
    authorSelect.appendChild(opt);
  });
}

function applyFilters() {
  const search = document.getElementById("search").value.toLowerCase();
  const category = document.getElementById("categoryFilter").value;
  const author = document.getElementById("authorFilter").value;

  let filtered = blogs.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(search) ||
      blog.author.toLowerCase().includes(search);

    return (
      matchesSearch &&
      (category === "" || blog.category === category) &&
      (author === "" || blog.author === author)
    );
  });
  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  renderBlogs(filtered);
}

window.onload = function () {
  populateFilters();
  applyFilters();

  document.getElementById("search").addEventListener("input", applyFilters);
  document.getElementById("categoryFilter").addEventListener("change", applyFilters);
  document.getElementById("authorFilter").addEventListener("change", applyFilters);
};