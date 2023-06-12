const eventSource = new EventSource('progress');

eventSource.addEventListener('progress', function (event) {
    const data = JSON.parse(event.data)

    if (data.currentTask != undefined) {
        progressBar(data)
    }

    if (data.completed == true) {
        closeEventStream()
    }

});

eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    console.log("on message : ",data)
}

eventSource.onerror = (error) => {
    console.error('SSE error:', error);
};

// Either this or the up one
eventSource.addEventListener('error', (error) => {
    console.error('SSE error:', error);
});

eventSource.onopen = () => {
    console.log('SSE connection opened');
};

eventSource.onclose = () => {
    console.log('SSE connection closed');
};

function closeEventStream(){
    console.log("event stream closed")
    eventSource.close() 
}

function progressBar(data){

    // Get the progress bar element
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${data.progressPercentage}%`;

    // set the indicator
    const progressIndicators = document.getElementsByClassName("current-processing-task")
    // Iterate over the collection of elements and update their text content
    for (let i = 0; i < progressIndicators.length; i++) {
        progressIndicators[i].textContent = data.currentTask;
    }
}