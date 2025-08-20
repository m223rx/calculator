/*!
 * Calculator
 * Copyright (c) 2025 m223rx
 * All rights reserved.
 */

import { evaluate } from "mathjs";
import React, { useEffect, useState } from 'react'
import { History, Wifi, BatteryLow, ChartNoAxesColumnIncreasing } from 'lucide-react';

export default function PhoneScreen() {
    const [result, setResult] = useState('');
    const [history, setHistory] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [timestamp, setTimestamp] = useState(new Date());
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);

    const toggleHistory = () => {
        setIsHistoryVisible(!isHistoryVisible);
    };

    const handleClearHistory = () => {
        setHistory([]);
        setIsHistoryVisible(!isHistoryVisible);
    };

    const handleClearBox = () => {
        setInputValue('0');
        setResult('');
    };

    const handleButtonClick = (value) => {
        let newValue;

        if (result.length > 0) {
            if (/[0-9.]/.test(value)) {
                newValue = value;
            } else {
                newValue = result + value;
            }
            setResult('');
        } else {
            newValue = inputValue + value;
        }

        if (!newValue.startsWith("0.")) {
            newValue = newValue.replace(/^0+(\d)/, "$1");
        }

        setInputValue(newValue);
    };



    const handleParentheses = () => {
        const openCount = (inputValue.match(/\(/g) || []).length;
        const closeCount = (inputValue.match(/\)/g) || []).length;
        if (openCount > closeCount) {
            setInputValue(prev => prev + ")");
        } else {
            if (!/[0-9)]$/.test(inputValue)) {
                setInputValue(prev => prev + "(");
            } else {
                setInputValue(prev => prev + "*(");
            }
        }
    };


    const handleResult = () => {
        let finalResult;

        if (inputValue === '' || inputValue === '0') return;

        try {
            const expression = inputValue.replace(/x/g, '*');
            finalResult = evaluate(expression);

            if (isNaN(finalResult) || !isFinite(finalResult)) {
                finalResult = 'Error';
            } else if (typeof finalResult === 'number') {
                finalResult = parseFloat(finalResult.toFixed(6));
            }

            setResult(finalResult.toString());
            setHistory(prevHistory => [`${inputValue} = ${finalResult}`, ...prevHistory].slice(0, 5));
        } catch (error) {
            finalResult = 'Error';
            setResult(finalResult);
        }
    };


    useEffect(() => {
        const interval = setInterval(() => setTimestamp(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-900">
            <div className="phone__screen w-85 h-[720px] rounded-3xl shadow-2xl flex flex-col border border-white/20 bg-[#0a2436]/10 backdrop-blur-lg overflow-hidden">

                <div className="phone__header flex justify-between items-center p-4 text-white border-white/20 border-b-1">
                    <div className="header__left__container">
                        <p className="text-md font-bold">
                            {timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                        </p>

                    </div>
                    <div className="header__right__container flex items-center gap-1">
                        <p className='text-sm'><Wifi className="text-white" /></p>
                        <p className='text-sm'><ChartNoAxesColumnIncreasing className="text-white" /></p>
                        <p className='text-sm'><BatteryLow className="text-white" /></p>
                    </div>
                </div>
                <div className="calculator__body flex flex-col flex-1 justify-between">
                    <div className="calculator__top__container flex flex-col gap-3 mx-2">
                        <div className="calculator__header__name flex flex-col gap-2 relative">
                            <h1 className="text-md text-white font-bold text-center my-4">Calculator</h1>
                            <button className='text-[#fff] font-bold text-md cursor-pointer p-2 absolute right-0 bottom-2' onClick={() => toggleHistory()}><History /></button>
                        </div>

                        <div className="calculator__history__container">
                            {isHistoryVisible && (
                                <div className="calculator__history text-gray-500 items-end justify-end flex gap-1">
                                    <ul>
                                        {history.map((item, index) => (
                                            <li key={index} className="mb-1">{item}</li>
                                        ))}

                                        <li className={`text-${history.length > 0 ? '[#c97475]' : '[#ccc]'} ${history.length > 0 && 'underline'} justify-end align-end flex`}>
                                            <button className='cursor-pointer' onClick={() => handleClearHistory()}>
                                                {history.length > 0 ? 'clear' : 'empty'}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="calculator__bottom__container">
                        <div className="calculator__result__box">
                            <div className="calculator__screen p-4 flex flex-col text-white items-end gap-5">
                                <div className={`${result.length > 0 ? 'text-md text-ccc' : 'text-6xl text-white'}`}>
                                    <p>{inputValue}</p>
                                </div>
                                <div className="text-6xl text-white"><p>{result}</p></div>
                            </div>
                        </div>
                        <div className="w-full h-[2px] bg-gradient-to-r from-[#66777f] to-[#092137]" />
                        <div className="calculator__keyboard__box">
                            <div className="calculator__keyboard grid grid-cols-4 gap-2 p-4">
                                <button className='text-[#c97475] font-bold bg-[#fff] rounded-4xl p-2 text-lg cursor-pointer' onClick={() => handleClearBox()}>C</button>
                                <button className='text-[#3e9b9e] font-bold text-lg cursor-pointer p-2' value={'()'} onClick={handleParentheses}>()</button>
                                <button className='text-[#3e9b9e] font-bold text-lg cursor-pointer p-2' value={'%'} onClick={(e) => handleButtonClick(e.target.value)}>%</button>
                                <button className='text-[#3e9b9e] font-bold text-lg cursor-pointer p-2' value={'/'} onClick={(e) => handleButtonClick(e.target.value)}>/</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'1'} onClick={(e) => handleButtonClick(e.target.value)}>1</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'2'} onClick={(e) => handleButtonClick(e.target.value)}>2</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'3'} onClick={(e) => handleButtonClick(e.target.value)}>3</button>
                                <button className='text-[#3e9b9e] font-bold text-lg cursor-pointer p-2' value={'x'} onClick={(e) => handleButtonClick(e.target.value)}>x</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'4'} onClick={(e) => handleButtonClick(e.target.value)}>4</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'5'} onClick={(e) => handleButtonClick(e.target.value)}>5</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'6'} onClick={(e) => handleButtonClick(e.target.value)}>6</button>
                                <button className='text-[#3e9b9e] font-bold text-lg cursor-pointer p-2' value={'+'} onClick={(e) => handleButtonClick(e.target.value)}>+</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'7'} onClick={(e) => handleButtonClick(e.target.value)}>7</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'8'} onClick={(e) => handleButtonClick(e.target.value)}>8</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'9'} onClick={(e) => handleButtonClick(e.target.value)}>9</button>
                                <button className='text-[#3e9b9e] font-bold text-lg cursor-pointer p-2' value={'-'} onClick={(e) => handleButtonClick(e.target.value)}>-</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'.'} onClick={(e) => handleButtonClick(e.target.value)}>.</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'0'} onClick={(e) => handleButtonClick(e.target.value)}>0</button>
                                <button className='text-[#fff] font-bold text-lg cursor-pointer p-2' value={'00'} onClick={(e) => handleButtonClick(e.target.value)}>00</button>
                                <button className='text-[#3e9b9e] font-bold text-lg cursor-pointer p-2 bg-white rounded-4xl' onClick={() => handleResult()}>=</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
