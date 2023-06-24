//se encarga de vaciar los valores de varios campos del formulario y desmarcar las casillas de 
//verificación o botones de radio seleccionados, dejando el formulario en un estado limpio y listo para
// ser rellenado nuevamente.
var clean = () => {
    document.getElementById("nombre").value = "";
    document.getElementById("password").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("f_nacimiento").value = "";
    document.getElementById("email").value = "";   
    document.querySelectorAll('input[name = "t_cliente"]').forEach(element => {
        element.checked = false;
    });
}
//se encarga de habilitar todos los elementos del formulario con id "myForm" que estaban deshabilitados previamente.
var nt_tabla = () => {
    var form = document.getElementById("myForm").getElementsByTagName('*');
    for (var a = 0; a < form.length; a++) {
        form[a].disabled = false
    }
}
//valida y formatea el contenido de un campo de entrada de texto en tiempo real,
//permitiendo únicamente caracteres alfabéticos y espacios en blanco.
function validarnombre(event) {
    const input = event.target;
    const regex = /^[a-zA-Z\s]*$/; 
    if (!regex.test(input.value)) {
        input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
    }
}
// valida y formatea el contenido de un campo de entrada de texto en tiempo real, permitiendo únicamente caracteres numéricos.
function validaredad(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, '');
}
//valida los campos de un formulario antes de realizar alguna acción
function validarInputs() {
    var inombre = document.getElementById("nombre");
    var ipassword = document.getElementById("password");
    var iedad = document.getElementById("edad");                          //Se obtienen los elementos de cada campo del formulario
    var if_nacimiento = document.getElementById("f_nacimiento");
    var iemail = document.getElementById("email");
    var it_cliente = document.querySelector('input[name="t_cliente"]:checked');


    if (inombre.value.trim() === "") {
        inombre.classList.add("invalid")  //verifica si el campo "nombre" está vacío.
        return false;
    }

    if (ipassword.value.trim() === "") {
        alert("Ingrese una contraseña válida");//verifica si el campo "password" está vacío.
        return false;
    }

    var edadRegex = /^[1-9][0-9]*$/; 
    if (!edadRegex.test(iedad.value)) {
        alert("Ingrese una edad válida");//valida que el campo "edad" contenga solo números enteros positivos mayores a cero.
        return false;
    }

    if (if_nacimiento.value.trim() === "") {
        alert("Ingrese una fecha de nacimiento válida");//verifica si el campo "f_nacimiento" está vacío. 
        return false;
    }
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(iemail.value)) {
        alert("Ingrese un email válido");//valida que el campo "email" tenga un formato de correo electrónico válido.
        return false;
    }
    if (!it_cliente) {
        alert("Seleccione un tipo_cliente");//verifica si no se ha seleccionado ningún tipo de cliente 
        return false;
    }

    return true;
}

//actualiza los datos de un registro en una lista y guardar los cambios en el almacenamiento local (localStorage).
var modificar = (listaNueva) => {
    let inombre = document.getElementById("nombre");
    let ipassword = document.getElementById("password");
    let iedad = document.getElementById("edad");
    let if_nacimiento = document.getElementById("f_nacimiento");         //Se obtienen los elementos del formulario mediante "document.getElementById" y "document.querySelector"
    let iemail = document.getElementById("email");                       // y se asignan a variables locales.
    let it_cliente = document.querySelector('input[name = "t_cliente"]:checked');
    let eBtnEditarUp = document.getElementById('btnEditar')

    let nombre = inombre.value;
    let contraseña = ipassword.value;
    let edad = iedad.value;
    let Fecha_nacimiento = if_nacimiento.value;       //Se obtiene el valor de cada campo mediante el value de los elementos.
    let email = iemail.value;
    let t_cliente = it_cliente.value;                 
    let indice = eBtnEditarUp.value //Se obtiene el índice del registro que se desea modificar desde el botón de editar 
    listaNueva[indice].nombre = nombre; 
    listaNueva[indice].Contraseña = contraseña;
    listaNueva[indice].Edad = edad;
    listaNueva[indice].Fecha_nacimiento = Fecha_nacimiento;   //Se actualizan los valores correspondientes en la lista listaNueva utilizando el índice obtenido
    listaNueva[indice].Email = email;
    listaNueva[indice].t_cliente = t_cliente;
    localStorage.setItem('personas', JSON.stringify(listaNueva));   //Se guarda la lista actualizada en el almacenamiento local 
    cargarTabla(listaNueva)   //volver a cargar y mostrar la tabla con los datos actualizados.
}

