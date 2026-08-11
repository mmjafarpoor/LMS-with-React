const MobileMenuOpen = ({width = "40" , height = "40" , color = "white" , secondaryColor = "#272727" , border = "#B5B5B5" , className }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z" fill={color}/>
            <path d="M20 0.5C30.7696 0.5 39.5 9.23045 39.5 20C39.5 30.7696 30.7696 39.5 20 39.5C9.23045 39.5 0.5 30.7696 0.5 20C0.5 9.23045 9.23045 0.5 20 0.5Z" stroke={border}/>
            <path d="M12 13H24" stroke={secondaryColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 20H28" stroke={secondaryColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 27H20" stroke={secondaryColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    );
}
export default MobileMenuOpen;