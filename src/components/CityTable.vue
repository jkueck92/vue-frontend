<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left" style="width: 90%;">Name</th>
            <th class="text-center" style="width: 10%;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="city in cities" :key="city.id">
            <td>{{ city.name }}</td>
            <td class="text-center">
              <v-btn color="primary" fab x-small dark @click="onShow(city)">
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
    <CityDialog :visible="showDialog"></CityDialog>
  </div>
</template>

<script>
import CityDialog from '@/components/CityDialog'

export default {
  name: 'CityTable',
  components: {
    CityDialog
  },
  props: {
    cities: Array
  },
  data: () => ({
    showDialog: false
  }),
  methods: {
    onShow (city) {
      console.log('show: ' + city.name)
      this.showDialog = true
    },
    onDelete (city) {
      console.log('delete: ' + city.name)
    }
  }
}
</script>
