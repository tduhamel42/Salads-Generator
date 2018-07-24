<template>
  <div id="app">
    <b-navbar v-if="$route.name !== 'login'" toggleable="md" type="dark" variant="primary">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/home">Salade</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
            <b-nav-item to="/home">Home</b-nav-item>
            <b-nav-item to="/generator">Generator v2</b-nav-item>
            <b-nav-item to="/salades">Salades</b-nav-item>
            <b-nav-item to="/api">Api</b-nav-item>
            <b-nav-item to="/user">{{$config.user.name}}</b-nav-item>
        </b-navbar-nav>
      </b-collapse>>
    </b-navbar>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
