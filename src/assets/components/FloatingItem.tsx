interface Props {
    logo: JSX.Element
}

const FloatingItem = ({ logo }: Props) => {
    return (
        <div className="floating absolute w-10 md:w-14 p-1 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm text-violet-800">
            {logo}
        </div>
    );
}

export default FloatingItem;