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
        <button
          type="button"
          class="btn btn-warning btn-lg"
          @click="newImporter()"
        >
          Reiniciar App
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
    newImporter() {
      location.reload();
    },

    async uploadExcel() {
      try {
        if (this.thirds.length > 0) {
          const upload = await ThirdPartyImporter.sendData(this.thirds);
          alert(`Subiendo ${upload.data.number} Terceros`);
          console.log(upload);
          alert(
            "¡Terceros cargados satisfactoriamente en la base de datos! " +
              upload.data.message
          );
          const myTimeout = setTimeout(this.newImporter(), 15000);

          clearTimeout(myTimeout);
        } else {
          alert("¡No se encuentra información para subir!");
        }
      } catch (error) {
        console.log(error.message);
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

            const searchRep = dataExcel.reduce((acc, data) => {
              acc[data.nit] = ++acc[data.nit] || 0;
              return acc;
            }, {});

            const duplicates = dataExcel.filter((item) => {
              return searchRep[item.nit];
            });

            let dataFindNames;
            let findPhoneNumbers;
            let dv;
            let idDepto;
            let idMunicipio;
            let tipopersona;
            let idActividad;
            let idRegimen;
            let tipoId;
            let tipoFactura;
            for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].nombres === undefined ||
                dataExcel[index].nombres === ""
              ) {
                const findEmptyData =
                  dataExcel[index].nombres === undefined ||
                  dataExcel[index].nombres === "";
                dataFindNames = findEmptyData;
              }
            }
            for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].telefono === undefined ||
                dataExcel[index].telefono === ""
              ) {
                const findEmptyData =
                  dataExcel[index].telefono === undefined ||
                  dataExcel[index].telefono === "";
                findPhoneNumbers = findEmptyData;
              }
            }
            for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].digito === undefined ||
                dataExcel[index].digito === ""
              ) {
                const findEmptyData =
                  dataExcel[index].digito === undefined ||
                  dataExcel[index].digito === "";
                dv = findEmptyData;
              }
            }
            for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].iddepto === undefined ||
                dataExcel[index].iddepto === ""
              ) {
                const findEmptyData =
                  dataExcel[index].iddepto === undefined ||
                  dataExcel[index].iddepto === "";
                idDepto = findEmptyData;
              }
            }
            for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].idmunicipio === undefined ||
                dataExcel[index].idmunicipio === ""
              ) {
                const findEmptyData =
                  dataExcel[index].idmunicipio === undefined ||
                  dataExcel[index].idmunicipio === "";
                idMunicipio = findEmptyData;
              }
            }
            for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].tipopersona === undefined ||
                dataExcel[index].tipopersona === ""
              ) {
                const findEmptyData =
                  dataExcel[index].tipopersona === undefined ||
                  dataExcel[index].tipopersona === "";
                tipopersona = findEmptyData;
              }
            }
            for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].idactividad === undefined ||
                dataExcel[index].idactividad === ""
              ) {
                const findEmptyData =
                  dataExcel[index].idactividad === undefined ||
                  dataExcel[index].idactividad === "";
                idActividad = findEmptyData;
              }
            }
            for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].idregimen === undefined ||
                dataExcel[index].idregimen === ""
              ) {
                const findEmptyData =
                  dataExcel[index].idregimen === undefined ||
                  dataExcel[index].idregimen === "";
                idRegimen = findEmptyData;
              }
            }
            for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].TipoId === undefined ||
                dataExcel[index].TipoId === ""
              ) {
                const findEmptyData =
                  dataExcel[index].TipoId === undefined ||
                  dataExcel[index].TipoId === "";
                tipoId = findEmptyData;
              }
            }
                 for (let index = 0; index < dataExcel.length; index++) {
              if (
                dataExcel[index].tipofactura === undefined ||
                dataExcel[index].tipofactura === ""
              ) {
                const findEmptyData =
                  dataExcel[index].tipofactura === undefined ||
                  dataExcel[index].tipofactura === "";
                tipoFactura = findEmptyData;
              }
            }

            if (dv === true) {
              alert(
                "Revise el archivo, debe llenar el digito de verificación !"
              );
              return;
            }
            if (dataFindNames === true) {
              alert("Revise el archivo, se encontraron nombres en Blanco !");
              return;
            }
            if (findPhoneNumbers === true) {
              alert(
                "Revise el archivo, se encontraron números teléfonicos en Blanco !"
              );
              return;
            }
            if (idDepto === true) {
              alert(
                "Revise el archivo, se encontraron campos vacios en la columna iddepto !"
              );
              return;
            }
            if (idMunicipio === true) {
              alert(
                "Revise el archivo, se encontraron campos vacios en la columna idmunicipio !"
              );
              return;
            }
            if (tipopersona === true) {
              alert(
                "Revise el archivo, se encontraron campos vacios en la columna tipopersona !"
              );
              return;
            }
            if (idActividad === true) {
              alert(
                "Revise el archivo, se encontraron campos vacios en la columna idactividad !"
              );
              return;
            }
            if (idRegimen === true) {
              alert(
                "Revise el archivo, se encontraron campos vacios en la columna idregimen !"
              );
              return;
            }
            if (tipoId === true) {
              alert(
                "Revise el archivo, se encontraron campos vacios en la columna TipoId !"
              );
              return;
            }
                if (tipoFactura === true) {
              alert(
                "Revise el archivo, se encontraron campos vacios en la columna tipofactura !"
              );
              return;
            }

            if (duplicates.length > 0) {
              alert("Revise el archivo, tiene nit repetidos");
              return;
            } else {
              this.thirds = dataExcel;
            }
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
