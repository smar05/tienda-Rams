import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../servicios/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.page.html',
  styleUrls: ['./producto.page.scss'],
})
export class ProductoPage implements OnInit {

  public producto : any = {};
  public cantidad : number = null;
  public producto2 : any = {cantidad:null};
  public id : string = null;
  public loading : boolean = true;
  public fotoPrincipal : string = null;
  public pagina : any = [];
  public subVariantes : any = [];

  constructor(public servicio:ServicioService,public actRoute:ActivatedRoute) { }

  ngOnInit() {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.servicio.getPagina().valueChanges().subscribe(datos =>{
      this.pagina = datos;
    });
    this.servicio.getProducto(this.id).valueChanges()
    .subscribe(producto =>{
      this.producto = producto;
      if(this.producto.variantes){
        this.producto.caracteristica = null;
      }      
      this.fotoPrincipal = this.producto.imagen1;
      this.loading = false;
    });
    this.servicio.getSubVariantes(this.id).valueChanges().subscribe(datos=>{
      this.subVariantes = datos;
    });
  }

  async carrito()
  {
    const { value: cantidad } = await Swal.fire({
      title: 'Agregar al carrito',
      input: 'number',
      inputLabel: 'Ingrese la cantidad',
      inputPlaceholder: 'Ingrese la cantidad'
    }) 
    if ((cantidad != null)&&(cantidad > 0)) {      
      this.producto2 = this.producto;
      this.producto2.cantidad = cantidad;
      if(this.producto.variantes){
        for(let i=0;i<this.subVariantes.length;i++){
          if(this.producto.caracteristica == this.subVariantes[i].nombre){
            this.producto2.precio = this.subVariantes[i].precio;
          }
        }
      }
      this.servicio.agregarCarrito(this.producto2);
      Swal.fire(`Cantidad agregada: ${cantidad}`)
      this.servicio.back();
    }else{
      this.servicio.presentAlert('Error','Ingrese una cantidad');
    }
  }

  public foto(id : number){
    if(id == 0){
      this.fotoPrincipal = this.producto.imagen1;
    }else if(id == 1){
      this.fotoPrincipal = this.producto.imagen2;
    }else if(id == 2){
      this.fotoPrincipal = this.producto.imagen3;
    }else if(id == 3){
      this.fotoPrincipal = this.producto.imagen4;
    }else{
      this.fotoPrincipal = this.producto.imagen1;
    }
  }

  public back()
  {
    this.servicio.back();
  }

}
