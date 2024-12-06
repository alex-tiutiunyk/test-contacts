import PropTypes from "prop-types";

const AddTag = ({inputValue, setInputValue, handleAddTag}) => {
  return (
    <div className="pt-7">
      <input
        type="text"
        id="last-name"
        name="lastName"
        value={inputValue}
        placeholder="Add new Tag"
        onChange={(e) => setInputValue(e.target.value)}
        className={`w-full text-base h-12 p-2 pb-2.5 rounded-lg leading-7 border-solid border transition focus:outline-0  focus:shadow-md border-gray-300  focus:border-sky-500 focus:shadow-sky-200`}
      />
      <button
        type="button"
        onClick={handleAddTag}
        className="mt-3 text-base font-bold h-11 border-solid border border-gray-300 w-full rounded-md transition hover:bg-sky-500 hover:border-sky-500 hover:text-white hover:shadow-sky-200 hover:shadow-md"
      >Add Tag</button>
    </div>
  )
}

AddTag.propTypes = {
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func,
  handleAddTag: PropTypes.func,
};


export default AddTag
