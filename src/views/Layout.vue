<template>
<Header></Header>
   <router-view/>
  </template>
  
  <script>
  import Header from './Header.vue'
  export default {
    components: {
    Header
  },
    methods:{
        logout(){
            localStorage.clear();
            this.$router.push({name:'login'})
        }
    },
    mounted() {
      let user = localStorage.getItem("user-info");
      if (!user) {
        this.$router.push({ name: "login" });
      }
    },
  };
  </script>
  
  <style>
  .nav {
    background-color: #333;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
  }
  
  .nav a {
    color: #f2f2f2;
    padding: 14px 20px;
    text-align: center;
    font-size: 17px;
    text-decoration: none;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .nav a:hover {
    background-color: #ddd;
    color: #333;
  }

  </style>