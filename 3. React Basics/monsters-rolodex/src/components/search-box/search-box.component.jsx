import './search-box.styles.css';

const SearchBox = ({ onChangeHandler, placeholder, className }) =>  {
    // const { onChangeHandler, placeholder, className } = this.props;

    return (
        <input
            className={`search-box ${className}`}
            type='search'
            onChange={onChangeHandler}
            placeholder={placeholder}
        />
    );
}

export default SearchBox;
