// FILE: astro.config.mjs (This is the corrected version)

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// We DO NOT need 'astro-icon' for the sidebar icons, so it has been removed.
import { ion } from 'starlight-ion-theme';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'ND_BehaviorTree Documents',
			description: 'The official documentation for my Behavior Tree System.',
			
			social: [
				{ icon: 'discord', label: 'Discord', href: 'https://discord.gg/FDgPx6rJVc' },
				{ icon: 'youtube', label: 'Youtube', href: 'youtube.com/@nddevgame?sub_confirmation=1' },
				{ icon: 'facebook', label: 'Facebook', href: 'facebook.com/profile.php?id=100090693452227' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/NDDEVVlog/ND_BehaviorTree' }
			],
			
			locales: {
				root: { label: 'English', lang: 'en' },
				vi: { label: 'Tiếng Việt', lang: 'vi' },
			},

            // --- Your sidebar is perfect, no changes needed here ---
			sidebar: [
                {
                    label: '[mdi:update] Update Info',
                    items:[
                        {
                            label:'[fe:loop] ChangeLog',
                            link: '/update-info/change-log/',
                            badge: { text: 'New', variant: 'success' }
                        },
                    ],
                },
                {
                    label : '[ri:flag-line] Start Here',
                    items: [
                        { label: 'Introduction', link: '/introduction/' },
                        { 
                            label: 'Installation', 
                            link: '/getting-started/installation/',
                            badge: { text: 'Start', variant: 'tip' }
                        },
                        { label: ' Core Concepts', link: '/getting-started/core-concepts/' },
                    ],
                },
                {
                    label: '[ri:lightbulb-flash-line] Tutorials',
                    items: [
                        { label: 'Your First Behavior Tree', link: '/tutorials/first-tree/' },
                        { label: 'Using the Blackboard', link: '/tutorials/using-the-blackboard/' },
                        { label: 'Creating a Custom Action Node', link: '/tutorials/custom-action-node/' },
                        { label: 'Creating a Custom Decorator', link: '/tutorials/custom-decorator-node/' },
                        { label: 'Understanding Services', link: '/tutorials/understanding-services/' },
                    ]
                },
                {
                    label: '[lucide:blocks] Built-in Elements',
                    items: [
                        { label: 'Debug Nodes', link: '/build-in-elements/nodes/debug-nodes' },
                        { label: 'Composite Nodes', link: '/build-in-elements/nodes/composite-nodes' }, 
                        { label: 'Auxiliary Nodes', link: '/build-in-elements/nodes/auxiliary-nodes' },
                        { label: 'Action Nodes', link: '/build-in-elements/nodes/action-nodes' },
                    ],
                },
                {
                    label: '[ph:code-bold] Reference', // I used your new icon here!
                    autogenerate: { directory: 'reference' },
                },
				{
                    label: '[ri:mail-line] Contact & Support',
                    link: '/contact/',
                },
            ],

           customCss: ['/src/styles/custom.css'],
            
            // This is the only thing needed to enable the icons.
			plugins: [
                ion()
            ],
		}),
	],
});