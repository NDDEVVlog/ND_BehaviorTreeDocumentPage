// FILE: astro.config.mjs (This is the corrected version)

// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { ion } from 'starlight-ion-theme';

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
				{ icon: 'youtube', label: 'Youtube', href: 'youtube.com/@nddevgame?sub_confirmation=1' },
				{ icon: 'facebook', label: 'Facebook', href: 'facebook.com/profile.php?id=100090693452227' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/NDDEVVlog/ND_BehaviorTree' }
			],
			
			locales: {
				root: { label: 'English', lang: 'en' },
				vi: { label: 'Tiếng Việt', lang: 'vi' },
			},

			sidebar: [
                {
                    label: '[mdi:update] Update Info',
                    items:[{ label:'[fe:loop] ChangeLog', link: '/update-info/change-log/', badge: { text: 'New', variant: 'success' }}],
                },
                {
                    label : '[ri:flag-line] Start Here',
                    items: [
                        { label: 'Introduction', link: '/introduction/' },
                        { label: 'Installation', link: '/getting-started/installation/', badge: { text: 'Start', variant: 'tip' }},
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
                    label: '[ph:code-bold] Reference',
                    autogenerate: { directory: 'reference' },
                },
				{
                    label: '[ri:mail-line] Contact & Support',
                    link: '/contact/',
                },
				{
                    label: '[ri:question-answer-line] FAQ',
                    link: '/faq/',
                },
            ],

           customCss: ['./src/styles/custom.css'],
            
			plugins: [
                ion()
            ],
		}),
	],
});