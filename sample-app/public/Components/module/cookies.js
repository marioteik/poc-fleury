var cookies = {

    getValidationCookie: function() {
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            if(ca[i].indexOf(identidadeDigital.Config.AuthenticationCookie) != -1){
                return ca[i].split('=')[1];
            }
        }
        return undefined;
    },

    setCookie: function(name, value, expires, path, domain) {
        var cookie = name + "=" + escape(value) + ";";

        if (expires) {
            // If it's a date
            if (expires instanceof Date) {
                // If it isn't a valid date
                if (isNaN(expires.getTime()))
                    expires = new Date();
            }
            else
                expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);

            cookie += "expires=" + expires.toGMTString() + ";";
        }

        if (path)
            cookie += "path=" + path + ";";
        if (domain)
            cookie += "domain=" + domain + ";";

        document.cookie = cookie;
    },


    getCookie: function(name) {
        var ca = document.cookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            if(ca[i].indexOf(name) != -1){
                return ca[i].split('=')[1];
            }
        }
        return undefined;
    },

    deleteCookie: function(name, path, domain) {
        //If the cookie exists
        this.createCookie(name, "", -1, path, domain);
    },

    createCookie: function(name, value, days) {
        var expires;
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else {
            expires = "";
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    },

    eraseCookie: function(name) {
        this.createCookie(name, "", -1);
    },

    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}; 