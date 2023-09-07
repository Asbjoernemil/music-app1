"use strict"

import { createNewClicked, updateArtistClicked } from "./submit.js";


export function showCreateDialog() {
    const createDialog = document.querySelector("#newArtistDialog");

    document.querySelector("#artistForm").addEventListener("submit", createNewClicked);

    createDialog.showModal();
}

export function showUpdateDialog(artist, artists) {
    const editArtistDialog = document.querySelector("#editArtistDialog");

    // Find kunstneren baseret på artist-id (du skal have en metode til at søge efter kunstnere i artists-array)
    const selectedArtist = artists.find(a => a.id === artist);

    if (selectedArtist) {
        // Udfyld dialogformularen med kunstnerens oplysninger
        const form = document.querySelector("#editArtistForm");
        form.editName.value = selectedArtist.name;
        form.editGender.value = selectedArtist.gender;
        form.editBirthdate.value = selectedArtist.birthdate;
        form.editActiveSince.value = selectedArtist.activeSince;
        form.editGenres.value = selectedArtist.genres;
        form.editLabels.value = selectedArtist.labels;
        form.editWebsite.value = selectedArtist.website;
        form.editImage.value = selectedArtist.image;
        form.editShortDescription.value = selectedArtist.shortDescription;

        const favoriteCheckbox = form.querySelector('input[name="favorite"]');
        favoriteCheckbox.checked = selectedArtist.favorite;

        // Åbn dialogen
        editArtistDialog.showModal();

        // Lyt efter submit på dialogformularen og kald updateArtistClicked
        form.addEventListener("submit", (event) => updateArtistClicked(event, selectedArtist));
    }
}

export function showFavoriteDialog() {

    const favoriteDialog = document.querySelector("#favorites-dialog");

    favoriteDialog.showModal();
}