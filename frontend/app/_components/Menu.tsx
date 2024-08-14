type MenuT = {
  Button: React.ReactNode;
  list: React.ReactNode[];
  position?:
    | "down"
    | "downEnd"
    | "top"
    | "topEnd"
    | "left"
    | "leftEnd"
    | "right"
    | "rightEnd";
};

const positionObj = {
  down: "dropdown",
  downEnd: "dropdown dropdown-end",
  top: "dropdown dropdown-top",
  topEnd: "dropdown dropdown-top dropdown-end",
  left: "dropdown dropdown-left",
  leftEnd: "dropdown dropdown-left dropdown-end",
  right: "dropdown dropdown-right",
  rightEnd: "dropdown dropdown-right dropdown-end",
};

function Menu({ Button, list, position = "down" }: MenuT) {
  const menuClass = positionObj[position];
  return (
    <div className={`${menuClass} w-full`}>
      {Button}
      <ul tabIndex={0}>
        {list.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;
