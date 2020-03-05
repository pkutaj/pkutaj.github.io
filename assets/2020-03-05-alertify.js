const button = document.getElementById("button")
button.addEventListener("click", event => {
    event.preventDefault();
    alertify.alert("Snowplow Challenge", "Well done!");
});