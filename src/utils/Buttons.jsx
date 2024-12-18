const Buttons = ({ children, disabled, type, className, onClickHandler }) => {
  return (
    <button disabled={disabled} className={`${className}`} onClick={onClickHandler} type={type} >
      {children}
    </button>
  )
}

export default Buttons