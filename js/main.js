window.onload = () => {
    if (localStorage.getItem("characters") === null || undefined) {
        localStorage.setItem("characters", JSON.stringify([]));
    } else {
        let characters = JSON.parse(localStorage.getItem("characters"));
        document.querySelector("div.characters").innerHTML = characters
            .map((character) => {
                const money = character.inventory.find(
                    (item) => item.type === "item money"
                );
                return `
                <div>
                    <h3>${character.name}</h3>
                    <p>Level: ${character.level}</p>
                    <p>Money: ${money.amount}</p>
                </div>
            `;
            })
            .join("");
    }

    document.querySelector("input.create").onclick = () => {
        let name = document.querySelector("input#name").value;
        if (name === "" || undefined) {
            alert("Please enter a name!");
            return;
        }
        if (name.length > 15) {
            alert("Please enter a name with less than 15 characters!");
            return;
        }
        let characters = JSON.parse(localStorage.getItem("characters"));
        characters.push({
            type: "user",
            id: characters.length + 1,
            name: name,
            level: 0,
            inventory: [
                {
                    type: "item money",
                    id: 1,
                    name: "Money",
                    amount: 10000,
                },
                {
                    type: "item energy",
                    id: 2,
                    name: "Energy",
                    amount: 100,
                },
            ],
            Machines: [],
            statistic: {
                time: new Date().getTime(),
            },
        });
        localStorage.setItem("characters", JSON.stringify(characters));
        document.querySelector("div.characters").innerHTML = characters
            .map((character) => {
                const money = character.inventory.find(
                    (item) => item.type === "item money"
                );
                return `
                <div>
                    <h3>${character.name}</h3>
                    <p>Level: ${character.level}</p>
                    <p>Money: ${money.amount}</p>
                </div>
            `;
            })
            .join("");
    };

    document.querySelectorAll(".container > div.Select > div.characters > div").forEach((element) => {
        element.onclick = () => {
            let characters = JSON.parse(localStorage.getItem("characters"));
            let character = characters.find((character) => character.name === element.querySelector("h3").innerText);
            localStorage.setItem("selectedCharacter", JSON.stringify(character));
            window.location.href = `./game.html`;
        };
    });
};