// Perserve scroll postiion function
document.addEventListener("DOMContentLoaded", function (event) {
    var scrollpos = sessionStorage.getItem("scrollpos");
    if (scrollpos)
        window.scrollTo(0, scrollpos);
});

window.onbeforeunload = function (e) {
    sessionStorage.setItem("scrollpos", window.scrollY);
};
// Turn password into aterisks
document.addEventListener("DOMContentLoaded", function () {
    var passwordElements = document.querySelectorAll(".password");

    passwordElements.forEach(function (element) {
        var length = element.textContent.length;
        element.textContent = "*".repeat(length);
    });
});

// Setup for display loading
let loadingHTML = document.createElement("div");
loadingHTML.classList.add("loader");


/**
 * A function to handle delete a row in a table
 *
 * Use for display purpose only
 * @param {*} obj An element inside the row
 */
function handleRemoveRow(obj) {
    let parent;
    console.log("[REMOVE ELEMENTS] :: Removing parent div (<tr>) ");
    parent = obj.closest("tr");
    console.log(parent);
    parent.remove();
}
// You know what, these guy probably need a page refresh, it is not worth updating using js
// So we just gonna fire the form with the id I guess
handleRemoveUser = (obj, id) => {
//    handleRemoveElement(obj);
    console.log("TODO: remove user in database, id: " + id);
};

handlePromoteUser = (obj, id) => {
//    handleRemoveElement(obj);
    console.log("TODO: Promote to admin user in database, id: " + id);
};

handleRemoveFile = (obj, target) => {
    handleRemoveRow(obj, target);
    console.log("TODO: Remove user file uploaded");
};

handleDeleteSong = (obj, id) => {
    handleRemoveRow(obj);
    console.log("TODO: DELETE song from system , id: " + id);
};

handleDeleteSongFromPlaylist = (obj, songId, playlistId) => {
    handleRemoveRow(obj);
    console.log(`TODO: DELETE songId:${songId} from playlist ${playlistId}`);
};
/**
 * Make call to server for playlist songs and update display when the playlist is changed
 */
const playlistInformation = document.getElementsByClassName("playlist-information")[0];
handleSelectPlaylist = async (obj) => {
    let playlistId = obj.value;
    let index = obj.selectedIndex;
    let playlistName = obj.options[index].text;
    // Show the information of the playlist
    playlistInformation.classList.toggle("hide");
    let playlistNameHTML = playlistInformation.querySelector(".playlist__name");
    playlistNameHTML.textContent = playlistName;

    console.log("Calling servet to get songs from playlist: " + playlistId);
    if (playlistId !== "null") {
        let table = document.getElementById("edit-playlist__table");
        let tbody = table.querySelector('tbody');

        tbody.appendChild(loadingHTML); // Funny little loading guy

        // Make call to the getPlaylistSongs
        response = await fetch(`GetPlaylistSongs?action=get&playlistId=${playlistId}`);
        if (response !== null || response.ok) {
            let songObj = await response.json();

            tbody.innerHTML = ``;
            // Set the display of songs
            for (var s of songObj) {
                let songHTML = document.createElement('tr');
                songHTML.classList.add('song-selection');
                songHTML.innerHTML = `
                <tr class="song-selection">
                    <th class="song-img">
                        <img src="${s.songImagePath}" alt="User picture here" />
                    </th>
                    <td class="song-title">
                        ${s.title}
                    </td>
                    <td class="song-artist">${s.artist}</td>
                    <td class="song-album">
                        ${s.album}
                    </td>
                    <td class="song-duration">${s.duration}</td>
                    <td>
                        <button onclick="handleDeleteSong(this, ${s.songId})">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>`;
                tbody.appendChild(songHTML);
            }
        }
    } else {
        console.log("Default playlist selected");
    }
};

// Handling change name part
const pNameToggleEdit = playlistInformation.getElementsByClassName("playlist__toggle-change-name")[0];
const pNameConfirmBtn = pNameToggleEdit.nextElementSibling;
const pNameCancelBtn = pNameConfirmBtn.nextElementSibling;
const pNameInput = playlistInformation.querySelector("input");
const pNameTitle = playlistInformation.querySelector("h3");
/*
 * Handle when toggle edit playlist name is clicked:
 * 
 * 1. Hide self, turn on the confirm and cancel buttons
 * 
 * 2. Turn the playlist name into input
 */
pNameToggleEdit.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log("You clicked change name!");

    // Toggle display the buttons
    pNameConfirmBtn.classList.toggle("hide");
    pNameCancelBtn.classList.toggle("hide");
    pNameToggleEdit.classList.toggle("hide");

    // Toggle the input for user to enter
    pNameInput.classList.toggle("hide");
    pNameTitle.classList.toggle("hide");
});
/**
 * When toggle is on, and confirm is clicked:
 * 
 * 1. Make calls to server base on the input value
 * 
 * 2. Wait for server response and update the title, setting the elements
 * 
 * 3. If error, don't update (Or implement some kind of pop-up)
 */
pNameConfirmBtn.addEventListener('click', (evt) => {
    evt.preventDefault();

    console.log("TODO: Handle update playlist name here");

    // Lets say the the call succeed, set the title name here

    // Toggle display the buttons
    pNameConfirmBtn.classList.toggle("hide");
    pNameCancelBtn.classList.toggle("hide");
    pNameToggleEdit.classList.toggle("hide");

    // Turn off input
    pNameInput.classList.toggle("hide");
    pNameTitle.classList.toggle("hide");
});

/**
 * When toggle is on, and cancel is clicked: 
 * 
 * 1. Revert back to the initial state by setting the elements
 */
pNameCancelBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    console.log("Playlist name change canceled");
    // Toggle display the buttons
    pNameConfirmBtn.classList.toggle("hide");
    pNameCancelBtn.classList.toggle("hide");
    pNameToggleEdit.classList.toggle("hide");

    // Turn off input
    pNameInput.classList.toggle("hide");
    pNameTitle.classList.toggle("hide");
});


const addSongModal = document.getElementById("add-song-modal");
const pAddSong = document.querySelector(".playlist__add-songs");
/**
 * Get unique songs so that user can choose it to add into their playlist
 * 
 * This is triggered when the add-song modal is open
 */
pAddSong.addEventListener("click", () => {
    let option = document.querySelector("#selectPlaylist");
    let playlistId = option.value;
    let tbody = addSongModal.querySelector('tbody');
    tbody.appendChild(loadingHTML);
    // Make call to the getPlaylistSongs
    fetch(`GetPlaylistSongs?action=getUnique&playlistId=${playlistId}`)
            .then((r) => r.json())
            .then((rJSON) => {
                tbody.innerHTML = ``;
                for (var s of rJSON) {
                    let songHTML = document.createElement('tr');
                    songHTML.classList.add('song-selection');
                    songHTML.innerHTML =
                            `<tr class="song-selection">
                                        <th class="song-img">
                                            <img src="${s.songImagePath}" alt="${s.title}" />
                                        </th>
                                        <td class="song-title">${s.title}</td>
                                        <td class="song-artist">${s.artist}</td>
                                        <td class="song-album">${s.album}</td>
                                        <td class="song-duration">${s.duration}</td>
                                        <td>
                                            <button onclick="handleAddSongToPlaylist(this, ${s.songId}, ${playlistId})">
                                                <i class="fa-solid fa-circle-plus"></i>
                                            </button>
                                        </td>
                                    </tr>`;
                    tbody.appendChild(songHTML);
                }
            })
            .catch((error) => console.error(error));
});




