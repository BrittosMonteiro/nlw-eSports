import { MagnifyingGlassPlus } from "phosphor-react";
import * as Dailog from "@radix-ui/react-dialog";

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
      <div className="bg-[#2A2634] py-6 px-8 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique seu anúncio para encontrar novos players!
          </span>
        </div>
        <Dailog.Trigger className="px-4 py-3 bg-violet-500 text-white rounded hover:bg-violet-600 flex items-center gap-2">
          <MagnifyingGlassPlus size="24" />
          Publicar anúncio
        </Dailog.Trigger>
      </div>
    </div>
  );
}
