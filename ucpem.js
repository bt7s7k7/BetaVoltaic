/// <reference path="./.vscode/config.d.ts" />

const { project, github } = require("ucpem")

project.prefix("src").res("shootGame",
    github("bt7s7k7/Vue3GUI").res("vue3gui"),
    github("bt7s7k7/Drawer").res("drawerInputVue3"),
    github("bt7s7k7/EntitySystem").res("entitySystem")
)

project.use(github("bt7s7k7/BundleLib").script("build-sw"))
