# FEW 2.5 Tutorial 2 Loading Data 

Data needs to come from somewhere and usually, there is a lot of it. For this example, you will use data from the Titanic in JSON format. 

Often you'll want to convert data from its raw form into things that make it easier to understand. For example, the Titanic dataset is a list of objects that contain for each passenger.

Your goal in this tutorial is to load the Titanic dataset and extract useful information from it. 

## Objectives 

- Load data from JSON use a local server to avoid CORS errors
- Identify values in a dataset
- Extract data from a dataset using: map filter and reduce
- Find the maximum, minimum, and average values
- Find unique values

## Challenges 

Your goal is to load the Titanic JSON dataset and write code that examines the data for the values below. 

**Why solve these problems?** Think of each of the problems below as tiny technical interview. Seriously answering any of the questions below could be a piece of many technical interview questions. Mastering these here is a good way to prep for similar questions you might run into in the future. 

Also, if you have an interest in data science being able to find values relevant values from a dataset is important and a required step for almost every process. 

- [**Number of passengers**](#number-of-passengers)
    - Number of passengers - Number
- [**Count the men and women**](#count-the-men-and-women)
    - Number of male passengers - Number
    - Number of female passengers - Number
- [**Count all Values of a field**](#count-all-Values-of-a-field)
    - Number of passenger classes - Array of classes [1,2,3]
    - Number of siblings/spouses - Array of Numbers [0, 1, 2, 3, ...]
    - Number of different fares paidList of cabins - Array of Strings ["F4", "F3", "f43", ...]
- [**Agregate data**](#agregate-data) 
  - Total of all fares
- [**Filter for male or female passengers**](#filter-for-male-or-female-passengers)
    - Make a list of all passengers who survived - Array of passengers
    - Make a list of all passengers who did not survive - Array of Passengers 
    - Find all of the female passengers that survived - Array of Passengers 
    - Find all of the female passengers who did not survive - Array of Passengers 
    - Find all of the male passengers who survived - Array of Passengers 
    - Find all of the male passengers who did not survive - Array of Passengers 
    - Make a list of all passenger classes - Array of Passengers  
    - Make a list of women and men in each class - Array of Passengers 
- [**Find a min and a max**](#find-a-min-and-a-max)
    - Find the maximum fare paid - Number
    - Find the minimum fare paid - Number
    - Find the Oldest and youngest passenger - Number
    - Find the oldest male and female passenger - Number
    - Find the youngest male and female passenger - Number
    - Find the oldest survivor - Number
    - Find the youngest survivor - Number
- [**Find an average**](#find-an-average)
    - Find the average age of all passengers - Number
    - Find the average age of all female passengers - Number
    - Find the average age of all male passengers - Number
    - Find the average fare paid for all passengers - Number

## Getting started 

Create a new HTML document and add the following to it. 

```HTML
<div id="container"></div>

<script>
  
</script>
```

This defines a container element where you can display information.

The second element defines a script tag where you will write your JS code. 

## Loading JSON with `fetch()`

An easy and simple way to load data is to use the browser's built-in `fetch()` API. 

Add the following to the script tag: 

```JavaScript
<script>
  fetch('titanic-passengers.json')
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.log(err.message))
</script>
```

Open this file in a web browser. Nothing happens, check the console. There should an error something like this: 

`Cross origin requests are only supported for HTTP.`

This is a [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) error. CORS is a security feature that sets policies about which files can be opened determined by where those files are served from. 

In this case, you are serving 'titanic-passengers.json' from 

`file:///Users/username/Documents/titanic-passengers.json`

The path begins with `file:///` which sets the domain for the request. This sets the domain to the local file system. The browser will not let JavaScript open a file with this domain. 

Why? This would be a huge security hole if any JavaScript code could open and read files from your desktop. Think about it...

## Local Server 

In order to load files from the desktop, you'll need to start a local server. There are many ways to do this.

- Local server option or plugin in your editor
- Use an application like WAMP or MAMP
- Create your own server with Node and Express

This tutorial will cover the last option here but feel free to explore the others. 

Initialize a new npm project. 

`npm init`

Add Express

`npm install express`

Add the server. Add a file 'index.js'.

```JavaScript 
const express = require('express');

const app = express();
app.use(express.static('public'));

const PORT = process.env.PORT = 4000;

app.listen(PORT, () => {
  console.log('Server is running at:', PORT);
});
```

This block of code defines a new Express server. It also adds a static folder named 'public'. Files in this static folder can be served without having to define a route. 

Make a new folder named 'public'.

Test your server: 

`node index.js`

or use

`nodemon index.js`

If you have nodemon installed. 

Move your HTML file and the titanic data into the public folder. 

After running the server you should be able to visit: [http://localhost:4000](http://localhost:4000) to see your HTML document. 

The page will still be blank but checking the console the error should be gone and the JSON should be displayed. 

## Combing through JSON

The data from the Titanic dataset is stored as an array of objects. Each object in the array has the same fields with different values. 

```JavaScript
{
  "datasetid": "titanic-passengers", 
  "recordid": "398286223e6c4c16377d2b81d5335ac6dcc2cafb", 
  "record_timestamp": "2016-09-20T15:34:51-07:00",
  "fields": {
    "fare": 7.3125, 
    "name": "Olsen, Mr. Ole Martin", 
    "age": 40.0,
    "embarked": "S", 
    "parch": 0, 
    "pclass": 3, 
    "sex": "male", 
    "survived": "No", 
    "ticket": "Fa 265302", 
    "passengerid": 155, 
    "sibsp": 0,
    "cabin": "F4"
  }
}
```

At the top level, there are four fields

- datasetid
- recordid
- record_timestamp
- fields

The first three are not really important to us for these examples. All of the information that is useful to us is held under the "fields" key.

Under fields there are the following fields: 

- fare - Passenger fare
- name - Passenger name
- embarked - Port of embarkation
  - C = Cherbourg, Q = Queenstown, S = Southampton
- parch - # of parents/children aboard
- pclass - Passenger class
  - 1 = 1st, 2 = 2nd, 3 = 3rd
- sex - Passenger gender
  - male or female
- survived - Survival
  - No or Yes
- ticket - Ticket Number
- passengerid - Passenger id
- sibsp - # of Siblings spouses aboard
- cabin - Cabin number 

Not all records have all of the data. Some are missing one field or another.

Modify the script you have to look like this: 

```HTML
<script>
  fetch('titanic-passengers.json')
  .then(res => res.json())
  .then(json => handleData(json))
  .catch(err => console.log(err.message))

  function handleData(data) {
    // do stuff with data here
  }
</script>
```

Here you added a function to handle the data after it is loaded and called the function passing the JSON data to it. 

## Examining the data for relevant values 

### Number of passengers 

```JavaScript
function handleData(data) {
  // Number of passengers
  console.log(`Number of passengers: ${data.length}`)
}
```

### Count the men and women

To count the men and women you need to look through all of the passengers and total the number where `data.fields.sex` is 'male' or 'female'. 

One method to do this is [`Array.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). 

Since the value passed into the callback supplied to reduce is an object you must set an initial value!

```JavaScript
// Number of women
const womenCount = data.reduce((acc, passenger) => {
  if (passenger.fields.sex === 'female') {
    return acc += 1
  }
  return acc
}, 0) // <-- Important! set the starting value
console.log(`Women count: ${womenCount}`)
```

Add the script above to `handleData()`. It should print the number of female passengers on the Titanic. 

Challenge: Count the number of male passengers. 

Solution: 

```JavaScript
// Number of men
const menCount = data.reduce((acc, passenger) => {
  if (passenger.fields.sex === 'male') {
    return acc += 1
  }
  return acc
}, 0) // <-- Important! set the starting value
console.log(`Men count: ${menCount}`)
```

Challenge: Write a function that counts any field 

Solution: 

```JavaScript
...
function countFields(data, field, value) {
  return data.reduce((acc, passenger) => {
    if (passenger.fields[field] === value) {
      return acc += 1
    }
    return acc
  }, 0)
}

function handleData(data) {
  ...
  // Number of women
  const womenCount = countFields(data, 'sex', 'female')
  console.log(`Women count: ${womenCount}`)
  ...
  // Number of men
  const menCount = countFields(data, 'sex', 'male')
  console.log(`Men count: ${menCount}`)
}
```

This solution works for the Titanic dataset. Since the data fields are not at the root of each passenger object. It's difficult to generalize this for any other situation. Data is not always perfect, and often is not in the same form, and seldom uses the same field names. Often you will need to work around this or make solutions that can work with a wide variety of input. 

### Count all Values of a field

The goal here is to look through the passengers and find how many different values there are for a field. For example, if we looked at all of the passengers and wanted to know how many genders there were you would get two" "male" and "female". 

This might not be useful for age but it might be useful for things like the pclass, you can ask how many different passenger classes were there? It might also be good for embarkation, how many stops did the Titanic make? 

You can find these values as a step to finding things like the number of passengers in a passenger class, or how many passengers got on the Titanic at particular embarkation. 

There are a couple ways to handle this. Use `Array.reduce()` to create an array or object with unique values: 

- `array.reduce(() => { ... }, []) // use an Array as the accumulator`
- `array.reduce(() => { ... }, {}) // use an Object as the accumulator`
- `array.reduce(() => { ... }, new Set()) // use a Set as the accumulator`

Here is one solution that uses an array. The example below finds passenger classes. 

```JavaScript
const allClasses = data.reduce((acc, passenger) => {
  if (acc.indexOf(passenger.fields.pclass) === -1) {
    return [...acc, acc.push(passenger.fields.pclass)]
  } 
  return acc
}, [])
```

Here the accumulator is an array. For each item in `data` use `Array.indexOf()` to find it in the Accumulator. If indexOf returns -1 the item doesn't exist in which case we add the value to the array. Otherwise, return the accumulator unchanged. 

Challenges: 

- Find the passenger Ticket Classes 
- Find the numbers of siblings/spouses
- Find the number of different fares paid
- Find all of the cabin numbers

### Agregate data 

Sometimes you'll want to know the total value of all the things. For example, it might be important to know how much was spent on all fares. Or count the number of passengers in each class. 

```JavaScript
const totalFares = data.reduce((acc, passenger) => {
  return acc + passenger.fields.fare
}, 0)
console.log(totalFares)
```

### Filter for male or female passengers

`Array.filter()` returns a new array that is a subset of the source array. 

`const femalePassengers = data.filter(passenger => passenger.fields.sex === 'female')`

Challenge: 

Use `Array.filter()` to create an array of male passengers

Solution: 

`const malePassengers = data.filter(passenger => passenger.fields.sex === 'male')`

Further Challenges: 

- Make a list of all passengers who survived
- Make a list of all passengers who did not survive
- Find all of the female passengers that survived
- Find all of the female passengers who did not survive
- Find all of the male passengers who survived
- Find all of the male passengers who did not survive
- Make a list of all passenger classes
  - Make a list of women and men in each class

### Find a min and a max 

Sometimes you'll want to know the minimum or max value of a field. For example, you might want to know the min and max age of all passengers. 

There are a few ways you can work with `Math.min()` and `Math.max()`. Since we used `Array reduce()` above I'll use it again here. 

```JavaScript
const femaleMinAge = femalePassengers.reduce((acc, passenger) => {
  if (!passenger.fields.age) return acc
  return Math.min(acc, Number(passenger.fields.age))
}, 9999)

const femaleMaxAge = femalePassengers.reduce((acc, passenger) => {
  if (!passenger.fields.age) return acc 
  return Math.max(acc, Number(passenger.fields.age))
}, 0)
console.log(`Youngest female: ${femaleMinAge} Oldest female: ${femaleMaxAge}`)
```

Notice that using the initial value is required since `passenger` is an object. 

Some of the passengers do not have a listed age. My sample code needed to check for this to prevent errors. If `passenger.fields.age` is false the reducers callback returns the current value. Otherwise, it is compared to the new value. 

Note! JS considers `undefined` and  `null` to be false. If the age field doesn't exist `passenger.field.age` should be `undefined`. For more in this subject look up: 

- [JS Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
- [JS Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

Also, notice that I used the femalePassengers and malePassengers array to get these values. 

Challenge: 

Find min and max fare paid. 

Solution: 

```JavaScript
const minFare = data.reduce((acc, passenger) => {
  if (Number(!passenger.fields.fare)) return acc
  return Math.min(acc, Number(passenger.fields.fare))
}, 999999)

const maxFare = data.reduce((acc, passenger) => {
  if (Number(!passenger.fields.fare)) return acc
  return Math.max(acc, Number(passenger.fields.fare))
}, 0)

console.log(`Minimum fare: ${minFare} Max Fare: ${maxFare}`)
```

- Find the maximum fare paid
- Find the minimum fare paid
- Find the Oldest and youngest passenger
- Find the oldest male and female passenger
- Find the youngest male and female passenger
- Find the oldest survivor
- Find the youngest survivor

### Find an average 

To find an average you'll need to loop through all of your data create a sum and divide by the number of items. 

Use `Array.reduce()` to find the sum and divide by the length of the array. 

```JavaScript
// Average fare
// Get all passengers that have a valid fare
const allFares = data.filter(passenger => passenger.fields.fare)
const averageFare = data.reduce((acc, passenger) => acc + Number(passenger.fields.fare), 0) / allFares.length

console.log(`Average Fare: ${averageFare}`)
```

Challenge: 

- Find the average age of all passengers. 
- Find the average age of all female passengers
- Find the average age of all male passengers
- Find the average fare paid 

## Displaying the data

Take all of the numbers you collected above and display them with HTML. To do this you will need an element in the DOM. The sample code above defined a div#container. 

To display your data follow these steps: 

1. create an element
2. set the content of that element
3. style the element
4. append the element to an element in the DOM

For the last step you'll want to use the div#container get a reference to this now: 

```JavaScript
const container = document.getElementById('container')
```

** Show the number of passengers**

```JavaScript
// 1. Create a new element 
const passengerCount = document.createElement('p') // creates a <p>
// 2. Set the content of the element 
passengerCount.innerHTML = data.length // This is the number of passengers
// 3. Style the element 
passengerCount.style.fontSize = '24px'
passengerCount.style.fontWeight = 'bold'
// 4. Append element to DOM
container.appendChil(passengerCount)
```

You can repeat the process for your other elements. But, this is not DRY. To improve on your process make a function. 

The function below takes a label and a value and returns a DOM element.

```JavaScript 
function makeValueElement(value, label) {
  const el = document.createElement('div')
  el.innerHTML = `${label}: ${value}`
  el.style.fontSize = '24px'
  el.style.fontWeight = 'bold'

  return el
}
```

This function returns an element, you'll need to append it to an element in the DOM in order to see it. 

```JavaScript  
const passengerCount = makeValueElement(data.length, "Number of Passengers")
container.appendChil(passengerCount)
```

You can now easily repeat this for other values

```JavaScript  
const malePassengerCount = makeValueElement(data.length, "Number of Male Passengers")
container.appendChil(malePassengerCount)
const femalePassengerCount = makeValueElement(data.length, "Number of Female Passengers")
container.appendChil(femalePassengerCount)
```

Using this approach allows you to easily edit your work to improve the display. Imagine you want the numbers to be bold and labels to display normal weight. You can do this by editing the `makeValueElement()` function. 

```JavaScript 
function makeValueElement(value, label) {
  const el = document.createElement('div')
  const labelEl = document.createElement('span')
  const valueEl = document.createElement('span')
  
  labelEl.innerHTML = `${label}:`
  valueEl.innerHTML = value

  el.appendChild(labelEl)
  el.appendChild(valueEl)

  labelEl.style.fontSize = '24px'

  valueEl.style.fontSize = '24px'
  valueEl.style.fontWeight = 'bold'

  return el
}
```

This should update all of the elements created using the `makeValueElement()` function. 

