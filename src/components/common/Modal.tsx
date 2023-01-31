import ReactModal, { Props } from "react-modal";

import Tile from "../Tile";

export default function Modal({ children, ...rest }: Props) {
  return (
    <ReactModal
      style={{
        content: {
          background: "rgba(255,255,255,0)",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
      {...rest}
    >
      <div className="w-1/2">
        <Tile>{children}</Tile>
      </div>
    </ReactModal>
  );
}
