const quote = document.querySelector(".quote"),
 generate = document.getElementById("generate"),
 category = document.getElementById("category"),
 likequote = document.getElementById("likequote"),
 likelist = document.getElementById("likelist")
 quoteArea=document.querySelector(".quoteArea"),
 favouriteList=document.querySelector(".favouriteList"),
 favouriteDAta=document.getElementById("favouriteDAta");
 

 let favouriteListArr = localStorage.getItem("favouriteListItems")?
 JSON.parse(localStorage.getItem("favouriteListItems")):[];



window.addEventListener("load",()=>{
    generateQuotes();
    favouriteList.style.display= "none";
    
    if(favouriteListArr.length == 0){
        likelist.style.opacity ="0.5";
        likelist.style.pointerEvents= "none";
    }else{
        likelist.style.opacity ="1";
        likelist.style.pointerEvents= "auto";
    }
});

function generateQuotes() {
    likequote.removeAttribute("class");
    likequote.setAttribute("class","fa-regular fa-heart");
    likequote.style.color="black";

    let div = document.createElement("div");
    quote.innerHTML='Loading New Quotes.....<i class="fa-solid fa-sync fa-spin"></i>';
    generate.innerHTML='Generating...';
    fetch("https://api.api-ninjas.com/v1/quotes?category=", {
        headers: { "X-Api-Key": "ZLC++ah0h+7VxOfDQkAepw==NepFSXABoOH9gxFA" }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        generate.innerHTML="New Quote";
        quote.innerHTML="";
        div.innerHTML+='<i class="fa-solid fa-quote-left"></i> &nbsp;';
        div.innerHTML+=data[0].quote;
        div.innerHTML+='&nbsp <i class="fa-solid fa-quote-right"></i>';
        div.innerHTML += '<div class="author"><span>By  </span> ' + data[0].author + '</div>';
        quote.append(div);
        category.innerHTML=data[0].category;
    });
}
function likeQuote() {
    if(likequote.style.color=="red"){
        likequote.removeAttribute("class");
        likequote.setAttribute("class","fa-regular fa-heart");
        likequote.style.color="black";

        favouriteListArr =favouriteListArr.filter(function(e){
            return e !== quote.innerHTML;
        localStorage.setItem("favouriteListItems", JSON.stringify(favouriteListArr));
        })
    }else{
    likequote.setAttribute("class","fa-solid fa-heart");
    likequote.style.color="red";


    favouriteListArr.push(quote.innerHTML);
    localStorage.setItem("favouriteListItems",JSON.stringify(favouriteListArr));
}
if(favouriteListArr.length == 0){
    likelist.style.opacity ="0.5";
    likelist.style.pointerEvents= "none";
}else{
    likelist.style.opacity ="1";
    likelist.style.pointerEvents= "auto";
}
}
function copyQuote(){
    navigator.clipboard.writeText(quote.innerText);
}
function twiiterQuote(){
    let quoteText = quote.innerText.trim(); 
    let encodedQuoteText = encodeURIComponent(quoteText);
    let twiteurl = `https://twitter.com/intent/tweet?text=${encodedQuoteText}`;
    window.open(twiteurl, '_blank');
}
function whatsappQuote() {
    const quoteText = document.querySelector('.quote').innerText;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(quoteText)}`;
    window.open(whatsappUrl, '_blank');
}

likelist.addEventListener("click",()=>{
    favouriteDAta.innerHTML="";
    quoteArea.style.display="none";
    favouriteList.style.display="block";

     favouriteListArr.forEach((item)=>{
        console.log(item);
        let li = document.createElement("li");
        li.innerHTML=item;
        favouriteDAta.append(li);
});
});
function switchQuotes(){
    quoteArea.style.display="block";
    favouriteList.style.display="none";
    if(favouriteListArr.length == 0){
        likelist.style.opacity ="0.5";
        likelist.style.pointerEvents= "none";
    }else{
        likelist.style.opacity ="1";
        likelist.style.pointerEvents= "auto";
    }
    
}

function clearFavouriteList(){
    favouriteDAta.innerHTML= ""
    favouriteListArr = []
    localStorage.setItem("favouriteListItems",JSON.stringify(favouriteListArr));

    likequote.removeAttribute("class");
    likequote.setAttribute("class","fa-regular fa-heart");
    likequote.style.color="black";
}

function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month:'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
    };
    document.getElementById('datetime').innerText = now.toLocaleString('en-US', options);
}
updateDateTime();
setInterval(updateDateTime, 1000);
