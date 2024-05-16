<template>
  <img src="../assets/logo.webp" class="logo" />
  <h1>Login</h1>
  <div class="register">
    <input type="text" placeholder="Enter email" v-model="email" />
    <input type="password" placeholder="Enter Password" v-model="password" />
    <button @click="login">login</button>
    <p>
      <router-link to="/sign-up">signup</router-link>
    </p>
  </div>
</template>
<script>
import axios from 'axios'
export default{
    data() {
    return {
      email: "",
      password: ""
    };
  },
methods:{
    async login() {
    try {
      const response = await axios.get(`http://localhost:3000/user?email=${this.email}&password=${this.password}`);
      console.log('Response:', response);  // Log the entire response object

      // Check for the status and data correctly
      if (response.status === 200 && response.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(response.data[0]));
        this.$router.push({ name: "home" });
      } else {
        alert('Invalid login credentials.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error logging in. Please try again.');
    }
    console.log('done');
  }
}

}
</script>
<style>
.logo {
  width: 100px;
}
.register input {
  width: 300px;
  height: 40px;
  padding-left: 20px;
  display: block;
  margin-bottom: 30px;
  margin-right: auto;
  margin-left: auto;
  border: 1px solid skyblue;
}
.register button {
  width: 320px;
  height: 40px;
  border: 1px solid skyblue;
  color: #fff;
  cursor: pointer;
  background: skyblue;
}
</style>
