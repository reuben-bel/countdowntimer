/** CREATE A TIMER */

const data = { username: 'example' };

function getNextSundayAtTen() {
    const now = new Date();
    const nextSunday = new Date(now);

    // Set to 10:00 am
    nextSunday.setHours(10, 0, 0, 0);

    // Calculate days to Sunday
    const dayOfWeek = nextSunday.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;

    // If today is Sunday and it's past 10:00 am, set for the next week
    if (dayOfWeek === 0 && now.getHours() >= 10) {
        nextSunday.setDate(nextSunday.getDate() + 7);
    } else {
        nextSunday.setDate(nextSunday.getDate() + daysUntilSunday);
    }

    return nextSunday;
}

function startCountdown() {
    const targetTime = getNextSundayAtTen();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetTime - now;

        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "Are you quiet? <br> It's church time!";
            document.getElementById("intro").remove();
            document.getElementById("verse-container").remove();
            clearInterval(countdownInterval);
            return;
        }

        let countdownText = "";

        // Calculate time components
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Add components to countdown text only if they are non-zero
        if (days > 0) {
            countdownText += days + "d ";
        }
        if (hours > 0 || days > 0) {  // Include hours if days are non-zero
            countdownText += hours + "h ";
        }
        if (minutes > 0 || hours > 0 || days > 0) {  // Include minutes if hours or days are non-zero
            countdownText += minutes + "m ";
        }

        countdownText += seconds + "s";  // Always show seconds

        document.getElementById("countdown").innerHTML = countdownText;
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
}



/** SELECT A RANDOM VERSE FROM THIS LIST AND DISPLAY IT */

const verses = [
    {russName: "От Иоанна 16:33", engName: "John 16:33", location: "43/16/33/"},
    {russName: "1 Коринфянам 13:13", engName: "1 Corinthians 13:13", location: "46/13/13/"},
    {russName: "К Римлянам 15:13", engName: "Romans 15:13", location: "45/15/13/"},
    {russName: "Исаия 41:13", engName: "Isaiah 41:13", location: "23/41/13/"},
    {russName: "К Римлянам 8:28", engName: "Romans 8:28", location: "45/8/28/"},
    {russName: "Филиппийцам 4:13", engName: "Philippians 4:13", location: "50/4/13/"},
    {russName: "Исаия 41:10", engName: "Isaiah 41:10", location: "23/41/10/"},
    {russName: "От Марка 11:24", engName: "Mark 11:24", location: "41/11/24/"},
    {russName: "1 Коринфянам 15:58", engName: "1 Corinthians 15:58", location: "46/15/58/"},
    {russName: "От Матфея 11:28", engName: "Matthew 11:28", location: "40/11/28/"}
];

function getRandomVerse() {
    const randomIndex = Math.floor(Math.random() * verses.length);
    const selectedVerse = verses[randomIndex];
    var russVerseName = selectedVerse.russName;
    var engVerseName = selectedVerse.engName;
    var verseLoc = selectedVerse.location;
    return {russVerseName, engVerseName, verseLoc};
}


