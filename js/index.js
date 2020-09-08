'use strict';

const body = document.querySelector("body");
const video = document.querySelector("video");
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const resume = document.getElementById("resume");
const stop = document.getElementById("stop");
let recorder, stream;


const reportWindowSize = async () => {
    console.log('window.screen.height', window.screen.height);
    console.log('window.innerHeight', window.innerHeight);
    video.height = window.innerHeight - 200;
    console.log('video.height', video.height);
};

const onload = async () => {
    body.width = window.innerWidth;
    body.height = window.innerHeight;

    console.log('window.screen.height', window.screen.height);
    console.log('window.innerHeight', window.innerHeight);
    video.height = window.innerHeight - 200;
    console.log('video.height', video.height);
};

async function startRecording() {
    try {
        stream = await window.navigator.mediaDevices.getDisplayMedia({
            video: { mediaSource: "screen" }
        });
        recorder = new MediaRecorder(stream);

        const chunks = [];
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = e => {
            const completeBlob = new Blob(chunks, { type: chunks[0].type });
            video.src = URL.createObjectURL(completeBlob);
        };

        return recorder.start();
    } catch (error) {
        console.log(error);
    }
}

async function setAttribute(element, value) {
    return element.setAttribute("disabled", value);
}

async function removeAttribute(element) {
    return element.removeAttribute("disabled");
}

start.addEventListener("click", async () => {
    try {
        await setAttribute(start, true);
        await setAttribute(resume, true);
        await removeAttribute(pause);
        await removeAttribute(stop);

        startRecording();
    } catch (error) {
        console.log(error);
    }
});

pause.addEventListener("click", async () => {
    try {
        await setAttribute(start, true);
        await setAttribute(pause, true);
        await removeAttribute(resume);
        await removeAttribute(stop);

        recorder.pause();
        stream.getVideoTracks()[0].pause();
    } catch (error) {
        console.log(error);
    }
});

resume.addEventListener("click", async () => {
    try {
        await setAttribute(start, true);
        await setAttribute(resume, true);
        await removeAttribute(pause);
        await removeAttribute(stop);

        recorder.resume();
        stream.getVideoTracks()[0].resume();
    } catch (error) {
        console.log(error);
    }
});

stop.addEventListener("click", async () => {
    try {
        await setAttribute(pause, true);
        await setAttribute(resume, true);
        await setAttribute(stop, true);
        await removeAttribute(start);

        recorder.stop();
        stream.getVideoTracks()[0].stop();
    } catch (error) {
        console.log(error);
    }
});

window.onload = onload;
window.addEventListener('resize', reportWindowSize);
