import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-siniestros-soat',
  templateUrl: './siniestros-soat.component.html',
  styleUrls: ['./siniestros-soat.component.css']
})
export class SiniestrosSoatComponent implements OnInit {
  // formRegister!: FormGroup
  public disableAgraviado: boolean = false;
  public disableSolicitante: boolean = false;
  public disableCobertura: boolean = true;
  checkboxMarcado: boolean = false;
  selectDeshabilitado: boolean = true;
  uploadFiles: { name: string, type: string, size: number, base64: string }[] = []
  totalFile: number = 0
  currentDate!: Date;
  fechaActual!: any


  constructor(private fb: FormBuilder, private router: Router) {
  }

  formRegister = this.fb.group({
    tipoSolicitante: ['1', Validators.required],
    documentoSolicitante: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    razonSolicitante: [''],
    nombreSolicitante: ['', [Validators.required, Validators.pattern('^[ a-zA-Z]{4,50}$')]],
    apellidoSolicitante: ['', [Validators.required, Validators.pattern('^[ a-zA-Z]{4,50}$')]],
    correoSolicitante: ['', [Validators.pattern("^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$")]],
    telefonoSolicitante: ['', [Validators.pattern('^[0-9]{7,9}$')]],
    direccionSolicitante: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 \.,?!-]*$')]],
    checkSolicitante: [this.checkboxMarcado, { disabled: this.disableSolicitante }],
    tipoAgraviado: ['5', [Validators.required]],
    documentoAgraviado: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    nombreAgraviado: ['', [Validators.required, Validators.pattern('^[ a-zA-Z]{4,50}$')]],
    apellidoAgraviado: ['', [Validators.required, Validators.pattern('^[ a-zA-Z]{4,50}$')]],
    direccionAgraviado: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 \.,?!-]*$')]],
    placaAgraviado: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{6}$')]],
    fechaAgraviado: [this.fechaActual],
    coberturaAgraviado: ['', [Validators.required]],
    metodoPago: ["141", [Validators.required]],
    entidadBancaria: ["0", [Validators.required]],
    nombreEntidad: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    nroCuenta: ['', [Validators.required, Validators.pattern('^[0-9-]*$')]],
    codInterbancario: ['', [Validators.required, Validators.pattern('^[0-9-]*$')]],
    recaptcha: ['', [Validators.required]],
    subirArchivo: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.currentDate = new Date();
    console.log(this.currentDate.toISOString().split('T')[0]);
    this.fechaActual = this.currentDate.toISOString().split('T')[0]
    this.formRegister.controls["fechaAgraviado"].setValue(this.fechaActual)
    console.log("fecha actual2", this.fechaActual);

