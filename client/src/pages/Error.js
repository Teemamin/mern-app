import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  const error = useRouteError()
  // console.log(error)
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='not found' />
        <h3>{error.statusText}</h3>
        <p>{error.data}</p>
        <Link to='/'>back home</Link>
      </div>
    </Wrapper>
  );
}

export default Error