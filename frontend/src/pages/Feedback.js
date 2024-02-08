const Feedback = () => {
  return (
    <form className="feedback">
      <span>Rate:</span>
      <div>
        <input type="radio" name="rate" value={2} />
        <label for="green">Green</label>
      </div>

      <div>
        <input type="radio" name="rate" value={1} />
        <label for="yellow">Yellow</label>
      </div>

      <div>
        <input type="radio" name="rate" value={0} />
        <label for="red">Red</label>
      </div>

      <label for="open-feedback">Open feedback:</label>
      <input name="open-feedback"/>
    </form>
  );
}

export default Feedback;