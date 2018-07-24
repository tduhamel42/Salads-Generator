<template>
  <div class="api" style="padding: 2px;">
    <b-card-group deck>
        <b-card title="Nouveau Menu">
            <b-form>
              <b-form-group id="menuName"
                            label="Nom Menu:"
                            label-for="menuName"
                            description="Le nom du menu">
                <b-form-input id="menuName"
                              type="text"
                              required
                              placeholder="Nom"
                              v-model="menu.name">
                </b-form-input>
              </b-form-group>
              <b-form-group id="menuDesc"
                            label="Description Menu:"
                            label-for="menuDescValue"
                            description="La description du menu">
                <b-form-input id="menuDescValue"
                              type="text"
                              required
                              placeholder="description"
                              v-model="menu.desc">
                </b-form-input>
              </b-form-group>
              <b-form-group id="menuNbrIngredients"
                            label="Nombre d'ingredient:"
                            label-for="menuNbrIngredientsValue"
                            description="Le nombre d'ingredient dans le menu(par couleur)">
                <b-form-input id="menuNbrIngredientsValue"
                              type="number"
                              required
                              placeholder="Bleu"
                              v-model="menu.nbrBlue">
                </b-form-input>
                <b-form-input id="menuDescValue"
                              type="number"
                              required
                              placeholder="Vert"
                              v-model="menu.nbrGreen">
                </b-form-input>
              </b-form-group>
              <b-form-group id="menuPrice"
                            label="Prix Menu:"
                            label-for="menuPriceValue"
                            description="Le prix du menu">
                <b-form-input id="menuPriceValue"
                              type="number"
                              required
                              placeholder="prix"
                              v-model="menu.price">
                </b-form-input>
              </b-form-group>
          </b-form>
          <b-button variant="primary" v-on:click="sendMenu">Ajouter</b-button>
        </b-card>
        <b-card title="Nouvel Ingredient">
          <b-form-group id="ingredientName"
                            label="Nom Ingredient:"
                            label-for="ingredientName"
                            description="Le nom de l'ingredient">
            <b-form-input id="ingredientName"
                              type="text"
                              required
                              placeholder="Nom"
                              v-model="ingredient.name">
            </b-form-input>
          </b-form-group>
          <b-form-group id="menuSelection"
                    label="Couleur:"
                    label-for="menuSelectionSelect">
            <b-form-select id="menuSelectionSelect"
                            :options="colors"
                            v-model="ingredient.color">
            </b-form-select>
          </b-form-group>
          <b-form-group id="ingredientImg"
                            label="Image Ingredient:"
                            label-for="ingredientName"
                            description="L'url de l'image de l'ingredient">
            <b-form-input id="ingredientImgUrl"
                              type="text"
                              required
                              placeholder="url"
                              v-model="ingredient.img">
            </b-form-input>
          </b-form-group>
          <b-button variant="primary" v-on:click="sendIngredient">Ajouter</b-button>
        </b-card>
        <b-card title="Nouvelle base">
            <b-form-group id="baseName"
                            label="Nom base:"
                            label-for="baseName"
                            description="Le nom de la base">
            <b-form-input id="baseName"
                              type="text"
                              required
                              placeholder="Nom"
                              v-model="base.name">
            </b-form-input>
          </b-form-group>
          <b-form-group id="baseImg"
                            label="Image Base:"
                            label-for="baseImgUrl"
                            description="L'url de l'image de la base">
            <b-form-input id="baseImgUrl"
                              type="text"
                              required
                              placeholder="url"
                              v-model="base.img">
            </b-form-input>
          </b-form-group>
          <b-button variant="primary" v-on:click="sendBase">Ajouter</b-button>
        </b-card>
        <b-card title="Nouvelle sauce">
            <b-form-group id="sauceName"
                            label="Nom sauce:"
                            label-for="baseName"
                            description="Le nom de la sauce">
            <b-form-input id="sauceName"
                              type="text"
                              required
                              placeholder="Nom"
                              v-model="sauce.name">
            </b-form-input>
          </b-form-group>
          <b-button variant="primary" v-on:click="sendSauce">Ajouter</b-button>
        </b-card>
    </b-card-group>
  </div>
</template>
<script>
export default {
  name: "api",
  data: function() {
    return {
      api: {},
      colors: ["Bleu", "Vert"],
      menu: {},
      ingredient: {},
      base: {},
      sauce: {}
    };
  },
  beforeMount: function() {
    if (this.$config.user._id == undefined) {
      this.$router.push("/");
    }
    let that = this;
    this.$http
      .get("http://10.72.21.200:3000/v1", {
        "Access-Control-Allow-Origin": "*"
      })
      .then(response => {
        if (response.status == "200") {
          that.api = response.body;
        }
      });
  },
  methods: {
    sendMenu: function() {
      this.$http
        .post(
          "http://10.72.21.200:3000/v1/menu",
          {},
          {
            params: {
              name: this.menu.name,
              desc: this.menu.desc,
              nbrBlue: this.menu.nbrBlue,
              nbrGreen: this.menu.nbrGreen,
              price: this.menu.price
            }
          }
        )
        .then(response => {
          if (response.status == "200") {
            alert("Menu added");
          }
        });
    },
    sendIngredient: function() {
      this.$http
        .post(
          "http://10.72.21.200:3000/v1/ingredient",
          {},
          {
            params: {
              name: this.ingredient.name,
              color: this.ingredient.color == "Vert" ? 0 : 1,
              price: this.ingredient.price,
              img: this.ingredient.img
            }
          }
        )
        .then(response => {
          if (response.status == "200") {
            alert("Ingredient added");
          }
        });
    },
    sendBase: function() {
      this.$http
        .post(
          "http://10.72.21.200:3000/v1/base",
          {},
          {
            params: {
              name: this.base.name,
              img: this.base.img
            }
          }
        )
        .then(response => {
          if (response.status == "200") {
            alert("Base added");
          }
        });
    },
    sendSauce: function() {
      this.$http
        .post(
          "http://10.72.21.200:3000/v1/sauce",
          {},
          {
            params: {
              name: this.sauce.name
            }
          }
        )
        .then(response => {
          if (response.status == "200") {
            alert("Sauce added");
          }
        });
    }
  }
};
</script>