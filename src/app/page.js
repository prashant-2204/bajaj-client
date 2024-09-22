"use client"
import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [getResponse, setGetResponse] = useState(null); // State to store GET request data
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            const jsonData = JSON.parse(input);
            const res = await axios.post('https://bajaj-server-x1jf.onrender.com/bfhl', jsonData);
            setResponse(res.data);
            setError(null);
        } catch (err) {
            setError('Invalid JSON input or server error');
        }
    };

    // GET request handler
    const handleGetRequest = async () => {
        try {
            const res = await axios.get('https://bajaj-server-x1jf.onrender.com/bfhl');
            setGetResponse(res.data);
            setError(null);
        } catch (err) {
            setError('GET request failed');
        }
    };

    const handleFilter = (type) => {
        if (selectedFilters.includes(type)) {
            setSelectedFilters(selectedFilters.filter(f => f !== type));
        } else {
            setSelectedFilters([...selectedFilters, type]);
        }
    };

    const getFilteredResponse = () => {
        if (!response) return null;
        let filteredResponse = {};

        if (selectedFilters.includes('Numbers')) {
            filteredResponse.numbers = response.numbers;
        }
        if (selectedFilters.includes('Alphabets')) {
            filteredResponse.alphabets = response.alphabets;
        }
        if (selectedFilters.includes('Highest lowercase alphabet')) {
            filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }

        return filteredResponse;
    };

    const filteredResponse = getFilteredResponse();

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-5">API Input</h1>
           <h2 className="text-xl font-semibold mb-5" > developed by Suraj Diwedi RA2111004010440</h2>
            <textarea
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your JSON input here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
            >
                Submit (POST Request)
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}

            {response && (
                <>
                    <h2 className="text-2xl font-semibold mt-6 mb-3">Multi Filter</h2>
                    <div className="flex space-x-2 mb-5">
                        <button
                            className={`px-4 py-2 rounded-lg ${
                                selectedFilters.includes('Numbers')
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                            onClick={() => handleFilter('Numbers')}
                        >
                            Numbers
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${
                                selectedFilters.includes('Alphabets')
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                            onClick={() => handleFilter('Alphabets')}
                        >
                            Alphabets
                        </button>
                        <button
                            className={`px-4 py-2 rounded-lg ${
                                selectedFilters.includes('Highest lowercase alphabet')
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200'
                            }`}
                            onClick={() => handleFilter('Highest lowercase alphabet')}
                        >
                            Highest lowercase alphabet
                        </button>
                    </div>

                    <h3 className="text-xl font-semibold">Filtered Response</h3>
                    <pre className="bg-gray-100 p-4 rounded-lg">
                        {JSON.stringify(filteredResponse, null, 2)}
                    </pre>
                </>
            )}

            {/* New button for GET request */}
            <button
                onClick={handleGetRequest}
                className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
            >
                Make GET Request
            </button>

            {/* Display the GET response */}
            {getResponse && (
                <>
                    <h3 className="text-xl font-semibold mt-4">GET Request Response:</h3>
                    <pre className="bg-gray-100 p-4 rounded-lg">
                        {JSON.stringify(getResponse, null, 2)}
                    </pre>
                </>
            )}
        </div>
    );
}
