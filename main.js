Webcam.set({
    width: 397,
    height: 298,
    dest_width: 417,
    dest_height: 308,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach(camera);

function takeSnapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capturedImg" src="' + data_uri + '"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XDx2SKCvW/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!");
}

function check() {
    img = document.getElementById("capturedImg");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultEmotionName").innerHTML = results[0].label;
        prediction1 = results[0].label;
        speak();

        if(results[0].label == "Yes") {
            document.getElementById("updateEmoji").innerHTML = "&#128077;";
        }
        if(results[0].label == "No") {
            document.getElementById("updateEmoji").innerHTML = "&#128078;";
        }
        if(results[0].label == "Ok") {
            document.getElementById("updateEmoji").innerHTML = "&#128076;";
        }
        if(results[0].label == "Victory") {
            document.getElementById("updateEmoji").innerHTML = "&#9996;";
        }
        if(results[0].label == "Clap") {
            document.getElementById("updateEmoji").innerHTML = "&#128079;";
        }
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "The first prediction is " + prediction1 + ".";
    var utterThis = new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis);
}