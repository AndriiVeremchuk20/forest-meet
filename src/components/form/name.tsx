import { type FC } from "react";

interface NameFormProps {
  onInputChange: (name: string) => void;
}

const InputName: FC<NameFormProps> = ({ onInputChange }) => {
  return (
    <div className="space-x-1 border-[5px] border-orange-900 p-3 backdrop-blur-xl">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        onChange={(e) => onInputChange(e.target.value)}
        className="overflow-hidden border-b-[4px] border-green-400 bg-inherit outline-none dark:border-blue-900"
      />
    </div>
  );
};

export default InputName;
