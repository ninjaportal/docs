export const sidebar = [
    {
        text:"Home",
        link: "/"
    },
    {
        text: "Getting Started",
        items: [
            {
                text: "Requirements",
                link: "/getting-started#requirements"
            },
            {
                text: "Installation",
                link: "/getting-started#installation"
            },
            {
                text: "Configuration",
                link: "/configuration"
            },
        ]
    },
    {
        text: "Concepts & Architecture",
        items: [
            {
                text: "Architecture",
                link: "/core/concepts/architecture"
            },
            {
                text: 'DB Models',
                link: '/core/concepts/models'
            },
            {
                text: "Services",
                link: "/core/concepts/services",
            },
            {
                text: "Events",
                link: "/core/concepts/events",
            },
            {
                text: "Translation",
                link: "/core/concepts/translation",
            },
            {
                text: "Roles & Permissions",
                link: '/core/concepts/rbac'
            }
        ]
    },
    {
        text: "Development",
        items: [
            {
                text: "Extending Models",
                link: "/core/development/extending-models"
            },
            {
                text: "Extending Services",
                link: "/core/development/extending-services"
            }
        ]
    },
    {
        text: "Shadow (Frontend)",
        items: [
            {
                text: "Installation",
                link: "/addons/shadow/installation"
            },
            {
                text: "Configuration",
                link: "/addons/shadow/configuration"
            },
            {
                text: "Development",
                items: [
                    {
                        text: "Routes",
                        link: "/addons/shadow/development/routes"
                    },
                    {
                        text: "Views & Components",
                        link: "/addons/shadow/development/views"
                    },
                    {
                        text: "Former (Forms)",
                        link: "/addons/shadow/development/former"
                    },
                ]
            }
        ]
    },
    {
        text: "NinjaAdmin (Admin Panel)",
        items: [
            {
                text: "Installation",
                link: "/addons/ninjaadmin/installation"
            },
            {
                text: "Configuration",
                link: "/addons/ninjaadmin/configuration"
            },
            {
                text: "Development",
                link: "/addons/ninjaadmin/development"
            }
        ]
    },
    {
        text: "Deployment",
        link: "/deployment"
    }

];
