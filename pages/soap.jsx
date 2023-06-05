import { useState, useEffect } from 'react';
import axios from 'axios';
import _  from 'lodash';

import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default Home;

function Home() {    
    const [pokemons, setPokemons] = useState([]);
    const [pokedata, setPokedata] = useState({});
    const [pagination, setPagination] = useState([]);

    useEffect(async () => {
        var data = '<?xml version="1.0" encoding="utf-8"?>\n<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n  <soap:Body>\n    <NumberToDollars xmlns="http://www.dataaccess.com/webservicesserver/">\n      <dNum>500</dNum>\n    </NumberToDollars>\n  </soap:Body>\n</soap:Envelope>';

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://www.dataaccess.com/webservicesserver/NumberConversion.wso',
            headers: { 
                'Content-Type': 'text/xml; charset=utf-8'
            },
            data : data
        };
        let result = await axios(config);
        console.log(result);
    }, []);

    const loadMore = async () => {
        if (!!pagination){
            let {data} = await axios.get(pagination);
            setPagination(data.next);
            setPokemons(_.union(pokemons, data.results));
        }
    }

    const moreInfo = async (url, idx) => {
        console.log(url, idx)
        let {data} = await axios.get(url);
        pokedata[data.name] = data;
        console.log(_.toString(pokedata[data.name].abilities.map(ab=>ab.ability.name)));
        setPokedata(pokedata);
        setPokemons([]);
        setPokemons(pokemons);
    }
    return (
        <div className="p-4">
            <div className="container">
                <h1>¡SOAP!</h1>
                <hr></hr>
                <div className="row">
                    {pokemons.map((pokemon, idx) => 
                        <div className="col-xl-4 col-md-4 col-sm-6">
                            <div className="card mb-4">
                                {/* <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp" className="card-img-top"
                                alt="Palm Springs Road" /> */}
                                <div className="card-body">
                                    <h5 className="card-title">{pokemon.name}</h5>
                                    <p className="card-text">
                                        {!!pokedata[pokemon.name] ?
                                            <>
                                                <strong>Abilidades:</strong> {_.toString(pokedata[pokemon.name].abilities.map(ab=>ab.ability.name))}
                                                <br></br>
                                                <strong>Especie:</strong> {pokedata[pokemon.name].species.name}
                                                <br></br>
                                                <strong>Tipos:</strong> {_.toString(pokedata[pokemon.name].types.map(ab=>ab.type.name))}
                                            </>
                                        :   
                                            ''
                                        }
                                        <br/>
                                        {!pokedata[pokemon.name] &&
                                            <button onClick={e => {moreInfo(pokemon.url, idx)}} className="btn btn-sm btn-success mb-2">
                                                More info <i className='fas fa-eye'></i>
                                            </button>
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                    {!!pagination &&
                        <button onClick={(e)=>loadMore()} className="btn btn-sm btn-success mb-2">
                            Ver Más
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
