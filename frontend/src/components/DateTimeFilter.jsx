import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { options } from "@/lib/data";

const DateTimeFilter = ({dateQuery, setDateQuery}) => {
  const [open, setOpen] = React.useState(false);
  

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-white text-slate-900 border-slate-300 hover:bg-white hover:text-slate-900 aria-expanded:text-slate-900"
        >
          {
            dateQuery
            ?options.find((option) => option.value === dateQuery)?.label
            :options[0].label
          }
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-white text-black border-slate-300">
        <Command className="bg-white text-slate-900">
          <CommandList>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  className="text-slate-900 data-selected:text-slate-900 data-selected:bg-white"
                  onSelect={(currentValue) => {
                    setDateQuery(currentValue)
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      dateQuery === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default DateTimeFilter