// Div where profile information will appear
const overview = document.querySelector(".overview");
// Me :)
const username = "ctay1or";
// UL containing repos list
const repoList = document.querySelector(".repo-list");
// Section where all repo info appears
const allReposContainer = document.querySelector(".repos");
// Section where individual repo data will appear
const repoData = document.querySelector(".repo-data");


// Fetch API JSON user data
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`
    );
    const data = await userInfo.json();

    // Display the data result in browser
    displayUserInfo(data);
};

gitUserInfo();


// Display user info
const displayUserInfo = function (data) {
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
    const fetchRepos = await fetch("https://api.github.com/users/ctay1or/repos?sort=updated&per_page=100");
    const repoData = await fetchRepos.json();

    //display repos
    displayRepos(repoData);
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


// Click event targeting specific repo
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});


// Fetching specific repo info
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://github.com/users/ctay1or/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);
};



