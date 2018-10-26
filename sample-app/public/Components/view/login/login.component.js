var LoginComponent = {


    criaPerfilUsuario: function() {

        var usuario = cookies.getCookie('fl-user-name');

        $('#fl-user-name').text(decodeURI(usuario));

    },

    listarPacientes: function(pacientes) {
        if (!pacientes.length || pacientes.length <= 0) {
            return;
        }

        var linha = document.createElement('a');

        pacientes.array.forEach(function (paciente) {
            linha.href = 'javascript:LoginComponent.trocarPaciente(' + paciente.id + ');';
            linha.innerText = paciente.nome;
            document.getElementById('fl-logged-user').appendChild(linha);
        });
    },

    callauthentication: function() {
        identidadeDigital.loadComponent(identidadeDigital.path + '/view/authentication/authentication.component', 'fl-authentication');
    },

    carregaCssSite: function() {
        var dvLogin = document.getElementById('fl-login');

        var params = dvLogin.attributes['data-target'].value.split('/');

        // Caso os parametros não forem informados não tenta carregar o css
        if (!params.length) return;

        identidadeDigital.marca = params[0];
        identidadeDigital.site = params[1];


        var css = identidadeDigital.uri + identidadeDigital.marca + '/components/' + identidadeDigital.site + '.css';
        file.load(css, 'link', function () {});
    },

    defineEstrutura: function(data) {
        if (!data || !data[identidadeDigital.site]) return;

        data[identidadeDigital.site].links.forEach(function (item) {
            LoginComponent.addLinkMenu(item);
        });
    },

    addLinkMenu: function(item) {

        var a = document.createElement('a');

        a.href = item.url;
        a.innerText = item.descricao;

        document.getElementById('fl-logged-user-dropdown-custom').appendChild(a);
    },

    defineSite: function() {
        this.carregaCssSite();
        this.defineEstrutura(identidadeDigital.estrutura);
    },

    reload: function() {

        if (!cookies.getValidationCookie()) {
            document.getElementsByClassName('fl-unlogged-user')[0].style.display = 'block';
            document.getElementsByClassName('fl-logged-user')[0].style.display = 'none';
        } else {
            document.getElementsByClassName('fl-logged-user')[0].style.display = 'block';
            document.getElementsByClassName('fl-unlogged-user')[0].style.display = 'none';
        }
    },

    onInit: function() {

        var escondeLogin = (location.href.indexOf('Confirmacao/Index') != -1 ||
            location.href.indexOf('Confirmacao/Sucesso') != -1);

        var cookieValidation = cookies.getValidationCookie();

        if (escondeLogin && !cookieValidation) {
            document.getElementById('fl-profile').style.display = 'none';   
            return;
        }

        if (!cookieValidation) {
            document.getElementsByClassName('fl-unlogged-user')[0].style.display = 'block';
        } else {
            document.getElementsByClassName('fl-logged-user')[0].style.display = 'block';
            this.criaPerfilUsuario();
            loginManager.adicionarFluxoLogout();
        }

        document.getElementById('fl-myAccount').href = identidadeDigital.Config.url + '/Manage/Home?marca=' + identidadeDigital.marca + '&site=' + identidadeDigital.site;

        this.defineSite();
    }
};

LoginComponent.onInit();

function usuarioLogado() {
    document.getElementById("fleurycss_usuarioLogado").classList.toggle("show");
}

//Feche a lista suspensa se o usuário clicar fora dela

window.onclick = function (event) {
    if (!event.target.matches('.fleurycss_usuario-logado')) {

        var dropdowns = document.getElementsByClassName("fleurycss_dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}