// Declaración de la clase User con su constructor y sus métodos
class User{
    constructor(usuario, password,nombre, apellido, altura, peso, imc) {
        this.usuario = usuario;
        this.password = password;
        this.nombre = nombre;
        this.apellido = apellido;
        this.altura = altura;
        this.peso = peso;
        this.imc = imc;
    }
    
    //Método chequear para controlar por consola el contenido del objeto
    chequear(){
        console.log("Metodo chequear: \n" + User)
    }
    
    //Método mostrar para ver todas las propeiedades del objeto.
    mostrar(){
        console.log("Metodo mostrar datos cargados: \nLogin: " + this.usuario + "\nPassword: " + this.password + "\nNombre: " + this.nombre + "\nApellido: " + this.apellido + "\nAltura: " + this.altura + "\nPeso: " + this.peso + "\nIMC: " + this.imc);
    }
    
    //Método para calcular el IMC
    calculoIMC(){
        this.altura = this.altura / 100;
        this.imc = this.peso / (this.altura * this.altura);
        this.imc = this.imc.toFixed(2);
        
        //Se agrega un li en la ul con cáda cálculo incluyendo el resultado del mismo
        $("#listaRegistros").prepend(`<li>${listaUsuarios[posicionUsuario].nombre} tu índice de masa corporal es ${listaUsuarios[posicionUsuario].imc}</li>`);

        //Se muestra en pantalla el resultado
        $("#imprimir").html(`<h2>${listaUsuarios[posicionUsuario].nombre}</h2> 
        <h5>Resultado:</h5>  <h2>IMC: ${listaUsuarios[posicionUsuario].imc}</h2>`);
       
        //Se selecciona que imagen se va a mostrar según el resultado del cálculo
        if (this.imc < 18.5) {
            $("#siluetas1").fadeIn("slow");
            $("#siluetas2").hide();
            $("#siluetas3").hide();
            $("#siluetas4").hide();
            $("#siluetas5").hide();
        } else if (this.imc < 24.9) {
            $("#siluetas1").hide();
            $("#siluetas2").fadeIn("slow");
            $("#siluetas3").hide();
            $("#siluetas4").hide();
            $("#siluetas5").hide();
        } else if (this.imc < 29.9) {
            $("#siluetas1").hide();
            $("#siluetas2").hide();
            $("#siluetas3").fadeIn("slow");
            $("#siluetas4").hide();
            $("#siluetas5").hide();
        } else if (this.imc < 34.9) {
            $("#siluetas1").hide();
            $("#siluetas2").hide();
            $("#siluetas3").hide();
            $("#siluetas4").fadeIn("slow");
            $("#siluetas5").hide();
        } else {
            $("#siluetas1").hide();
            $("#siluetas2").hide();
            $("#siluetas3").hide();
            $("#siluetas4").hide();
            $("#siluetas5").fadeIn("slow");
        }
    }
}


//Al cargar el programa se oculta el contenedor hasta que se inicie sesión y tmb se oculta el botón de cerrar sesión
$("#contenedorPrograma").hide();
$("#botonCerrarSesion").hide();


//Creo un array de objetos los cuales asigno con el constructor correspondiente. Este array va a contener la lista de usuario con el resultado del último cálculo de cada uno
const listaUsuarios = [];
console.log(listaUsuarios);
listaUsuarios.push(new User("eduar", "password", "nombre", "apellido", 0, 0, 0));
listaUsuarios.push(new User("js", "script", "nombre", "apellido", 0, 0, 0));
listaUsuarios.push(new User("coderhouse", "1234", "nombre", "apellido", 0, 0, 0));
listaUsuarios.push(new User("juan", "fullstack", "nombre", "apellido", 0, 0, 0));



//Creo una variable global para tener registro de si el usuario ya inició sesión o no
let validado = false;

//Creo una variable global que voy a usar para guardar la posición del usuario que se loguee.
let posicionUsuario;


//Creo una funcion encargada del login. Compara el usuario y contraseña ingresado por el usuario con los diferentes usuarios y contraseñas del array en busqueda de uno que coincida. Si lo encuentra lo valida y sino informa usuario o contraseña incorrectos.
function login(usuarioIngresado,contrasenaIngresada){

    posicionUsuario = 0;

    for (elemento of listaUsuarios) {
        //Se imprime (solo con fines pedagógicos) los nombres de usuario y contraseña a medida que se van comparando. En un caso real dejaría en descubierto información sensible. En este caso me pareció bueno dejarlo en el proyecto final como demostración de mi proceso de aprendizaje. A través de los console.log puedo ir viendo que pasa en cada momento de mi programación.
        console.log(elemento.usuario);
        console.log(usuarioIngresado);
        console.log(elemento.password);
        console.log(contrasenaIngresada);
        if ((elemento.usuario == usuarioIngresado) && (elemento.password == contrasenaIngresada)){
            validado = true;
            break;
        } else { 
            validado = false;
        }
        posicionUsuario++;
    }

    if (validado) {
        
        //Cuando se valida usuario y contraseña se muestra la sección con el programa, se oculta la sección login y se ajustan los botones que aparecen en pantalla
        $("#contenedorPrograma").slideDown("slow");
        $("#inputsLogin").slideUp("slow");

        $("#botonValidarUsuario").hide();
        $("#botonCerrarSesion").show();
        $("#botonRegistrarUsuario").hide();
        

        //Modifico el elemento con ID parrafo para que quede registrado que se accedió correctamente
        $("#parrafo").slideDown("slow")
                     .html("Usuario y contraseña correctos...")
                     .delay(2000)
                     .slideUp("slow");
        
        //Muestro la posición del usuario dentro del array solo con fines educativos
        console.log(posicionUsuario);
        return true;
    } else {
        alert ("Usuario o contraseña incorrectos!");
        return false;
    }
}


//Captura el contenido de los inputs user y pass al hacer clic en el boton login y ejecuto la función login pasándole los datos ingresados en el input como parámetro
$("#botonValidarUsuario").on("click", function () {
    
    //Informo por consola que se inicia el proceso de login
    console.log("Login iniciado");

    //Asigno los valores de los inputs a unas variables
    let user = $("#userIngresado").val();
    let pass = $("#passwordIngresado").val();

    //Muestro por consola el usuario y contraseña con fines educativos
    console.log(`Usuario: ${user} - Password: ${pass}`);
    
    //Ejecuto la función login con los parametros user y pass para realizar el proceso de validación de usuario y contraseña
    login(user,pass)}
);


//Capturo el contenido de los inputs user y pass para registrar un usuario nuevo en el array 
$("#botonRegistrarUsuario").on("click", function () {
    let user = $("#userIngresado").val();
    let pass = $("#passwordIngresado").val();
    listaUsuarios.push(new User(user, pass, "nombre", "apellido", 0, 0, 0));
    alert("Se agregó el usuario: " + user);
    
    //Muestro el arreglo en consola solo con fines educativos
    console.log(listaUsuarios);
});

//Capturo el contenido de los inputs para calcular el IMC de masa corporal y hacer el registro en el array en el usuario actual
$("#botonCalcularIMC").on("click", function () {
    if (validado) {
        console.log("Validando...");
       
        //Asigno los valores cargados por el usuario a su usario dentro del arreglo
        listaUsuarios[posicionUsuario].nombre = $("#nombre").val();
        listaUsuarios[posicionUsuario].apellido = $("#apellido").val();
        listaUsuarios[posicionUsuario].altura = $("#altura").val();
        listaUsuarios[posicionUsuario].peso = $("#peso").val();
        
        //Muestro el objeto por consola solo con fines educativos
        console.log(listaUsuarios[posicionUsuario]);

        //Ejecuto el método ara calcular el IMC
        listaUsuarios[posicionUsuario].calculoIMC();
        console.log(listaUsuarios[posicionUsuario].imc);
    } else {
        alert("Primero tenés que iniciar sesión!!!");
    }
});

//Capturo el clic en el boton cerrar sesión para ocultarlo y mostrar el botón de iniciar sesión
$("#botonCerrarSesion").on("click", function () {
    validado = false;
    
    $("#contenedorPrograma").slideUp("slow");
    $("#inputsLogin").slideDown("slow");

    $("#botonValidarUsuario").show();
    $("#botonCerrarSesion").hide();
    $("#botonRegistrarUsuario").show();


});


//Escribo el valor de los inputs de tipo range para que el usuario pueda visualizarlos de forma más cómoda.
$("#altura").on("input", function () {
    $("#imprimirAltura").html($("#altura").val());
});

$("#peso").on("input", function () {
    $("#imprimirPeso").html($("#peso").val());
});




        
        
