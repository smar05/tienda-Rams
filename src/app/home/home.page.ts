import { Component } from '@angular/core';
import { ServicioService } from '../servicios/servicio.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public productos : any = [];
  public pagina : any = {};
  public categorias : any = [];
  public loading : boolean = true;
  public loadingPagina : boolean = true;
  public nuevo : any = [];

  constructor(public servicio:ServicioService,public router:Router) {}

  ngOnInit() {    
    this.servicio.getPagina().valueChanges()
    .subscribe(datos=>{
      this.pagina = datos;
      this.loadingPagina = false;
    });
    this.servicio.getCategorias().valueChanges()
    .subscribe(categorias =>{
      this.categorias = categorias;
      for(let i=0;i<this.categorias.length;i++){
        this.categorias[i].activar = false;
      }
    });
    this.servicio.getProductos().valueChanges()
    .subscribe(productos=>{
      this.nuevo = this.productos = productos;
      this.loading = false;
    });
  }

  public productosOrdenados()
  {
    this.productos = this.servicio.ordenar(this.productos,'nombre');
    return this.productos;
  }

  public categoriasOrdenadas()
  {
    this.categorias = this.servicio.ordenar(this.categorias,'nombre');
    return this.categorias;
  }

  public cart()
  {
    this.router.navigate(['/carrito']);
  }

  public goProducto(producto:any)
  {
    this.router.navigate(['/producto',producto.id]);
  }

  public goToPage(a:number)
  {
    if(a==0)
    {
      this.servicio.goToUrl('https://api.whatsapp.com/send?phone='+this.pagina.indicativo+this.pagina.whatsapp);
    }else if(a==1)
    {
      this.servicio.goToUrl('https://www.instagram.com/'+this.pagina.instagram);
    }else if(a==2)
    {
      this.servicio.goToUrl('https://www.facebook.com/'+this.pagina.facebook);
    }
  }

  async carrito(producto:any)
  {
    const { value: cantidad } = await Swal.fire({
      title: 'Agregar al carrito',
      input: 'number',
      inputLabel: 'Ingrese la cantidad',
      inputPlaceholder: 'Ingrese la cantidad'
    }) 
    if ((cantidad != null)&&(cantidad > 0)) {      
      producto.cantidad = cantidad;
      this.servicio.agregarCarrito(producto);
      Swal.fire(`Cantidad agregada: ${cantidad}`)
      this.servicio.back();
    }else{
      this.servicio.presentAlert('Error','Ingrese una cantidad');
    }
  }

  public activarCategoria(id:any){
    for(let i=0;i<this.categorias.length;i++){
      if(id == i){
        this.categorias[i].activar = !this.categorias[i].activar
      }else{
        this.categorias[i].activar = false;
      }
    }
  }

}
