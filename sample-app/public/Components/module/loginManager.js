var loginManager = {

    adicionarFluxoLogout: function() {
        document.getElementById('fl-signOut').onsubmit = (function (event) {
            cookies.deleteCookie(identidadeDigital.Config.AuthenticationCookie);
            LoginComponent.reload();
            loginManager.LogoutSiteAtual();
        });
    },

    LogoutSiteAtual: function() {

        if (!identidadeDigital.estrutura[identidadeDigital.site].urlsRetorno.logout) return;

        $.ajax({
            method: "GET",
            url: identidadeDigital.estrutura[identidadeDigital.site].urlsRetorno.logout,
            success: function () {
                console.log('deslogado com sucesso.');
            },
            error: function (xhr, error) {
                console.log(xhr);
                console.log(error);
            },
        });

        location.href = location.host;

    },

    login: function(event) {

        var btnClose = parent.document.getElementsByClassName('fl-authentication-btn-close');

        btnClose[0].click();

        if (event.data.result) {

            var json = event.data.content;

            var url = identidadeDigital.estrutura[identidadeDigital.site].urlsRetorno.login;

            cookies.setCookie(identidadeDigital.Config.AuthenticationCookie, json.message, json.Expires * 100, '/');
            cookies.setCookie('fl-user-name', json.Name, json.Expires * 100, '/');
            LoginComponent.criaPerfilUsuario();

            window.location.href = url + '?token=' + json.message;
        }
    },

    novoRegistro: function(event) {
        var btnClose = parent.document.getElementsByClassName('fl-authentication-btn-close');

        btnClose[0].click();

        if (event.data.result) {

            var json = event.data.content;

            var url = identidadeDigital.estrutura[identidadeDigital.site].urlsRetorno.novoRegistro;

            window.location.href = url + '?token=' + json.message;
        }

    }

};