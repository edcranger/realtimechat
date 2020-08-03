<template>
  <q-layout>
    <div class="row justify-center">
      <h4>AnneDz Messenger</h4>
      <q-btn color="primary" label="Facebok" @click="facebook()" />
      <q-btn color="secondary" label="Google" @click="google()" />
    </div>
  </q-layout>
</template>

<script>
export default {
  name: "HomeLayout",

  data() {
    return {};
  },
  methods: {
    google() {
      window.open("http://localhost:7000/api/auth/google", "_self");
    },
    facebook() {
      window.open("http://localhost:7000/api/auth/facebook", "_self");
    },
    async clickAw() {
      fetch("http://localhost:7000/api/auth/profile", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true
        }
      })
        .then(response => {
          if (response.status === 200) return response.json();
          throw new Error("failed to authenticate user");
        })
        .then(responseJson => {
          // eslint-disable-next-line no-console
          console.log(responseJson.message);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
    }
  }
};
</script>
