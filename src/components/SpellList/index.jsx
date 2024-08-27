import './styles.scss'
import React, { useEffect, useState } from 'react';

function SpellList() {
    const [spells, setSpells] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        fetch('/spells.json')
            .then(response => {
                if(!response.ok) {
                    throw new Error ('Network response was not ok');
                }
                return response.json();
        })
        .then(data => setSpells(data))
        .catch(error => console.error('Error fetching the data:', error));
    }, [])

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };
    
    const toggleItem = (index) => {
        setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
    };
    
    const categorizedSpells = spells.reduce((acc, spell, index) => {
        if (!acc[spell.cat]) acc[spell.cat] = [];
        acc[spell.cat].push({ ...spell, index });
        return acc;
    }, {});

    return (
        <div className="spell-list">
            {Object.entries(categorizedSpells).map(([category, spells]) => (
                <div key={category} className="spell-category">
                <button className="category-button" onClick={() => toggleCategory(category)}>
                    {category}
                </button>
                {expandedCategories[category] && (
                    <ul className="spell-items">
                    {spells.map((spell, index) => (
                        <li key={spell.index} className="spell-item">
                        <button className="item-button" onClick={() => toggleItem(spell.index)}>
                            {spell.name}
                        </button>
                        {expandedItems[spell.index] && (
                            <div className="spell-details">
                                <strong>{spell.cat}</strong>
                                
                                <div className='spell-carac'>
                                    <strong>Actions: </strong><p>{spell.act}</p>
                                </div>
                                <div className='spell-carac'>
                                    <strong>Range: </strong><p>{spell.rng}</p>
                                </div>
                                <div className='spell-carac'>
                                    <strong>Damage: </strong><p>{spell.dmg}</p>
                                </div>
                                <div className='spell-carac'>
                                    <strong>Saving Throw: </strong><p>{spell.sav}</p>
                                </div>
                                
                                <div className='saves'>
                                    <div className='sav-result'>
                                        <strong>Critical succes: </strong><p>{spell.cSuc}</p>
                                    </div>
                                    <div className='sav-result'>
                                        <strong>Succes: </strong><p>{spell.suc}</p>
                                    </div>
                                    <div className='sav-result'>
                                        <strong>Fail: </strong><p>{spell.fail}</p>
                                    </div>
                                    <div className='sav-result'>
                                        <strong>Critical Fail: </strong><p>{spell.cFail}</p>
                                    </div>
                                </div>

                                <div className='spell-carac'>
                                    <strong>Heightened: </strong><p>{spell.height}</p>
                                </div>
                    
                                <button className='add-button'>Agregar a Spell Repertoire</button>
                            </div>
                        )}
                        </li>
                    ))}
                    </ul>
                )}
                </div>
            ))}
        </div>
    )
}

export default SpellList