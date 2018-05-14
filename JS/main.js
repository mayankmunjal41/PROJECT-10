
  var input = document.getElementById('myInput');
$.ajax({
  url: 'https://randomuser.me/api/?results=12',
  dataType: 'json',
  success: function(data) {
    function capitalize (string) {
      // return string.charAt(0).toUpperCase() + string.slice(1);
      return string.replace(/\b\w/g, function(l){ return l.toUpperCase() })
    }
    var randomHtml = '<ul>';
    $.each(data.results, function (i, photo) {

      randomHtml += '<div class="flex-layout">';
      randomHtml += '<div class="image">';
      randomHtml += '<img src ="' + photo.picture.medium + '"class="img">';
      randomHtml += '</div>';
      randomHtml += '<div class="li">';
      randomHtml += '<li>' + capitalize(photo.name.first)+ ' ' + capitalize(photo.name.last) + '</li>';
      randomHtml += '<li>' + photo.email + '</li>';
      randomHtml += '<li>' + capitalize(photo.location.state) + '</li>';
      randomHtml += '</div>';
      randomHtml += '</div>';
    });
    randomHtml += '</ul>';
    $('.photo').html(randomHtml);
    var employees = document.querySelectorAll('.flex-layout');
    var input = document.getElementById('myInput');
    var filter = input.value.toUpperCase();
    // var li = document.getElementsByTagName('li');

    input.addEventListener('keyup', function () {
      for ( var i = 0; i < employees.length; i++) {
        var li = employees[i].getElementsByTagName("li")[0];
        if (li.innerHTML.toUpperCase().includes(input.value.toUpperCase())) {
            employees[i].style.display = "";
        } else {
            employees[i].style.display = "none";
        }
      }
    })

    for ( var i = 0; i < employees.length; i++) {
      let obj = data.results[i];
      employees[i].addEventListener('click', function () {
        $('.modal').css("display", "block");
        $('body').css("background-color", "rgba(140, 140, 140, 0.79)");
        $('.flex-layout').css("background-color", "rgba(193, 191, 191, 0.42)");
        $('.flex-layout').css("border-color", "grey");
        let modalContent = `
          <div class="close">
          <p>X</p>
          </div>
          <div class="modal-content">
          <img src = ${obj.picture.large} class="image-2">
          <p class="name">${capitalize(obj.name.first)} ${capitalize(obj.name.last)}</p>
          <p>${obj.email}</p>
          <p>${capitalize(obj.location.city)}</p>
          <hr>
          <p>${obj.phone}</p>
          <p>${capitalize(obj.location.street)}, ${ obj.location.postcode}</p>
          <p>Birthday: ${obj.dob.slice(0,9)}</p>
          </div>`;
          $('.modal').html(modalContent);
          $('.close').click(function() {
            $('.modal').css("display", "none");
            $('body').css("background-color", "#9491910a");
            $('.flex-layout').css("background-color", "white");
            $('.flex-layout').css("border-color", "lightgrey");
          })
          
    })

  }

  }
});
