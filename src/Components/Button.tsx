const Button = ( props: any ) => {
    return(
        <button className="bg-purple-500 py-2 px-4 hover:border-none border-none hover:bg-purple-600 rounded-sm">
            { props.text }
        </button>
    )
}

export default Button;