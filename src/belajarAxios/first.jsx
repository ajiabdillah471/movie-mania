import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const First = () => {
  // ini useState untuk menyimpan data api dengan isi array kosong
  const [testData, setTestData] = useState([]);

  //   ini useState untuk search dengan isi string kosong
  const [search, setSearch] = useState("");

  //   ini url api dari json placeholder
  const url = "https://jsonplaceholder.typicode.com/users/";

  //   ini mengambil data dari varible url tadi dengan axios get.
  const renderData = () => {
    axios
      .get(url)
      //   setelah diambil kemudian data dari hasil get tersebut di wrap dengan .then(ininamavariable bebas untuk wrapnya)
      .then((result) => {
        setTestData(result.data);
      })
      //   jika error munculkan kode ini dengan .catch
      .catch((err) => {
        console.log("error");
      });
  };

  //   jalankan hasil render tadi di useEffect agar data di load saat pertama kali, jangan lupa di parameter ke dua tambahkan [] agar tidak load terus menerus
  useEffect(() => {
    renderData();
  }, []);

  //   ini mah contoh satulagi sebelum dirapihkan seperti diatas
  //   useEffect(() => {
  //     axios
  //       .get(url)
  //       .then((result) => {
  //         setTestData(result.data);
  //       })
  //       .catch((err) => {
  //         console.log("error:");
  //       });
  //   }, []);
  return (
    <div>
      <h2 className="font-bold text-center text-4xl m-6 capitalize">
        hallo.. ini page first
      </h2>

      <div className="mx-auto container pt-4 pb-10">
        <input
          type="text"
          placeholder="Cari User..."
          className="block mx-auto py-2 px-8"
          //   ini event buat searching
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-4 justify-center items-center">
        {/* .filter buat searching dan .map buat looping array hasil dari data */}
        {testData
          .filter((items) => {
            if (search === "") {
              return items;
            } else if (
              items.name.toLowerCase().includes(search.toLowerCase())
            ) {
              return items;
            }
          })
          .map((items) => {
            return (
              <div
                key={items.id}
                className="bg-red-300 mb-2 p-4 rounded-md shadow-md"
              >
                <h1>
                  <span className="font-bold"> Nama:</span> {items.name}
                </h1>
                <p>
                  <span className="font-bold"> Username:</span> {items.username}
                </p>
                <p>
                  <span className="font-bold"> Email:</span> {items.email}
                </p>
                <p>
                  <span className="font-bold"> Alamat:</span>{" "}
                  {items.address.city}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default First;
