function RemoveBtn(props) {
  return (
    <div>
      <button
        className={props.index}
        onClick={(event) => {
          props.func(
            props.array.filter((a, i) => i !== event.target.className)
          );
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default RemoveBtn;

function remove(array, i) {
  array.filter();
}

<RemoveBtn index={i} func={setTask} array={listOfTasks} />;
setTask(listOfTasks.filter((a, i) => i !== event.target.className));
