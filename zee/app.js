// Points System
let points = 0;
const maxPoints = 100;
const maxAttempts = 10; // Maximum quiz attempts allowed in 24 hours

// DOM Elements
const pointsText = document.getElementById("points");
const progressBar = document.getElementById("progress-bar");
const progressText = document.getElementById("progress-text");
const interactionContainer = document.getElementById("interaction-container");
const loadingOverlay = document.getElementById("loading");

// Quiz Questions
const quizQuestions = [
    { question: "What material is most commonly recycled?", options: ["Plastic", "Glass", "Paper"], correct: "Paper" },
    { question: "Which of these is a renewable energy source?", options: ["Coal", "Solar", "Petroleum"], correct: "Solar" },
    { question: "What is composting?", options: ["Burning waste", "Decomposing organic material", "Landfilling"], correct: "Decomposing organic material" },
    { question: "What gas is produced in landfills?", options: ["Oxygen", "Methane", "Carbon Monoxide"], correct: "Methane" },
    { question: "What is the purpose of recycling?", options: ["To reduce waste", "To increase landfill usage", "To burn plastics"], correct: "To reduce waste" },
    { question: "Which of these items can be composted?", options: ["Plastic", "Food scraps", "Glass"], correct: "Food scraps" },
    { question: "What does the 3R principle stand for?", options: ["Reduce, Reuse, Recycle", "Recycle, Replenish, Reduce", "Refuse, Reuse, Return"], correct: "Reduce, Reuse, Recycle" },
    { question: "What is the largest source of greenhouse gases?", options: ["Transport", "Energy production", "Agriculture"], correct: "Energy production" },
    { question: "How long does it take plastic to decompose?", options: ["5 years", "50 years", "450 years"], correct: "450 years" },
    { question: "What is an example of an e-waste?", options: ["Plastic bottles", "Old phones", "Cardboard"], correct: "Old phones" },
    { question: "What does a green bin signify?", options: ["Paper waste", "Organic waste", "Plastic waste"], correct: "Organic waste" },
    { question: "What type of waste is most found in landfills?", options: ["Plastic", "Food", "Glass"], correct: "Food" },
    { question: "Which of these is not a fossil fuel?", options: ["Coal", "Oil", "Wind"], correct: "Wind" },
    { question: "What is the main cause of climate change?", options: ["Deforestation", "Recycling", "Solar energy"], correct: "Deforestation" },
    { question: "What does the blue bin signify?", options: ["Plastic waste", "Metal waste", "Recyclable waste"], correct: "Recyclable waste" },
    { question: "What does 'biodegradable' mean?", options: ["Recyclable", "Decomposable naturally", "Non-toxic"], correct: "Decomposable naturally" },
    { question: "What is upcycling?", options: ["Burning waste", "Reusing waste creatively", "Disposing waste"], correct: "Reusing waste creatively" },
    { question: "What percentage of plastic is recycled globally?", options: ["9%", "50%", "80%"], correct: "9%" },
    { question: "What is the main source of ocean plastic?", options: ["Ships", "Littering", "Land runoff"], correct: "Land runoff" },
    { question: "What is the best way to reduce waste?", options: ["Reuse items", "Burn waste", "Buy more"], correct: "Reuse items" },
    { question: "What is the meaning of 'carbon footprint'?", options: ["Energy use", "Waste generated", "Total greenhouse gases emitted"], correct: "Total greenhouse gases emitted" },
    { question: "Which energy source emits no greenhouse gases?", options: ["Solar", "Coal", "Natural gas"], correct: "Solar" },
    { question: "What is single-use plastic?", options: ["Reusable plastic", "Plastic used once", "Plastic for multiple purposes"], correct: "Plastic used once" },
    { question: "Which of these is harmful to marine life?", options: ["Cardboard", "Plastic waste", "Glass"], correct: "Plastic waste" },
    { question: "Which of these is considered hazardous waste?", options: ["Used batteries", "Cardboard", "Compost"], correct: "Used batteries" },
    { question: "What is the best way to deal with food waste?", options: ["Burn it", "Compost it", "Landfill it"], correct: "Compost it" },
    { question: "Which gas is the primary contributor to global warming?", options: ["Carbon dioxide", "Oxygen", "Hydrogen"], correct: "Carbon dioxide" },
    { question: "Which country produces the most waste per capita?", options: ["USA", "China", "India"], correct: "USA" },
    { question: "What is the symbol for recycling?", options: ["Three arrows", "A green circle", "A tree"], correct: "Three arrows" },
    { question: "What material is not recyclable?", options: ["Glass", "Plastic bags", "Paper"], correct: "Plastic bags" },
    { question: "What is the purpose of a landfill?", options: ["Recycle waste", "Store waste", "Compost organic matter"], correct: "Store waste" },
    { question: "Which of these is not renewable energy?", options: ["Coal", "Solar", "Wind"], correct: "Coal" },
    { question: "What is an ecological footprint?", options: ["Greenhouse gas use", "Environmental impact of a person", "Tree planting"], correct: "Environmental impact of a person" },
    { question: "How much of Earth’s water is drinkable?", options: ["1%", "10%", "50%"], correct: "1%" },
    { question: "What is a microplastic?", options: ["Large pieces of plastic", "Small plastic particles", "Plastic bags"], correct: "Small plastic particles" },
    { question: "What is the main purpose of solar panels?", options: ["Generate electricity", "Burn waste", "Reduce wind"], correct: "Generate electricity" },
    { question: "What does deforestation lead to?", options: ["Soil erosion", "More trees", "Better air quality"], correct: "Soil erosion" },
    { question: "Which of these contributes to air pollution?", options: ["Coal plants", "Solar panels", "Recycling"], correct: "Coal plants" },
    { question: "What is the best way to save water?", options: ["Fix leaks", "Burn waste", "Use more water"], correct: "Fix leaks" },
    { question: "What is a major cause of soil pollution?", options: ["Chemical fertilizers", "Paper", "Glass"], correct: "Chemical fertilizers" },
    { question: "What are the three main greenhouse gases?", options: ["CO2, CH4, N2O", "O2, N2, H2O", "CO2, O2, H2O"], correct: "CO2, CH4, N2O" },
    { question: "What is the largest energy consumer?", options: ["Transport", "Industry", "Buildings"], correct: "Industry" },
    { question: "What is the most sustainable mode of transport?", options: ["Bicycling", "Driving", "Flying"], correct: "Bicycling" },
    { question: "Which energy source causes acid rain?", options: ["Coal", "Solar", "Wind"], correct: "Coal" },
];

