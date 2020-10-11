import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Cliente } from '../clientes/clientes';
import { ClientesService} from '../clientes.service';
import Swal from 'sweetalert2';


declare var $: any;

@Component({
  selector: 'app-clientes-modal',
  templateUrl: './clientes-modal.component.html',
  styleUrls: ['./clientes-modal.component.css']
})
export class ClientesModalComponent implements OnInit, OnChanges  {

  @Input() id : number;
  @Input() modoEdicion : boolean;
  cliente :  Cliente = {
    id : 0,
    Nombre : '',
    Apellido : '',
    Telefono : "",
    Correo : "",
    Departamento : "",
    Ciudad : "",
    CodigoPostal : "",
    Calle : ""
  };

  constructor(private clienteService: ClientesService) { 
    console.log("Esta es una demo" + this.id)
  }

  ngOnInit() {
     
    console.log("Esta es una demo" + this.id)

  }

  
  ngOnChanges() {

    if (this.modoEdicion === true)
    {
      this.getClientexId(this.id)
    }
    else{
      this.cliente = {
        id : 0,
        Nombre : '',
        Apellido : '',
        Telefono : "",
        Correo : "",
        Departamento : "",
        Ciudad : "",
        CodigoPostal : "",
        Calle : ""
      };
    }
}

  resetCliente(){

  }

  showModal():void {
    $("#myModal").modal('show');
  }
  sendModal(): void {
    this.hideModal();
  }

  hideModal():void {
    document.getElementById('close-modal').click();
  }

  Guardar(cliente : Cliente) : void{
    console.log(cliente);
    this.guardarCliente(cliente);
  }

  guardarCliente(cliente) {

    if (cliente.id != undefined || cliente.id != 0 ){


      return this.clienteService.actualizarCliente(cliente).subscribe((data) => {
        if (data){
          this.MostrarAlerta("Registro Actualizado");
          this.sendModal();
        }
      })


    }
    else{

      return this.clienteService.crearCliente(cliente).subscribe((data) => {
        //alert(data);
  
        if (data){
          this.MostrarAlerta("Registro Agregado");
          this.sendModal();
        }
      })

    }

    
  }

  getClientexId(idCliente) {
    return this.clienteService.getClientexId(idCliente).subscribe((data) => {
      this.cliente = data;
    })
  }


  MostrarAlerta(Mensaje : string){

    Swal.fire({
      position: 'top-end',
      type: 'success',
      title: Mensaje,
      showConfirmButton: false,
      timer: 1500
    })

  }

}
