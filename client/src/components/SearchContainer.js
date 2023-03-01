import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo } from 'react';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const {
    isLoading,
    search,
    handleChange,
    searchStatus,
    statusOptions,
    jobTypeOptions,
    searchType,
    clearFilters,
    sort,
    sortOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  const debounce = ()=>{// alterantive of writn debounce your self is using the lodash libry https://lodash.com/docs/#debounce
    let debounceTimer 
    return (e)=>{
      setLocalSearch(e.target.value)
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(()=>{
        handleChange({ name: e.target.name, value: e.target.value });
      },1000)
    }
  }

  const optimizedDebounce = useMemo(()=>debounce(),[])
  //useMemo is a React Hook that lets you cache the result of a calculation between re-renders.
  //the first time the app renders debounce() gets called, just that once and subsequent  rerenders it wont be called
  //which means when setLocalSearch causes a rerender to update the sate, we will still have our cached func with it calculations
  //subsequent rerenders wont cause the function to be redecleared along with its values/result

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('')
    clearFilters();
  };
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        {/* search position */}
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          ></FormRow>
          {/* search by status */}
          <FormRowSelect
            labelText='job status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          ></FormRowSelect>
          {/* search by type */}

          <FormRowSelect
            labelText='job type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          ></FormRowSelect>
          {/* sort */}

          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          ></FormRowSelect>
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer