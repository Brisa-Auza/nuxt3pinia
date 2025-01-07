<template>
  <v-app>
    <v-app-bar app fixed color="#522073">
      <v-btn icon :to="'/'"><v-icon color="#AFA3BF" large>mdi-home</v-icon></v-btn>
      <v-spacer style="text-align: center"> </v-spacer>

      <v-btn icon :to="'/'" >
        <v-icon color="red darken-4" large>mdi-power</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card> </v-card>
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      name: "",
    };
  },
  mounted() {
  },
  methods: {
    /* log() {
      this.$store.commit("auth/saveToken", null);
      localStorage.token = null;
      this.$router.push({ name: "index" });
    }, */
  },
};
</script>
