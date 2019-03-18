$(function() {
  function buildSendMessageHTML(message){
    var insertImage = '';
    if (message.image) {
      insertImage = `<img src="${message.image}">`;
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
                    <div class='lower-message__content'>
                      ${message.content}
                        </divs>
                      ${insertImage}
                    </div>
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 5);
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    });
  });

$(function(){
    setInterval(updateSendMessage, 1000);
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
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 5);
      });
    });
  }
});
