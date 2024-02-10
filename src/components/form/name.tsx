import { type FC } from "react";

interface NameFormProps {
  onInputChange: (name: string) => void;
}

const InputName: FC<NameFormProps> = ({ onInputChange }) => {
  return (
    <div className="space-x-1 border-[5px] border-green-700 bg-green-500 bg-opacity-40 p-3 backdrop-blur-xl dark:border-blue-900 dark:bg-blue-500 dark:bg-opacity-40">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        maxLength={50}
        onChange={(e) => onInputChange(e.target.value)}
        className="border-b-[4px] border-green-400 bg-inherit outline-none dark:border-blue-900"
      />
    </div>
  );
};

export default InputName;
