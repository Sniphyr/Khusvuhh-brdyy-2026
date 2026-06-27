 // Countdown for 30 seconds
        function countdownFor30Seconds() {
            let remainingTime = 30; // Set the timer to 30 seconds

            const countdownInterval = setInterval(() => {
                if (remainingTime <= 0) {
                    clearInterval(countdownInterval); // Stop the timer
                    window.location.href = "intro.html"; // Redirect to the main birthday page
                    return;
                }

                // Calculate minutes and seconds
                const minutes = Math.floor(remainingTime / 60);
                const seconds = remainingTime % 60;

                // Display the timer
                document.getElementById('timer').textContent = 
                    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                remainingTime--; // Decrease the remaining time
            }, 1000);
        }

        // Start the countdown when the page loads
        countdownFor30Seconds();