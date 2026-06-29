// new: using fetch to load CV content from data.json
fetch("data.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        loadHomePage(data);
        loadCvPage(data);
    });

// new: function loads homepage content from JSON
function loadHomePage(data) {
    const homeName = document.getElementById("homeName");
    const homeAbout = document.getElementById("homeAbout");

    if (homeName) {
        homeName.textContent = data.name + " Portfolio";
    }

    if (homeAbout) {
        homeAbout.textContent = data.about;
    }
}

// new: function loads CV page content from JSON
function loadCvPage(data) {
    const cvName = document.getElementById("cvName");
    const aboutText = document.getElementById("aboutText");
    const educationList = document.getElementById("educationList");
    const skillsList = document.getElementById("skillsList");
    const experienceText = document.getElementById("experienceText");
    const languagesList = document.getElementById("languagesList");
    const contactText = document.getElementById("contactText");

    if (cvName) {
        cvName.textContent = "About " + data.name;
    }

    if (aboutText) {
        aboutText.textContent = data.about;
    }

    if (educationList) {
        addListItems(educationList, data.education);
    }

    if (skillsList) {
        addListItems(skillsList, data.skills);
    }

    if (experienceText) {
        experienceText.textContent = data.experience;
    }

    if (languagesList) {
        addListItems(languagesList, data.languages);
    }

    if (contactText) {
        contactText.textContent = "Email: " + data.email;
    }
}

// new: reusable function creates list items from JSON arrays
function addListItems(listElement, items) {
    items.forEach(function(item) {
        const li = document.createElement("li");
        li.textContent = item;
        listElement.appendChild(li);
    });
}

// new: theme button changes the website between dark mode and light mode
const themeButton = document.getElementById("themeButton");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("lightMode");
}

if (themeButton) {
    themeButton.addEventListener("click", function() {
        document.body.classList.toggle("lightMode");

        if (document.body.classList.contains("lightMode")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });
}

// new: reusable function shows and hides CV sections
function toggleSection(buttonId, contentId, showText, hideText) {
    const button = document.getElementById(buttonId);
    const content = document.getElementById(contentId);

    if (button && content) {
        button.addEventListener("click", function() {
            if (content.style.display === "block") {
                content.style.display = "none";
                button.textContent = showText;
            } else {
                content.style.display = "block";
                button.textContent = hideText;
            }
        });
    }
}

// new: show and hide buttons for different CV sections
toggleSection("aboutButton", "aboutText", "Show About Me", "Hide About Me");
toggleSection("educationButton", "educationList", "Show Education", "Hide Education");
toggleSection("skillsButton", "skillsList", "Show Skills", "Hide Skills");
toggleSection("experienceButton", "experienceText", "Show Experience", "Hide Experience");
toggleSection("languagesButton", "languagesList", "Show Languages", "Hide Languages");

// new: scroll animation makes sections appear when the page loads and scrolls
const revealSections = document.querySelectorAll(".reveal");

revealSections.forEach(function(section) {
    section.classList.add("active");
});

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }
    });
});

revealSections.forEach(function(section) {
    observer.observe(section);
});