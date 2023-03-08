const Button = (props) => (
    <button
        {...props}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-30 disabled:bg-blue-700"
    >
        {props.children}
    </button>
);
export default Button;
