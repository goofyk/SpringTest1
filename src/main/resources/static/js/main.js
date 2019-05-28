
var messageApi = Vue.resource('/message{/id}');

Vue.component('message-form', {
    props: ['messages'],
    data: function(){
        return {
            text: ''
        }
    },
    template: '<div>' +
                '<input type="text" placeholder="Write something..." v-model="text" />' +
                '<input type="button" value="Save" @click="save" />' +
              '</div>',
    methods:{
        save: function(){
            var message = { text: this.text };

            messageApi.save({}, message).then(result => {
                result.json().then(data => {
                    this.messages.push(data);
                    this.text = '';
                })
            })
        }
    }
});


Vue.component('message-item', {
    props: ['message'],
    template: '<div><span>({{ message.id }}) </span>{{ message.text }}</div>'
});

Vue.component('messages-list', {
    props: ['messages'],
    template: '<div>' +
                '<message-form :messages="messages" />' +
                '<message-item v-for="message in messages" :message="message" :key="message.id" />' +
              '</div>',
     created: function () {
                 messageApi.get().then(result => {
                    result.json().then(data => {
                        data.forEach(message => this.messages.push(message));
                    });
                 //this.messages = result.body; // mutated!!!
                 });
              }
});


var app = new Vue({
    el: '#app',
    template: '<messages-list :messages="messages" />',
    data: {
        messages: []
    }
});