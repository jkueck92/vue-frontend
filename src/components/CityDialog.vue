<template>
  <v-dialog v-model="visible" width="800px">
    <v-card>
      <v-card-title class="grey darken-2">{{ title }}</v-card-title>
      <v-container>
        Hallo Welt
      </v-container>
      <v-card-actions>
        <v-btn text color="primary" @click="visible = false">Cancel</v-btn>
        <v-btn @click="onSave" color="success">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CityDialog',
  props: {
    title: String,
    visible: Boolean
  },
  data: () => ({
    visible: false
  }),
  methods: {
    onSave () {
      console.log('save')
    }
  }
}
</script>
