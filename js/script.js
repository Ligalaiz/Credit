"use strict";

$(function () {
  $("#slider-range-max").slider({
    range: "min",
    value: 300000,
    step: 5000,
    min: 10000,
    max: 15000000,
    slide: function (event, ui) {
      var uiStr = ui.value.toString();
      $("#sum").val(uiStr.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ") + " руб.");
    }
  });
  $("#sum").val($("#slider-range-max").slider("value").toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ") + " руб.");
});

$( function() {
   $( "#slider-range-min" ).slider({
     range: "min",
     value: 9,
     min: 1,
     max: 60,
     slide: function( event, ui ) {
       $( "#term" ).val(ui.value + " месяцев" );
     }
   });
   $( "#term" ).val($( "#slider-range-min" ).slider( "value" ) + " месяцев");
});

$( function() {
   $(".phone").mask("+7 999 999 99-99");
});

// вся магия после загрузки страницы
$("form").submit(function () { // перехватываем все при событии отправки
  var form = $(this); // запишем форму, чтобы потом не было проблем с this
  var error = false; // предварительно ошибок нет
  form.find('input').each(function () { // пробежим по каждому полю в форме
    if ($(this).val() == '') { // если находим пустое
      alert('Заполните поле "' + $(this).siblings('label').text() + '"!'); // говорим заполняй!
      error = true; // ошибка
    }
  });
  if (!error) { // если ошибки нет
    var data = form.serialize(); // подготавливаем данные
    $.ajax({ // инициализируем ajax запрос
      type: 'POST', // отправляем в POST формате, можно GET
      url: 'php/contact.php', // путь до обработчика, у нас он лежит в той же папке
      dataType: 'json', // ответ ждем в json формате
      data: data, // данные для отправки
      beforeSend: function (data) { // событие до отправки
        form.find('button[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
      },
      success: function (data) { // событие после удачного обращения к серверу и получения ответа
        if (data['error']) { // если обработчик вернул ошибку
          alert(data['error']); // покажем её текст
        } else { // если все прошло ок
          alert("Спасибо! Наши менеджеры свяжутся с Вами в ближайшее время");
          // $.fancybox('<article id="pp_thanksPage"><div class="leadForm"><p>Спасибо! <br />Наши менеджеры свяжутся с Вами в ближайшее время</p></div></article>', {
          //   padding: 0,
          // });
        }
      },
      error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
        alert(xhr.status); // покажем ответ сервера
        alert(thrownError); // и текст ошибки
      },
      complete: function (data) { // событие после любого исхода
        form.find('button[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
      }
    });
  }
  return false; // вырубаем стандартную отправку формы
});
