import TextDisplay from '../components/TextDisplay'

function FeedBack({feedback}) {


  return (
    <div>
        <TextDisplay value={feedback} className="feedbackHeader" />
    </div>
  )
}

export default FeedBack