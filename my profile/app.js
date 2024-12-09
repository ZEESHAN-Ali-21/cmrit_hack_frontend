// Initializing variables for points and progress bar
let points = 0;
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const pointsText = document.getElementById('points');
const rewardText = document.getElementById('reward-text');

// Task buttons
const task1 = document.getElementById('task1');
const task2 = document.getElementById('task2');
const task3 = document.getElementById('task3');

// Container for dynamically adding the image input field
const imageUploadContainer = document.getElementById('image-upload-container');

// Function to update points and progress bar
function updateGameState(pointsEarned) {
    points += pointsEarned;
    pointsText.innerText = points;

    // Update progress bar
    const progress = (points / 100) * 100;
    progressBar.value = progress;
    progressText.innerText = `${points}/100 Points`;

    // Check for rewards
    if (points >= 100) {
        rewardText.innerText = "Congratulations! You've earned all rewards!";
    }
}

// Function to handle "Sort Plastic Waste" task
task1.addEventListener('click', () => {
    // Clear the container first
    imageUploadContainer.innerHTML = '';

    // Create and append the input field and verify button
    const imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.id = 'imageUpload';
    imageInput.accept = 'image/*';

    const verifyButton = document.createElement('button');
    verifyButton.textContent = 'Verify Image';
    verifyButton.id = 'verifyImage';

    const geoResult = document.createElement('p');
    geoResult.id = 'geoResult';

    imageUploadContainer.appendChild(imageInput);
    imageUploadContainer.appendChild(verifyButton);
    imageUploadContainer.appendChild(geoResult);

    // Add event listener for the verify button
    verifyButton.addEventListener('click', () => {
        const file = imageInput.files[0];
        if (file) {
            verifyGeotag(file);
        } else {
            geoResult.textContent = 'Please upload a photo first.';
        }
    });
});

// Function to verify geotag in image
function verifyGeotag(imageFile) {
    // Check if the file type is JPEG, JPG, or PNG
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const geoResult = document.getElementById('geoResult');

    if (!validImageTypes.includes(imageFile.type)) {
        geoResult.textContent = "Please upload a JPEG, JPG, or PNG image.";
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const imageData = e.target.result;

        // Use EXIF.js to extract geotag information
        EXIF.getData(imageData, function () {
            const lat = EXIF.getTag(this, 'GPSLatitude');
            const lon = EXIF.getTag(this, 'GPSLongitude');

            if (lat && lon) {
                // Convert GPS coordinates to a readable format (Optional)
                const latDeg = lat[0] + lat[1] / 60 + lat[2] / 3600;
                const lonDeg = lon[0] + lon[1] / 60 + lon[2] / 3600;

                geoResult.textContent = `Geotag verified! Coordinates: Latitude: ${latDeg.toFixed(6)}, Longitude: ${lonDeg.toFixed(6)}`;
                
                // Award points for valid geotagged image
                updateGameState(10); // Add 10 points for the task
            } else {
                geoResult.textContent = 'No geotag found or invalid GPS data. Try another image.';
            }
        });
    };
    reader.readAsArrayBuffer(imageFile);
}