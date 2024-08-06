// This file contains random text for project 
// This function returns any random word from list which is in this function
export const getEasyText = () => {
    const easyTexts = [
        "Apple",
        "Mango",
        "Banana",
        "Grapes",
        "Potato",
        "Tomato",
        "Onion",
        "Flower",
        "Leaves",
        "Angry",
        "Delicious",
        "Wonderful",
        "Apricot",
        "Beautiful",
        "Programming",
        "TypeScript",
        "JavaScript",
        "Python",
        "Coding",
        "Typing",
    ];
    return easyTexts[Math.floor(Math.random() * easyTexts.length)];
};
// This function returns any random text from list which is in this function
export const getMediumText = () => {
    const mediumTexts = [
        "The quick brown fox",
        "Jumps over the lazy dog",
        "A journey of thousand miles",
        "Work hard stay positive",
        "Bright stars in sky",
        "Morning coffee smells great",
        "Happy kids playing outside",
        "Bookshelves full of storie",
        "Flowers bloom in spring",
        "Rainy days are cozy",
        "Snow falls in winter",
        "Leaves rustle in wind",
        "Children laugh with joy",
        "Candles flicker in darkness",
        "Never give up on yourself",
        "Nothing is impossible",
        "Waves crash on shore",
        "I love programming",
        "Beleive in your dreams",
        "Every day is progress",
    ];
    return mediumTexts[Math.floor(Math.random() * mediumTexts.length)];
};
// This function returns any random text from list which is in this function
export const getHardText = () => {
    const hardTexts = [
        "The quick brown fox jumps over the lazy dog and run away",
        "A journey of a thousand miles begins with a single step",
        "To be or not to be that is the question wether its nobler in the mind",
        "Bright stars twinkle in the night sky, painting a celestial masterpiece",
        "A cool breeze rustles through the leaves, whispering secrets of nature",
        "Morning coffee aroma fills the kitchen, starting the day with energy",
        "Happy kids playing outside under the sun, laughter echoing everywhere",
        "Bookshelves full of stories and adventures waiting to be discovered eagerly",
        "Flowers bloom in spring, spreading vibrant colors and fragrances everywhere",
        "Snow falls gently in winter, covering the world in a white blanket",
        "Rainy days are cozy, perfect for reading books and sipping hot tea",
        "Sunsets paint the horizon in hues of orange, pink, and purple",
        "Waves crash on the shore, creating a symphony of nature’s power",
        "Fireworks light up the night sky, celebrating with bursts of color",
        "Children laugh with joy, their happiness contagious to everyone around",
        "Warm blankets in winter provide comfort and warmth on chilly nights",
        "Freshly baked bread aroma fills the kitchen, inviting everyone to eat",
        "Success is the sum of small efforts repeated day in and day out",
        "Stay committed to your goals, even on the toughest days",
        "Believe in yourself, for you have the power to achieve greatness",
    ];
    return hardTexts[Math.floor(Math.random() * hardTexts.length)];
};
