let TableauTaches = [];
let TableauTermine = [];

// Ajouter une tâche à la liste
function AjouterTache() {
    let task = document.getElementById("taskText").value.trim();
    if (task) {
        TableauTaches.push(task);
        TableauTermine.push(false);
        document.getElementById("taskText").value = ""; // Réinitialiser le champ texte
        MettreAJourTaches();
    }
}

// Mettre à jour le tableau avec toutes les tâches
function MettreAJourTaches() {
    const tbody = document.querySelector("#taskTable tbody");
    tbody.innerHTML = ""; // Réinitialiser le contenu pour éviter les doublons

    TableauTaches.forEach((tache, index) => {
        let tr = document.createElement("tr");

        // Numéro de la tâche
        let td1 = document.createElement("td");
        td1.innerText = index + 1;
        tr.appendChild(td1);

        // Texte de la tâche
        let td2 = document.createElement("td");
        td2.innerHTML = TableauTermine[index] ? `<s>${tache}</s>` : tache;
        tr.appendChild(td2);

        // Checkbox terminé
        let td3 = document.createElement("td");
        let input = document.createElement("input");
        input.type = "checkbox";
        input.checked = TableauTermine[index];
        input.addEventListener("change", () => Cocher(index));
        td3.appendChild(input);
        tr.appendChild(td3);

        // Bouton de suppression
        let td4 = document.createElement("td");
        let button = document.createElement("button");
        button.innerText = "Supprimer";
        button.setAttribute("data-index", index);
        button.addEventListener("click", SupprimerTache);
        td4.appendChild(button);
        tr.appendChild(td4);

        tbody.appendChild(tr);
    });
}

// Marquer une tâche comme terminée ou non
function Cocher(index) {
    TableauTermine[index] = !TableauTermine[index];
    MettreAJourTaches(); // Actualiser le tableau
}

// Supprimer une tâche de la liste
function SupprimerTache(event) {
    const index = event.target.getAttribute("data-index");
    TableauTaches.splice(index, 1);
    TableauTermine.splice(index, 1);
    MettreAJourTaches(); // Actualiser l'affichage
}

// Filtrer les tâches en fonction de l'option sélectionnée
function FiltrerTaches() {
    const filtre = document.getElementById("filter").value;
    const rows = document.querySelectorAll("#taskTable tbody tr");

    rows.forEach((row, index) => {
        const estTermine = TableauTermine[index];
        if (filtre === "all") {
            row.style.display = "";
        } else if (filtre === "completed" && !estTermine) {
            row.style.display = "none";
        } else if (filtre === "uncompleted" && estTermine) {
            row.style.display = "none";
        } else {
            row.style.display = "";
        }
    });
}

// Ajouter les écouteurs d'événements
document.getElementById("addTask").addEventListener("click", AjouterTache);
document.getElementById("filter").addEventListener("change", FiltrerTaches);