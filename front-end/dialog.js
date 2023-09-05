"use strict"

import { createNewClicked } from "./submit.js";


export function showCreateDialog() {
    const createDialog = document.querySelector("#newArtistDialog"); // Ændret id til "newArtistDialog"

    document.querySelector("#artistForm").addEventListener("submit", createNewClicked);

    createDialog.showModal();
}
