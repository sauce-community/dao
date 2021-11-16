import Header from "../components/Header";
import Link from "next/link";
function Propose() {
  return (
    <div>
      <Header />
      <div className={"grid grid-cols-8 gap-4"}>
        <div className="flex flex-col h-screen bg-black fixed items-center p-2 space-y-12">
          <div className={"flex-grow"}></div>
          <Link href="/vote">
            <i style={{ fontSize: "32px" }} className={"bi bi-bank m-2"}></i>
          </Link>
          <Link href="/">
            <i style={{ fontSize: "32px" }} className={"bi bi-house m-2"}></i>
          </Link>
          <Link href="/propose">
            <i
              style={{ fontSize: "32px" }}
              className={"bi bi-pencil-square m-2"}
            ></i>
          </Link>
          <div className={"flex-grow"}></div>
        </div>
        <div className={"col-start-2 col-end-9"}>
          <p>Content</p>
        </div>
      </div>
    </div>
  );
}
export default Propose;
