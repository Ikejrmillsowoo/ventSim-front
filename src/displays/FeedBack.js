import TextDisplay from '../components/TextDisplay'

function FeedBack({status, feedback}) {


  return (
    <div>
        <TextDisplay value={feedback} className="feedback-header" />
        {/* <TextDisplay value={status} className="status-header" /> */}
    </div>
  )
}

export default FeedBack