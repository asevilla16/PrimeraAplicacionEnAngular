import { Component, OnInit } from '@angular/core';

import { Clientes } from './mock-clientes';

import { ClientesService} from '../clientes.service';

import { Cliente } from '../clientes/clientes';

import Swal from 'sweetalert2';


declare var $: any;

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})

export class ClientesComponent implements OnInit{

  
  constructor(private clienteService: ClientesService) { }

  //  cliente :  Cliente = {
  //   id : 8,
  //   Nombre : 'Josue',
  //   Apellido : 'Lopez',
  //   Telefono : "999999",
  //   Correo : "MiCorreo@gmail.com",
  //   Departamento : "Cortes",
  //   Ciudad : "San Pedro Sula",
  //   CodigoPostal : "21001",
  //   Calle : "3calle"
  // };
  selectedId : number;
  modoEdicion : boolean;

  ListaClientes = Clientes;

  ListaClientesApi : {};

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    return this.clienteService.getListaClientes().subscribe((data: {}) => {
      this.ListaClientesApi = data;
    })
  }

  showModal(): void {   
    this.modoEdicion = false;
    $("#myModal").modal('show');
  }

  editarCliente(id){
    this.selectedId  = id;
    this.modoEdicion = true;
    $("#myModal").modal('show');
  }

  eliminarCliente(id){

    Swal.fire({
      title: 'Desea eliminar el registro seleccionado?',
      text: "No podra revertir esta accion!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      console.log(result)
      if (result.value) {
        console.log("Entramos");
        this.clienteService.deleteEmployee(id).subscribe((data: {}) => {
         console.log(data);
        })

        //JOVENES, en este espacio colocar la llamada a una funcion de clientesservice que elimine un cliente, se le pasa el id como parametro y que devuelva un true.
        // y si el resultado que devuelve el service es true, favor llamar la siguiente alerta que esta abajo
        Swal.fire(
          'Eliminado!',
          'El cliente ha sido eliminado.',
          'success'
        )
      }
    })

  }

  // getHeroes(): void {
  //   this.ListaClientesApi = this.clienteService.getListaClientes();
  // }

}
