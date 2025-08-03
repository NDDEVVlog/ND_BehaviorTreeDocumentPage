// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { ion } from 'starlight-ion-theme';
import rapide from 'starlight-theme-rapide';

// https://astro.build/config
export default defineConfig({
    site: 'https://NDDEVVlog.github.io',
    base: '/ND_BehaviorTreeDocumentPage',
    integrations: [
        starlight({
            title: 'ND_BehaviorTree Documents',
            description: 'The official documentation for my Behavior Tree System.',
            social: [
                { icon: 'discord', label: 'Discord', href: 'https://discord.gg/FDgPx6rJVc' },
                { icon: 'youtube', label: 'Youtube', href: 'https://youtube.com/@nddevgame?sub_confirmation=1' },
                { icon: 'facebook', label: 'Facebook', href: 'https://facebook.com/profile.php?id=100090693452227' },
                { icon: 'github', label: 'GitHub', href: 'https://github.com/NDDEVVlog/ND_BehaviorTree' }
            ],
            locales: {
                root: { label: 'English', lang: 'en' },
                vi: { label: 'Tiếng Việt', lang: 'vi' },
            },
            sidebar: [
                {
                    label: 'Update Info',
                    items: [
                        {label: 'To do list', link: '/update-info/to-do-list' },
                        {label: 'ChangeLog', link: '/update-info/change-log/', badge: { text: 'New', variant: 'success' } }],
                },
                {
                    label: 'Start Here',
                    items: [
                        { label: 'Introduction', link: '/introduction/' },
                        { label: 'Installation', link: '/getting-started/installation/', badge: { text: 'Start', variant: 'tip' } },
                        { label: 'Core Concepts', link: '/getting-started/core-concepts/' },
                    ],
                },
                {
                    label: 'Tutorials',
                    items: [
                        { label: 'Your First Behavior Tree', link: '/tutorials/first-tree/' },
                        { label: 'Basics of a Node', link: '/tutorials/node-basic/' },
                        { label: 'Creating a Custom Action Node', link: '/tutorials/custom-action-node/' },
                        { label: 'Creating a Custom Decorator', link: '/tutorials/custom-decorator-node/' },
                        { label: 'Understanding Services', link: '/tutorials/understanding-services/' },
                        { label: 'Using the Blackboard', link: '/tutorials/using-the-blackboard/' },
                    ],
                },
                {
                    label: 'Built-in Elements',
                    items: [
                        { label: 'Overview', link: '/build-in-elements/' },
                        {
                            label: 'Nodes',
                            items: [
                                {
                                    label: 'Action Nodes',
                                    items: [
                                        { label: 'Overview', link: '/build-in-elements/nodes/action-nodes/' },
                                        { label: 'Clear Blackboard Key', link: '/build-in-elements/nodes/action-nodes/clear-blackboard-key-node/' },
                                        { label: 'Debug Log', link: '/build-in-elements/nodes/action-nodes/debug-log-node/' },
                                        { label: 'Find Target', link: '/build-in-elements/nodes/action-nodes/find-target-node/' },
                                        { label: 'Invoke Unity Event', link: '/build-in-elements/nodes/action-nodes/invoke-unity-event-node/' },
                                        { label: 'Move To Patrol Point', link: '/build-in-elements/nodes/action-nodes/move-to-patrol-point-node/' },
                                        { label: 'Move To Transform', link: '/build-in-elements/nodes/action-nodes/move-to-transform-node/' },
                                        { label: 'Set Animator Trigger', link: '/build-in-elements/nodes/action-nodes/set-animator-trigger-node/' },
                                        { label: 'Set Boolean Value', link: '/build-in-elements/nodes/action-nodes/set-boolean-value-node/' },
                                        { label: 'Wait', link: '/build-in-elements/nodes/action-nodes/wait-node/' },
                                        { label: 'SetBlackboardKeyValue' , link: '/build-in-elements/nodes/action-nodes/set-black-board-key-value'}
                                    ],
                                },
                                {
                                    label: 'Composite Nodes',
                                    items: [
                                        { label: 'Overview', link: '/build-in-elements/nodes/composite-nodes/' },
                                        { label: 'Parallel', link: '/build-in-elements/nodes/composite-nodes/parallel-node/' },
                                        { label: 'Random Rate Selector', link: '/build-in-elements/nodes/composite-nodes/random-rate-selector-node/' },
                                        { label: 'Random Selector', link: '/build-in-elements/nodes/composite-nodes/random-selector-node/' },
                                        { label: 'Selector', link: '/build-in-elements/nodes/composite-nodes/selector-node/' },
                                        { label: 'Sequence', link: '/build-in-elements/nodes/composite-nodes/sequence-node/' },
                                    ]
                                },
                                {
                                    label: 'Auxiliary Nodes',
                                    items: [
                                        { label: 'Overview', link: '/build-in-elements/nodes/auxiliary-nodes/' },
                                        // --- FIX STARTS HERE ---
                                        {
                                            label: 'Decorators', // This is just the group label
                                            items: [
                                                // The overview page is now the first item in the group
                                                { label: 'Overview', link: '/build-in-elements/nodes/auxiliary-nodes/decorator/' },
                                                { label: 'Check Condition Variable', link: '/build-in-elements/nodes/auxiliary-nodes/decorator/check-condition-variable/' },
                                                { label: 'Cooldown', link: '/build-in-elements/nodes/auxiliary-nodes/decorator/cooldown-node/' },
                                                { label: 'Inverter', link: '/build-in-elements/nodes/auxiliary-nodes/decorator/inverter-node/' },
                                                { label: 'Repeater', link: '/build-in-elements/nodes/auxiliary-nodes/decorator/repeater-node/' },
                                                { label: 'Succeeder', link: '/build-in-elements/nodes/auxiliary-nodes/decorator/succeeder-node/' },
                                                { label: 'Time Limit', link: '/build-in-elements/nodes/auxiliary-nodes/decorator/time-limit-node/' },
                                                
                                            ]
                                        },
                                        {
                                            label: 'Services', // This is just the group label
                                            items: [
                                                // The overview page is now the first item in the group
                                                { label: 'Overview', link: '/build-in-elements/nodes/auxiliary-nodes/service/' },
                                                { label: 'Rotate To Target', link: '/build-in-elements/nodes/auxiliary-nodes/service/rotate-to-target-service/' },
                                            ]
                                        },
                                        
                                    ]
                                },
                                {
                                    label: 'GOAP', // This is just the group label
                                            items: [
                                                // The overview page is now the first item in the group
                                                { label: 'Overview', link: '/build-in-elements/nodes/goap/', badge: { text: 'Updating', variant: 'default' } },
                                                //{ label: 'Rotate To Target', link: '/build-in-elements/nodes/GOAP/' },
                                            ]
                                },
                            ]
                        }
                    ],
                },
                {
                    label: 'Plugins',
                    items:[
                        { label: 'Overview', link: '/plugins/overview/' },
                        {
                            label: 'SpellTech Plugin', // This is now just a group label
                            // REMOVED: link:'/plugins/spelltech/',
                            items: [
                                // ADDED: An overview link for the plugin group itself
                                { label: 'Overview', link: '/plugins/spelltech/' },
                                { label: 'Dynamic Method Hub', link: '/plugins/spelltech/dynamic-method-hub/' },
                                { label: 'Custom Helper', link:'/plugins/spelltech/custom-helper/'}
                            ],
                        },
                    ],
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' },
                },
                {
                    label: 'License & Contribution', badge: { text: 'You may care', variant: 'caution'},
                    link: '/license-contribution/',
                },
                {
                    label: 'Contact & Support',
                    link: '/contact/',
                },
                {
                    label: 'FAQ',
                    link: '/faq/',
                },
            ],
            customCss: [
                './src/styles/custom.css',
                './src/styles/spelltechBox.css',
            ],

            plugins: [
            ],
        }),
    ],
});