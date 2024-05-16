<template>
    <img src="../assets/logo.webp" class="logo" />
    <h1>Sign Up</h1>
    <div class="register">
      <input type="text" placeholder="Enter Name" v-model="name" />
      <input type="text" placeholder="Enter email" v-model="email" />
      <input type="password" placeholder="Enter Password" v-model="password" />
      <button @click="signup">Sign Up</button>
      <p>
          <router-link to="/login">login</router-link>
      </p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "",
        email: "",
        password: "",
      };
    },
    methods: {
      validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
      },
      validatePassword(password) {
        // Minimum eight characters, at least one letter, one number, and one special character
        const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        return re.test(password);
      },
      async signup() {
        if (this.email === '' || this.password === '') {
          alert('Email and password are required.');
          return;
        }
  
        if (!this.validateEmail(this.email)) {
          alert('Invalid email format.');
          return;
        }
  
        if (!this.validatePassword(this.password)) {
          alert('Password must be at least 8 characters long, contain at least one letter, one number, and one special character.');
          return;
        }
  
        try {
          let result = await axios.post("http://localhost:3000/user", {
            email: this.email,
            name: this.name,
            password: this.password,
          });
  
          if (result.status === 201) {
            localStorage.setItem("user-info", JSON.stringify(result.data));
            this.$router.push({ name: "home" });
          } else {
            alert('Error signing up.');
          }
        } catch (error) {
          console.error(error);
          alert('Error signing up.');
        }
      },
    },
    mounted() {
      let user = localStorage.getItem("user-info");
      if (user) {
        this.$router.push({ name: "home" });
      }
    },
  };
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