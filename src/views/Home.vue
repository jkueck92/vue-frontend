<template>
    <div>
    <h1>CITY</h1>
    <v-card class="mx-auto" :loading="loading">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">#</th>
              <th class="text-left">Name</th>
              <th class="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="city in cities" :key="city.id">
              <td>{{ city.id }}</td>
              <td>{{ city.name }}</td>
              <td class="text-center">
                <v-btn color="primary" fab x-small dark @click="onShowCity(city)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn color="error" class="ml-2" fab x-small @click="onDelete(city)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <v-btn bottom color="green" dark fab fixed right @click="onShowDialog">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialog.visible" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">
          {{ dialog.title }}
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field v-model="city.name" prepend-icon="mdi-text" placeholder="Name"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary" @click="onCancelDialog">Cancel</v-btn>
          <v-btn @click="onSave" color="success">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="deleteDialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">
          Delete city
        </v-card-title>
        <v-card-actions>
          <v-btn text color="primary" @click="deleteDialog = false">Cancel</v-btn>
          <v-btn @click="onYes" color="error">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import cityService from '@/services/city-service'

export default {
  name: 'Home',
  data: () => ({
    cities: Array,
    loading: false,
    deleteDialog: false,
    dialog: {
      modus: 'SAVE',
      visible: false,
      title: 'Create city'
    },
    city: {
      id: null,
      name: null
    }
  }),
  methods: {
    onDelete (city) {
      this.city.id = city.id
      this.deleteDialog = true
    },
    onYes () {
      console.log(this.city.id)
      cityService.delete(this.city).then(response => {
        this.init()
      })
      this.deleteDialog = false
    },
    onShowDialog () {
      this.dialog.visible = true
      this.dialog.title = 'Create city'
      this.dialog.modus = 'SAVE'
    },
    onShowCity (city) {
      this.city.name = city.name
      this.city.id = city.id
      this.dialog.visible = true
      this.dialog.title = 'Update city'
      this.dialog.modus = 'UPDATE'
    },
    onCancelDialog () {
      this.dialog.visible = false
      this.city.name = ''
      this.city.id = null
    },
    init () {
      this.loading = true
      cityService.getAll().then(response => {
        this.cities = response.data.cities
        this.loading = false
      })
    },
    onSave () {
      if (this.dialog.modus === 'SAVE') {
        console.log('SAVE modus')
        cityService.save(this.city).then(response => {
          this.city.name = ''
          this.init()
          this.dialog.visible = false
        })
      } else {
        console.log('UPDATE modus')
        cityService.update(this.city).then(response => {
          this.city.name = ''
          this.init()
          this.dialog.visible = false
        })
      }
    }
  },
  created () {
    this.init()
  }
}
</script>
