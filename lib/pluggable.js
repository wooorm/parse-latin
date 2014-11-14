'use strict';

function run(plugins, value) {
    var index;

    index = -1;

    while (plugins[++index]) {
        plugins[index](value);
    }
}

function pluggable(callback) {
    var plugins;

    plugins = [];

    function wrapper() {
        var result;

        result = callback.apply(this, arguments);

        run(plugins, result);

        return result;
    }

    function use(plugin) {
        plugins.push(plugin);

        return this;
    }

    wrapper.use = use;

    wrapper.plugins = plugins;

    return wrapper;
}

module.exports = pluggable;
