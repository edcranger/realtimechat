/* eslint-disable prettier/prettier */
<template>
  <q-page padding>
    <div class="q-pa-md row justify-center">
      <q-card class="my-card q-pa-lg full-width">
        <div style="width: 100%; ">
          <h4>Chat Box</h4>

          <div v-for="(message, index) in messages" :key="index">
            <q-chat-message
              v-if="message.photo === newMessage.photo"
              name="me"
              :avatar="message.photo"
              :text="[message.message]"
              stamp="7 minutes ago"
              sent
              bg-color="amber-7"
            />
            <q-chat-message
              v-if="message.photo !== newMessage.photo"
              :name="message.name"
              :avatar="message.photo"
              :text="[message.message]"
              text-color="white"
              bg-color="primary"
            />
          </div>

          <q-chat-message
            v-if="typing"
            :avatar="userTyping"
            text-color="white"
            bg-color="primary"
          >
            <q-spinner-dots size="2rem" />
          </q-chat-message>
        </div>

        <q-separator />

        <q-input
          class="q-mt-lg"
          standout
          bottom-slots
          v-model="newMessage.message"
          label="Message"
          :dense="dense"
          @keyup.enter="newChat()"
        >
          <template v-slot:before>
            <q-avatar>
              <img :src="newMessage.photo" />
            </q-avatar>
          </template>

          <template v-slot:append>
            <q-icon
              v-if="newMessage.message !== ''"
              name="close"
              @click="newMessage.message = ''"
              class="cursor-pointer"
            />
          </template>

          <template v-slot:after>
            <q-btn round dense flat icon="send" @click="newChat()" />
          </template>
        </q-input>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import io from "socket.io-client";
const socket = io.connect("http://localhost:7000");
export default {
  name: "dashboard",
  data() {
    return {
      newMessage: {
        photo: "",
        user: "",
        message: "",
        date: Date.now
      },
      messages: [],
      typing: false,
      ready: true,
      userTyping: "",
      tokener: [],
      dense: false
    };
  },
  async created() {
    const res = await this.$axios.get("/api/auth/profile");

    // eslint-disable-next-line no-console

    const user = (await res.data.message.google) || res.data.message.facebook;

    if (user) {
      this.newMessage.user = user.name;
      this.newMessage.photo = user.photo;
    }

    // eslint-disable-next-line no-console

    this.$axios
      .get("/api/chat")
      .then(data => {
        this.messages = data.data.data;
      })
      // eslint-disable-next-line no-console
      .then(() => {});

    socket.on("NewMessage", data => {
      this.messages.push(data);
      // eslint-disable-next-line no-console
    });
    socket.on("typing", data => {
      this.typing = true;
      this.userTyping = data;
    });
    socket.on("stopTyping", () => {
      this.typing = false;
      this.userTyping = "";
    });
    socket.on("chatUpdate", data => {
      // eslint-disable-next-line no-console
      console.log(data);
      this.messages.forEach(message => {
        if (message._id === data._id) {
          message.message = data.message;
        }
      });
    });
    socket.on("deletedChat", data => {
      this.messages = this.messages.filter(obj => obj._id !== data);
    });
  },
  watch: {
    newMessage: {
      handler: function(newValue) {
        newValue.message
          ? socket.emit("typing", this.newMessage.photo)
          : socket.emit("stopTyping");
      },
      deep: true
    }
  },
  methods: {
    async newChat() {
      const response = await this.$axios.post("/api/chat", this.newMessage);

      const data = await response.data;
      // eslint-disable-next-line no-console
      console.log(data);
      if (data.success) {
        this.messages.push({
          ...data.data
        });
        // eslint-disable-next-line no-console
        console.log(this.newMessage);
        socket.emit("NewMessage", {
          ...data.data
        });

        this.newMessage.message = "";
      }
    }
  }
};
</script>
