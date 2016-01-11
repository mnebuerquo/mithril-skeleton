require('./index.html?output=index.html');
/*===== yeoman style require hook =====*/
function lazyLoad() {
    var onload = window.onload || function () {
    };
    window.onload = function () {
        var currentRoute = m.route();
        Object.keys(routes).forEach(function (key) {
            var route = routes[key];
            if (key !== currentRoute)
                route.controller();
        });
        onload();
    };
}
var routes = {
    '/': {
        controller: function () {
            require.ensure([], () => {
                routes['/'] = require('./modules/main');
                m.route(m.route());
                lazyLoad();
            });
        }
    },
    '/login': {
        controller: function () {
            require.ensure([], () => {
                routes['/login'] = require('./modules/login');
                m.route(m.route());
                lazyLoad();
            });
        }
    },
    '/profile': {
        controller: function () {
            require.ensure([], () => {
                routes['/profile'] = require('./modules/profile');
                m.route(m.route());
                lazyLoad();
            });
        }
    },
    '/logout': {
        controller: function () {
            require.ensure([], () => {
                routes['/logout'] = require('./modules/logout');
                m.route(m.route());
                lazyLoad();
            });
        }
    }
};
m.route(document.getElementById('body-container'), '/', routes);
