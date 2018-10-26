var authenticationComponent = {

    onInit: function() {
        var frame = document.getElementById('fl-authentication-frame');
        var marca = "";
        if (identidadeDigital.marca === "fleury") {
            marca = "1";
        } else {
            marca = "2";
        }
        var queryString = '&marca=' + marca + '&site=' + identidadeDigital.site;

        frame.style.display = 'block';
        frame.src = identidadeDigital.Config.LoginUrl + queryString;

        document.getElementById('fl-authentication').style.display = 'block';

        document.getElementById('fl-authentication-btn-close').onclick = function() {
            document.getElementById('fl-authentication-frame').src = 'about:blank';
            document.getElementById('fl-authentication').style.display = 'none';
        };

        window.addEventListener('message', function (event) {
            switch (event.data.type) {
                case "login":
                    loginManager.login(event);
                    break;
                case "novoRegistro":
                    loginManager.novoRegistro(event);
                    break;
            }
        }, false);
    }
};

authenticationComponent.onInit();
