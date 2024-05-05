interface Props {
    logo: JSX.Element
}

const FloatingItem = ({ logo }: Props) => {
    return (
        <div className="relative top-[-100px] w-10 lg:w-14 p-1 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm text-violet-800 hover:-translate-y-2 duration-700">
            {logo}
        </div>
    );
}

export default FloatingItem;