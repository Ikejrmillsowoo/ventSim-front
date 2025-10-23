import Button from '../../components/Button'
import FeedBack from '../FeedBack'

function Footer({status, feedback}) {
  return (
    <div>
        <FeedBack status={status} feedback={feedback}/>
    </div>
  )
}

export default Footer