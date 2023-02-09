import {Logo} from '../components'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className='container page'>
        {/* info col */}
        <div className='info' >
          <h1>Job <span>tracking</span> app</h1>
          <p>I'm baby hell of dreamcatcher meh irony pabst hashtag. Hell of vibecession VHS la croix. Fixie enamel pin tonx venmo bitters celiac vegan taiyaki master cleanse vaporware.</p>
          <button className='btn btn-hero'>Login / register</button>
        </div>
        {/* next col */}
        <img src={main} alt='' className='img main-img'/>
      </div>
    </Wrapper>
  )
}


export default Landing