import React, { useState } from 'react'

const Header = () => {
    const regions = ['Poland', 'USA', 'Georgia',"Bangladesh"];
    const [region, setRegion] = useState('USA');
    return (
        <div>
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
        </div>
    )
}

export default Header