// Show Loading Animation
function showLoading(callback) {
    loadingOverlay.classList.remove("hidden");
    setTimeout(() => {
        loadingOverlay.classList.add("hidden");
        callback();
    }, 2000); // 2 seconds delay
}

// Update Points and Progress Bar
function updatePoints(pointsEarned) {
    points += pointsEarned;
    pointsText.textContent = points;
    progressBar.value = points;
    progressText.textContent = `${points}/${maxPoints} Points`;

    // Congratulate if max points reached
    if (points >= maxPoints) {
        alert("Congratulations! You've reached the maximum points!");
    }
}

// Task: Answer Sustainability Quiz
document.getElementById("start-quiz").addEventListener("click", () => {
    showLoading(() => {
        const randomIndex = Math.floor(Math.random() * quizQuestions.length);
        const question = quizQuestions[randomIndex];

        interactionContainer.innerHTML = `
            <h3 class="text-lg font-bold mb-4">Quiz</h3>
            <p class="text-gray-700">${question.question}</p>
            ${question.options
                .map((option, i) => `<button class="btn-task mt-2" id="answer${i}">${option}</button>`)
                .join("")}
        `;

        // Answer Buttons
        question.options.forEach((option, i) => {
            document.getElementById(`answer${i}`).addEventListener("click", () => {
                if (option === question.correct) {
                    alert("Correct! You earned 1 point.");
                    updatePoints(1);
                } else {
                    alert("Wrong answer. Try again!");
                }
                interactionContainer.innerHTML = ""; // Clear after answer
            });
        });
    });
});

// Task: Log Recycling Activity
document.getElementById("log-recycling").addEventListener("click", () => {
    showLoading(() => {
        interactionContainer.innerHTML = `
            <h3 class="text-lg font-bold mb-4">Log Recycling Activity</h3>
            <form id="recycling-form" class="space-y-4">
                <div>
                    <label for="type" class="block text-gray-700">Type of Waste:</label>
                    <select id="type" class="w-full mt-1 p-2 border rounded-md">
                        <option value="plastic">Plastic</option>
                        <option value="paper">Paper</option>
                        <option value="organic">Organic</option>
                    </select>
                </div>
                <div>
                    <label for="quantity" class="block text-gray-700">Quantity (kg):</label>
                    <input type="number" id="quantity" min="1" class="w-full mt-1 p-2 border rounded-md">
                </div>
                <div>
                    <label for="image-upload" class="block text-gray-700">Upload Image of Recycling Activity:</label>
                    <input type="file" id="image-upload" class="w-full mt-1 p-2 border rounded-md">
                </div>
                <button type="submit" class="btn-task mt-4">Submit</button>
            </form>
        `;

        // Handle Form Submission
        document.getElementById("recycling-form").addEventListener("submit", (e) => {
            e.preventDefault();
            const type = document.getElementById("type").value;
            const quantity = parseInt(document.getElementById("quantity").value);
            const imageFile = document.getElementById("image-upload").files[0];

            if (quantity > 0 && imageFile) {
                // Simulate a message indicating the picture has been submitted
                alert(`You logged ${quantity} kg of ${type} waste. Great job!`);
                interactionContainer.innerHTML = ""; // Clear after submission
                
                // Simulate the delay of 10-15 minutes for point credit
                setTimeout(() => {
                    alert("Picture submitted successfully!! The points will be credited in 10-15 minutes.");
                }, 2000); // Show confirmation after 2 seconds
            } else {
                alert("Please enter a valid quantity and upload a picture.");
            }
        });
    });
});
