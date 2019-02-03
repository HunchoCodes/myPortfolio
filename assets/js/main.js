
$(document).ready(function () {
  $('.submit').click(function (event) {
    event.preventDefault();
    console.log("button clicked");


    var email = $('.email').val();
    var subject = $('.subject').val();
    var message = $('.message').val();
    var statusElm = $('.status');
    statusElm.empty();

    if (email.length > 5 && email.includes('@') && email.includes('.')) {
      console.log("it works");
    } else {
      event.preventDefault();
      statusElm.append('<div>email is not valid</div>')
    }

    if (subject.length > 2) {
      console.log("it works");
    } else {
      event.preventDefault();
      statusElm.append('<div>subject is not valid</div>')
    }

    if (message.length > 20) {
      console.log("it works");
    } else {
      event.preventDefault();
      statusElm.append('<div>message is valid</div>')
    }

  })
})