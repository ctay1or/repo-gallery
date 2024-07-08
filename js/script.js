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
// Back to the repo gallery button
const viewReposButton = document.querySelector(".view-repos");
// Section with "search by name" placeholder
const filterInput = document.querySelector(".repos input")


// Grab GitHub user info
const gitUserInfo = async function () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
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


// Grab all the repos
const gitRepos = async function () {
    const fetchRepos = await fetch("https://api.github.com/users/ctay1or/repos?sort=updated&per_page=100");
    const repoData = await fetchRepos.json();

    //display repos
    displayRepos(repoData);
};


// Display all repo info
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");

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


// Grabbing specific repo info
const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    // Grab languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    
    // Make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }
    
    // Display info for repo selected
    displayRepoInfo(repoInfo, languages);
};


// Display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    // Clear repo HTML
    repoData.innerHTML = "";

    // Show repo data section
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");

    // Create div for data to live in
    const div = document.createElement("div");
    div.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    
    // Add div data
    repoData.append(div);

    viewReposButton.classList.remove("hide");
};


// Click event for "Back to Repo Gallery" button
viewReposButton.addEventListener("click", function () {
    allReposContainer.classList.remove("hide");
    repoData.classList.add("hide");
    viewReposButton.classList.add("hide");
});


// Dynamic search
filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const lowerSearchText = searchText.toLowerCase();
    
    // Show only repos that contain search text
    for (const repo of repos) {
        const lowerText = repo.innerText.toLowerCase();
        if (lowerText.includes(lowerSearchText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});