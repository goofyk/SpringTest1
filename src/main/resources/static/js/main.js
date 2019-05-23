
var messageApi = Vue.resource('/message{/id}');

Vue.component('message-item', {
    props: ['message'],
    template: '<li>{{ message.text }}</li>'
})

Vue.component('messages-list', {
    props: ['messages'],
    template: '<ul>' +
                '<message-item v-for="message in messages" :message="message" :key="message.id" />' +
              '</ul>',
     created: function () {
                 messageApi.get().then(result => {
//                    result.json().then(data => {
//                        data.forEach(message => this.messages.push(message));
//                    });
                 this.messages = result.body;
                 });
              }
})


var app = new Vue({
    el: '#app',
    template: '<messages-list :messages="messages" />',
    data: {
        messages: []
    }
})