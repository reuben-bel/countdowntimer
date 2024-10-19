/** CREATE A TIMER */

function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "Church Time!";
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}

/** SELECT A RANDOM VERSE FROM THIS LIST AND DISPLAY IT */

const verses = [
    "John+3:16",
    "Romans+8:28",
    "Philippians+4:13",
    "Proverbs+3:5",
    "Philippians+4:6",
    "Proverbs+3:6",
    "Psalms+46:1",
    "Matthew+6:33",
    "Deuteronomy+31:6",
    "Hebrews+13:5",
    "Romans+6:23"
];

function getRandomVerse(verses) {
    const randomIndex = Math.floor(Math.random() * verses.length);
    return verses[randomIndex];
}

async function fetchBibleVerse(ourVerse) {
    const url = `https://bible-api.com/${ourVerse}?translation=web`;

    try {
        // Make the HTTP request
        const response = await fetch(url);
        
        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayVerse(data);
    } catch (error) {
        console.error('Error fetching the Bible verse:', error);
    }
}

function displayVerse(data) {
    const verseContainer = document.getElementById('verse-container');
    verseContainer.innerHTML = `
        <p>${data.verses[0].text.trim()}</p>
        <h2>${data.reference}</h2>
    `;
};

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

/** DEFINE THE MAIN FUNCTION */

function main() {
    countdown( "timer-container", 5, 0 );
    window.onload = setBackgroundImage;
    const randomVerse = getRandomVerse(verses);
    fetchBibleVerse(randomVerse);
};

main();



