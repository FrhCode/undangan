import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import flower from "./images/flower.png";
import leaf from "./images/leaf.png";
import pengantin from "./images/pngwing.com.png";
import pria from "./images/pngegg.png";
import wanita from "./images/wanita.png";
import { DateTime } from "luxon";
import diffBetweenDate from "./utils/diffBetweenDate";
import music from "./sound/emotional-cinematic-background-piano-inspirational-orchestral-music-115915.mp3";
import { useCallback } from "react";
import { useRef } from "react";
import { useMemo } from "react";

export default function App() {
  const [openInvitations, setOpenInvitations] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [date, setDate] = useState(DateTime.fromISO("2023-02-21T09:00"));
  const [diffDate, setDiffDate] = useState([]);
  const [musicState, setMusicState] = useState(false);
  const [musicToPlay, setMusicToPlay] = useState(new Audio(music));
  const [to, setTo] = useState("");
  const [konfirmasiKehadiran, setKonfirmasiKehadiran] = useState({
    name: "",
    total: "",
    status: "",
  });
  const welcomeScreen = useRef();

  const imgWanita = useRef();
  const imgPria = useRef();

  const [messages, setMessages] = useState([
    {
      name: "Nurlaela Sari",
      message:
        "Alhamdulillah🥰🥰 ikut seneng teh, shalihahku, akhirnya Allah pertemukan dg jodohnya, selamat yaa..terharu bgt, baarokallohulakuma, semoga lancar samai hari H ada dlm lindungan & ridho Allah, bahagia dunia akhirat.. aamiin 😍",
    },
    {
      name: "Indri ✨",
      message:
        "Barakallahu lakuma ✨Semoga teh Ifa dan pasangan menjadi keluarga yang bisa mengarungi samudra Mawaddah dan meniti tangga Rohmah, supaya bermukim dipuncak Sakinah ✨🤍",
    },
  ]);

  const [message, setMessage] = useState({ name: "", message: "" });
  const formKehadiran = useRef();

  useEffect(() => {
    document.querySelector("body").classList.add("debug-screens");

    const interval = setInterval(() => {
      const date1 = date;
      const date2 = DateTime.now().setZone("Asia/Jakarta");

      setDiffDate(diffBetweenDate(date1, date2));
    }, 1000);
    return () => {
      clearInterval(interval);
      document.querySelector("body").classList.remove("debug-screens");
    };
  }, [date]);

  const beforeUnloadCb = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // window.addEventListener("beforeunload", beforeUnloadCb);
    // return () => {
    //   window.removeEventListener("beforeunload", beforeUnloadCb);
    // };
    /**
     * @type {HTMLDivElement} target
     */
    const target = welcomeScreen.current;
    openInvitations
      ? (target.style.top = `calc(${window.scrollY}px + 90%)`)
      : (target.style.top = `calc(${window.scrollY}px)`);
    target.setAttribute("data-offset", `${window.scrollY}px`);
  }, [openInvitations]);

  const toogleMusicState = useCallback(() => {
    musicState ? musicToPlay.play() : musicToPlay.pause();
  }, [musicState, musicToPlay]);

  useEffect(() => {
    document
      .querySelector("body")
      .classList.toggle("openInvitations", openInvitations);
  }, [openInvitations]);

  useEffect(() => {
    toogleMusicState();
  }, [musicState, toogleMusicState]);

  const intersectionCb = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  };

  const intersectionOptions = useMemo(() => {
    return { threshold: 0.1 };
  }, []);

  const observer = useMemo(
    () => new IntersectionObserver(intersectionCb, intersectionOptions),
    [intersectionOptions]
  );

  useEffect(() => {
    let params = new URL(document.location).searchParams;
    let to = params.get("to");

    const toPerson = to?.replace("_", " ") || "Ervan Surahman";

    setTo(toPerson);

    observer.observe(imgPria.current);
    observer.observe(imgWanita.current);
    return () => {
      observer.unobserve(imgPria.current);
      observer.unobserve(imgWanita.current);
    };
  }, [observer]);

  const konfirmasiKehadiranHandler = (key, value) => {
    setKonfirmasiKehadiran({ ...konfirmasiKehadiran, [key]: value });
    //  https://api.whatsapp.com/send?phone=6281383178213&text=HI
  };

  const kirimkanPesanHandler = (key, value) => {
    setMessage({ ...message, [key]: value });
    //  https://api.whatsapp.com/send?phone=6281383178213&text=HI
  };

  useEffect(() => {
    const text = new URLSearchParams({
      phone: "6281383178213",
      text: `Halo, saya *${konfirmasiKehadiran.name}* dari *${konfirmasiKehadiran.total}* orang ingin konfirmasi kehadiran undangan pernikahan kalian  bahwa *${konfirmasiKehadiran.status}*. 
      
      Terimakasih.`,
    });
    /**
     * @type {HTMLAnchorElement} target
     */
    const target = formKehadiran.current;
    target.href = `https://api.whatsapp.com/send?${text.toString()}`;
  }, [konfirmasiKehadiran]);

  return (
    <>
      <section
        className="absolute top-0 left-0 z-[100] h-full w-full overflow-hidden"
        id="welcome"
        ref={welcomeScreen}
      >
        <div className="relative flex  h-full w-full flex-col items-center justify-center space-y-1 bg-main bg-cover bg-center px-4  shadow-main">
          {/* <div className=" absolute top-0 left-0 h-screen w-screen opacity-70 backdrop-blur-lg"></div> */}
          <img src={pengantin} alt="" className="h-52" />
          <p className="relative z-30 font-dancing text-4xl font-semibold">
            Tiara & Rizky
          </p>
          <p className=" relative z-30 ">Undangan Spesial Untuk</p>
          <p className=" relative z-30  font-semibold">{to}</p>
          <p className="relative z-30 text-center  text-sm font-light">
            Mohon maaf apabila ada kesalahan penulisan nama dan gelar
          </p>
          <button className="mt-2 h-11 w-44 origin-center animate-scale space-x-2 rounded-sm bg-purple-800 text-white">
            <span>
              <i className="fa-solid fa-envelope-open-text"></i>
            </span>
            <span
              className=""
              onClick={() => {
                setOpenInvitations(!openInvitations);
                setMusicState(true);
              }}
            >
              Buka Undangan
            </span>
          </button>
        </div>
      </section>
      <section
        className={`fixed top-28 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-white`}
        onClick={() => {
          setMusicState(!musicState);
        }}
      >
        {musicState ? (
          <i className="fa-solid fa-pause"></i>
        ) : (
          <i className="fa-solid fa-play"></i>
        )}
      </section>

      <section
        id="home"
        className="relative flex h-[80vh] flex-col items-center justify-center space-y-3 bg-ring bg-cover bg-center p-5 pt-48 text-white "
      >
        <div className="absolute top-0 left-0 h-full w-full bg-zinc-600 opacity-40  shadow-second"></div>
        <p className="relative z-10  text-xl font-semibold">
          We Are Getting Married
        </p>
        <p className="relative z-10 font-dancing text-5xl font-semibold">
          Tiara & Rizky
        </p>
        <p className="relative z-10 text-xl font-semibold">
          {date.setLocale("ID-id").toLocaleString()}
        </p>
      </section>

      <section className="space-y-5 bg-teal-50 p-5 py-10">
        <div className="flex flex-col items-center justify-between space-y-4 rounded-lg bg-teal-700 p-8 shadow-md">
          <img
            src={flower}
            alt=""
            className="w-11 scale-y-[-1] scale-x-[-1]"
            style={{
              filter:
                "invert(11%) sepia(66%) saturate(838%) hue-rotate(112deg) brightness(93%) contrast(63%)",
            }}
          />
          <p className="text-center text-sm font-light text-white">
            "Dan di antara tanda-tanda kekuasaan-Nya diciptakan-Nya untukmu
            pasangan hidup dari jenismu sendiri supaya kamu dapat ketenangan
            hati dan dijadikannya kasih sayang di antara kamu. Sesungguhnya yang
            demikian menjadi tanda-tanda kebesaran-Nya bagi orang-orang yang
            berpikir."
          </p>
          <p className="font-bold text-white ">Q.S Ar-Rum Ayat 21</p>
        </div>
      </section>

      <div className="relative h-36 overflow-hidden bg-teal-50">
        <img
          src={leaf}
          alt=""
          className="left-0 w-20 translate-x-8 rotate-[90deg] scale-x-[-1]"
          style={{
            filter:
              "invert(11%) sepia(66%) saturate(838%) hue-rotate(112deg) brightness(93%) contrast(63%)",
          }}
        />
      </div>
      <section id="couple" className="space-y-5 bg-teal-50 p-5 py-10">
        <p className="text-center text-sm text-teal-700">
          Assalamu`alaikum Warahmatullaahi Wabarakaatuh
        </p>
        <p className="text-center text-sm font-semibold text-emerald-700">
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.
        </p>

        <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-teal-700 p-8 text-white shadow-md">
          <img
            src={wanita}
            alt=""
            className="mb-3 translate-x-48 translate-y-48 duration-1000"
            ref={imgWanita}
          />
          <p className="text-center text-sm">Tiara Syida</p>
          <p className="text-center text-sm font-bold">Putri dari</p>
          <p className="text-center">Bapak H.Salim & Ibu Hj.Rosdiana</p>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1 rounded-lg bg-teal-700 p-8 text-white shadow-md">
          <img
            src={pria}
            alt=""
            className="mb-3 -translate-x-48 translate-y-48 duration-1000"
            ref={imgPria}
          />
          <p className="text-center text-sm">Rizky Irmawan</p>
          <p className="text-center text-sm font-bold">Putra dari</p>
          <p className="text-center">Bapak H.Dahlan & Ibu Hj.Ralisa</p>
        </div>
      </section>
      <div className="relative h-36 overflow-hidden bg-teal-50">
        <img
          src={leaf}
          alt=""
          className="absolute right-0 w-20 -translate-x-8 rotate-[90deg] scale-x-[-1] scale-y-[-1]"
          style={{
            filter:
              "invert(11%) sepia(66%) saturate(838%) hue-rotate(112deg) brightness(93%) contrast(63%)",
          }}
        />
      </div>
      <section id="event" className="space-y-5 bg-teal-50 p-5 py-10">
        <div className="flex flex-col items-center justify-center  space-y-1 rounded-lg bg-teal-700 p-8 text-white shadow-md">
          <div className="text-4xl">
            <i className="fa-solid fa-life-ring"></i>
          </div>
          <div className="flex flex-col ">
            <p className="text-center font-dancing text-4xl font-semibold">
              Akad Nikah
            </p>
            <p className="text-center text-sm">
              {date.toFormat("EEEE, dd LLLL yyyy", { locale: "ID-id" })}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p>Pukul</p>
            <p>07.00 - 09.00 WIB</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p>Lokasi</p>
            <p className="text-center">
              Jl. Yos Sudarso, Karang Balik, Kec. Tarakan Bar., Kota Tarakan,
              Kalimantan Utara 70114
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center  space-y-1 rounded-lg bg-teal-700 p-8 text-white shadow-md">
          <div className="text-4xl">
            <i className="fa-solid fa-life-ring"></i>
          </div>
          <div className="flex flex-col ">
            <p className="text-center font-dancing text-4xl font-semibold">
              Resepsi Nikah
            </p>
            <p className="text-center text-sm">
              {date.toFormat("EEEE, dd LLLL yyyy", { locale: "ID-id" })}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p>Pukul</p>
            <p>09.00 - 16.00 WIB</p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <p>Lokasi</p>
            <p className="text-center">
              Jl. Yos Sudarso, Karang Balik, Kec. Tarakan Bar., Kota Tarakan,
              Kalimantan Utara 70114
            </p>
          </div>
        </div>

        <iframe
          title="maps"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.033851043082!2d117.56896611470526!3d3.341800897567316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3214753dd1bb8707%3A0x405c6c8216c906a9!2sJl.%20Bakaru%2C%20Karang%20Harapan%2C%20Kec.%20Tarakan%20Bar.%2C%20Kota%20Tarakan%2C%20Kalimantan%20Utara!5e0!3m2!1sid!2sid!4v1661099445620!5m2!1sid!2sid"
          className="h-80 w-full shadow-2xl"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>

      <section className="relative flex h-96 flex-col items-center justify-center space-y-3 bg-timer bg-cover bg-center p-5 text-white ">
        <div className="absolute top-0 left-0 h-full w-full bg-zinc-600 opacity-50  shadow-second"></div>
        <p className="z-20 text-4xl font-semibold">Hitung Mundur</p>
        <div className="z-20 flex justify-between space-x-4">
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{diffDate[0]}</span>
            <span className="text-lg">Hari</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{diffDate[1]}</span>
            <span className="text-lg">Jam</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{diffDate[2]}</span>
            <span className="text-lg">Menit</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{diffDate[3]}</span>
            <span className="text-lg">Detik</span>
          </div>
        </div>
      </section>
      <section className="bg-teal-50 p-8">
        <p className="text-center text-teal-900">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga
          apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
          kepada kedua mempelai. Atas kehadiran serta doa restu, kami ucapkan
          terima kasih.
        </p>
      </section>

      <section className="flex flex-col items-center justify-center space-y-4 bg-teal-50 p-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="font-dancing text-3xl font-semibold text-teal-900">
            Konfirmasi Kehadiran
          </p>
          <div className=" h-0 w-36 border-t-2 border-solid border-teal-900"></div>
        </div>
        <form
          action="https://api.whatsapp.com/send?"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();

            // target.submit();
            // axios
            //   .get("https://api.whatsapp.com/send", {
            //     params: { phone: "6281383178213", text: "HI" },
            //   })
          }}
        >
          <div className="flex h-10 justify-between">
            <input
              type="text"
              name="name"
              placeholder="Masukan nama anda"
              value={konfirmasiKehadiran.name}
              onInput={(e) => {
                const key = e.target.name;
                const value = e.target.value;
                konfirmasiKehadiranHandler(key, value);
              }}
              className="h-full w-[74%] border-b-2 border-teal-700 bg-transparent px-2 text-teal-900 focus:outline-none"
            />
            <input
              type="number"
              name="total"
              placeholder="Jumlah"
              onInput={(e) => {
                const key = e.target.name;
                const value = e.target.value;
                konfirmasiKehadiranHandler(key, value);
              }}
              value={konfirmasiKehadiran.total}
              className="h-full w-[25%] border-b-2 border-teal-700 bg-transparent px-2 text-teal-900 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center ">
              <input
                type="radio"
                name="status"
                id="datang"
                value={"Iya saya bisa datang"}
                onChange={(e) => {
                  const key = e.target.name;
                  const value = e.target.value;
                  konfirmasiKehadiranHandler(key, value);
                }}
              />
              <div className="helper-radio"></div>
              <label className="pl-2" htmlFor="datang">
                Iya saya bisa datang
              </label>
            </div>
            <div className="flex items-center ">
              <input
                type="radio"
                name="status"
                id="ragu"
                value={"Saya Masih Ragu"}
                onChange={(e) => {
                  const key = e.target.name;
                  const value = e.target.value;
                  konfirmasiKehadiranHandler(key, value);
                }}
              />
              <div className="helper-radio"></div>
              <label className="pl-2" htmlFor="ragu">
                Saya Masih Ragu
              </label>
            </div>
            <div className="flex items-center ">
              <input
                type="radio"
                name="status"
                id="tidak"
                value={"Maaf, Saya Tidak Bisa Datang"}
                onChange={(e) => {
                  const key = e.target.name;
                  const value = e.target.value;
                  konfirmasiKehadiranHandler(key, value);
                }}
              />
              <div className="helper-radio"></div>
              <label className="pl-2" htmlFor="tidak">
                Maaf, Saya Tidak Bisa Datang
              </label>
            </div>
          </div>
          {/* <input
            type="submit"
            value="Reservation via Whatsapp"
            className="rounded-sm bg-teal-700 p-2 text-white"
          /> */}
          <a
            href="https://api.whatsapp.com/send?phone=6281383178213&text=HI"
            className="inline-block rounded-sm bg-teal-700 p-2 text-white"
            ref={formKehadiran}
            target="noopener"
          >
            Reservation via Whatsapp
          </a>
        </form>
      </section>

      <section
        id="wishes"
        className="flex flex-col items-center justify-center space-y-4 bg-teal-50 p-8"
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <p className="font-dancing text-3xl font-semibold text-teal-900">
            Kirimkan Pesan
          </p>
          <div className=" h-0 w-36 border-t-2 border-solid border-teal-900"></div>
        </div>
        <form
          action=""
          className="w-full space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            setMessages([message, ...messages]);
          }}
        >
          <div className="h-10">
            <input
              value={message.name}
              type="text"
              name="name"
              placeholder="Masukan nama anda"
              className="h-full w-full border-b-2 border-teal-700 bg-transparent px-2 text-teal-900 focus:outline-none"
              onInput={(e) => {
                const key = e.target.name;
                const value = e.target.value;
                kirimkanPesanHandler(key, value);
              }}
            />
          </div>

          <div className="">
            <textarea
              name="message"
              id=""
              rows={3}
              className="w-full border-2 border-teal-700  bg-transparent px-2 leading-10 text-teal-900 focus:outline-none"
              placeholder="Masukan pesan anda"
              onInput={(e) => {
                const key = e.target.name;
                const value = e.target.value;
                kirimkanPesanHandler(key, value);
              }}
              value={message.message}
            ></textarea>
          </div>
          <input
            type="submit"
            value="Kirimkan pesan"
            className="rounded-sm bg-teal-700 p-2 text-white"
          />
        </form>
        <div className="tes max-h-96 w-full space-y-2 overflow-y-scroll">
          {messages.map(({ name, message }, index) => {
            return (
              <div
                className=" space-y-2 rounded-md bg-teal-700 p-3"
                key={index}
              >
                <p className="text-white">{name}</p>
                <p className="text-white">{message}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-teal-700 p-8 text-center text-white">
        <p>
          Made with Love ❤ by
          <a href="https://www.instagram.com/muhammadzydane/" target="noopener">
            {" "}
            @muhammadzydane
          </a>
        </p>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-teal-700 px-3 py-4 shadow-lg">
        <ul className="flex justify-between">
          <li className="flex flex-col items-center space-y-2 text-white">
            <i className=" fa-solid fa-house"></i>
            <a href="#home" className="text-sm">
              Home
            </a>
          </li>
          <li className="flex flex-col items-center space-y-2 text-white">
            <i className=" fas fa-user-friends"></i>{" "}
            <a href="#couple" className="text-sm">
              Couple
            </a>
          </li>
          <li className="flex flex-col items-center space-y-2 text-white">
            <i className=" far fa-calendar-alt"></i>{" "}
            <a href="#event" className="text-sm">
              Event
            </a>
          </li>
          <li className="flex flex-col items-center space-y-2 text-white">
            <i className=" far fa-images"></i>
            <a href="#asd" className="text-sm">
              Gallery
            </a>
          </li>
          <li className="flex flex-col items-center space-y-2 text-white">
            <i className=" far fa-comment-dots"></i>{" "}
            <a href="#wishes" className="text-sm">
              Wishes
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
