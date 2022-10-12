import "../styles/Divider.css";

function Divider({ children }) {
  return (
    <div className="Divider">
      <div className="divider-item divider-header">{children[0]}</div>
      <main className="divider-item divider-content">{children[1]}</main>
    </div>
  );
}

export default Divider;
