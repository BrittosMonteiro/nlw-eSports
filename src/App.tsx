import "./styles/main.css";
import logo from "./assets/Logo.svg";
import * as Dialog from "@radix-ui/react-dialog";

import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { useState, useEffect } from "react";
import { GameController } from "phosphor-react";
import Input from "./components/Input";

interface Game {
  bannerUrl: string;
  title: string;
  id: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = useState<Game[]>([]);
  let weekDaysPlaying = [];

  function getListGames() {
    fetch("http://localhost:3000/games")
      .then((res) => res.json())
      .then((res) => {
        setGames(res);
      });
  }

  useEffect(() => {
    getListGames();
  });

  function addRemoveWeekDaysPlaying(idDay: any) {
    let pos = weekDaysPlaying.indexOf(idDay.id);
    if (pos > 0) {
      weekDaysPlaying.splice(pos, 1);
    } else {
      weekDaysPlaying.push(idDay.id);
    }

    console.log(pos, weekDaysPlaying);
  }

  async function createNewAd(event: any) {
    event.preventDefault();

    const ad = {
      name: event.target.name.value,
      yearsPlaying: parseInt(event.target.yearsPlaying.value),
      discord: event.target.discord.value,
      game: event.target.game.value,
      weekDays: weekDaysPlaying,
      hourStart: event.target.hourStart.value,
      hourEnd: event.target.hourEnd.value,
      useVoiceChannel:
        event.target.useVoiceChannel.value === "on" ? true : false,
    };

    await fetch(`http://localhost:3000/games/${ad.game}/ads`, {
      method: "POST",
      body: JSON.stringify(ad),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        getListGames();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} alt="Logo" title="Logo" />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{" "}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-6">
        {games.map((game) => (
          <GameBanner
            bannerUrl={game.bannerUrl}
            title={game.title}
            adsCount={game._count.ads}
            key={game.id}
          />
        ))}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed">
            <Dialog.Content className="fixed py-8 px-10 text-white bg-[#2a2634] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
              <Dialog.Title className="text-3xl font-black">
                Públique um anúncio
              </Dialog.Title>
              <form className="mt-8 flex flex-col gap-4" onSubmit={createNewAd}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">
                    Qual o game
                  </label>
                  <select
                    id="game"
                    name="game"
                    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                  >
                    <option value="">Selecione um game</option>
                    {games.map((game) => (
                      <option value={game.id} key={game.id}>
                        {game.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Como te chamam no game?"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quanto tempo?</label>
                    <Input
                      type="number"
                      id="yearsPlaying"
                      placeholder="Tudo bem se for ZERO"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual o seu discord?</label>
                    <Input
                      type="text"
                      id="discord"
                      placeholder="Usuario#0000?"
                    />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando custuma jogar?</label>
                    <div className="grid grid-cols-4 gap-2">
                      <button
                        id="0"
                        type="button"
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Domingo"
                        onClick={(event) =>
                          addRemoveWeekDaysPlaying(event.target)
                        }
                      >
                        D
                      </button>
                      <button
                        id="1"
                        type="button"
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Segunda"
                        onClick={(event) =>
                          addRemoveWeekDaysPlaying(event.target)
                        }
                      >
                        S
                      </button>
                      <button
                        id="2"
                        type="button"
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Terça"
                        onClick={(event) =>
                          addRemoveWeekDaysPlaying(event.target)
                        }
                      >
                        T
                      </button>
                      <button
                        id="3"
                        type="button"
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Quarta"
                        onClick={(event) =>
                          addRemoveWeekDaysPlaying(event.target)
                        }
                      >
                        Q
                      </button>
                      <button
                        id="4"
                        type="button"
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Quinta"
                        onClick={(event) =>
                          addRemoveWeekDaysPlaying(event.target)
                        }
                      >
                        Q
                      </button>
                      <button
                        id="5"
                        type="button"
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Sexta"
                        onClick={(event) =>
                          addRemoveWeekDaysPlaying(event.target)
                        }
                      >
                        S
                      </button>
                      <button
                        id="6"
                        type="button"
                        className="w-8 h-8 rounded bg-zinc-900"
                        title="Sábado"
                        onClick={(event) =>
                          addRemoveWeekDaysPlaying(event.target)
                        }
                      >
                        S
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">
                      A que horas costuma jogar?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="time" id="hourStart" placeholder="De" />

                      <Input type="time" id="hourEnd" placeholder="Até" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm">
                  <input type="checkbox" id="useVoiceChannel" />
                  <label htmlFor="useVoiceChannel">
                    Costumo me conectar ao chat de voz
                  </label>
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close
                    type="button"
                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                  >
                    Cancelar
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                  >
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default App;
