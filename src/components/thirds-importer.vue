<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <h4 class="card-title">Importador de terceros</h4>
        <input
          type="file"
          class="form-control"
          id="fileUpload"
          accept=".xls,.xlsx"
          ref="myFiles"
          @change="fileUpload()"
        />
        <br />
        <button
          type="button"
          class="btn btn-secondary btn-lg"
          id="uploadExcel"
          @click="uploadExcel()"
        >
          Importar Terceros
        </button>
        <button
          type="button"
          class="btn btn-danger btn-lg"
          @click="deleteThirds()"
        >
          Eliminar Terceros
        </button>
      </div>
    </div>
    <br />
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">NIT</th>
          <th scope="col">DV</th>
          <th scope="col">NOMBRES</th>
          <th scope="col">TELEFONO</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(third, index) in thirds" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ third.nit }}</td>
          <td>{{ third.digito }}</td>
          <td>{{ third.nombres }}</td>
          <td>{{ third.telefono }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { read, utils } from "xlsx";

import { ThirdPartyImporter } from "../services/importer_thirds";

export default {
  name: "third-importer",
  props: {
    msg: String,
  },

  data() {
    return {
      thirds: [],
      files: [],
    };
  },
  methods: {
    async uploadExcel() {
      try {
        if (this.thirds.length > 0) {
          const upload = await ThirdPartyImporter.sendData(this.thirds);
          alert(`Subiendo ${this.thirds.length} Terceros`);
          alert(
            "¡Terceros cargados satisfactoriamente en la base de datos! " +
              upload.data.message
          );
        } else {
          alert("No se encuentra informacion para subir");
        }
      } catch (error) {
        alert(error.message);
      }
    },
    fileUpload() {
      this.files = this.$refs.myFiles.files;
      if (this.files.length > 0) {
        try {
          let file = this.files[0];
          let reader = new FileReader();

          reader.onload = async function (e) {
            let data = new Uint8Array(e.target.result);
            let workbook = read(data, { type: "array" });
            const workBookSheets = workbook.SheetNames;
            const sheet = workBookSheets[0];
            const dataExcel = utils.sheet_to_json(workbook.Sheets[sheet]);
            this.thirds = dataExcel;
          }.bind(this);
          reader.readAsArrayBuffer(file);
        } catch (exception) {
          alert(exception.message);
        }
      }
    },
    async deleteThirds() {
      try {
        const deletedThirds = await ThirdPartyImporter.deleteThird();
        alert("¡Terceros eliminados satisfactoriamente! ");
        console.log(deletedThirds.data.message);
      } catch (error) {
        alert("¡Error! " + error.message);
        console.log(error.message);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
