import './Loader.css';

function Loader({ size, position }: { size: 0 | 1; position: "center" | "right" }) {
  const border = size === 0 ? 4 : 10;
  const sizing = size === 0 ? 20 : 120;
  const loaderPosition = position === "right" ? "flex-end" : position;

  return (
    <div className="loader-container" style={{ justifyContent: loaderPosition }}>
      <div
        className="loader"
        style={{
          border: `${border}px solid #f3f3f3`,
          borderTop: `${border}px solid #e46e33`,
          width: `${sizing}px`,
          height: `${sizing}px`,
        }}
      />
    </div>
  );
}

export default Loader;