//elimina un registro de una lista y actualizar la tabla y el almacenamiento local (localStorage) con los cambios realizados.
var eliminar = (listaNueva) => {
    let eBtnEliminarUp = document.getElementById('btnEliminar'); //Se obtiene el botón de eliminar mediante "document.getElementById" y se asigna a la variable "eBtnEliminarUp"
    let indice = eBtnEliminarUp.value;
    lista = listaNueva.filter((p) => p.id != indice)//Se filtra la lista listaNueva utilizando el método filter
    lista = lista.map((p, index) => { return { ...p, 'id': index } })//Se utiliza el método map para actualizar los índices de la lista después de eliminar el registro. 
    localStorage.setItem('personas', JSON.stringify(lista));//Se guarda la lista actualizada en el almacenamiento local
    cargarTabla(lista);//Se llama a la función cargarTabla para volver a cargar y mostrar la tabla con los datos actualizados.
    clean();//limpia los campos del formulario
    nt_tabla();//desbloquear los campos del formulario.
}
var cargarTabla = (listaNueva) => {
    let eContenedorTabla = document.getElementById("contenedorTabla");
    let inombre = document.getElementById("nombre");
    let ipassword = document.getElementById("password");
    let iedad = document.getElementById("edad");
    let if_nacimiento = document.getElementById("f_nacimiento");
    let iemail = document.getElementById("email");
    let it_cliente = document.querySelector('input[name = "t_cliente"]:checked');

    render = "<table>"
    render += "<tr><th>Nombre</th><th>Contraseña</th><th>Edad</th><th>Fecha_nacimiento</th><th>Email</th><th>Tipo_cliente</th><th>Accion</th></tr>"
    for (let i = 0; i < listaNueva.length; i++) {
        const element = listaNueva[i];
        render += "<tr>"
        render += "<td>" + element.nombre + "</td>"
        render += "<td>" + element.Contraseña + "</td>"
        render += "<td>" + element.Edad + "</td>"
        render += "<td>" + element.Fecha_nacimiento + "</td>"
        render += "<td>" + element.Email + "</td>"
        render += "<td>" + element.t_cliente + "</td>"
        render += "<td>"
        render += "<button id='btnEditar" + i + "'>Editar</button>"
        render += "<button id='btnEliminar" + i + "'>Eliminar</button>"
        render += "</td>"
        render += "</tr>"

    }
    render += "</table>";
    eContenedorTabla.innerHTML = render;
    for (let i = 0; i < listaNueva.length; i++) {
        var eBtn = document.getElementById("btnEditar" + i);
        var eBtpassword = document.getElementById("btnEliminar" + i);
        let element = listaNueva[i]
        eBtn.addEventListener("click", () => {
            inombre.value = element.nombre;
            ipassword.value = element.Contraseña;
            iedad.value = element.Edad;
            if_nacimiento.value = element.Fecha_nacimiento;
            iemail.value = element.Email;
            it_cliente = element.t_cliente; //si algunas vez alguien o yo tiene problemas con los radio buttons y el value, mirar esta linea.
            let sEditar = "<button type='button' id='btnEditar' value='" + i + "'>Editar</button>";

            let contenedorBoton = document.getElementById('contenedorBtnExtra');
            contenedorBoton.innerHTML = sEditar;
            let eBtnEditarUp = document.getElementById('btnEditar');
            eBtnEditarUp.addEventListener('click', () => modificar(listaNueva))
        })
        eBtpassword.addEventListener("click", () => {
            inombre.value = element.nombre;
            ipassword.value = element.Contraseña;
            iedad.value = element.Edad;
            if_nacimiento.value = element.Fecha_nacimiento;
            iemail.value = element.Email;
            document.querySelectorAll(`input[name="${"t_cliente"}"]`).forEach(elemento => {
                if (elemento.value === element.t_cliente) {
                    elemento.checked = true;
                }
            });
            var form = document.getElementById("myForm").getElementsByTagName('*');
            for (var a = 0; a < form.length; a++) {
                form[a].disabled = true;
            }
            let sEliminar = "<button type='button' id='btnEliminar' value='" + i + "'>Eliminar</button>";
            let contenedorBoton = document.getElementById('contenedorBtnExtra');
            contenedorBoton.innerHTML = sEliminar;
            let eBtnEliminarUp = document.getElementById('btnEliminar')
            eBtnEliminarUp.addEventListener('click', () => eliminar(listaNueva))


        })
    }
}
//generar y cargar una tabla HTML con los datos de una lista (listaNueva)
var registrar = () => {
    let inombre = document.getElementById("nombre");
    let ipassword = document.getElementById("password");
    let iedad = document.getElementById("edad");
    let if_nacimiento = document.getElementById("f_nacimiento");
    let iemail = document.getElementById("email");
    let it_cliente = document.querySelector('input[name = "t_cliente"]:checked');
    let nombre = inombre.value;
    let contraseña = ipassword.value;
    let edad = iedad.value;
    let Fecha_nacimiento = if_nacimiento.value;
    let email = iemail.value;
    let t_cliente = it_cliente.value;

    let ListaPersonas = localStorage.getItem("personas");
    let ListaAntigua = JSON.parse(ListaPersonas); 
    if (ListaAntigua == null) {
        let datos = { "id": 0, "nombre": nombre, "Contraseña": contraseña, "Edad": edad, "Fecha_nacimiento": Fecha_nacimiento, "Email": email, "t_cliente": t_cliente };
        listaNueva = [datos]
    } else {
        let datos = { "id": ListaAntigua.length, "nombre": nombre, "Contraseña": contraseña, "Edad": edad, "Fecha_nacimiento": Fecha_nacimiento, "Email": email, "t_cliente": t_cliente };
        listaNueva = [...ListaAntigua, datos]
    }

    localStorage.setItem("personas", JSON.stringify(listaNueva));
    cargarTabla(listaNueva)

}

