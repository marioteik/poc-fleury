var component = {
    create: function (path) {
        identidadeDigital.loadComponent(path + '/view/login/login.component', 'fl-login');
    }
};

var file = {
    load: function(url, type, callback) {
        var head = document.getElementsByTagName('head')[0];
        var element = document.createElement(type);

        switch (type) {
            case 'script':
                {
                    element.type = 'text/javascript';
                    element.src = (url.indexOf(identidadeDigital.uri) != -1) ? url : (identidadeDigital.path + url);
                    break;
                }
            case 'link':
                {
                    element.rel = 'stylesheet';
                    element.href = (url.indexOf(identidadeDigital.uri) != -1) ? url : (identidadeDigital.path + url);
                    break;
                }
        }

        element.onreadystatechange = callback;
        element.onload = callback;

        head.appendChild(element);
    },
};

var identidadeDigital = {
    uri: 'https://ancient-reef-12507.herokuapp.com/',
    path: 'https://ancient-reef-12507.herokuapp.com/Components',
    Config: {},
    site: '',
    marca: '',
    estrutura: {},
    metodoAleatorio: {},

    loadComponent: function(path, element) {
        console.log('loadComponent', path, element);
        $.ajax({
            type: "GET",
            dataType: 'html',
            crossDomain: true,
            url: path + '.html',
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            },
            success: function (data) {
                document.getElementById(element).innerHTML = data;
                file.load(path + '.css', 'link', function () {});
                file.load(path + '.js', 'script', function () {});
            }
        });
    },

    getConfig: function() {
        $.ajax({
            type: "GET",
            dataType: "json",
            crossDomain: true,
            url: this.path + "/Config/Config.json",
            success: function (data) {
                identidadeDigital.Config = data;
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    },

    getEstrutura: function() {
        $.ajax({
            type: "GET",
            dataType: "json",
            crossDomain: true,
            url: this.path + "/Config/Estruturas.json",
            success: function (data) {
                identidadeDigital.estrutura = data;
            },
            error: function (xhr, status, error) {
                console.log(xhr);
                console.log(status);
                console.log(error);
            }
        });
    },

    onInit: function() {

        var dvauthentication = document.createElement('div');
        dvauthentication.id = 'fl-authentication';

        document.getElementsByTagName('body')[0].appendChild(dvauthentication);
        file.load('/module/ajax.js', 'script', function () {

            // Carrega os arquivos de configuracao
            identidadeDigital.getConfig();

            // Define as particularidades do site que esta utilizando o component
            identidadeDigital.getEstrutura();

            // Cria o component efetivamente na tela
            file.load('/module/cookies.js', 'script', function () {
                // Gerenciador dos métodos de login / logout 
                file.load('/module/loginManager.js', 'script', function () {
                    component.create(identidadeDigital.path);
                });
            });
        });
    },

};

identidadeDigital.onInit();