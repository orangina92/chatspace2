$(function() {
  function buildSendMessageHTML(message){
    var insertImage = '';
    if (message.image_url) {
      insertImage = `<img src="${message.image_url}">`;
    }
    var html = `<div class='message' data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class='upper-message__user-name'>
                      ${message.name}
                    </div>
                    <div class='upper-message__date'>
                      ${message.created_at}
                    </div>
                  </div>
                  <div class='lower-message'>
                    ${message.content}
                      </div>
                    ${insertImage}
                  </div>
                </div>`;
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(sendMessage) {
      var html = buildSendMessageHTML(sendMessage);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.message').animate({scrollTop: $(".message")[0].scrollHeight}, 1500);
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    });
  });

  function scroll() {
    $('.message').animate({scrollTop: $('.message')[0].scrollHeight}, 'fast');
  }

$(function(){
    setInterval(updateSendMessage, 5000);
  });
  function updateSendMessage(){
    if($('.messages')[0]){
      var message_id = $('.message:last').data('message-id');
    } else {
      var message_id = 0
    }
    $.ajax({
      url: location.href,
      type: 'GET',
      data: {
         message: { id: message_id }
      },
      dataType: 'json',
    })
    .always(function(sendMessage){
      $.each(sendMessage, function(i, sendMessage){
        var html = buildSendMessageHTML(sendMessage);
      $('.messages').append(html);
      });
    });
  }
});
