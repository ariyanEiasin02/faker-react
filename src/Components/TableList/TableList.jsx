import React, { useState, useEffect, useCallback } from 'react';
import { faker } from '@faker-js/faker';
import { CSVLink } from "react-csv";

const regions = ['Poland', 'USA', 'Georgia', 'Bangladesh'];

function TableList() {
  const [region, setRegion] = useState('USA');
  const [errorRate, setErrorRate] = useState(0);
  const [seed, setSeed] = useState('');
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  
  const generateSeed = (baseSeed, pageNumber) => {
    return parseInt(baseSeed) + pageNumber;
  };
  
  const generateData = useCallback(() => {
    const combinedSeed = generateSeed(seed || Math.floor(Math.random() * 10000), page);
    faker.seed(combinedSeed);
    let newRecords = [];
    for (let i = 0; i < 10; i++) {
      newRecords.push(generateRecord(i + 1));
    }
    setRecords(newRecords);
  }, [region, errorRate, seed, page]);

  useEffect(() => {
    generateData();
  }, [region, errorRate, seed, generateData, page]);

  const handleScroll = (e) => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      addMoreRecords();
    }
  };

  const addMoreRecords = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const generateRecord = (index) => {
    const name = getName();
    const address = getAddress();
    const phone = getPhone();
    let record = { index, name, address, phone };

    return applyErrors(record);
  };

  const applyErrors = (record) => {
    const fields = ['name', 'address', 'phone'];
    let errorsToApply = Math.floor(Math.random() * errorRate);

    for (let i = 0; i < errorsToApply; i++) {
      let field = fields[Math.floor(Math.random() * fields.length)];
      record[field] = corruptData(record[field]);
    }

    return record;
  };

  const corruptData = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const errorType = Math.floor(Math.random() * 3);  
    switch (errorType) {
      case 0: 
        return data.slice(0, randomIndex) + data.slice(randomIndex + 1);
      case 1: 
        const randomChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
        return data.slice(0, randomIndex) + randomChar + data.slice(randomIndex);
      case 2: 
        if (randomIndex < data.length - 1) {
          return (
            data.slice(0, randomIndex) +
            data[randomIndex + 1] +
            data[randomIndex] +
            data.slice(randomIndex + 2)
          );
        }
        return data; 
      default:
        return data;
    }
  };

  const getName = () => {
    switch (region) {
      case 'Poland':
        return faker.name.fullName(); 
      case 'USA':
        return faker.name.fullName(); 
      case 'Georgia':
        return faker.name.fullName(); 
      case 'Bangladesh':
        return faker.name.fullName();  
      default:
        return faker.name.fullName(); 
    }
  };

  const getAddress = () => {
    switch (region) {
      case 'Poland':
        return `${faker.address.city()}, ${faker.address.streetAddress()}`;
      case 'USA':
        return `${faker.address.city()}, ${faker.address.streetAddress()}`;
      case 'Georgia':
        return `${faker.address.city()}, ${faker.address.streetAddress()}`; 
      case 'Bangladesh':
        return `${faker.address.city()}, ${faker.address.streetAddress()}`; 
      default:
        return `${faker.address.city()}, ${faker.address.streetAddress()}`;
    }
  };

  const getPhone = () => {
    switch (region) {
      case 'Poland':
        return faker.phone.number('+48 ### ### ###');  
      case 'USA':
        return faker.phone.number('+1 (###) ###-####');
      case 'Georgia':
        return faker.phone.number('+995 ### ### ###'); 
      case 'Bangladesh':
        return faker.phone.number('+880 ### ### ####');
      default:
        return faker.phone.number(); 
    }
  };

  return (
    <div className="text-center font-sans font-medium text-black">
      <h1 className="text-3xl py-6 font-mono font-bold">Fake User Data Generator</h1>

      <label className="text-xl font-mono font-light text-black">Region:</label>
      <select className="border-2 py-2 px-2 rounded-md" value={region} onChange={(e) => setRegion(e.target.value)}>
        {regions.map((reg) => (
          <option key={reg} value={reg}>
            {reg}
          </option>
        ))}
      </select>

      <label className="ml-6 text-xl font-mono font-light text-black">Error Rate (per record): {errorRate}</label>
      <input
        className="mt-6"
        type="range"
        min="0"
        max="10"
        value={errorRate}
        onChange={(e) => setErrorRate(e.target.value)}
      />
      <input
        type="number"
        min="0"
        max="1000"
        value={errorRate}
        onChange={(e) => setErrorRate(e.target.value)}
      />

      <label className="text-xl font-mono font-light text-black">Seed:</label>
      <input className="py-6" type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <button onClick={() => setSeed(Math.floor(Math.random() * 10000))}>Random Seed</button>

      <table className="border w-full border-collapse mt-5">
        <thead>
          <tr>
            <th className="border p-3 text-start">#</th>
            <th className="border p-3 text-start">Name</th>
            <th className="border p-3 text-start">Address</th>
            <th className="border p-3 text-start">Phone</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.index}>
              <td className="border text-start p-3">{record.index}</td>
              <td className="border text-start p-3">{record.name}</td>
              <td className="border text-start p-3">{record.address}</td>
              <td className="border text-start p-3">{record.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div onScroll={handleScroll}></div>

      <CSVLink data={records} filename={`data-page-${page}.csv`}>
        <button className="mt-4 p-2 bg-blue-500 text-white rounded">Export to CSV</button>
      </CSVLink>
    </div>
  );
}

export default TableList
