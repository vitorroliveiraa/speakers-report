import { Button } from "@/components/ui/button";
import { Input, InputProps } from "@/components/ui/input";
import { Search } from "lucide-react";
import { forwardRef } from "react";

type InputButtonProps = InputProps & {
  onClickButton: () => void;
};

export const InputButton = forwardRef<HTMLInputElement, InputButtonProps>(
  ({ onClickButton, ...props }, ref) => {
    return (
      <>
        <div className="flex">
          <Input className="rounded-r-none" {...props} ref={ref} />
          <Button
            type="button"
            variant="secondary"
            className="rounded-l-none border border-l-0"
            onClick={() => onClickButton()}
          >
            <Search />
          </Button>
        </div>
      </>
    );
  }
);
