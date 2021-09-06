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

        /* Shadows */
        --whiteOutline: -8px -8px 4px 0px rgba(255, 255, 255, 1),
            8px -8px 4px 0px rgba(255, 255, 255, 1),
            -8px 8px 4px 0px rgba(255, 255, 255, 1),
            8px 8px 4px 0px rgba(255, 255, 255, 1);


        /* Typography */
        --headingFont: 'Open Sans', serif;
        --bodyFont: 'Open Sans', sans-serif;
        --weightMedium: 500;
        --weightBold: 600;
        --weightBolder: 700;
     
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

    /* :global(section) {
        background-color: var(--sectionBackgroundColor);
    } */

    /**
    * Via Mozilla:
    *   The user-select CSS property controls whether the user can select text. 
    *   This doesn't have any effect on content loaded as chrome, except in textboxes.
    */
    /* :global(input, textarea) {
        -webkit-user-select: auto !important;
        -khtml-user-select: auto !important;
        -moz-user-select: auto !important;
        -ms-user-select: auto !important;
        user-select: auto !important;
    } */
</style>
