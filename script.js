const questions = [
    {
        question: "HTML ย่อมาจากอะไร?",
        answers: [
            { text: "Hyperlinks and Text Markup Language",correct: false},
            { text: "Home Tool Markup Language",correct: false},
            { text: "Hyper Text Markup Language",correct: true},
            { text: "Hyper Tool Multi Language",correct: false},
        ]
    },
    {
         question: "คำสั่งใดใช้ในการแสดงข้อความบน Console ในภาษา JavaScript?",
        answers: [
            { text: "console.log()",correct: true},
            { text: "write()",correct: false},
            { text: "echo()",correct: false},
            { text: "print()",correct: false},
        ]
    },
    {
         question: "Cloud Service Model แบบ IaaS ให้บริการอะไรเป็นหลัก?",
        answers: [
            { text: "ซอฟต์แวร์สำเร็จรูป",correct: false},
            { text: "โครงสร้างพื้นฐาน",correct: true},
            { text: "ระบบปฏิบัติการ",correct: false},
            { text: "แอปพลิเคชัน",correct: false},
        ]
    },
    {
         question: "ข้อใดคือ Protocol ที่ใช้ในการรับอีเมล?",
        answers: [
            { text: "SMTP",correct: false},
            { text: "POP3",correct: true},
            { text: "FTP",correct: false},
            { text: "HTTP",correct: false},
        ]
    },
    {
         question: "หน่วยที่เล็กที่สุดของข้อมูลในคอมพิวเตอร์คืออะไร?",
        answers: [
            { text: "Byte",correct: false},
            { text: "Kilobyte",correct: false},
            { text: "Bit",correct: true},
            { text: "Megabyte",correct: false},
        ]
    },
    {
         question: "คำสั่ง SELECT ใน SQL ใช้ทำอะไร?",
        answers: [
            { text: "เพิ่มข้อมูล",correct: false},
            { text: "แก้ไขข้อมูล",correct: false},
            { text: "ลบข้อมูล",correct: false},
            { text: "เลือก/ดึงข้อมูล",correct: true},
        ]
    },
    {
         question: "Symbol == ใน JavaScript หมายถึงอะไร?",
        answers: [
            { text: "การเปรียบเทียบแบบ strict",correct: false},
            { text: "การเปรียบเทียบค่า",correct: true},
            { text: "การกำหนดค่า",correct: false},
            { text: "การเชื่อมสตริง",correct: false},
        ]
    },
    {
         question: "ข้อใดเป็นภาษาที่ใช้เขียนโปรแกรมเชิงวัตถุ (OOP)?",
        answers: [
            { text: "HTML",correct: false},
            { text: "CSS",correct: false},
            { text: "Java",correct: true},
            { text: "SQL",correct: false},
        ]
    },
    {
         question: "ไวรัสคอมพิวเตอร์แพร่กระจายได้อย่างไร?",
        answers: [
            { text: "ผ่านแฟลชไดร์ฟ",correct: false},
            { text: "ผ่านไฟล์แนบอีเมล",correct: false},
            { text: "ผ่านอินเทอร์เน็ต",correct: false},
            { text: "ถูกทุกข้อ",correct: true},
        ]
    },
    {
         question: "ข้อใดเป็นตัวอย่างของ Machine Learning?",
        answers: [
            { text: "ค้นหาข้อมูลใน Google",correct: false},
            { text: "ระบบแนะนำหนังใน Netflix",correct: true},
            { text: "การใช้คีย์บอร์ดพิมพ์ข้อความ",correct: false},
            { text: "การบันทึกไฟล์ลงใน Hard Disk",correct: false},
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    // โชว์ Timer และ Progress Bar
    if(timerElement) timerElement.style.display = "block";
    if(timeFill) timeFill.style.display = "block";
    showQuestion();
}

const timerElement = document.getElementById("timer"); // ถ้ามีตัวเลขด้วย
const timeFill = document.getElementById("time-fill");

let timeLimit = 30; // กำหนดเวลาต่อข้อ (วินาที)
let timer;
let timeLeft;

function startTimer() {
    timeLeft = timeLimit;
    updateTimerBar();

    timer = setInterval(() => {
        timeLeft--;
        updateTimerBar();

        if(timeLeft <= 0){
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function updateTimerBar() {
    // ตัวเลข (เลือกใช้หรือจะตัดออกก็ได้)
    if (timerElement) {
        timerElement.innerHTML = `Time: ${timeLeft}s`;
    }

    // คำนวณเปอร์เซ็นต์ความยาวเส้น
    let percent = (timeLeft / timeLimit) * 100;
    timeFill.style.width = percent + "%";
}

function resetTimer(){
    clearInterval(timer);
    startTimer();
}

function handleTimeout(){
    // ถ้าหมดเวลา -> disable ปุ่ม และโชว์คำตอบถูก
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}




function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

    resetTimer();
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();

     // ซ่อน Timer และ Progress Bar
    if(timerElement) timerElement.style.display = "none";
    if(timeFill) timeFill.style.display = "none";

    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();