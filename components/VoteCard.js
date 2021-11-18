import Image from "next/image";
const VoteCard = (props) => {
  return (
    <div className={"border-solid border-2 border-white rounded-xl p-8"}>
      <h1 style={{ fontSize: "32px" }} className={"p-8"}>
        {props.name}
      </h1>
      <div className="grid grid-cols-1 p-4 place-items-center">
        <div className="relative h-128">
          <Image
            src={props.logo}
            className={"vote-image"}
            alt="Logo"
            height="100%"
            width="100%"
          />
        </div>
      </div>
      <i
        style={{
          fontSize: "64px",
          width: "50%",
          color: "DarkSeaGreen",
        }}
        className={"m-4 bi bi-chevron-double-up"}
      ></i>
      <i
        style={{ fontSize: "64px", width: "50%", color: "FireBrick" }}
        className={"m-4 bi bi-chevron-double-down"}
      ></i>
      <p className="p-4">$75 / day</p>
    </div>
  );
};

export default VoteCard;
