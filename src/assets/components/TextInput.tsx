import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";

interface Props {
    id: string
    logo: JSX.Element
    label: string
    value: string | undefined
    setValue: React.Dispatch<React.SetStateAction<string>>
    fieldsetClass?: string
}

const TextInput = ({ logo, id, label, value, setValue, fieldsetClass }: Props) => {
    return (
        <fieldset className={`p-inputgroup mb-8 ${fieldsetClass}`}>
            <span className="p-inputgroup-addon bg-violet-800/30">
                {logo}
            </span>

            <FloatLabel>
                <label htmlFor={id}>{label}</label>
                <InputText
                    className="flex items-center px-2 border-2 border-l-0 border-violet-800/30 focus:outline-none"
                    id={id}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </FloatLabel>
        </fieldset>
    );
}

export default TextInput;