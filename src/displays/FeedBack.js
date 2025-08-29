import TextDisplay from '../components/TextDisplay'

function FeedBack({status, feedback}) {


  return (
    <div>
        <TextDisplay text={feedback} className="feedback-header" />
        <TextDisplay text={status} className="status-header" />
    </div>
  )
}

export default FeedBack