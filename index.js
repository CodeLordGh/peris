const textContainer = document.getElementById("text-container");
const container = document.getElementById("btn-textContainaer");
const btn = document.querySelector('button')
const img = document.querySelector('img')
let charIndex = 0;
const cntImgUrl = './love.png'
let speechSynthesis = window.speechSynthesis;
let readingStarted = false;

let poem = "";

// let h2 = document.querySelector('h2')
// h2.textContent = "Hello"

function loadTextFile() {
    fetch('text.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            poem = data;
            // console.log('Text loaded successfully:', poem);
            if (charIndex < poem.length) {
                if (poem.charAt(charIndex) === ',' && !readingStarted) {
                    // When the first comma is encountered, start TTS
                    readingStarted = true;
                    const textToSpeak = poem.substring(0, poem[length - 1]).trim();
                    speakText(removeEmojis(textToSpeak));
                }
        
                console.log(poem)
                textContainer.textContent += poem.charAt(charIndex);
                charIndex++;
                setTimeout(loadTextFile, 20); // Adjust the time between characters
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        }

function speakText(textToSpeak) {
    if (textToSpeak.length > 0) {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.onend = function () {
            // Check if there's more text to read
            if (charIndex < poem.length) {
                loadTextFile();
            }
        };
        speechSynthesis.speak(utterance);
    }
}

// Function to remove emojis using a regular expression
function removeEmojis(input) {
    return input.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FAB0}-\u{1FABF}\u{2B50}\u{1F004}-\u{1F0CF}]/gu, '');
}
btn.addEventListener('click', () => {
    
    img.style.display = 'none'
    textContainer.style.display = 'block'
    container.style.backgroundImage = `url("${cntImgUrl}")`
    loadTextFile();
})
