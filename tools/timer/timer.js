

var timeSec = document.querySelector('.time-sec')
var timeMin = document.querySelector('.time-min')
var timeHour = document.querySelector('.time-hour')

/// getting lottie file control
var timerAnimationStatus = document.querySelector('.statusLogo')



var timerStarted = false
var timeState = 'paused'
var firstTime = true
var firstTimeNegativeCounter = true
var counterState = 'p'
var start = document.querySelector(".start");
var reset = document.querySelector(".reset");
var editTextArea = document.querySelector(".editTextArea");

var initialHour = 0
var initialMinute = 0
var initialSecond = 0
var currentHour = 0
var currentMinute = 0
var currentSecond = 0



function negativeCounter() {
    timeHour.innerHTML = `-${currentHour}`
    var audio = new Audio('sound/beep-warning.mp3');
    audio.play()
    setInterval(() => {
        if (timeState == 'play' && counterState =='n') {
            audio.play()
        }
        else {
            return;
        }
    }, 5000)

    setInterval(function () {
        if (timeState == 'play' && counterState =='n') {
            if (currentHour == 99 && currentMinute == 59 && currentSecond == 59) {
                // timeSec.style.color = 'red'
                // timeMin.style.color = 'red'
                // timeHour.style.color = 'red'
                // timerAnimationStatus.innerHTML = `
                // <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                // <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_kkxqs4gg.json"  background="transparent"  speed="1"  style="width: 12vw; height: 12vw;"  loop  autoplay></lottie-player>
                // `;
                return;
            }
            if (currentMinute == 59 && currentSecond == 59) {
                currentHour = currentHour + 1
                if (currentHour < 10) {
                    timeHour.innerHTML = `-0${currentHour}`
                }
                else if (timeHour > 9) {
                    timeHour.innerHTML = `-${currentHour}`
                }

            }
            if (currentSecond == 59) {
                currentSecond = -1
                currentMinute = currentMinute + 1
                if (currentMinute < 10) {
                    timeMin.innerHTML = `0${currentMinute}`
                }
                else if (currentMinute > 9) {
                    timeMin.innerHTML = currentMinute
                }
            }
            currentSecond = currentSecond + 1
            if (currentSecond < 10) {
                timeSec.innerHTML = `0${currentSecond}`
            }
            else if (currentSecond > 9) {
                timeSec.innerHTML = currentSecond
            }
        }
        else {
            return;
        }

    }, 1000);
}



function timeCounter() {
    setInterval(function () {
        if (timeState == 'play' && counterState == 'p') {
            if (currentHour == 0 && currentMinute == 0 && currentSecond == 0) {
                timeSec.style.color = 'red'
                timeMin.style.color = 'red'
                timeHour.style.color = 'red'
                timeHour.innerHTML = `-${currentHour}`
                timerAnimationStatus.innerHTML = `
                <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
                <lottie-player src="https://assets6.lottiefiles.com/packages/lf20_kkxqs4gg.json"  background="transparent"  speed="1"  style="width: 8vw; height: 8vw;"  loop  autoplay></lottie-player>
                `;
                counterState = 'n'
                if(firstTimeNegativeCounter){
                    negativeCounter()
                    firstTimeNegativeCounter = false
                }
                return;
            }
            if (currentMinute == 0 && currentSecond == 0) {
                currentMinute = 60
                currentHour = currentHour - 1
                if (currentHour < 10) {
                    timeHour.innerHTML = `0${currentHour}`
                }
                else if (timeHour > 9) {
                    timeHour.innerHTML = currentHour
                }

            }
            if (currentSecond == 0) {
                currentSecond = 60
                currentMinute = currentMinute - 1
                if (currentMinute < 10) {
                    timeMin.innerHTML = `0${currentMinute}`
                }
                else if (currentMinute > 9) {
                    timeMin.innerHTML = currentMinute
                }
            }
            currentSecond = currentSecond - 1
            if (currentSecond < 10) {
                timeSec.innerHTML = `0${currentSecond}`
            }
            else if (currentSecond > 9) {
                timeSec.innerHTML = currentSecond
            }
        }
        else {
            return;
        }

    }, 1000);
}


