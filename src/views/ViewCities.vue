<template>
  <div>
    <v-card class="mx-auto" :loading="loading">
      <v-card-title>
        Cities
      </v-card-title>
      <v-card-text>
        <CityTable :cities="cities"/>
      </v-card-text>
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
import CityTable from '@/components/CityTable'
import cityService from '@/services/city-service'

export default {
  name: 'ViewCities',
  components: {
    CityTable
  },
  data: () => ({
    cities: [],
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
