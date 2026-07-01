const hour = new Date().getHours();

let GreetingMessage = "";

if (hour >= 5 && hour < 12) {
    GreetingMessage = "صبح بخیر 🌻";
} else if (hour >= 12 && hour < 17) {
    GreetingMessage = "ظهر بخیر ☀️";
} else if (hour >= 17 && hour < 21) {
    GreetingMessage = "عصر بخیر ✨";
} else {
    GreetingMessage = "شب بخیر 🌙";
}

export default GreetingMessage