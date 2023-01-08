//Salvador Husson

// Array de productos
const productos = {
    producto1: {
      nombre: 'Placa de Video',
      precio: '750.00',
      descripcion: 'Placa de video Nvida GeForce GTX3070ti 12gb',
      srcImg: 'Imagenes/unknown6.png'
    },
    producto2: {
      nombre: 'Monitor',
      precio: '100.00',
      descripcion: '¡Para una mejor calidad de juego!, con G-sync y ultima tecnologia en Hz',
      srcImg: 'Imagenes/unknown34.png'
    },
    producto3: {
      nombre: 'Laptop',
      precio: '1200.00',
      descripcion: '¡Laptop de alta gama, con una Gráfica NVIDIA GeForce RTX Serie 30, capaz de correr cualquier juego!',
      srcImg: 'Imagenes/unknown4.png'
    },
  }

  const productos2 = {
    producto1: {
      nombre: 'Refrigeraciones liquidas',
      precio: '900.00',
      descripcion: '¡Refrigeraciones liquidas capazes de enfriar hasta un volcan!',
      srcImg: 'Imagenes/unknown31.png'
    },
    producto2: {
      nombre: 'Coolers',
      precio: '800.00',
      descripcion: '¡Para mantener el rendimiento al 100%!',
      srcImg: 'Imagenes/unknown32.png'
    },
    producto3: {
      nombre: 'Fuentes',
      precio: '50.00',
      descripcion: '¡Fuente capaces de llegar a los 1000W!',
      srcImg: 'Imagenes/unknown33.png'
    },
  }

  // Se captura el template de los productos
  const templateProd = document.getElementById('template-prod').content
  const contenedorProd = document.querySelector('.contenedor-productos1')
  const fragment = document.createDocumentFragment()
  
  // TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
  Object.values(productos).forEach( producto => {
    templateProd.querySelector('.div-info .nombre-prod').textContent = producto.nombre
    templateProd.querySelector('.div-precio-boton .precio').textContent = producto.precio
    templateProd.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion
    templateProd.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre)
    templateProd.querySelector('.contenedor-img img').setAttribute('src', producto.srcImg)
    const clone = templateProd.cloneNode(true)
    fragment.appendChild(clone)
  })
  contenedorProd.appendChild(fragment)
  
  // TODO LO RELACIONADO AL CARRITO DE COMPRA
  let carrito = {}
  const templateTabla = document.getElementById('agregar-producto-al-carro').content
  const tbodyCarrito = document.getElementById('carrito-body')
  const fragmentTabla = document.createDocumentFragment()
  const templateFoot = document.getElementById('tfooter').content
  const tfootCarrito = document.getElementById('footer')
  
  contenedorProd.addEventListener('click', e => {
    
    if(e.target.textContent === "Agregar") {
      setCarrito(e.target.parentElement.parentElement)
    }
    e.stopPropagation();
  })
  const setCarrito = e => {
    const pivoteCarrito = {
      nombre: e.querySelector('.div-info .nombre-prod').textContent,
      precio: e.querySelector('.div-precio-boton .precio').textContent,
      cantidad: 1
    }
    if(carrito.hasOwnProperty(pivoteCarrito.nombre)){
      carrito[pivoteCarrito.nombre].cantidad += 1
    } else {
      carrito[pivoteCarrito.nombre] = {...pivoteCarrito}
    }
    pintarTabla(carrito)
  }

    // Se captura el template de los productos
    const templateProd2 = document.getElementById('template-prod').content
    const contenedorProd2 = document.querySelector('.contenedor-productos2')
    const fragment2 = document.createDocumentFragment()
    
    // TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
    Object.values(productos2).forEach( producto => {
      templateProd2.querySelector('.div-info .nombre-prod').textContent = producto.nombre
      templateProd2.querySelector('.div-precio-boton .precio').textContent = producto.precio
      templateProd2.querySelector('.div-info .descripcion-prod').textContent = producto.descripcion
      templateProd2.querySelector('.contenedor-img img').setAttribute('alt', producto.nombre)
      templateProd2.querySelector('.contenedor-img img').setAttribute('src', producto.srcImg)
      const clone = templateProd2.cloneNode(true)
      fragment.appendChild(clone)
    })
    contenedorProd2.appendChild(fragment)
    
    // TODO LO RELACIONADO AL CARRITO DE COMPRA
    let carrito2 = {}
    const templateTabla2 = document.getElementById('agregar-producto-al-carro').content
    const tbodyCarrito2 = document.getElementById('carrito-body')
    const fragmentTabla2 = document.createDocumentFragment()
    const templateFoot2 = document.getElementById('tfooter').content
    const tfootCarrito2 = document.getElementById('footer')
    
    contenedorProd2.addEventListener('click', e => {
      
      if(e.target.textContent === "Agregar") {
        setCarrito(e.target.parentElement.parentElement)
      }
      e.stopPropagation();
    })
    const setCarrito2 = e => {
      const pivoteCarrito = {
        nombre: e.querySelector('.div-info .nombre-prod').textContent,
        precio: e.querySelector('.div-precio-boton .precio').textContent,
        cantidad: 1
      }
      if(carrito2.hasOwnProperty(pivoteCarrito.nombre)){
        carrito2[pivoteCarrito.nombre].cantidad += 1
      } else {
        carrito2[pivoteCarrito.nombre] = {...pivoteCarrito}
      }
      pintarTabla(carrito2)
    }
  
  const pintarTabla = objetoCarrito => {
    Object.values(objetoCarrito).forEach( objeto => {
      const cloneTabla = templateTabla.cloneNode(true)
      cloneTabla.getElementById('producto').textContent = objeto.nombre
      cloneTabla.getElementById('cant').textContent = objeto.cantidad
      cloneTabla.getElementById('precio-uni').textContent = objeto.precio
      let precioTotal = parseFloat(objeto.precio) * objeto.cantidad
      cloneTabla.getElementById('precio-total-prod').textContent = precioTotal.toFixed(2)
      fragmentTabla.appendChild(cloneTabla)
    })
    tbodyCarrito.innerHTML = ''
    tbodyCarrito.appendChild(fragmentTabla)
    pintarFooter()
  }
  const pintarFooter = () => {
    tfootCarrito.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
      tfootCarrito.innerHTML = '<tr><td colspan = 4>¡No hay ningun elemento en el carrito!</td></tr>'
    } else {
      const total = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + (cantidad * precio),0)
      templateFoot.getElementById('total-a-pagar').textContent = total.toFixed(2)
      const cloneFoot = templateFoot.cloneNode(true)
      fragment.appendChild(cloneFoot)
      tfootCarrito.appendChild(fragment)
      //Boton Vaciar carrito
      const botonVaciar = document.getElementById('vaciar-aside')
  botonVaciar.addEventListener('click', () => {
        carrito = {}
        pintarTabla(carrito)
        pintarFooter()
      })
      
      //Botones aumentar y disminuir cantidades
      
    }
  }
  tbodyCarrito.addEventListener('click', e => {
    if(e.target.classList.contains('button')) {
      aumentarDisminuir(e.target)
    }
  })
  const aumentarDisminuir = boton => {
    if(boton.textContent === '+'){
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad++  
        }
      })
    }
    if(boton.textContent === '-') {
      const indicador = boton.parentElement.parentElement.firstElementChild.textContent
      Object.values(carrito).forEach( elemento => {
        if(elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad--
          if(carrito[elemento.nombre].cantidad === 0) {
            delete carrito[elemento.nombre]
          }
        }
      })
    }
    pintarTabla(carrito)
    pintarFooter()
  }
  