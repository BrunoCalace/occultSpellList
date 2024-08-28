import React, { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import db from '../../firebase/firebaseConfig';
import './styles.scss';

function SpellList() {
    const [spells, setSpells] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState({});
    const [expandedItems, setExpandedItems] = useState({});
    const [repertoire, setRepertoire] = useState(() => {
        const savedRepertoire = localStorage.getItem('sRepertoire');
        return savedRepertoire ? JSON.parse(savedRepertoire) : [];
    });

    useEffect(() => {
        const getSpells = async () => {
            try {
                const q = query(collection(db, "SpellList"));
                const querySnapshot = await getDocs(q);
                const docs = [];

                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id });
                });

                setSpells(docs);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };
        getSpells();
    }, []);

    const toggleCategory = (category) => {
        setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }));
    };

    const toggleItem = (index) => {
        setExpandedItems(prev => ({ ...prev, [index]: !prev[index] }));
    };

    const addSpellToRepertoire = (spell) => {
        if (!repertoire.some(s => s.name === spell.name)) {
            const updatedRepertoire = [...repertoire, spell];
            setRepertoire(updatedRepertoire);
            localStorage.setItem('sRepertoire', JSON.stringify(updatedRepertoire));
        } else {
            alert('Este spell ya está en el repertorio.');
        }
    };

    const categorizedSpells = spells.reduce((acc, spell, index) => {
        if (!acc[spell.cat]) acc[spell.cat] = [];
        acc[spell.cat].push({ ...spell, index });
        return acc;
    }, {});

    const orderedCategories = Object.keys(categorizedSpells).sort((a, b) => {
        if (a === 'Cantrip') return -1;
        if (b === 'Cantrip') return 1;
        const levelA = parseInt(a.split(' ')[0]);
        const levelB = parseInt(b.split(' ')[0]);
        return levelA - levelB;
    });

    return (
        <div className="spell-list">
            {orderedCategories.map((category) => (
                <div key={category} className="spell-category">
                    <button className="category-button" onClick={() => toggleCategory(category)}>
                        {category}
                    </button>
                    {expandedCategories[category] && (
                        <ul className="spell-items">
                            {spells
                            .filter((spell) => spell.cat === category)
                            .map((spell, index) => (
                                <li key={`${spell.name}-${index}`} className="spell-item">
                                    <button className="item-button" onClick={() => toggleItem(index)}>
                                        {spell.name}
                                    </button>
                                    {expandedItems[index] && (
                                        <div className="spell-details">
                                            <strong>{spell.cat}</strong>
                                            <div className="spell-carac">
                                                <strong>Actions: </strong>
                                                <p>{spell.act}</p>
                                            </div>
                                            <div className="spell-carac">
                                                <strong>Range: </strong>
                                                <p>{spell.rng}</p>
                                            </div>
                                            <div className="spell-carac">
                                                <strong>Damage: </strong>
                                                <p>{spell.dmg}</p>
                                            </div>
                                            <div className="spell-carac">
                                                <strong>Saving Throw: </strong>
                                                <p>{spell.sav}</p>
                                            </div>
                                            <div className="saves">
                                                <div className="sav-result">
                                                    <strong>Critical Success: </strong>
                                                    <p>{spell.cSuc}</p>
                                                </div>
                                                <div className="sav-result">
                                                    <strong>Success: </strong>
                                                    <p>{spell.suc}</p>
                                                </div>
                                                <div className="sav-result">
                                                    <strong>Fail: </strong>
                                                    <p>{spell.fail}</p>
                                                </div>
                                                <div className="sav-result">
                                                    <strong>Critical Fail: </strong>
                                                    <p>{spell.cFail}</p>
                                                </div>
                                            </div>
                                            <div className="spell-carac">
                                                <strong>Heightened: </strong>
                                                <p>{spell.height}</p>
                                            </div>
                                            <button className="add-button" onClick={() => addSpellToRepertoire(spell)}>
                                                Agregar a Spell Repertoire
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
}

export default SpellList;