    this.formRegister.controls["nombreEntidad"].clearValidators()
    this.formRegister.controls["nombreEntidad"].setValue('')
    this.formRegister.controls["nombreEntidad"].updateValueAndValidity()
    this.formRegister.controls["nroCuenta"].clearValidators()
    this.formRegister.controls["nroCuenta"].setValue('')
    this.formRegister.controls["nroCuenta"].updateValueAndValidity()
    this.formRegister.controls["codInterbancario"].clearValidators()
    this.formRegister.controls["codInterbancario"].setValue('')
    this.formRegister.controls["codInterbancario"].updateValueAndValidity()

  }

  // Validad tipo de DOCUMENTO_SOLICITANTE
  tipoSolicinate(event: any) {
    console.log(this.formRegister.controls["tipoSolicitante"].value);

    this.formRegister.controls["documentoSolicitante"].setValue('');
    this.formRegister.controls["documentoSolicitante"].updateValueAndValidity();
    this.formRegister.controls["nombreSolicitante"].setValue('');
    this.formRegister.controls["nombreSolicitante"].updateValueAndValidity();
    this.formRegister.controls["apellidoSolicitante"].setValue('');
    this.formRegister.controls["apellidoSolicitante"].updateValueAndValidity();
    this.formRegister.controls["direccionSolicitante"].setValue('');
    this.formRegister.controls["direccionSolicitante"].updateValueAndValidity();
    this.formRegister.controls["checkSolicitante"].setValue(false);
    this.disableAgraviado = false;
    this.formRegister.controls["documentoAgraviado"].setValue('')
    this.formRegister.controls["nombreAgraviado"].setValue('')
    this.formRegister.controls["apellidoAgraviado"].setValue('')
    this.formRegister.controls["direccionAgraviado"].setValue('')

    if (this.formRegister.controls["tipoSolicitante"].value == "1") {
      this.formRegister.controls["documentoSolicitante"].setValidators([Validators.required, Validators.pattern('^[0-9]{8}$')])
      this.formRegister.controls["tipoAgraviado"].setValue(5)
      this.formRegister.controls["coberturaAgraviado"].setValue(0)
      this.disableCobertura = true
    }

    if (this.formRegister.controls["tipoSolicitante"].value == "2") {
      this.formRegister.controls["documentoSolicitante"].setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9]{20}$')])
      this.formRegister.controls["coberturaAgraviado"].setValue(0)
      this.formRegister.controls["tipoAgraviado"].setValue(5)
      this.disableCobertura = true
    }

    if (this.formRegister.controls["tipoSolicitante"].value == "3") {
      this.formRegister.controls["documentoSolicitante"].setValidators([Validators.required, Validators.pattern('^[0-9]{11}$')])
      this.formRegister.controls["razonSolicitante"].setValidators([Validators.required, Validators.pattern('^[ a-zA-Z0-9\.]*$')])
      this.formRegister.controls["nombreSolicitante"].clearValidators()
      this.formRegister.controls["nombreSolicitante"].setValue('')
      this.formRegister.controls["nombreSolicitante"].updateValueAndValidity()
      this.formRegister.controls["apellidoSolicitante"].clearValidators()
      this.formRegister.controls["apellidoSolicitante"].setValue('')
      this.formRegister.controls["apellidoSolicitante"].updateValueAndValidity()

      this.formRegister.controls["checkSolicitante"].setValue(false);
      this.formRegister.controls["coberturaAgraviado"].setValue(12)
      this.formRegister.controls["tipoAgraviado"].setValue(5)
      this.disableCobertura = false
    }

    if (this.formRegister.controls["tipoSolicitante"].value == "4") {
      this.formRegister.controls["documentoSolicitante"].setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9]{20}$')])
      this.formRegister.controls["coberturaAgraviado"].setValue(0)
      this.formRegister.controls["tipoAgraviado"].setValue(5)
      this.disableCobertura = true
    }

  }

  // validar DOCUMENTO_AGRAVIADO
  tipoAgraviado(event: any) {
    console.log(this.formRegister.controls["tipoAgraviado"].value);
    this.formRegister.controls["documentoAgraviado"].setValue('');
    this.formRegister.controls["documentoAgraviado"].updateValueAndValidity();
    if (this.formRegister.controls["tipoAgraviado"].value == "5") {
      this.formRegister.controls["documentoAgraviado"].setValidators([Validators.required, Validators.pattern('^[0-9]{8}$')])
    }
    if (this.formRegister.controls["tipoAgraviado"].value == "6") {
      this.formRegister.controls["documentoAgraviado"].setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9]{20}$')])
    }
    if (this.formRegister.controls["tipoAgraviado"].value == "7") {
      this.formRegister.controls["documentoAgraviado"].setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9]{20}$')])
    }

  }

  // Validar para marcar casilla
  checkSolicitante(event: any) {
    console.log(this.formRegister.controls["checkSolicitante"].value);

    if (this.formRegister.controls["checkSolicitante"].value) {
      if (this.formRegister.controls["tipoSolicitante"].value == 1) {
        this.formRegister.controls["tipoAgraviado"].setValue(5)
        this.formRegister.controls["documentoAgraviado"].setValidators([Validators.required, Validators.pattern('^[0-9]{8}$')])

      }
      if (this.formRegister.controls["tipoSolicitante"].value == 2) {
        this.formRegister.controls["tipoAgraviado"].setValue(6)
        this.formRegister.controls["documentoAgraviado"].setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9]{20}$')])
      }
      if (this.formRegister.controls["tipoSolicitante"].value == 4) {
        this.formRegister.controls["tipoAgraviado"].setValue(7)
        this.formRegister.controls["documentoAgraviado"].setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9]{20}$')])

      }
      // this.selectDeshabilitado = true;
      this.formRegister.controls["documentoAgraviado"].setValue(this.formRegister.controls["documentoSolicitante"].value)
      this.formRegister.controls["nombreAgraviado"].setValue(this.formRegister.controls["nombreSolicitante"].value)
      this.formRegister.controls["apellidoAgraviado"].setValue(this.formRegister.controls["apellidoSolicitante"].value)
      this.formRegister.controls["direccionAgraviado"].setValue(this.formRegister.controls["direccionSolicitante"].value)
      this.disableAgraviado = true;
    } else {
      this.formRegister.controls["documentoAgraviado"].setValue('')
      this.formRegister.controls["nombreAgraviado"].setValue('')
      this.formRegister.controls["apellidoAgraviado"].setValue('')
      this.formRegister.controls["direccionAgraviado"].setValue('')
      this.disableAgraviado = false;
    }

  }
  // validar numero de telefono 
  validaNrotelefono(event: any) {
    if (event.charCode >= 48 && event.charCode <= 57) {
      return true;
    }
    return false;
  }

  // Meotod tipo de cobertura
  tipoCobertura(event: any) {
  }

  // Metodo para vaidar tipo de pago
  tipoMetodoPago(event: any) {
    console.log(this.formRegister.controls["metodoPago"].value);
    if (this.formRegister.controls["metodoPago"].value == 141) {
      alert("hola")
      this.formRegister.controls["nombreEntidad"].clearValidators()
      this.formRegister.controls["nombreEntidad"].setValue('')
      this.formRegister.controls["nombreEntidad"].updateValueAndValidity()
      this.formRegister.controls["nroCuenta"].clearValidators()
      this.formRegister.controls["nroCuenta"].setValue('')
      this.formRegister.controls["nroCuenta"].updateValueAndValidity()
      this.formRegister.controls["codInterbancario"].clearValidators()
      this.formRegister.controls["codInterbancario"].setValue('')
      this.formRegister.controls["codInterbancario"].updateValueAndValidity()
    } else {

      this.formRegister.controls["nombreEntidad"].setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
      this.formRegister.controls["nroCuenta"].setValidators([Validators.required, Validators.pattern('^[0-9-]*$')])
      this.formRegister.controls["codInterbancario"].setValidators([Validators.required, Validators.pattern('^[0-9-]*$')])
    }
  }

  // Metodo para vaidar tipo de entidad
  tipoEntidadBancaria(event: any) {
    console.log(this.formRegister.controls["entidadBancaria"].value);
    if (this.formRegister.controls["entidadBancaria"].value != 135) {
      this.formRegister.controls["nombreEntidad"].clearValidators()
      this.formRegister.controls["nombreEntidad"].setValue('')
      this.formRegister.controls["nombreEntidad"].updateValueAndValidity()
    }
    if (this.formRegister.controls["entidadBancaria"].value == 135) {
      this.formRegister.controls["nombreEntidad"].setValidators([Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
    }
  }

  // Para seleccionar archivo de los documentos
  archivoSeleccionado!: File;
  onArchivoSeleccionado(event: any) {
    const files: FileList = event.target.files
    if (files.length > 0) {
      this.archivoSeleccionado = files[0];
      // Aquí puedes realizar las acciones necesarias con el archivo seleccionado
      console.log('Archivo seleccionado:', this.archivoSeleccionado);
    }
  }

  // Para subir archivo de los documentos
  contador: number = 0
  onFileSelected(event: any) {
    const files: FileList = event.target.files
    this.contador == 1
    console.log("Datos de arcivo ->", files);
    for (let i = 0; i < files.length; i++) {
      if (this.totalFile <= this.uploadFiles.length) {
        // console.log("que hace esto", this.uploadFiles.length, this.totalFile);
      }
      const file = files[i]
      if (file.size <= 15 * 1204 * 1024) {
        this.converterToBase64(file).then((base64: string) => {
          let sizeKB = Math.round(file.size / 1024)
          this.uploadFiles.push({
            name: file.name,
            type: file.type,
            size: sizeKB,
            base64: base64,
          })
          console.log("baseg4", this.uploadFiles);

        })

      } else {
        Swal.fire({
          title: 'Error!',
          text: 'El tamaño del archivo  es mayor a los 15 MB permitidos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    }
  }

  // Para eliminar archivo seleccionado
  deleteFile(file: any) {
    const index = this.uploadFiles.indexOf(file)
    console.log(file);
    if (index !== -1) {
      this.uploadFiles.splice(index, 1)
      this.formRegister.controls["subirArchivo"].setValue('')
      this.formRegister.controls["subirArchivo"].updateValueAndValidity()
      Swal.fire({
        title: 'Error!',
        text: 'Archivo eliminado',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }

  // Convertir a base 64 los archivos adjuntos
  converterToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, rejet) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result as string)
      }
      reader.onerror = (error) => {
        rejet(error)
      }
      reader.readAsDataURL(file)
    })
  }

  // Metodo registrar Siniestros
  registrarSiniestro() {
    Swal.fire({
      text: 'Se registró correctamente la solicitud!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    })
    this.reload()
    // this.formRegister.reset();
    // this.formRegister.controls["tipoSolicitante"].setValue(1)
    // this.formRegister.controls["tipoAgraviado"].setValue(5)
    // this.formRegister.controls["coberturaAgraviado"].setValue(0)
    // this.formRegister.controls["metodoPago"].setValue(141)
    // this.formRegister.controls["entidadBancaria"].setValue(0)
    // this.formRegister.controls["fechaAgraviado"].setValue(this.fechaActual)
    // this.formRegister.controls["checkSolicitante"].setValue(false)
    // this.uploadFiles.splice(0, this.uploadFiles.length)
    // if (this.formRegister.controls['documentoSolicitante'].value == null && this.formRegister.controls['nombreSolicitante'].value == null && this.formRegister.controls['apellidoSolicitante'].value == null && this.formRegister.controls['direccionSolicitante'].value == null) {
    //   this.show = false
    //   console.log('-->', this.show);

    // } else {
    //   this.show = true
    // }
  }
  // Metodo limpiar los campos del formulario
  clearFormulario() {
    this.reload()
  }

  // Para recargar la Pagina
  reload() {
    const currentUrl = this.router.url;
    console.log(currentUrl);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }
  // =========================================================================================================
  DOCUMENTO_SOLICITANTE = [{ id: "1", name: "DNI" }, { id: "2", name: "CE" }, { id: "3", name: "RUC" }, { id: "4", name: "PASAPORTE" }]
  DOCUMENTO_AGRAVIADO = [{ id: "5", name: "DNI" }, { id: "6", name: "CE" }, { id: "7", name: "PASAPORTE" }]
  COBERTURA: any = [{ id: "0", name: "SELECCIONE UNA COBERTURA" }, { id: "8", name: "INCAPACIDAD TEMPORAL" }, { id: "9", name: "INVALIDEZ PERMANENTE" }, { id: "10", name: "MUERTE" }, { id: "11", name: "GASTOS MÉDICOS" }, { id: "12", name: "GASTOS DE SEPELIO" }]
  METODO_PAGO = [{ id: "141", name: "PAGO EN VENTANILLA (BANCO DE CRÉDITO DEL PERÚ)" }, { id: "142", name: "TRANSFERENCIA BANCARIA" }]
  ENTIDAD = [{ id: "0", name: "SELECCIONE UNA OPCION" }, { id: "131", name: "BCP" }, { id: "132", name: "BBVA" }, { id: "133", name: "INTERBANK" }, { id: "134", name: "SCOTIABANK" }, { id: "135", name: "OTRO" }]
}
