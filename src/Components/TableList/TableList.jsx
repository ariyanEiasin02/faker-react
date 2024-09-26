import React, { useState, useEffect, useCallback } from 'react';
import { faker } from '@faker-js/faker';

const regions = ['Poland', 'USA', 'Georgia',"Bangladesh"];

function TableList() {
  const [region, setRegion] = useState('USA');
  const [errorRate, setErrorRate] = useState(0);
  const [seed, setSeed] = useState('');
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);

  const generateData = useCallback(() => {
    faker.seed(seed ? parseInt(seed) : Math.floor(Math.random() * 10000));
    let newRecords = [];
    for (let i = 0; i < 20; i++) {
      newRecords.push(generateRecord(i + 1));
    }
    setRecords(newRecords);
  }, [region, errorRate, seed]);

  useEffect(() => {
    generateData();
  }, [region, errorRate, seed, generateData]);

  const handleScroll = (e) => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      addMoreRecords();
    }
  };

  const addMoreRecords = () => {
    let moreRecords = [];
    for (let i = 0; i < 10; i++) {
      moreRecords.push(generateRecord(records.length + i + 1));
    }
    setRecords((prevRecords) => [...prevRecords, ...moreRecords]);
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
    const index = Math.floor(Math.random() * data.length);
    return data.slice(0, index) + String.fromCharCode(97 + Math.floor(Math.random() * 26)) + data.slice(index + 1);
  };

  const getName = () => {
    switch (region) {
      case 'Poland':
        return faker.name.fullName();  // Polish names
      case 'USA':
        return faker.name.fullName();  // American names
      case 'Georgia':
        return faker.name.fullName();  // Georgian names (simulated)
      case 'Bangladesh':
        return faker.name.fullName();  // Bangladesh names (simulated)
      default:
        return faker.name.fullName();  // Fallback for any region
    }
  };
  

  const getAddress = () => {
    switch (region) {
      case 'Poland':
        return `${faker.address.city()}, ${faker.address.street()} ${faker.address.buildingNumber()}`;
      case 'USA':
        return `${faker.address.city()}, ${faker.address.street()} ${faker.address.buildingNumber()}`;
      case 'Georgia':
        return `${faker.address.city()}, ${faker.address.street()} ${faker.address.buildingNumber()}`;  // Simulating Georgian addresses
      case 'Bangladesh':
        return `${faker.address.city()}, ${faker.address.street()} ${faker.address.buildingNumber()}`;  // Simulating Georgian addresses
      default:
        return `${faker.address.city()}, ${faker.address.street()} ${faker.address.buildingNumber()}`;
    }
  };
  

  const getPhone = () => {
    switch (region) {
      case 'Poland':
        return faker.phone.number('+48 ### ### ###');  // Polish phone number format
      case 'USA':
        return faker.phone.number('+1 (###) ###-####');  // USA phone number format
      case 'Georgia':
        return faker.phone.number('+995 ### ### ###');  // Georgian phone number format
      case 'Bangladesh':
        return faker.phone.number('+880 1705125468');  // Georgian phone number format
      default:
        return faker.phone.number();  // Default phone number format
    }
  };
  

  return (
    <div className="text-center font-sans font-medium text-black">
      <h1 className='text-3xl py-6 font-mono font-bold'>Fake User Data Generator</h1>

      {/* Region Selector */}
      <label className='text-xl font-mono font-light text-black'>Region:</label>
      <select className='border-2 py-2 px-2 rounded-md' value={region} onChange={(e) => setRegion(e.target.value)}>
        {regions.map((reg) => (
          <option key={reg} value={reg}>
            {reg}
          </option>
        ))}
      </select>

      {/* Error Rate Slider */}
      <label className='ml-6 text-xl font-mono font-light text-black'>Error Rate (per record): {errorRate}</label>
      <input
      className='mt-6'
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

      {/* Seed Input */}
      <label className='text-xl font-mono font-light text-black'>Seed:</label>
      <input className='py-6' type="text" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <button onClick={() => setSeed(Math.floor(Math.random() * 10000))}>Random Seed</button>

      {/* Data Table */}
      <table className='border w-full border-collapse mt-5'>
        <thead>
          <tr>
            <th className='border p-3 text-start'>#</th>
            <th className='border p-3 text-start'>Name</th>
            <th className='border p-3 text-start'>Address</th>
            <th className='border p-3 text-start'>Phone</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.index}>
              <td className='border text-start p-3'>{record.index}</td>
              <td className='border text-start p-3'>{record.name}</td>
              <td className='border text-start p-3'>{record.address}</td>
              <td className='border text-start p-3'>{record.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Infinite Scroll */}
      <div onScroll={handleScroll}></div>
    </div>
  );
}

export default TableList;
