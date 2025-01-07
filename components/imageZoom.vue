<template>
  <div>
    <v-img :src="thumbnail" class="thumbnail" @click="showImageDialog = true"></v-img>

    <v-dialog v-model="showImageDialog" max-width="500px">
      <v-card>
        <v-img :src="fullImage" class="expanded-image"></v-img>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="showImageDialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    thumbnail: {
      type: String,
      required: true,
    },
    fullImage: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showImageDialog: false,
    };
  },
};
</script>

<style scoped>
.thumbnail {
  cursor: pointer;
  max-width: 200px;
  transition: transform 0.2s;
}
.thumbnail:hover {
  transform: scale(1.05);
}

.expanded-image {
  width: 100%;
  height: auto;
  max-height: 90vh;
  object-fit: contain;
}
</style>
