//creating and initializing variables
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;

let fighting;
let monsterHealth;

//storing a stick in our inventory
//let inventory = ["stick", "dagger", "sword"];
let inventory = ["stick"];

//updating an html element
//let el = document.querySelector("el");
//const variable does not change, var and let update
const button1 = document.querySelector("#button1")
const button2 = document.querySelector("#button2")
const button3 = document.querySelector("#button3")
const text = document.querySelector("#text")
const xpText = document.querySelector("#xpText")
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats")
const monsterNameText = document.querySelector("#monsterNameText")
const monsterHealthText = document.querySelector("#monsterHealthText")


//weapons list, array 
const weapons = [
    {
        name: "stick",
        power: 5
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];



//list, array of monsters
const monsters =
[
    {
        name: "slime",
        level: 2,
        monsterHealth: 15
    },
    {
        name: "fanged beast",
        level: 8,
        monsterHealth: 60
    },
    {
        name: "dragon",
        level: 20,
        monsterHealth: 300
    }
];


 



//locations array with 2 location objects, town squar and store
const locations = [
    {   //adding properties to our object
        name: "Town Sqaure",
        "button text": ["Go to store", "Go to cave", "Fight Dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You in the town square. You see a sign that says \"store.\""
    },
    {   //adding properties to our object
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store"
    },
    {   //adding properties to our object
        name: "cave",
        "button text": ["Fight Slime", "Fight fangedbeast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave, you see some monsters!"
    },
    {   //adding properties to our object
        name: "figth",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster!"
    },
    {   //adding properties to our object
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text: 'The monster screams "Arg!" as it dies. You gain experience and find gold!'
    },
    {   //adding properties to our object
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "Go to town REPLAY?"],
        "button functions": [restart, restart, restart],
        text: 'Wasted!'
    },
    {   //adding properties to our object
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "Go to town REPLAY?"],
        "button functions": [restart, restart, restart],
        text: 'You defeat the dragon! You win the Game!'
    }
]//array with empy object



//initialize buttons
button1.onclick = goStore;//calling goStore function to go to the store
button2.onclick = goCave;
button3.onclick = fightDragon;


//functions
/*
function functionName(){
  //code to run on function call
}*/

function update(location)
{
    //hiding the monster stats
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
  
  
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];


    text.innerText = location.text;
}


//going to places
function goTown()
{
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}



//buying
function buyHealth()
{
    if(gold >= 10)
    {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
        text.innerText = "You have successfully purchased 10 health!";
    }
    else{//insufficient funds
        text.innerText = gold + " is not enough. You do not have enough gold to buy health!"
    }
}


function buyWeapon()
{
    if(currentWeapon < weapons.length-1)
    {
        if(gold >= 30)
        {
            gold -= 30;
            goldText.innerText = gold;
            currentWeapon++;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You have successfully purchased a " + newWeapon + ".";

            //adding a new weapon to inventory list/array...
            inventory.push(newWeapon);
            text.innerText += " In your inventory, you have: " + inventory;
        }
        else{//insufficient funds
            text.innerText = gold + " is not enough. You do not have enough gold to buy a weapon!"
        }
    }
    else{
        text.innerText = "You already have the most powerful weapon!"
        button2.innerText = "Sell your weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}


//selling 
function sellWeapon()
{
    if(inventory.length > 1)
    {
        gold += 15;
        gold.innerText = gold;

        //shift removes the first element from inventory and 
        //returns it into currentWeapon
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory, you have " + inventory;
    }
    else{
        text.innerText = "Don't sell your only weapon";
    }
}




//fighting
function fightSlime() {
    fighting = 0;
    goFight();
}

function fightBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}


function goFight()
{
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;

    console.log("monster name: " + monsters[fighting].name + ", monster health: " + monsterHealth)
}











//moves
function attack()
{
    text.innerText = "The " + monsters[fighting].name + ".";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";

    //you and the monster losing health from fighting/colliding
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power.Math.floor(Math.random() * xp) + 1;

    //updating the health
    healthText.innterText = health;
    monsterHealthText.innertext = monsterHealth;


    //losing the fight
    if(health <= 0)
    {
        lose();
    }
    //winning the fight and defeating the monster
    else if(monsterHealth <= 0)
    {
        //lose(); bug

        /*
        if(fighting === 2)
        {
            winGame();
        }else{
            defeatMonster();
        }*/

        //the same as the above conditional statement 
        fighting === 2 ? winGame() : defeathMonster();//ternary statement
    }
}


function dodge()
{
    text.innerText = "You dodged " + monsters[fighting].name + ".";
}










//defeating the monster
function defeatMonster()
{
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}



//being defeated and losing the figth
function lose()
{
    update(locations[5]);
}

//winning the game
function winGame()
{
    update(locations[6]);
}


//restarting the game 
function restart()
{
    let xp = 0;
    let health = 100;
    let gold = 50;
    let currentWeapon = 0;
    let fighting;
    let monsterHealth;
    let inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}