/****************************************************************** */
async function fetchBibleVerse(ourVerse) {
    const urlsToFetch = [
        `https://bolls.life/get-verse/SYNOD/${ourVerse}`,
        `https://bolls.life/get-verse/NASB/${ourVerse}`,
    ];
        
    // Function to fetch all of the URLs in parallel
    const fetchURLs = async (urls) => {
        try {
            document.getElementById("loadingDiv").style.display = "flex";
            const promises = urls.map(url => fetch(url));
            
            // Wait for all of the promises to resolve
            const responses = await Promise.all(promises);
            
            // Extract JSON data from responses and access the `text` property
            const data = await Promise.all(responses.map(async (response) => {
                document.getElementById("loadingDiv").style.display = "none";
                const json = await response.json();
                return json; // Access the `text` property
            }));
            
            return data;
        } catch (error) {
            document.getElementById("loadingDiv").style.display = "none";
            document.getElementById("errorAlert").style.display = "flex";
            document.getElementById("errorOutput").innerHTML = `${error}`;

            setTimeout(() => {
                document.getElementById("errorAlert").style.display = "none";
                console.clear();
            }, 10000);
            throw new Error(`Failed to fetch data: ${error}`);
        }
    };

    fetchURLs(urlsToFetch)
        .then(data => {
            const russVerse = data[0].text;
            const engVerse = data[1].text;
            displayVerseData(russVerse, engVerse);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayVerseData(russData, engData) {
    const russianVerseContainer = document.getElementById('russian-verse-container');
    const englishVerseContainer = document.getElementById('english-verse-container');
    russianVerseContainer.innerHTML = russData;
    englishVerseContainer.innerHTML = engData;
}

function displayVerseName(russName, engName) {
    const russVerseNameContainer = document.getElementById('russian-verse-name-container');
    const engVerseNameContainer = document.getElementById('english-verse-name-container');
    russVerseNameContainer.innerHTML = russName;
    engVerseNameContainer.innerHTML = engName;
}



/* SELECT RANDOM IMAGE FROM FOLDER AND USE IT*/
const folderPath = "img/";

const images = [
    "bg1.jpg",
    "bg2.jpg",
    "bg3.jpg",
    "bg4.jpg",
    "bg5.jpg",
    "bg6.jpg",
    "bg7.jpg",
    "bg8.jpg",
    "bg9.jpg",
    "bg10.jpg",
    "bg11.jpg",
    "bg12.jpg",
    "bg13.jpg",
    "bg14.jpg",
    "bg15.jpg"
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function setBackgroundImage() {
    const randomImage = getRandomImage();
    const backgroundDiv = document.getElementById('main-container');
    backgroundDiv.style.backgroundImage = `url('${folderPath}${randomImage}')`;
}



/**----------------------------------------------------MENU SECTION-------------------------------------------------------- */

const menu = document.getElementById("menu");
const menuButton = document.getElementById("menuButton");

menuButton.addEventListener("click", function() {
    if (menu.classList.contains('hidden')) {
        menu.style.display = 'flex'; // Show the element first
        setTimeout(() => { // Wait for the element to be displayed
          menu.classList.remove('hidden'); // Start the opacity transition
        }, 0);
      } else {
        menu.classList.add('hidden'); // Trigger opacity transition
        setTimeout(() => { // Wait for the transition to complete
          menu.style.display = 'none'; // Hide the element
        }, 500); // Adjust the timeout to match the transition duration
      }
});



/*------------------------------------------------------FORM SECTION-------------------------------------------------------- */

const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const russianLabel = document.getElementById("russianLabel");
    const englishLabel = document.getElementById("englishLabel");
    const locationLabel = document.getElementById("locationLabel");

    addCustomVerse(russianLabel.value, englishLabel.value, locationLabel.value);
    menu.style.display = 'none';
})

function addCustomVerse(russLabel, engLabel, locLabel) {
    var russData;
    var engData;
    displayVerseName(russLabel, engLabel);
    fetchBibleVerse(locLabel);
    displayVerseData(russData, engData);
}

function populateBibleBooks() {
    const bibleBookList = ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth","1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra","Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon","Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos","Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah","Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians","2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians","2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James","1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"];
    const bibleBooks = document.getElementById("bibleBooks");

    bibleBookList.forEach(name => {
        const listItem = document.createElement("li"); // Create a new list item
        listItem.textContent = name;                   // Set the text to the current name
        bibleBooks.appendChild(listItem);                // Add the list item to the UL
    });
}

// function throwError(err) {
//     switch(err) {
//         case "offline":
//             if (navigator.online = false) {
//                 document.getElementById("loadingDiv").style.display = "none";
//                 document.getElementById("errorAlert").style.display = "flex";
//                 document.getElementById("errorOutput").innerHTML = `${ErrorEvent}`;
//             } else {
//                 document.getElementById("errorAlert").style.display = "none";
//                 console.clear();
//             }
//             break;
        // case "badInput":
        //     document.getElementById("loadingDiv").style.display = "none";
        //     document.getElementById("errorAlert").style.display = "flex";
        //     document.getElementById("errorOutput").innerHTML = `${err}`;

        //     setTimeout(() => {
        //         document.getElementById("errorAlert").style.display = "none";
        //         console.clear();
        //     }, 10000);
        //     break;
//     }
// }


/** DEFINE THE MAIN FUNCTION */

function main() {
    startCountdown();
    window.onload = setBackgroundImage;
    const randomVerse = getRandomVerse();
    fetchBibleVerse(randomVerse.verseLoc);
    displayVerseName(randomVerse.russVerseName, randomVerse.engVerseName);

    populateBibleBooks();
};

main();



