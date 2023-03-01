import { useAppContext } from '../context/appContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';

const PageButtonContainer = () => {
    const { numOfPages, page,changePage } = useAppContext();

    const pages = Array.from({length: numOfPages},(_,index)=>{//the callback func gets the element passed automatically but 
        //since we are not using it, _ will do. index + 1 bcos array is 0 index, + 1 will make it start from 1
        return index + 1
    })
    // console.log(pages)
  
    const prevPage = () => {
      let newPage = page - 1
      if(newPage < 1){//if we come to the first page
        // newPage = 1
        // alternative
        newPage = numOfPages
      }
      changePage(newPage)
    };
    const nextPage = () => {
        let newPage = page + 1
        if(newPage > numOfPages){//if we come to the last page
            // newPage = numOfPages
           // alternative
          newPage = 1
        }
        changePage(newPage)
    };
  
    return (
      <Wrapper>
        <button className='prev-btn' onClick={prevPage}>
          <HiChevronDoubleLeft />
          prev
        </button>
  
        <div className='btn-container'>
        {pages.map((pageNumber) => {
            return (
                <button
                type='button'
                className={pageNumber === page ? 'pageBtn active' : 'pageBtn'} //chks if pageNumber in iteration is thesame as the page in app conxt
                key={pageNumber}
                onClick={() => changePage(pageNumber)}
                >
                {pageNumber}
                </button>
            );
            })}
        </div>
  
        <button className='next-btn' onClick={nextPage}>
          next
          <HiChevronDoubleRight />
        </button>
      </Wrapper>
    );
  };
  
  export default PageButtonContainer;


//numOfPages is determined in the backend, taking into acc the number of documents(jobs) to be sent back / the limit we set per page
// using the value of numOfPages, we create an array, which will have elements of whatever the numOfPages is, eg if numOfPages is
// 10, the array will contain [1,2,3,4,5,6,7,8,9,10] then we used that to determine how many buttons to be created, onclick of each
//button, we pass the number on that button to the appContext to update the page variable in the state. if page = 1 in appState,
//onclick of a button with 3 will change the page = 3 in appState.