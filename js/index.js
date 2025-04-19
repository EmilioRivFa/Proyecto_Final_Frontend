const loginForm = document.getElementById("loginForm");

        loginForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Evita que se recargue la página

            const usuario = document.getElementById("User").value;
            const password = document.getElementById("Password").value;

            if (usuario === "Comite1" && password === "Daxthi12345") {
                // Redirige si las credenciales son correctas
                window.location.href = "menuPrincipal.html";
            } else {
                alert("Usuario o contraseña incorrectos.");
            }
        });

        function crearCuenta() {
            alert("Funcionalidad de crear cuenta aún no implementada.");
        }

        function recuperarContrasena() {
            alert("Funcionalidad de recuperación aún no implementada.");
        }