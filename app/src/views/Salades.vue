<template>
  <div class="salades">
  <b-table striped hover outlined :items="salades" :fieds="fields">
        <template slot="base" slot-scope="data">
            <b-badge variant="dark">
                  {{data.value.name}}
                  <b-img rounded="circle" width="32" height="32" blank-color="#777" :alt="data.value.name" class="m-1"
                    :src="data.value.img"/>
            </b-badge>
        </template>
        <template slot="ingredients" slot-scope="data">
            <b-badge variant="dark" v-for="ingredient in data.value" :key="ingredient._id">
                  {{ingredient.name}}
                  <b-img rounded="circle" width="32" height="32" blank-color="#777" :alt="ingredient.name" class="m-1"
                    :src="ingredient.img"/>
            </b-badge>
        </template>
  </b-table>
  </div>
</template>
<script>
export default {
  name: "salades",
  data: function() {
    return {
      fields: {
        name: {
          label: "Nom",
          sortable: true
        },
        menu: {
          label: "Menu",
          sortable: true
        },
        base: {
          label: "Base",
          sortable: true
        },
        ingredients: {
          label: "Ingredients",
          sortable: false
        },
        sauce: {
          label: "Sauce",
          sortable: false
        }
      },
      salades: []
    };
  },
  beforeMount: function() {
    if (this.$config.user._id == undefined) {
      this.$router.push("/");
    }
    let that = this;
    this.$http
      .get("http://10.72.21.200:3000/v1/salades", {
        "Access-Control-Allow-Origin": "*"
      })
      .then(response => {
        if (response.status == "200") {
          let salades = response.body.salades;
          for (let i = 0; i < salades.length; i++) {
            that.salades.push({
              name: salades[i].name,
              menu: salades[i].menu,
              base: JSON.parse(salades[i].base),
              sauce: salades[i].sauce,
              ingredients: JSON.parse(response.body.salades[i].ingredients)
            });
          }
        }
      });
  }
};
</script>