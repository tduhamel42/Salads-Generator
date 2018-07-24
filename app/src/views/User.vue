<template>
  <div class="generator" style="padding: 2px; text-align: center;">
    <b-jumbotron :header="$config.user.name" lead="" >
    </b-jumbotron>
    <b-button variant="primary" size="lg" v-on:click="addToBlacklist">Valider</b-button>
    <b-card-group deck>
        <b-card bg-variant="primary"
                title="Ingredients">
                <draggable v-model="ingredients" style="min-height: 200px;" :options="{group:'people'}">
                  <b-badge  :variant="getVariant(ingredient.type)"
                            v-for="ingredient in ingredients"
                            :key="ingredient._id">
                    {{ingredient.name}}
                    <b-img  rounded="circle" width="32" height="32"
                            blank-color="#777" :alt="ingredient.name" class="m-1"
                            v-if="ingredient.img !== undefined"
                            :src="ingredient.img"/>
                  </b-badge>
                </draggable>
        </b-card>
        <b-card bg-variant="dark"
                title="Blacklist">
                <draggable v-model="blacklist" style="min-height: 200px;" :options="{group:'people'}">
                  <b-badge  :variant="getVariant(ingredient.type)"
                            v-for="ingredient in blacklist"
                            :key="ingredient._id">
                    {{ingredient.name}}
                    <b-img  rounded="circle" width="32" height="32"
                            blank-color="#777" :alt="ingredient.name" class="m-1"
                            v-if="ingredient.img !== undefined"
                            :src="ingredient.img"/>
                  </b-badge>
                </draggable>
        </b-card>
    </b-card-group>
    <b-list-group>
        <b-list-group-item v-for="ingredient in blacklist" :key="ingredient._id">
            {{ingredient.name}}
        </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
  name: "user",
  components: {
    draggable
  },
  data: function() {
    return {
      ingredients: [],
      ingr: {},
      blacklist: []
    };
  },
  beforeMount: function() {
    if (this.$config.user._id == undefined) {
      this.$router.push("/");
    }
    let that = this;
    this.$http
      .get("http://10.72.21.200:3000/v1/all", {
        "Access-Control-Allow-Origin": "*"
      })
      .then(response => {
        if (response.status == "200") {
          that.ingredients = response.body.all;
          this.blacklist = this.$config.user.blacklist;
          for (let i = 0; i < this.blacklist.length; i++) {
            this.ingredients = this.ingredients.filter(ingredient => ingredient.name !== this.blacklist[i].name);
          }
        }
      });
  },
  methods: {
    addToBlacklist: function() {
      let that = this;
      this.$config.user.blacklist = this.blacklist;
      this.$http
        .post(
          "http://10.72.21.200:3000/v1/updateUser/" + this.$config.user._id,
          {},
          {
            params: {
              blacklist: JSON.stringify(this.$config.user.blacklist)
            }
          }
        )
        .then(response => {
          if (response.status == "200") {
          }
        });
    },
    getVariant: function(type) {
      if (type == "Viandes") {
        return "primary";
      } else if (type == "Poissons") {
        return "success";
      } else if (type == "Légumes") {
        return "dark";
      } else if (type == "Fromages") {
        return "secondary";
      } else if (type == "Crudités") {
        return "info";
      } else if (type == "Fruits") {
        return "danger";
      } else if (type == "Autres") {
        return "light";
      } else {
        return "warning";
      }
    }
  }
};
</script>