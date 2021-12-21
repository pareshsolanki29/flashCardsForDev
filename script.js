const flashcards = document.getElementsByClassName("flashcards")[0];
const createBox = document.getElementsByClassName("create-box")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");


let contentArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
contentArray.forEach(divMaker)

function addFlashCard(){
    let flashCardInfo = {
        "id": contentArray.length,
        'my_quesion': question.value,
        'my_answer' :answer.value
    }
    contentArray.push(flashCardInfo);
    localStorage.setItem('items', JSON.stringify(contentArray))
    divMaker(contentArray[contentArray.length-1])
    question.value='';
    answer.value='';
}
function divMaker(text){
    console.log(contentArray)
    let div = document.createElement("div");
    let h2_q = document.createElement("h2")
    let h2_a = document.createElement("h2")
    let delflashCard = document.createElement("button");
    div.setAttribute('id', text.id);
    let showAns = document.createElement("button");
    showAns.innerHTML= "Show Answer";

    delflashCard.innerHTML= "Delete";
    delflashCard.setAttribute('style', "margin:auto; display: flex; justify-content: center ")
    div.className = "flashcard";
    h2_q.setAttribute('style', "border-top: 1px solid red; padding: 15px; margin-top:30px;")
    h2_q.innerHTML = text.my_quesion;
    h2_a.setAttribute('style', "text-align:center; display:none; color:red")
    h2_a.innerHTML = text.my_answer;
    div.appendChild(h2_q)
    div.appendChild(h2_a)
    showAns.addEventListener("click", function(){
        if(h2_a.style.display == "none"){
            h2_a.style.display = "block"
        }else{
            h2_a.style.display = "none"
        }
    })
    delflashCard.addEventListener("click", function(e){
        console.log(e.target.parentElement.id)
           if(e.target.parentElement.id){
               let delId = e.target.parentElement.id
                contentArray = contentArray.filter((card, index )  => { index !== delId})
           }
           console.log(contentArray)
            localStorage.setItem('items', JSON.stringify(contentArray))
            contentArray.forEach(divMaker)

    })
        div.appendChild(delflashCard) 
        div.appendChild(showAns)   

        flashcards.appendChild(div)

}
function deleteAllFlashCards(){
    localStorage.clear();
    flashcards.innerHTML = '';
    contentArray =[]

}

function hideFlashCard(){
    createBox.style.display = "none";
}
function createFlashCard(){
    createBox.style.display = "block";
}