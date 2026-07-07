const hour = new Date().getHours();

let GreetingMessage = "";

if (hour >= 5 && hour < 12) {
    GreetingMessage = "صبح بخیر 🌻";
} else if (hour >= 12 && hour < 16) {
    GreetingMessage = "ظهر بخیر ☀️";
} else if (hour >= 16 && hour < 20) {
    GreetingMessage = "عصر بخیر ✨";
} else {
    GreetingMessage = "شب بخیر 🌙";
}

export default GreetingMessage