import * as Select from "@radix-ui/react-select";
import { CaretDown, CaretUp, Check } from "phosphor-react";

interface SelectRadixProps {
  games: GameProps[];
  setSelectedGameId: React.Dispatch<React.SetStateAction<string>>;
}

interface GameProps {
  id: string;
  title: string;
}

export function SelectRadix({ games, setSelectedGameId }: SelectRadixProps) {
  return (
    <Select.Root onValueChange={setSelectedGameId}>
      <Select.Trigger
        className="bg-zinc-900 py-3 px-4 rounded text-sm inline-flex justify-between items-center"
        aria-label="Game"
      >
        <Select.Value placeholder="Selecione o game que deseja jogar" />
        <Select.Icon>
          <CaretDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal className="bg-zinc-900">
        <Select.Content>
          <Select.ScrollUpButton>
            <CaretDown />
          </Select.ScrollUpButton>
          <Select.Viewport>
            <Select.Group>
              {games.sort().map((game) => (
                <Select.Item
                  key={game.id}
                  className="text-white flex hover:bg-violet-500 mx-2 rounded p-1 my-1 items-center gap-2"
                  value={game.id}
                >
                  <Select.ItemText>{game.title}</Select.ItemText>
                  <Select.ItemIndicator className="text-white p-auto">
                    <Check />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton>
            <CaretUp />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
