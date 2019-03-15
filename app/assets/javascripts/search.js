$(function() {
  var user_list = $("#user_search_result");

  var member_list = $("#member_search_result");

  function appendUsers(user) {
   var html = `<div class="chat-group-user clearfix">
   <p class="chat-group-user__name">${user.name}</p>
   <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
   </div>`
   user_list.append(html);
 }

 function appendMembers(name, user_id) {
  var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
  <p class='chat-group-user__name'>${name}</p>
  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
  </div>`

  member_list.append(html);
}

function appendErrMsgToHTML(msg) {
  var html = `<li>
  <div>${ msg }</div>
  </li>`
  user_list.append(html);
}

$("#user-search-field").on("keyup", function() {
  var input = $("#user-search-field").val();
  console.log('input');
  $.ajax({
    type: 'GET',
    url: '/users',
    data: { keyword: input },
    dataType: 'json'
  })

  .done(function(members) {
   $("#user_search_result").empty();
   if (members.length !== 0) {
     members.forEach(function(user){
       appendUsers(user);
     });
   }
   else {
     appendErrMsgToHTML("一致するユーザーはいません");
   }
 })
  .fail(function() {
    alert('ユーザー検索に失敗しました');
  })
});
});

$(function() {
  $(document).on("click", '.user_search_add', function() {
    var name = $(this).attr("data-user-name");
    var user_id = $(this).attr("data-user-id");
    $(this).parent().remove();
    appendMembers(name, user_id);
  });
  $(document).on("click", '.user_search_remove', function() {
    $(this).parent().remove();
  });
});

