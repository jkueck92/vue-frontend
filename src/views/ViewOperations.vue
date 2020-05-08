<template>
    <div>
    <v-card class="mx-auto" :loading="loading">
      <v-card-title>
        Operations
      </v-card-title>
      <v-card-text>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="width: 10%;">Date</th>
                <th class="text-left" style="width: 10%;">Time</th>
                <th class="text-left" style="width: 10%;">Keyword</th>
                <th class="text-left" style="width: 20%;">Keyword description</th>
                <th class="text-left" style="width: 20%;">City</th>
                <th class="text-left" style="width: 20%;">Address</th>
                <th class="text-center" style="width: 10%;">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="operation in operations" :key="operation.id">
                <td>{{ operation.operation_date }}</td>
                <td>{{ operation.operation_time }}</td>
                <td>{{ operation.keyword }}</td>
                <td>{{ operation.keyword_description }}</td>
                <td>{{ operation.name }}</td>
                <td>{{ operation.address }}</td>
                <td class="text-center">
                  <v-btn color="primary" fab x-small dark @click="onShowOperation(operation)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn color="error" class="ml-2" fab x-small @click="onDelete(operation)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field placeholder="Date" label="Operation date" required v-model="operation.operation_date"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field placeholder="Time" label="Operation time" required v-model="operation.operation_time"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field placeholder="Keyword" label="Keyword" required v-model="operation.keyword"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field placeholder="Keyword description" label="Keyword description" required v-model="operation.keyword_description"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field placeholder="Message" label="Message" required v-model="operation.message"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field placeholder="Address" label="Address" required v-model="operation.address"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field placeholder="Address addition" label="Address addition" v-model="operation.address_addition"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select placeholder="City" :items="cities" item-text="name" item-value="id" label="City" required v-model="selectedCity"></v-select>
            </v-col>
            <v-col cols="12">
               <v-textarea placeholder="Comment" name="input-7-4" label="Comment" v-model="operation.comment"></v-textarea>
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
import service from '@/services/operation-service'
import cityService from '@/services/city-service'

export default {
  name: 'ViewOperations',
  data: () => ({
    operations: Array,
    loading: false,
    deleteDialog: false,
    dialog: {
      modus: 'SAVE',
      visible: false,
      title: 'Create operation'
    },
    cities: Array,
    selectedCity: null,
    operation: {
      id: null,
      operation_date: null,
      operation_time: null,
      keyword: null,
      keyword_description: null,
      address: null,
      address_addition: null,
      message: null,
      comment: null,
      city: null
    }
  }),
  methods: {
    clearOperation () {
      this.operation.id = null
      this.operation.operation_date = null
      this.operation.operation_time = null
      this.operation.keyword = null
      this.operation.keyword_description = null
      this.operation.address = null
      this.operation.address_addition = null
      this.operation.message = null
      this.operation.comment = null
      this.operation.city = null
    },
    initOperation (o) {
      this.operation.id = o.id
      this.operation.operation_date = o.operation_date
      this.operation.operation_time = o.operation_time
      this.operation.keyword = o.keyword
      this.operation.keyword_description = o.keyword_description
      this.operation.address = o.address
      this.operation.address_addition = o.address_addition
      this.operation.message = o.message
      this.operation.comment = o.comment
      cityService.getById(o.city_id).then(response => {
        this.selectedCity = response.data.city
        this.operation.city = this.selectedCity.id
      })
    },
    onDelete (operation) {
      this.initOperation(operation)
      this.deleteDialog = true
    },
    onYes () {
      service.delete(this.operation).then(response => {
        this.init()
      })
      this.deleteDialog = false
    },
    onShowDialog () {
      this.dialog.visible = true
      this.dialog.title = 'Create operation'
      this.dialog.modus = 'SAVE'
    },
    onShowOperation (operation) {
      this.initOperation(operation)
      this.dialog.visible = true
      this.dialog.title = 'Update operation'
      this.dialog.modus = 'UPDATE'
    },
    onCancelDialog () {
      this.dialog.visible = false
      this.clearOperation()
    },
    init () {
      this.loading = true
      service.getAll().then(response => {
        this.operations = response.data.operations
        this.loading = false
      })
    },
    onSave () {
      if (this.dialog.modus === 'SAVE') {
        this.operation.city = this.selectedCity
        service.save(this.operation).then(response => {
          this.clearOperation()
          this.init()
          this.dialog.visible = false
        })
      } else {
        this.operation.city = this.selectedCity
        service.update(this.operation).then(response => {
          this.clearOperation()
          this.init()
          this.dialog.visible = false
        })
      }
    }
  },
  created () {
    this.init()
    cityService.getAll().then(response => {
      this.cities = response.data.cities
    })
  }
}
</script>
