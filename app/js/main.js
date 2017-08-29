//SLIDER
function plusDivs(n) {
	showDivs(slideIndex += n);
}
function showDivs(n) {
	var i;
	var slides = document.getElementsByClassName("slide");
	var count = document.getElementById("count");

	if (n > slides.length) {slideIndex = 1}
	if (n < 1) {slideIndex = slides.length}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	//скрываем все слайды кроме первого
	slides[slideIndex-1].style.display = "flex";

	if (slideIndex == slides.length) {
		//для последнего слайда берём картинку с прошлого слайда
		slides[i-1].querySelector('.background-image').setAttribute('src', slides[i-2].querySelector('img').getAttribute('src'));

		//убираем счётчик и кнопку спама
		document.getElementById("count").style.display = 'none';
		document.getElementById("spam").style.display = 'none';
	} else {
		//показываем счётчик и кнопку спама
		document.getElementById("count").innerHTML = '<i class="count-photo"><img src="img/photo1.svg" alt="photo"></i>'
			 + slideIndex+'/'+(slides.length-1);
		document.getElementById("count").style.display = 'inline';
		document.getElementById("spam").innerHTML = 'P';
		document.getElementById("spam").style.display = 'inline';
	}
}
var slideIndex = 1; //номер начального слайда

//запускаем отображение слайда
showDivs(slideIndex);
var next = document.getElementById('prev');
var prev = document.getElementById("next");
prev.addEventListener("click", function() {
	plusDivs(1);
});
next.addEventListener("click", function() {
	plusDivs(-1);
});

//KEY NAVIGATION
function moveSlider(e){

    switch(e.keyCode){
    	case 32:  // если нажата клавиша пробел
    		e.preventDefault();
    		plusDivs(1);
            break;
        case 37:  // если нажата клавиша влево
        	e.preventDefault();
        	plusDivs(-1);
            break;
        case 39:   // если нажата клавиша вправо
        	e.preventDefault();
        	plusDivs(1);
            break;
        case 49:   // если нажата клавиша 1
        case 97:
        	document.querySelector('.icon-like').classList.toggle("nocheck");
        	document.querySelector('.icon-dislike').classList.remove("nocheck");
            break;
        case 50:   // если нажата клавиша 2
        case 98:
        	document.querySelector('.icon-like').classList.add("nocheck");
        	document.querySelector('.icon-dislike').classList.toggle("nocheck");
            break;
        case 51:   // если нажата клавиша 3
        case 99:
        	document.querySelector('.icon-superlike').classList.toggle("nocheck");
        	break;
    }
}
addEventListener("keydown", moveSlider);

//BUTTON LIKE, DISLIKE, SUPERLIKE, PROFILE, SHOWMAP
var likes = document.querySelectorAll('.icon');
for (var i = 0; i < likes.length; i++) {
	likes[i].onclick = function() {
		this.classList.toggle("nocheck");
	};
};
var profile = document.getElementById("profile");
profile.addEventListener("click", function() {
	document.getElementById("user-card").classList.toggle("show");
});
var buttonMap = document.getElementById("button-map");
buttonMap.addEventListener("click", function() {
	document.getElementById("map-info").style.display = 'none';
});


//YANDEX MAP
var minsk_map;
ymaps.ready(function(){
	minsk_map = new ymaps.Map("first_map", {
		center: [53.908478, 27.575049],
		zoom: 17
	});
});


//CAROUSEL
var width = 114; // ширина изображения
var count = 1; // сдвиг количество изображений
var desktop = 6; // общее количество видимых изображений
var position = 0; //начальный сдвиг

var carousel = document.getElementById('carousel');
var list = carousel.querySelector('ul');
var listElems = carousel.querySelectorAll('li');

document.getElementById("count-carousel").innerHTML = listElems.length + '<i class="count-photo"><img src="img/photo1.svg" alt="photo"></i>';
carousel.querySelector('.prev-carousel').style.display = 'none'

carousel.querySelector('.prev-carousel').onclick = function() {

	position = position - width * count;

	if (position <= 0) {
		position = 0;
		this.style.display = 'none'
		carousel.querySelector('.next-carousel').style.display = 'block';
	}

	list.style.marginLeft = -position + 'px';
};
carousel.querySelector('.next-carousel').onclick = function() {

	position = position + width * count;

	if (position >= width * (listElems.length - desktop)) {
		position = width * (listElems.length - desktop);
		this.style.display = 'none';
		carousel.querySelector('.prev-carousel').style.display = 'block';
	}

	list.style.marginLeft = -position + 'px';
};

//переход на слайдер при клике на карусели
var elements = carousel.querySelectorAll('.slide-carousel');
for (var i = 0; i < elements.length; i++) {
	elements[i].onclick = function() {
		document.getElementById("user-card").classList.remove("show");
		document.querySelector('.icon-profile').classList.toggle("nocheck");
	};
};