document.getElementById("btn").addEventListener("click", () => {
    if (validarInputs()) {
        registrar();
    }
});
var cargarDatos = () => {
    let ListaPersonas = localStorage.getItem("personas");
    let ListaAntigua = JSON.parse(ListaPersonas);
    cargarTabla(ListaAntigua)
}
addEventListener('load', cargarDatos) 


document.getElementById("increaseFontButton").addEventListener("click", function() {
    increaseFontSize();
  });
  document.getElementById("decreaseFontButton").addEventListener("click", function() { //Los tres primeros bloques de código utilizan document.getElementById 
    decreaseFontSize();
  });
  document.getElementById("toggleContrastButton").addEventListener("click", function() {//para obtener los elementos del DOM correspondientes a los botones de aumento de tamaño de fuente 
    toggleContrast();
  });
  //obtiene el tamaño actual de fuente del elemento body mediante getComputedStyle y lo convierte a un número flotante. 
  //Luego, incrementa el tamaño en 1 y actualiza el estilo del elemento body para reflejar el nuevo tamaño de fuente.
  function increaseFontSize() {
    var currentFontSize = parseFloat(getComputedStyle(document.body).fontSize);
    var newFontSize = currentFontSize + 1;
    document.body.style.fontSize = newFontSize + "px";
  }
  // similar a increaseFontSize, pero disminuye el tamaño de fuente en lugar de incrementarlo.
  function decreaseFontSize() {
    var currentFontSize = parseFloat(getComputedStyle(document.body).fontSize);
    var newFontSize = currentFontSize - 1;
    document.body.style.fontSize = newFontSize + "px";
  }
  //alterna la clase high-contrast en el elemento body. Esto permite cambiar el contraste de la página al hacer clic en el botón.
  function toggleContrast() {
    document.body.classList.toggle("high-contrast");
  }
  document.getElementById("toggleContrastButton").addEventListener("click", function() {
    toggleTheme();
  });
  //alterna la clase dark-theme en el elemento body, lo que permite alternar entre un tema oscuro y claro en la página.
  function toggleTheme() {
    document.body.classList.toggle("dark-theme");
  }
  //Si hay campos inválidos, se evita que el formulario se envíe mediante event.preventDefault() 
  //y se muestra una alerta indicando al usuario que debe completar los campos obligatorios.
  document.getElementById('myForm').addEventListener('submit', function(event) {
    var form = event.target;
    var invalidFields = form.querySelectorAll(':invalid');
    
    for (var i = 0; i < invalidFields.length; i++) {
      invalidFields[i].classList.add('invalid');
    }
    
    if (invalidFields.length > 0) {
      event.preventDefault();
      alert('Debe rellenar los campos obligatorios.');
    }
  });