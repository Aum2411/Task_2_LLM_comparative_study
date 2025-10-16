document.addEventListener('DOMContentLoaded', function() {
    const compareBtn = document.getElementById('compare-btn');
    const userPromptInput = document.getElementById('user-prompt');
    const systemPromptInput = document.getElementById('system-prompt');
    const resultsSection = document.getElementById('results');
    const responseWithoutSystem = document.getElementById('response-without-system');
    const responseWithSystem = document.getElementById('response-with-system');
    const btnText = document.querySelector('.btn-text');
    const loader = document.querySelector('.loader');

    compareBtn.addEventListener('click', async function() {
        const userPrompt = userPromptInput.value.trim();
        const systemPrompt = systemPromptInput.value.trim();

        if (!userPrompt) {
            alert('Please enter a user prompt');
            return;
        }

        // Disable button and show loader
        compareBtn.disabled = true;
        btnText.textContent = 'Generating Responses...';
        loader.style.display = 'inline-block';

        // Hide previous results
        resultsSection.style.display = 'none';

        try {
            const response = await fetch('/compare', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_prompt: userPrompt,
                    system_prompt: systemPrompt
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Display results
                responseWithoutSystem.textContent = data.response_without_system;
                responseWithSystem.textContent = data.response_with_system;
                
                // Show results section with animation
                resultsSection.style.display = 'block';
                resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                alert('Error: ' + (data.error || 'Something went wrong'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server. Please try again.');
        } finally {
            // Re-enable button and hide loader
            compareBtn.disabled = false;
            btnText.textContent = 'Compare Responses';
            loader.style.display = 'none';
        }
    });

    // Add Enter key support for textareas (Ctrl+Enter to submit)
    [userPromptInput, systemPromptInput].forEach(textarea => {
        textarea.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                compareBtn.click();
            }
        });
    });
});
