'use strict'

import spendings from './data.json' assert {type: 'json'}; // getting the data from the JSON, does not work without a local server (e.g. Liveserver VScode DOES work)

// getting the balance div and total div
const balanceDiv = document.querySelector(".balance__left-side__amount")
const weeksTotalDiv = document.querySelector(".total-amount")

//getting the Array of all bars from the chart
const bars = document.querySelectorAll(".dashboard__chart__bars__bar");

//getting every single bar seperately for the color and the dynamic height
const mon = document.querySelector(".mon");
const tue = document.querySelector(".tue");
const wed = document.querySelector(".wed");
const thu = document.querySelector(".thu");
const fri = document.querySelector(".fri");
const sat = document.querySelector(".sat");
const sun = document.querySelector(".sun");

//getting every single div showing the amount of money that has been spent on that day to manipulate its textContent
const spentMon = document.querySelector(".dashboard__chart__bars__bar__spent-mon");
const spentTue = document.querySelector(".dashboard__chart__bars__bar__spent-tue");
const spentWed = document.querySelector(".dashboard__chart__bars__bar__spent-wed");
const spentThu = document.querySelector(".dashboard__chart__bars__bar__spent-thu");
const spentFri = document.querySelector(".dashboard__chart__bars__bar__spent-fri");
const spentSat = document.querySelector(".dashboard__chart__bars__bar__spent-sat");
const spentSun = document.querySelector(".dashboard__chart__bars__bar__spent-sun");

// by making an Array we can write less code within our getSpendings function
const dayArray = [spentMon, spentTue, spentWed, spentThu, spentFri, spentSat, spentSun]

// showing the money amount on hover
const hoverEffect = () => {
    bars.forEach(bar => bar.addEventListener('mouseover', () => {
        bar.firstElementChild.style.display = "block";
    }))
    bars.forEach(bar => bar.addEventListener('mouseout', () => {
        bar.firstElementChild.style.display = "none";
    }))
}

// simply an effect that makes the money value stay on the page if the user clicks the bar
const clickEffect = () => {
    bars.forEach(bar => bar.addEventListener('click', () => {
        bar.firstElementChild.classList.toggle("clicked")
    }))
}

//determine which bar represents the real current day of the week
const getCurrentDay = () => {
    const day = new Date().getDay(); // returns a "1" for monday, a "2" for tuesday etc. => we make us of this within this switch statement!
    switch (day) {
        case 1: 
            bars.forEach(bar => bar.classList.remove("current"));
            mon.classList.add("current")
            break;
        case 2: 
            bars.forEach(bar => bar.classList.remove("current"));
            tue.classList.add("current")
            break;
        case 3: 
            bars.forEach(bar => bar.classList.remove("current"));
            wed.classList.add("current")
            break;
        case 4: 
            bars.forEach(bar => bar.classList.remove("current"));
            thu.classList.add("current")
            break;
        case 5: 
            bars.forEach(bar => bar.classList.remove("current"));
            fri.classList.add("current")
            break;
        case 6: 
            bars.forEach(bar => bar.classList.remove("current"));
            sat.classList.add("current")
            break;
        case 7: 
            bars.forEach(bar => bar.classList.remove("current"));
            sun.classList.add("current")
            break;
    }
}

// this functin is dynamically setting the values according to the data from the JSON file
const getSpendings = () => {
    for (let i = 0; i < dayArray.length; i++) {
        dayArray[i].textContent = `$${spendings[i].amount}`
    }
}

// This function shall determine the bar height value in percent relative to the biggest amount, which is 100% bar height
const getBarHeight = () => {
    const spendingsMap = spendings.map(day => day.amount) // getting an array of only the amount property values
    const highest = Math.max(...spendingsMap) // using spread operator to determine the highest value in the array

    const barHeights = [] // creating an array of all percentage values for the bars as height value

    for (const day of spendings) { // using an ES6 for loop to calculate each value
        barHeights.push(Math.round(day.amount / highest * 100))
    }

    for (let i = 0; i < barHeights.length; i++) {
        bars[i].style.height = `${barHeights[i]}%`
    }

    console.log(barHeights)
}

const getBalance = () => {
    let balance = 1800; // hard coded for now, initial balance the user has got
    for (const day of spendings) { // reducing the balance by the money that was spent each day
        balance -= day.amount;
    }
    balanceDiv.textContent = `$${balance.toFixed(2)}`
}

const getWeeksTotal = () => {
    const weeksTotal = spendings.reduce((prev, curr) => prev + curr.amount, 0)
    weeksTotalDiv.textContent = `$${weeksTotal.toFixed(2)}`
}

getWeeksTotal();
getBalance();
getBarHeight();
getSpendings();
hoverEffect();
clickEffect();
getCurrentDay();
