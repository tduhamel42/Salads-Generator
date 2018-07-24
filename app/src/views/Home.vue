<template>
  <div class="home" style="padding-top: 2px; padding-left: 2px; padding-right: 2px;">
    <b-card-group deck>
        <b-card bg-variant="primary"
                title="Bleu">
                <b-badge variant="dark" v-for="ingredient in bleus" :key="ingredient._id">
                  {{ingredient.name}}
                  <b-img rounded="circle" width="32" height="32" blank-color="#777" :alt="ingredient.name" class="m-1"
                    :src="ingredient.img"/>
                </b-badge>
        </b-card>
        <b-card bg-variant="success"
                title="Vert">
                <b-badge variant="dark" v-for="ingredient in verts" :key="ingredient._id">
                  {{ingredient.name}}
                  <b-img rounded="circle" width="32" height="32" blank-color="#777" :alt="ingredient.name" class="m-1"
                    :src="ingredient.img"/>
                </b-badge>
        </b-card>
        <b-card title="Salade">
            <b-form-group id="menuSelection"
                    label="Menu:"
                    label-for="menuSelectionSelect">
            <b-form-select id="menuSelectionSelect"
                            v-model="menu">
                            <option v-for="menu in menus" :key="menu._id" :value="menu">
                              {{menu.name}}
                            </option>
            </b-form-select>
          </b-form-group>
          <p>{{menu.desc}}</p>
          <b-button variant="primary" v-on:click="generate">Générer</b-button>
          <b-form-group id="saladeName"
                            label="Nom salade:"
                            label-for="saladeNameValue"
                            description="Le nom de la salade">
            <b-form-input id="saladeNameValue"
                              type="text"
                              required
                              placeholder="Nom"
                              v-model="salade.name">
            </b-form-input>
          </b-form-group>
          <b-button variant="primary" v-on:click="save">Enregistrer</b-button>
        </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      menus: [],
      menu: {},
      verts: [],
      bleus: [],
      salade: {}
    };
  },
  beforeMount: function() {
    let that = this;
    this.$http
      .get("http://10.72.21.200:3000/v1/menus", {
        "Access-Control-Allow-Origin": "*"
      })
      .then(response => {
        if (response.status == "200") {
          that.menus = response.body.menus;
        }
      });
    //if (this.$route.params.length == 0) return;
    this.$http
      .get("http://10.72.21.200:3000/v1/user/" + this.$route.params.id, {
        "Access-Control-Allow-Origin": "*"
      })
      .then(response => {
        if (response.status == "200") {
          that.$config.user = response.body.user;
        }
        if (this.$config.user._id == undefined) {
          this.$router.push("/");
        }
      });
  },
  methods: {
    generate: function() {
      let that = this;
      this.verts = [];
      this.bleus = [];
      this.$http
        .get("http://10.72.21.200:3000/v1/generate", {
          params: {
            menu: this.menu._id
          }
        })
        .then(response => {
          if (response.status == "200") {
            let salade = response.body.salade;
            that.salade = salade;
            for (let i = 0; i < salade.ingredients.length; i++) {
              if (salade.ingredients[i].color == 0) {
                that.verts.push(salade.ingredients[i]);
              } else {
                that.bleus.push(salade.ingredients[i]);
              }
            }
          }
        });
    },
    save: function() {
      this.$http
        .post(
          "http://10.72.21.200:3000/v1/salade",
          {},
          {
            params: {
              name: this.salade.name,
              menu: this.menu._id,
              ingredients: JSON.stringify(this.salade.ingredients)
            }
          }
        )
        .then(response => {
          if (response.status == "200") {
            alert("Salade saved");
          }
        });
    }
  }
};
</script>
