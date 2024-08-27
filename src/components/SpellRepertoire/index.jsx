import './styles.scss'
import React, { useEffect, useState } from 'react'
import sRepertoire from '../../sRepertoire.json'

function SpellRepertoire() {
    const [repertoire, setRepertoire] = useState(() => {
        const savedRepertoire = localStorage.getItem('sRepertoire');
        return savedRepertoire ? JSON.parse(savedRepertoire) : sRepertoire;
    });

    useEffect(() => {
        setRepertoire(prevRepertoire => {
            const savedRepertoire = localStorage.getItem('sRepertoire');
            return savedRepertoire ? JSON.parse(savedRepertoire) : sRepertoire;
        });
    }, []);

    const toggleSpellDetails = (index) => {
        setRepertoire(prev => prev.map((spell, i) => 
            i === index ? { ...spell, expanded: !spell.expanded } : spell
        ));
    };

    const removeSpellFromRepertoire = (index) => {
        const updatedRepertoire = repertoire.filter((_, i) => i !== index);
        setRepertoire(updatedRepertoire);
        localStorage.setItem('sRepertoire', JSON.stringify(updatedRepertoire));
    };

    return (
        <div className="spell-list">
            {repertoire.length === 0 ? (
                <p>No spells in your repertoire yet.</p>
            ) : (
                <ul className="spell-items">
                    {repertoire.map((spell, index) => (
                        <li key={index} className="spell-item">
                            <button className="item-button" onClick={() => toggleSpellDetails(index)}>
                                {spell.name}
                            </button>
                            {spell.expanded && (
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
                                            <strong>Critical success: </strong><p>{spell.cSuc}</p>
                                        </div>
                                        <div className='sav-result'>
                                            <strong>Success: </strong><p>{spell.suc}</p>
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
                                    <button className='remove-button' onClick={() => removeSpellFromRepertoire(index)}>Remove Spell</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default SpellRepertoire;