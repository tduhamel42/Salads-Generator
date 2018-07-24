<template>
  <div class="generator" style="padding: 2px;">
        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="9">
                    <b-card-group deck>
                        <b-card bg-variant="dark"
                                title="Base">
                            <b-badge variant="dark" v-if="base.name != undefined">
                                {{base.name}}
                                <b-img rounded="circle" width="32" height="32" blank-color="#777" :alt="base.name" class="m-1"
                                    :src="base.img"/>
                            </b-badge>
                        </b-card>
                        <b-card bg-variant="primary"
                            title="Bleu">
                            <b-badge :variant="getVariant(ingredient.type)" v-for="ingredient in bleus" :key="ingredient._id">
                                {{ingredient.name}}
                                <b-img rounded="circle" width="32" height="32" blank-color="#777" :alt="ingredient.name" class="m-1"
                                    :src="ingredient.img"/>
                            </b-badge>
                        </b-card>
                        <b-card bg-variant="success"
                            title="Vert">
                            <b-badge :variant="getVariant(ingredient.type)" v-for="ingredient in verts" :key="ingredient._id">
                                {{ingredient.name}}
                                <b-img rounded="circle" width="32" height="32" blank-color="#777" :alt="ingredient.name" class="m-1"
                                    :src="ingredient.img"/>
                            </b-badge>
                        </b-card>
                        <b-card bg-variant="info"
                            title="Sauce">
                            <b-badge variant="dark"  v-if="sauce.name != undefined">
                                {{sauce.name}}
                            </b-badge>
                        </b-card>
                        <b-card v-if="plus" bg-variant="danger"
                            title="Le petit plus">
                        </b-card>
                    </b-card-group>
                </b-col>
                <b-col cols="3">
                    <b-card bg-variant="light"
                        title="Salade">
                            <b-form-group   v-for="(type, i) in types"
                                            :key="type._id"
                                            :label-for="'nbr' + type.name">
                                <label>
                                    Nombre de <b-badge :variant="getVariant(type.name)">{{type.name}}</b-badge>
                                </label>
                                <b-form-input   :id="'nbr' + type.name"
                                                type="number"
                                                required
                                                v-model="nbrType[i]">
                                </b-form-input>
                            </b-form-group>
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
                </b-col>
            </b-row>
        </b-container>
  </div>
</template>
<script>
export default {
  name: "generator",
  data: function() {
    return {
      plus: false,
      base: {},
      verts: [],
      bleus: [],
      sauce: {},
      types: [],
      nbrType: [],
      salade: {}
    };
  },
  beforeMount: function() {
    if (this.$config.user._id == undefined) {
      this.$router.push("/");
    }
    let that = this;
    this.$http
      .get("http://10.72.21.200:3000/v1/ingredientTypes", {
        "Access-Control-Allow-Origin": "*"
      })
      .then(response => {
        if (response.status == "200") {
          that.types = response.body.ingredientTypes;
          for (let i = 0; i < that.types.length; i++) {
            that.nbrType[i] = 0;
          }
        }
      });
  },
  methods: {
    generate: function() {
      let that = this;
      this.base = {};
      this.verts = [];
      this.bleus = [];
      this.sauce = {};
      this.$http
        .get("http://10.72.21.200:3000/v2/generate", {
          params: {
            id: this.$config.user._id,
            nbrByType: this.nbrType.join(",")
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
            that.base = salade.base;
            that.sauce = salade.sauce;
            console.log(salade);
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
              menu: 0,
              base: JSON.stringify(this.salade.base),
              sauce: this.salade.sauce.name,
              ingredients: JSON.stringify(this.salade.ingredients)
            }
          }
        )
        .then(response => {
          if (response.status == "200") {
            alert("Salade saved");
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
      }  else if (type == "Fromages") {
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