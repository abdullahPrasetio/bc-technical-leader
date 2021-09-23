module.exports = {
    future: {
        defaultLineHeights: true,
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    experimental: {
        additionalBreakpoint: true,
        extendedFontSizeScale: true,
        extendedSpacingScale: true,
    },
    purge: {
        layers: ['utilities'],
        content: ['./*.html'],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            container: {
                //setting container center + padding
                center: true,
                padding: '1rem',
            },
            colors: {
                primary: '#09BC8A',
            },
            animation: {
                'dropdown-transition':
                    'dropdownTransition 0.4s cubic-bezier(0.73, 0.005, 0.22, 1)',
                accordion: 'accordion 2s',
            },
            keyframes: {
                dropdownTransition: {
                    from: {
                        opacity: '0',
                        transform: 'scale(0.98) translateY(-0.6em)',
                    },
                    to: {
                        opacity: '1',
                        transform: 'scale(1) translateY(0)',
                    },
                },
                accordion: {
                    from: {
                        maxHeight: '0',
                        animationTimingFunction: 'linear',
                    },
                    to: {
                        maxHeight: '600px',
                        animationTimingFunction: 'linear',
                    },
                },
            },
        },
    },
    variants: {
        display: ['responsive', 'group-hover'],
        rotate: ['responsive', 'hover', 'focus', 'group-hover'],
    },
    plugins: [],
}
