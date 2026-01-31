let btn = document.querySelector('#btn');
let content = document.querySelector('#content');
let voice = document.querySelector('#voice');

function speak(text, lang = "hi-IN", rate = 1, pitch = 1) {
    window.speechSynthesis.cancel(); // stop previous speech

    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.lang = lang;
    text_speak.rate = rate;
    text_speak.pitch = pitch;
    text_speak.volume = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishme() {
    let day = new Date();
    let hours = day.getHours();

    if (hours >= 0 && hours < 12) {
        speak("Good Morning sir! I am baba tillu. How can I help you?");
    } else if (hours >= 12 && hours < 18) {
        speak("Good Afternoon sir! I am baba tillu. How can I help you?");
    } else if (hours >= 18 && hours < 21) {
        speak("Good Evening sir! I am baba tillu. How can I help you?");
    } else {
        speak("Good Night sir! I am baba tillu. How can I help you?");
    }
}

window.addEventListener('load', () => {
    wishme();
});

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;

    // show recognized speech on screen
    content.innerText = transcript;

    // respond to recognized speech commands
    takecommand(transcript);
};

btn.addEventListener('click', () => {
    recognition.start();
    btn.style.display = 'none';
    voice.style.display = 'block';
});

function takecommand(message) {
    btn.style.display = 'flex';
    voice.style.display = 'none';
    message = message.toLowerCase(); // normalize to lowercase

    if (message.includes("hello")) {
        speak("Hello sir! How can I help you?");
    }
    else if (message.includes("who are you")) {
        speak("I am baba tillu, your virtual assistant,made by aryan");}
    else if (message.includes("open youtube")) {
        speak("Opening youtube");
        window.open("https://www.youtube.com");}
        else if (message.includes("open google")) {
            speak("Opening google");
            window.open("https://www.google.com");
        }
        else if (message.includes("open flipkart")) {
            speak("Opening flipkart");
            window.open("https://www.flipkart.com");}
        else if (message.includes("open calculator")) {
            speak("Opening calculator");
            window.open("https://www.calculator.com");}
            else if (message.includes("open whatsapp    ")) {
                speak("Opening whatsapp");
                window.open("https://web.whatsapp.com");}
                else if (message.includes("time")) {
                    let time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" });
                    speak(`The time is ${time}`);}
                    else if (message.includes("who made you")) {
                        speak("I was made by aryan");
                    }                
else if (message.includes("day") || message.includes("date")) {
    let today = new Date();
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let fullDate = today.toLocaleDateString(undefined, options);
    speak(`Today is ${fullDate}`);
}

                    else {
        let finalText = "this is what i found on the internet regarding " + message.replace("baba tillu ","");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("baba tillu ","")}`,"_blank");
    }
}

