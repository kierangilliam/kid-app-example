<script lang='ts'>
    import { COLORS } from '$lib/constants'
    import { setCSSVar } from '$lib/utils'    
    import { Theme } from '@ollopa/cedar'
    import { onMount } from 'svelte'

    let themeRoot: HTMLElement

    onMount(() => Object.entries(COLORS).forEach(setCSSVar(themeRoot)))
</script>

<Theme>
    <div class='theme' bind:this={themeRoot}>
        <slot />
    </div>
</Theme>

<style>
    .theme {
        width: 100vw;
        height: 100vh;
        font-family: var(--bodyFont);   
        background: var(--backgroundColor);
        overflow: scroll;
    }

    :global(.theme) {
        /* Element Spacing */
        --stickyHeaderHeight: 44px;
        
        /* Borders */
        --borderRadius: 16px;
        --borderRadiusSmall: 12px;
        --borderRadiusFull: 999px;
        --buttonBorderRadius: var(--borderRadiusFull);
        --line: 1.5px solid var(--lineColor);
        --lineThin: 1px solid var(--lightLineColor);
        --lineMedium: 2px solid var(--lightLineColor);
        --lineThick: 3px solid var(--lightLineColor);
        --lineThicker: 4.5px solid var(--lightLineColor);
        --hairline: 1px solid var(--hairLineColor);

        /* Typography */
        --headingFont: 'Open Sans', serif;
        --bodyFont: 'Open Sans', sans-serif;
        --weightMedium: 500;
        --weightBold: 600;
        --weightBolder: 700;

        /* Shadows */
        --shadow-1: -4px -4px 8px rgba(12, 12, 12, 0.4);
        --shadow-3: -4px -4px 12px rgba(12, 12, 12, 0.7);
     
        /* Minor Third */        
        --h1: 1.802rem;
        --h2: 1.602rem;
        --h3: 1.424rem;
        --h4: 1.266rem;
        --h5: 1.125rem;
        --textSmall: 0.889rem;
        --textSmaller: 0.7rem;
    }    

    :global(h1), :global(h2), :global(h3), :global(h4), :global(h5), :global(h6) {
        font-weight: var(--weightBolder);
    }

    @supports(padding: max(0px)) {
        :global(:root) {
            --viewPaddingTop: max(env(safe-area-inset-top), var(--s-8));
            --viewPaddingBottom: max(env(safe-area-inset-bottom), var(--s-8));            
            --viewPaddingLeft: max(env(safe-area-inset-left), var(--s-4));
            --viewPaddingRight: max(env(safe-area-inset-right), var(--s-4));
        }
    }

    /* Needed for routes where there is a send and recieve - prevents page jumping.  */
    :global(route-main) {
        position: fixed;
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: scroll;
        padding-top: var(--viewPaddingTop);
        padding-bottom: var(--viewPaddingBottom);
        padding-left: var(--viewPaddingLeft);
        padding-right: var(--viewPaddingRight);
    }

    :global(img) {
        -webkit-touch-callout: none;
        pointer-events: none;
    }

    /* Disable text selection */
    :global(*) {
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    /**
    * ...but keep it for inputs
    * Via Mozilla:
    *   The user-select CSS property controls whether the user can select text. 
    *   This doesn't have any effect on content loaded as chrome, except in textboxes.
    */
    :global(input, textarea) {
        -webkit-user-select: auto !important;
        -khtml-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
    }
</style>
