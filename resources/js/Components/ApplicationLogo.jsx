export default function ApplicationLogo({ src, alt = "Logo", ...props }) {
    return (
        <img
            src={src}
            alt={alt}
            {...props}
        />
    );
}