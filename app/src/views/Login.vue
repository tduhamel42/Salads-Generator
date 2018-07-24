<template>
  <div class="generator" style="padding: 2px; text-align: center;">
    <b-jumbotron header="Salade" lead="Générateur de salade">
    </b-jumbotron>
    <div>
        <b-form-select id="menuSelectionSelect"
                            v-model="user"
                            v-on:change="onChange">
            <option v-for="user in users" :key="user._id" :value="user">
                {{user.name}}
            </option>
        </b-form-select>
        <b-button-group style="padding: 2px;">
            <b-button variant="success" :to="{ name: 'home', params: { id: user._id } }" v-on:click="onChange">Entrer</b-button>
            <b-button variant="primary" v-on:click="showUserModal">Nouvel utilisateur</b-button>
        </b-button-group>
        <h4>{{user.name}}</h4>
    </div>
    <b-modal ref="userModalRef" hide-footer title="Nouvel utilisateur">
        <div class="d-block text-center">
            <h3>Création d'un utilisateur</h3>
        </div>
        <b-form-input id="userName"
                    type="text"
                    required
                    placeholder="Nom"
                    v-model="user.name">
        </b-form-input>
        <b-button variant="success" style="text-align: center;" v-on:click="addUser">Ajouter</b-button>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "login",
  data: function() {
    return {
      user: {},
      users: []
    };
  },
  beforeMount: function() {
    let that = this;
    this.$http
      .get("http://10.72.21.200:3000/v1/users", {
        "Access-Control-Allow-Origin": "*"
      })
      .then(response => {
        if (response.status == "200") {
          that.users = response.body.users;
        }
      });
  },
  beforeDestroy: function () {
      this.$config.user = this.user;
  },
  methods: {
    showUserModal: function() {
      this.$refs.userModalRef.show();
    },
    addUser: function() {
      let that = this;
      this.$refs.userModalRef.hide();
      this.$http
        .post(
          "http://10.72.21.200:3000/v1/user",
          {},
          {
            params: {
              name: this.user.name
            }
          }
        )
        .then(response => {
          if (response.status == "200") {
            that.$config.user = response.body.user;
          }
        });
    },
    onChange: function() {
      this.$config.user = this.user;
    }
  }
};
</script>