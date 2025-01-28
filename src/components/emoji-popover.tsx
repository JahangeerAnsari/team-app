import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

import { useState } from "react";
interface EmojiPopoverProps {
  children: React.ReactNode;
  hint?: string;
  onEmojiSelect: (emoji: any) => void;
}
export const EmojiPopover = ({
  children,
  onEmojiSelect,
  hint = "Emoji",
}: EmojiPopoverProps) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  // lets selet emoji and hide the emoji board
  const select = (emoji: any) => {
     onEmojiSelect(emoji);
    setPopoverOpen(false);
    // tooltip already need to close
    setTimeout(() => {
      setTooltipOpen(false) 
    },500)
  }
  return (
    <TooltipProvider>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <Tooltip
          open={tooltipOpen}
          onOpenChange={setTooltipOpen}
          delayDuration={50}
        >
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent className="bg-black text-white border border-white/50">
            <p className="font-medium text-sx ">{hint}</p>
          </TooltipContent>
        </Tooltip>
        <PopoverContent className="p-0 w-full border-none shadow-none">
          <Picker data={data} onEmojiSelect={select} />
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
};