start.addEventListener('click', function () {
    if (timeState == 'paused' && firstTime) {
        start.style.backgroundImage = "url('image/pause.png')"

        if (!timerStarted) {
            
            var inputHour = timeHour.innerHTML
            if(inputHour == ''){
                currentHour = 0
            }
            else{
                currentHour = parseInt(inputHour)
            }
            initialHour = currentHour
            if (currentHour < 10) {
                timeHour.innerHTML = `0${currentHour}`
                initialHour = `0${currentHour}`
            }
            else if (timeHour > 9) {
                timeHour.innerHTML = currentHour
                
            }
            var inputMin = timeMin.innerHTML
            if(inputMin == ''){
                currentMinute = 0
            }
            else{
                currentMinute = parseInt(inputMin)
            }
            initialMinute = currentMinute
            if (currentMinute < 10) {
                timeMin.innerHTML = `0${currentMinute}`
                initialMinute = `0${currentMinute}`
            }
            else if (currentMinute > 9) {
                timeMin.innerHTML = currentMinute
            }
            var inputSec = timeSec.innerHTML
            if(inputSec == ''){
                currentSecond = 0
            }
            else{
                currentSecond = parseInt(inputSec)
            }
            initialSecond = currentSecond
            if (currentSecond < 10) {
                timeSec.innerHTML = `0${currentSecond}`
                initialSecond = `0${currentSecond}`
            }
            else if (currentSecond > 9) {
                timeSec.innerHTML = currentSecond
            }
            
            document.querySelector(".editTextArea").style.display = "none"

            document.querySelectorAll(".timerfont").forEach((e)=>{
                    e.style.display = "flex"
            })
            timeCounter()
            timerStarted = true
            firstTime = false
        }
        // if(counterState == '+'){
        //     timeCounter()
        // }
        // else{
        //     negativeCounter()
        // }
        timeState = 'play'
    }
    else if (timeState == 'paused' && !firstTime) {
        start.style.backgroundImage = "url('image/pause.png')"

        if (!timerStarted) {
            var x = document.getElementById("inputhour").value;
            var y = document.getElementById("inputMin").value;
            var z = document.getElementById("inputSec").value;
            initialHour = x
            initialMinute= y
            initialSecond = z

            var inputHour = timeHour.innerHTML
            if(inputHour == ''){
                currentHour = 0
            }
            else{
                currentHour = parseInt(inputHour)
            }
            if (currentHour < 10) {
                timeHour.innerHTML = `0${currentHour}`
            }
            else if (timeHour > 9) {
                timeHour.innerHTML = currentHour
            }
            var inputMin = timeMin.innerHTML
            if(inputMin == ''){
                currentMinute = 0
            }
            else{
                currentMinute = parseInt(inputMin)
            }            
            if (currentMinute < 10) {
                timeMin.innerHTML = `0${currentMinute}`
            }
            else if (currentMinute > 9) {
                timeMin.innerHTML = currentMinute
            }
            var inputSec = timeSec.innerHTML
            if(inputSec == ''){
                currentSecond = 0
            }
            else{
                currentSecond = parseInt(inputSec)
            }            
            if (currentSecond < 10) {
                timeSec.innerHTML = `0${currentSecond}`
            }
            else if (currentSecond > 9) {
                timeSec.innerHTML = currentSecond
            }
            document.querySelector(".editTextArea").style.display = "none"

            document.querySelectorAll(".timerfont").forEach((e)=>{
                    e.style.display = "flex"
            })
            // timeCounter()
            timerStarted = true
            firstTime = false
        }
        // if(counterState == '+'){
        //     timeCounter()
        // }
        // else{
        //     negativeCounter()
        // }
        timeState = 'play'
    }
    else if (timeState = 'play') {
        start.style.backgroundImage = "url('image/play.png')"
        timeState = 'paused'
    }
})



reset.addEventListener('click', function () {


    hourLeft = 0
    minLeft = 0
    secLeft = 0
    timeColor = 'green'
    if(counterState == 'p'){
        hourLeft = currentHour
        minLeft = currentMinute
        secLeft = currentSecond
    }
    else if(counterState == 'n'){
        hourLeft = '-' + currentHour 
        minLeft = currentMinute 
        secLeft = currentSecond 
        timeColor = 'red'
    }
    var name = document.getElementById("inputname").value;
    if(name == ''){
        name = 'no Name'
    }


    timerStarted = false
    timeState = 'paused'
    counterState = 'p'
    currentHour = 0
    currentMinute = 0
    currentSecond = 0
    timeSec.style.color = 'black'
    timeMin.style.color = 'black'
    timeHour.style.color = 'black'
    start.style.backgroundImage = "url('image/play.png')"
    timerAnimationStatus.innerHTML = `
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <lottie-player class="timer-animation" src="https://assets2.lottiefiles.com/packages/lf20_i0mxtka6.json"  background="transparent"  speed="1"  style="width: 8vw; height: 8vw;"  loop  autoplay></lottie-player>
        `;
    timeHour.innerHTML = `${initialHour}`
    timeMin.innerHTML = `${initialMinute}`
    timeSec.innerHTML = `${initialSecond}`

    document.querySelector(".editTextArea").style.display = "flex"

    document.querySelectorAll(".timerfont").forEach((e)=>{
        e.style.display = "none"
    })

    var thing = `<div class="ListIteam">
    <div class="eventNameBox">${name}</div>
    <div class="timeTaken" style="color: ${timeColor};">${hourLeft} : ${minLeft} : ${secLeft}</div>
    <div class="activeOrNot" style="color: orange;" >closed</div>
    </div>`
    var doc = document.querySelector('.list')
    var card = document.createElement('div')
    card.innerHTML = thing
    doc.prepend(card)

})

