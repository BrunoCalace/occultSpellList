import React, { useState, useEffect } from 'react';
import './styles.scss';

const SpellSlots = () => {
    const [lvl, setLvl] = useState(() => {
        const savedLvl = localStorage.getItem('characterLvl');
        return savedLvl ? parseInt(savedLvl) : 0;
    });
    const maxSpellLevel = 10;

    const calculateSlots = (spellLevel) => {
        const result = Math.ceil(lvl / 2);
        if (spellLevel > result) return 0;
        return spellLevel === result ? (lvl % 2 === 0 ? 4 : 3) : 4;
    };

    const [spellCounts, setSpellCounts] = useState(() => {
        const savedSlots = localStorage.getItem('spellCounts');
        return savedSlots
            ? JSON.parse(savedSlots)
            : Array.from({ length: maxSpellLevel }, (_, i) => calculateSlots(i + 1));
    });

    useEffect(() => {
        localStorage.setItem('characterLvl', lvl);
        localStorage.setItem('spellCounts', JSON.stringify(spellCounts));
    }, [lvl, spellCounts]);

    const handleLvlChange = (event) => {
        const value = parseInt(event.target.value);
        if (value >= 1 && value <= 20) {
            setLvl(value);
        }
    };

    useEffect(() => {
        setSpellCounts(
            Array.from({ length: maxSpellLevel }, (_, i) => calculateSlots(i + 1))
        );
    }, [lvl]);

    const handleReduceSlot = (index) => {
        setSpellCounts((prevCounts) =>
            prevCounts.map((count, i) => (i === index && count > 0 ? count - 1 : count))
        );
    };

    const handleResetSlots = () => {
        setSpellCounts(
            Array.from({ length: maxSpellLevel }, (_, i) => calculateSlots(i + 1))
        );
    };

    return (
        <div className="spell-slots-container">
            <div className="input-container">
                <label htmlFor="level-input">Enter Character Level (1-20): </label>
                <input
                    id="level-input"
                    type="number"
                    value={lvl}
                    onChange={handleLvlChange}
                    min={1}
                    max={20}
                />
            </div>
            <div className="spell-slots">
                {Array.from({ length: maxSpellLevel }).map((_, index) => (
                    <div key={index} className="spell-slot">
                        <h3>Spell Level {index + 1}</h3>
                        <p>Available Slots: {spellCounts[index]}</p>
                        <button
                            className="reduce-button"
                            onClick={() => handleReduceSlot(index)}
                            disabled={spellCounts[index] === 0}
                        >
                            Use Slot
                        </button>
                    </div>
                ))}
            </div>
            <button className="reset-button" onClick={handleResetSlots}>
                Reset Spell Slots
            </button>
        </div>
    )
}

export default SpellSlots