const Filter = ({handleFilterChange}) => {
    return (<div>
        <div>
            Filter: <input type="text" onChange={handleFilterChange} />
        </div>
    </div>)
}

export default Filter;