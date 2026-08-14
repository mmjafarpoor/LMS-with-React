export const themeAnimation = async ({ themeButtonRef , toggleDarkMode }) => {
    const button = themeButtonRef.current;

    if (!button) {
        toggleDarkMode();
        return;
    }

    const rect = button.getBoundingClientRect();

    const themeSwitchX = rect.left + rect.width / 2;
    const themeSwitchY = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
        Math.max(themeSwitchX, window.innerWidth - themeSwitchX),
        Math.max(themeSwitchY, window.innerHeight - themeSwitchY)
    );

    if (!document.startViewTransition) {
        toggleDarkMode();
        return;
    }

    const transition = document.startViewTransition(() => {
        toggleDarkMode();
    });

    await transition.ready;

    document.documentElement.animate(
        {
            clipPath: [
                `circle(0px at ${themeSwitchX}px ${themeSwitchY}px)`,
                `circle(${endRadius}px at ${themeSwitchX}px ${themeSwitchY}px)`,
            ],
        },
        {
            duration: 700,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
        }
    );
};