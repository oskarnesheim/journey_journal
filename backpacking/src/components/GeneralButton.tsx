import { Ijourney } from "../interfaces/Interfaces";

type buttonInput = {
  journey?: Ijourney;
  description: string | JSX.Element;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
};

function GeneralButton({ onClick, description, type }: buttonInput) {
  return (
    <button
      className="bg-theme-green hover:text-pink-500 font-bold py-2 px-4 rounded m-5 dark:text-theme-dark"
      onClick={onClick}
      type={type}
    >
      {description}
    </button>
  );
}

export default GeneralButton;
