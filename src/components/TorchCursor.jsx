import './TorchCursor.css';

export default function TorchCursor({ torch }) {
  return (
    <div
      id="torch-cursor"
      style={{
        left: `${torch.x}px`,
        top: `${torch.y}px`,
        display: torch.visible ? 'block' : 'none',
      }}
    >
      <img src="/flash_long.svg" alt="" />
    </div>
  );
}
