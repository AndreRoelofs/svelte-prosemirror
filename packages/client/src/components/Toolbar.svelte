<script lang="ts">
    import { activeMarks, editor } from '$stores/editor';
    import Icon from '@iconify/svelte/dist/OfflineIcon.svelte';
    import bold from '@iconify-icons/mdi/format-bold.js';
    import italic from '@iconify-icons/mdi/format-italic.js';
    import { toggleMark } from 'prosemirror-commands';
    import type { IconifyIcon } from '@iconify/svelte/dist/OfflineIcon.svelte';

    type IconType = 'bold' | 'italic';

    const marksIcons: {
        title: IconType;
        icon: IconifyIcon;
    }[] = [
        {
            title: 'bold',
            icon: bold,
        },
        {
            title: 'italic',
            icon: italic,
        },
    ];

    function handleIconClick(title: IconType) {
        switch (title) {
            case 'bold':
                editor?.cmd((state, ...rest) => {
                    toggleMark(state.schema.marks.bold)(state, ...rest);
                });
                return;
            case 'italic':
                editor?.cmd((state, ...rest) => {
                    toggleMark(state.schema.marks.italic)(state, ...rest);
                });
                return;
        }
    }
</script>

<div class="bg-blue-200 p-4">
    <!-- <div>selection head: {$state?.selection?.head}</div> -->
    <ul class="flex">
        {#each marksIcons as item (item.title)}
            <li>
                <button
                    type="button"
                    class="icon-btn"
                    class:active={$activeMarks.includes(item.title)}
                    onclick={() => handleIconClick(item.title)}
                >
                    <Icon icon={item.icon} width={24} />
                </button>
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    li + li {
        @apply ml-1;
    }
    .icon-btn {
        @apply flex cursor-pointer text-black p-0.5 rounded;
        &:hover {
            @apply bg-blue-300;
        }
        &.active {
            @apply bg-blue-400;
        }
    }
</style>
