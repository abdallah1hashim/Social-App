import Button from "@/app/_components/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

function ClearButton({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      type="button"
      variant="secondary"
      size="small-rounded"
      className="text-base-content absolute top-5 right-1"
    >
      X
    </Button>
  );
}

export default ClearButton;
