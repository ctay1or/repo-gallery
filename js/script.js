// Where profile information will appear
const overview = document.querySelector(".overview");
// Me :)
const username = "ctay1or";
// UL containing repos list
const repoList = document.querySelector(".repo-list");


// Fetch API JSON data
const getData = async function () {
    const response = await fetch(`https://api.github.com/users/${username}`
    );
    const data = await response.json();
    console.log(data);

    // Display the data result in browser
    displayData(data);
};

getData();


// Fetch and display user info
const displayData = function (data) {
    // Create a div for the user info to live in
    const div = document.createElement("div");
    div.classList.add("user-info");

    // Add user info to HTML
    div.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;

    // Add the div to the gallery profile
    overview.append(div);

    gitRepos();
};


// Fetch the repos
const gitRepos = async function () {
    const res = await fetch(
        "https://api.github.com/users/ctay1or/repos?sort=updated&per_page=100"
    );
    const repos = await res.json();
    console.log(repos);

    //display repos
    displayRepos(repos);
};


// Display repo info
const displayRepos = function (repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};
